// Homepage typewriter effect
window.addEventListener('DOMContentLoaded', () => {
  const quote = 'O you who believe! Fear Allah, and let every soul look to what it has sent forth for tomorrow.  — Surah Al-Hashr (59:18)';
  const el = document.getElementById('typewriter-quote');
  if (el) {
    let i = 0;
    function type() {
      el.innerHTML = quote.slice(0, i) + '<span class="type-cursor">|</span>';
      if (i < quote.length) {
        i++;
        setTimeout(type, 28);
      } else {
        setTimeout(() => {
          el.innerHTML = quote + '<span class="type-cursor">|</span>';
        }, 1200);
      }
    }
    type();
  }
});
// JS for Iman Calculator Clean Version

const quizData = [
  {
    question: "১. আপনি কি পাঁচ ওয়াক্ত সালাত নিয়মিত আদায় করেন, এমনকি যখন সময় কম বা ক্লান্ত থাকেন?",
    options: [
      "হ্যাঁ, আমি সবসময় সময় মতো সালাত আদায় করি, কোনভাবেই ছাড়ি না।",
      "আমি চেষ্টা করি, কিন্তু মাঝে মাঝে সময় বা পরিস্থিতির কারণে মিস হয়।",
      "আমি মাঝে মাঝে পড়ি, নিয়মিত না।",
      "না, আমি সাধারণত সালাত আদায় করি না।"
    ],
    scores: [4, 3, 2, 1]
  },
  {
    question: "২. আপনি কি আল্লাহর হুকুমকে নিজের চাওয়ার উপরে প্রাধান্য দেন, এমনকি তা কঠিন মনে হলেও?",
    options: [
      "হ্যাঁ, আমি সবসময় আল্লাহর হুকুমকে অগ্রাধিকার দিই, যত কঠিনই হোক।",
      "আমি চেষ্টা করি, কিন্তু অনেক সময় নিজের চাওয়া প্রাধান্য পেয়ে যায়।",
      "আমি বুঝি এটা গুরুত্বপূর্ণ, কিন্তু বাস্তবে তা অনুসরণ করা কঠিন লাগে।",
      "না, আমি সাধারণত নিজের ইচ্ছাকেই অনুসরণ করি।"
    ],
    scores: [4, 3, 2, 1]
  },
  {
    question: "৩. আপনি গোপনে কোন পাপ করলে কি অন্তরে ভয় অনুভব করেন এবং তাওবা করেন?",
    options: [
      "হ্যাঁ, সাথে সাথেই অনুশোচনা হয় এবং আমি তাওবা করি।",
      "কখনো কখনো অনুশোচনা হয়, কিন্তু তাওবা করার বিষয়ে দেরি হয়।",
      "আমি জানি এটা পাপ, কিন্তু ভয় খুব বেশি অনুভব করি না।",
      "না, তেমন কোনো ভয় বা তাওবার অনুভব হয় না।"
    ],
    scores: [4, 3, 2, 1]
  },
  {
    question: "৪. আপনি কি আল্লাহর উপর ভরসা রাখেন, বিশেষ করে যখন পরিস্থিতি আপনার বিরুদ্ধে যায়?",
    options: [
      "হ্যাঁ, আমি তখনও বিশ্বাস রাখি যে তিনিই আমার জন্য উত্তম নির্ধারণ করেন",
      "মাঝে মাঝে সংশয়ে পড়ে যাই, তবে শেষে আল্লাহর উপর ভরসা করি।",
      "আমি চেষ্টা করি বিশ্বাস রাখতে, তবে হতাশ হয়ে পড়ি।",
      "না, তখন মনে হয় সব নিয়ন্ত্রণ আমার হাতেই থাকা উচিত।"
    ],
    scores: [4, 3, 2, 1]
  }
];


let currentQ = 0;
let answers = Array(quizData.length).fill(null);
let animating = false;

function animateCard(direction, cb) {
  const card = document.getElementById('quiz-box');
  if (!card) return cb && cb();
  card.classList.remove('slide-in-left', 'slide-in-right', 'slide-out-left', 'slide-out-right');
  void card.offsetWidth; // force reflow
  card.classList.add(direction === 'left' ? 'slide-out-left' : 'slide-out-right');
  animating = true;
  setTimeout(() => {
    card.classList.remove('slide-out-left', 'slide-out-right');
    card.classList.add(direction === 'left' ? 'slide-in-right' : 'slide-in-left');
    if (cb) cb();
    setTimeout(() => {
      card.classList.remove('slide-in-left', 'slide-in-right');
      animating = false;
    }, 350);
  }, 350);
}

function renderQuiz() {
  const qBox = document.getElementById('question-box');
  const oBox = document.getElementById('options-box');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');

  // Show question
  qBox.textContent = quizData[currentQ].question;

  // Show options
  oBox.innerHTML = '';
  quizData[currentQ].options.forEach((opt, idx) => {
    const btn = document.createElement('button');
    btn.textContent = opt;
    btn.className = 'quiz-option' + (answers[currentQ] === idx ? ' selected' : '');
    btn.onclick = () => {
      answers[currentQ] = idx;
      renderQuiz();
    };
    oBox.appendChild(btn);
  });

  // Prev/Next button logic
  prevBtn.disabled = currentQ === 0 || animating;
  nextBtn.disabled = answers[currentQ] === null || animating;
  nextBtn.textContent = currentQ === quizData.length - 1 ? 'Calculate' : 'Next';
}

function showResult() {
  const total = answers.reduce((sum, ans, i) => sum + (quizData[i].scores[ans] || 0), 0);
  const percent = total / (4 * quizData.length) * 100;
  let msg = '';
  if (percent >= 85) {
    msg = '🌙 মাশাআল্লাহ! আপনার ইমান অনেক দৃঢ়। আল্লাহর পথে অবিচল থাকুন।';
  } else if (percent >= 60) {
    msg = '🟿 ইমান ভালো আছে, কিন্তু আরও ইখলাস ও আমল দরকার। চেষ্টাটা চালিয়ে যান।';
  } else if (percent >= 40) {
    msg = '🔋 আপনি চেষ্টা করছেন, তবে ইমান দুর্বল। নিজেকে ফিরে দেখার সময় এসেছে।';
  } else {
    msg = '⚠️ ইমান খুবই দুর্বল। এখনই তাওবা করুন এবং আল্লাহর দিকে ফিরে যান।';
  }
  document.getElementById('result-text').textContent = msg;
  document.getElementById('result-modal').style.display = 'flex';
}

function hideResult() {
  document.getElementById('result-modal').style.display = 'none';
}

window.addEventListener('DOMContentLoaded', () => {
  if (!document.getElementById('quiz-section')) return;
  renderQuiz();
  document.getElementById('prev-btn').onclick = () => {
    if (animating) return;
    if (currentQ > 0) {
      animateCard('left', () => {
        currentQ--;
        renderQuiz();
      });
    }
  };
  document.getElementById('next-btn').onclick = () => {
    if (animating) return;
    if (currentQ === quizData.length - 1) {
      showResult();
    } else if (answers[currentQ] !== null) {
      animateCard('right', () => {
        currentQ++;
        renderQuiz();
      });
    }
  };
  document.getElementById('restart-btn').onclick = () => {
    currentQ = 0;
    answers = Array(quizData.length).fill(null);
    hideResult();
    renderQuiz();
  };
});

// Style for quiz card and animation
const style = document.createElement('style');
style.textContent = `
.quiz-card {
  width: 420px;
  min-height: 340px;
  background: linear-gradient(135deg, #3d5a80 80%, #9543FF 100%);
  border-radius: 28px;
  box-shadow: 0 8px 32px rgba(60,60,120,0.18), 0 2px 8px #9543FF22;
  padding: 32px 28px 24px 28px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
  position: relative;
  transition: box-shadow 0.2s;
  margin-bottom: 18px;
}
#question-box {
  color: #fff;
  font-size: 1.25rem;
  font-weight: bold;
  text-align: center;
  min-height: 90px;
  border: 2px solid #98c1d9;
  border-radius: 14px;
  background: rgba(255,255,255,0.07);
  box-shadow: 0 2px 8px #0001;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 18px;
  padding: 18px 10px;
}
#options-box {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
  margin-bottom: 18px;
}
.quiz-option {
  display: block;
  width: 100%;
  padding: 16px 10px;
  font-size: 1rem;
  border-radius: 10px;
  border: 2px solid #98c1d9;
  background: #4772ab;
  color: #fff;
  cursor: pointer;
  font-weight: 500;
  box-shadow: 0 2px 8px #0001;
  transition: background 0.2s, color 0.2s, box-shadow 0.2s;
}
.quiz-option.selected, .quiz-option:hover {
  background: #a3e635;
  color: #2b3a55;
  border-color: #fff;
  box-shadow: 0 4px 16px #a3e63544;
}
#quiz-nav {
  margin-top: 10px;
  display: flex;
  justify-content: center;
  gap: 18px;
}
#quiz-nav button {
  padding: 10px 28px;
  font-size: 1rem;
  border-radius: 10px;
  border: none;
  background: #9543FF;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 2px 8px #9543FF22;
  transition: background 0.2s, transform 0.2s;
}
#quiz-nav button:disabled {
  background: #ccc;
  color: #888;
  cursor: not-allowed;
}
#quiz-nav button:not(:disabled):hover {
  background: #5a2e8c;
  transform: scale(1.05);
}
.modal {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
  .modal-content {
    background: #fff;
    border-radius: 20px;
    padding: 36px 24px 28px 24px;
    box-shadow: 0 4px 32px rgba(0,0,0,0.15);
    max-width: 400px;
    width: 100%;
    text-align: center;
  }
  #result-text {
    background: #f1f5fa;
    color: #222b4a;
    border-radius: 12px;
    padding: 18px 10px;
    margin: 18px 0 0 0;
    font-size: 1.13em;
    font-weight: 500;
    box-shadow: 0 2px 8px #2563eb22;
    line-height: 1.6;
    word-break: break-word;
    display: inline-block;
    min-width: 80%;
  }
.modal-content h2 {
  color: #9543FF;
  font-size: 1.5rem;
  margin-bottom: 18px;
}
.modal-content button {
  margin-top: 18px;
  padding: 10px 28px;
  font-size: 1rem;
  border-radius: 10px;
  border: none;
  background: #9543FF;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 2px 8px #9543FF22;
  transition: background 0.2s, transform 0.2s;
}
.modal-content button:hover {
  background: #5a2e8c;
  transform: scale(1.05);
}
/* Animation classes */
.slide-in-left {
  animation: slideInLeft 0.35s cubic-bezier(.4,1.6,.6,1) both;
}
.slide-in-right {
  animation: slideInRight 0.35s cubic-bezier(.4,1.6,.6,1) both;
}
.slide-out-left {
  animation: slideOutLeft 0.35s cubic-bezier(.4,1.6,.6,1) both;
}
.slide-out-right {
  animation: slideOutRight 0.35s cubic-bezier(.4,1.6,.6,1) both;
}
@keyframes slideInLeft {
  from { opacity: 0; transform: translateX(-60px) scale(0.98); }
  to { opacity: 1; transform: translateX(0) scale(1); }
}
@keyframes slideInRight {
  from { opacity: 0; transform: translateX(60px) scale(0.98); }
  to { opacity: 1; transform: translateX(0) scale(1); }
}
@keyframes slideOutLeft {
  from { opacity: 1; transform: translateX(0) scale(1); }
  to { opacity: 0; transform: translateX(-60px) scale(0.98); }
}
@keyframes slideOutRight {
  from { opacity: 1; transform: translateX(0) scale(1); }
  to { opacity: 0; transform: translateX(60px) scale(0.98); }
}
@media (max-width: 600px) {
  .quiz-card { width: 98vw; min-width: unset; padding: 16px 4vw; }
  #options-box { grid-template-columns: 1fr; }
}
`;
document.head.appendChild(style);
