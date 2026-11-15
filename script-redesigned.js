const allQuizData = [
    { question: "Why should depleted batteries be kept separate from other electronic discards?", options: ["They are too small to recycle.", "They can leak or cause fires if damaged or handled improperly.", "They make other devices work again.", "They can be placed safely in regular trash."], correct: 1, explanation: "Batteries need separate handling because some types can leak hazardous materials or create fire risks, especially when damaged." },
    { question: "Which compartment is intended for completely non-functional electronics with no remaining use or salvageable parts?", options: ["Disposable", "Recyclable", "Batteries", "Any compartment"], correct: 0, explanation: "Disposable is for electronics that are completely non-functional and have no remaining use or salvageable parts, such as fried circuit boards, snapped cables, and dead peripherals." },
    { question: "A damaged keyboard can still be repaired or its usable parts recovered. Where should it go?", options: ["Disposable", "Recyclable", "Batteries", "Regular waste"], correct: 1, explanation: "Recyclable is for damaged devices or hardware components that can still be repaired, repurposed, or stripped for reusable parts." },
    { question: "Which items belong in the Batteries compartment?", options: ["Fried circuit boards and dead peripherals.", "Damaged hardware that can be repaired or repurposed.", "Depleted alkaline, lithium-ion, and device batteries.", "Any electronic item, regardless of condition."], correct: 2, explanation: "The Batteries compartment is specifically for depleted alkaline, lithium-ion, and device batteries. Keep them separate from other electronic discards." },
    { question: "A completely dead mouse with no reusable parts should be sorted as:", options: ["Disposable", "Recyclable", "Batteries", "General household waste"], correct: 0, explanation: "A dead peripheral with no remaining use or salvageable parts belongs in Disposable." },
    { question: "A damaged laptop component that can still be repurposed belongs in which compartment?", options: ["Disposable", "Recyclable", "Batteries", "None of the above"], correct: 1, explanation: "Recyclable accepts damaged hardware that still has repair, repurposing, or parts-recovery potential." },
    { question: "What should you do if a battery is swollen, hot, leaking, or visibly damaged?", options: ["Put it straight into the Batteries compartment.", "Puncture it to release pressure.", "Do not place it in the collection bin; seek guidance from an appropriate battery-waste handler.", "Mix it with disposable electronics."], correct: 2, explanation: "Damaged, swollen, hot, or leaking batteries may pose an immediate safety risk. Do not put them into the collection bin; ask an appropriate battery-waste handler for guidance." },
    { question: "Which of these precious metals is commonly found in old smartphone circuit boards?", options: ["Uranium", "Titanium", "Gold", "Plutonium"], correct: 2, explanation: "Circuit boards can contain valuable materials such as gold, silver, and copper." },
    { question: "What does the 'Circular Economy' mean in terms of e-waste?", options: ["Recycling bins should be shaped like circles.", "Shipping e-waste around the globe in a circle.", "Keeping materials and products in use through repair, reuse, and recovery.", "Selling old phones for money."], correct: 2, explanation: "A circular economy keeps products and materials in use for as long as possible, reducing waste and demand for new raw materials." },
    { question: "What is currently the fastest-growing waste stream globally?", options: ["Plastic packaging", "Electronic waste (e-waste)", "Organic food waste", "Glass bottles"], correct: 1, explanation: "E-waste is growing rapidly as people buy more electronic products and replace them more frequently." },
    { question: "What harmful substance is heavily concentrated in older CRT monitors and televisions?", options: ["Lead", "Asbestos", "Chlorofluorocarbons", "Radon"], correct: 0, explanation: "Older CRT glass contains significant amounts of lead, which requires careful handling and proper processing." },
    { question: "What can happen when heavy metals from e-waste enter an ordinary landfill?", options: ["They evaporate harmlessly.", "They turn into compost.", "They can leach into soil and groundwater.", "They are absorbed by plastic bags."], correct: 2, explanation: "Improper disposal can allow hazardous substances to contaminate soil and water." },
    { question: "Why should you protect personal data before handing in an old phone or laptop?", options: ["To make the device lighter.", "To protect privacy and reduce the risk of identity theft.", "To save electricity.", "To make the screen brighter."], correct: 1, explanation: "Back up important files, sign out of accounts, and securely erase personal data before handing over a device." },
    { question: "Which of the following items is considered e-waste?", options: ["A broken electric toothbrush", "An old microwave", "A damaged smartphone", "All of the above"], correct: 3, explanation: "Many products that use electricity, electronic components, or batteries can become e-waste." },
    { question: "What does the term 'Urban Mining' refer to?", options: ["Digging tunnels under cities.", "Recovering valuable materials from discarded products instead of extracting only new raw materials.", "Mining coal in urban areas.", "Building skyscrapers."], correct: 1, explanation: "Urban mining recovers useful materials from products and electronic waste that have already been manufactured and used." },
    { question: "How can recovering materials from e-waste help the environment?", options: ["It cools down the atmosphere directly.", "It stops the sun from reaching the earth.", "It can reduce the need to extract new raw materials.", "It produces cold air."], correct: 2, explanation: "Recovering materials can reduce demand for virgin resources and the environmental impacts associated with extraction and processing." }
];

let currentRoundQuestions = [];
let currentQuestionIndex = 0;
let score = 0;

function startNewRound() {
  const shuffled = [...allQuizData].sort(() => Math.random() - 0.5);
  currentRoundQuestions = shuffled.slice(0, 3);
  currentQuestionIndex = 0;
  score = 0;
  loadQuiz();
}
function loadQuiz() {
  const questionBox = document.getElementById('quiz-question');
  const optionsList = document.getElementById('quiz-options');
  const resultDiv = document.getElementById('quiz-result');
  const nextBtn = document.getElementById('next-btn');
  if (!questionBox || !optionsList || !resultDiv || !nextBtn) return;
  resultDiv.style.display = 'none';
  resultDiv.textContent = '';
  nextBtn.style.display = 'none';
  optionsList.innerHTML = '';
  document.getElementById('q-current').textContent = currentQuestionIndex + 1;
  document.getElementById('q-total').textContent = currentRoundQuestions.length;
  const progress = document.getElementById('quiz-progress-bar');
  if (progress) progress.style.width = `${(currentQuestionIndex / currentRoundQuestions.length) * 100}%`;
  const currentQuiz = currentRoundQuestions[currentQuestionIndex];
  questionBox.textContent = currentQuiz.question;
  currentQuiz.options.forEach((option, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = option;
    button.addEventListener('click', () => checkAnswer(index, button), { once: true });
    optionsList.appendChild(button);
  });
}
function checkAnswer(selectedIndex, clickedButton) {
  const currentQuiz = currentRoundQuestions[currentQuestionIndex];
  const resultDiv = document.getElementById('quiz-result');
  const nextBtn = document.getElementById('next-btn');
  const buttons = [...document.querySelectorAll('.options-list button')];
  buttons.forEach(button => button.disabled = true);
  if (selectedIndex === currentQuiz.correct) {
    score++;
    clickedButton.classList.add('correct-answer');
    resultDiv.innerHTML = `<strong>Correct!</strong> ${currentQuiz.explanation}`;
  } else {
    clickedButton.classList.add('wrong-answer');
    buttons[currentQuiz.correct].classList.add('correct-answer');
    resultDiv.innerHTML = `<strong>Not quite.</strong> ${currentQuiz.explanation}`;
  }
  resultDiv.style.display = 'block';
  nextBtn.style.display = 'inline-flex';
  nextBtn.innerHTML = currentQuestionIndex === 2 ? 'See your result <span>→</span>' : 'Next question <span>→</span>';
  const progress = document.getElementById('quiz-progress-bar');
  if (progress) progress.style.width = `${((currentQuestionIndex + 1) / currentRoundQuestions.length) * 100}%`;
}
function showFinalScore() {
  const panel = document.querySelector('.quiz-panel');
  const title = score === 3 ? 'Eco-warrior!' : score === 2 ? 'Eco-learner!' : score === 1 ? 'Keep growing!' : 'Every action starts with learning.';
  panel.innerHTML = `<div class="quiz-panel-top"><span>THE ECO CHALLENGE</span><span>ROUND COMPLETE</span></div><div class="quiz-final-score"><span>YOUR SCORE</span><strong>${score}<small> / 3</small></strong><h3>${title}</h3><p>${score === 3 ? 'Excellent work. You know your e-waste.' : 'Keep exploring the project and give it another try.'}</p><button class="quiz-next" id="retry-quiz" type="button">Try another round <span>↻</span></button></div>`;
  document.getElementById('retry-quiz').addEventListener('click', () => {
    panel.innerHTML = `<div class="quiz-panel-top"><span>THE ECO CHALLENGE</span><span class="quiz-status">QUESTION <b id="q-current">1</b> / <b id="q-total">3</b></span></div><div class="quiz-progress"><span id="quiz-progress-bar"></span></div><div class="question-box" id="quiz-question">Initializing quiz...</div><div class="options-list" id="quiz-options"></div><div id="quiz-result" aria-live="polite"></div><button id="next-btn" class="quiz-next" type="button" style="display:none">Next question <span>→</span></button>`;
    document.getElementById('next-btn').addEventListener('click', nextQuestion);
    startNewRound();
  });
}
function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < currentRoundQuestions.length) loadQuiz();
  else showFinalScore();
}

document.addEventListener('DOMContentLoaded', () => {
  startNewRound();
  const next = document.getElementById('next-btn');
  if (next) next.addEventListener('click', nextQuestion);

  // Mobile navigation
  const menuButton = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (menuButton && navLinks) {
    menuButton.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', String(isOpen));
      menuButton.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
    });
    navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Open navigation');
    }));
  }

  // FAQ accordion — one answer open at a time.
  document.querySelectorAll('.faq-question').forEach(button => {
    button.addEventListener('click', () => {
      const item = button.closest('.faq-item');
      const willOpen = !item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(other => {
        other.classList.remove('open');
        other.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });
      if (willOpen) {
        item.classList.add('open');
        button.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // Scroll reveal and reading progress.
  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    }), { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });
    revealItems.forEach(item => observer.observe(item));
  } else revealItems.forEach(item => item.classList.add('is-visible'));

  // Keep the navigation over the campus photo, then turn it into a glassy sticky bar.
  const siteNav = document.querySelector('.site-nav');
  const updateNav = () => { if (siteNav) siteNav.classList.toggle('nav-scrolled', window.scrollY > 45); };
  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  const progressBar = document.getElementById('scroll-progress-bar');
  const updateProgress = () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
    if (progressBar) progressBar.style.width = `${progress}%`;
  };
  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();
});
