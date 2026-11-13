const allQuizData = [
    { question: "Why is throwing a lithium-ion battery in the regular trash dangerous?", options: ["It decomposes too quickly and clogs drains.", "It can puncture, leak toxic heavy metals, and trigger massive landfill fires.", "It costs the city too much money to transport.", "It releases greenhouse gases when exposed to the sun."], correct: 1, explanation: "Lithium-ion batteries are highly volatile and can spark massive chemical fires." },
    { question: "Which of these precious metals is commonly found in old smartphone circuit boards?", options: ["Uranium", "Titanium", "Gold", "Plutonium"], correct: 2, explanation: "Circuit boards contain Gold, Silver, and Copper." },
    { question: "What does the 'Circular Economy' mean in terms of e-waste?", options: ["Recycling bins should be shaped like circles.", "Shipping e-waste around the globe in a circle.", "Extracting materials from old tech to manufacture new tech, preventing new mining.", "Selling old phones for money."], correct: 2, explanation: "It keeps resources in use for as long as possible." },
    { question: "What is currently the fastest-growing domestic waste stream globally?", options: ["Plastic packaging", "Electronic waste (e-waste)", "Organic food waste", "Glass bottles"], correct: 1, explanation: "E-waste is growing rapidly due to higher consumption rates and short life cycles of electronics." },
    { question: "What harmful substance is heavily concentrated in older CRT monitors and televisions?", options: ["Lead", "Asbestos", "Chlorofluorocarbons", "Radon"], correct: 0, explanation: "Older CRT glass contains significant amounts of lead to block X-ray emissions." },
    { question: "Globally, roughly what percentage of e-waste is formally documented as properly collected and recycled?", options: ["Less than 20%", "Around 50%", "Over 75%", "99%"], correct: 0, explanation: "A vast majority of e-waste ends up in landfills or informal recycling sectors." },
    { question: "What is 'planned obsolescence' in the electronics industry?", options: ["Designing products to last forever.", "A law requiring recycling.", "Designing products with an artificially limited useful life.", "A type of battery."], correct: 2, explanation: "It forces consumers to replace devices frequently, increasing e-waste." },
    { question: "What happens to heavy metals from e-waste if dumped in a standard landfill?", options: ["They evaporate harmlessly.", "They turn into compost.", "They leach into the soil and poison local groundwater.", "They are absorbed by plastic bags."], correct: 2, explanation: "Toxic leaching is a major environmental threat to agriculture and water supplies." },
    { question: "Why is it critical to wipe your data before dropping off a device at an e-waste hub?", options: ["To make the device lighter.", "To protect personal privacy and prevent identity theft.", "To save electricity.", "To make the screen brighter."], correct: 1, explanation: "Data security is essential; always factory reset devices before recycling." },
    { question: "Which of the following items is classified as e-waste?", options: ["A broken electric toothbrush", "An old microwave", "A damaged smartphone", "All of the above"], correct: 3, explanation: "Anything with a plug, electric cord, or battery is considered e-waste." },
    { question: "What does the term 'Urban Mining' refer to?", options: ["Digging tunnels under cities.", "Extracting valuable materials from discarded e-waste instead of mining the earth.", "Mining coal in urban areas.", "Building skyscrapers."], correct: 1, explanation: "Urban mining recovers gold, copper, and silver directly from old electronics." },
    { question: "How does recycling e-waste help combat climate change?", options: ["It cools down the atmosphere directly.", "It stops the sun from reaching the earth.", "It significantly reduces greenhouse gas emissions required to mine new raw materials.", "It produces cold air."], correct: 2, explanation: "Recycling uses a fraction of the energy compared to mining raw ores." },
    { question: "What is the primary purpose of Project TUP-e-an's 'Secure Core' bin?", options: ["For large desktop computers.", "For storing small parts and batteries safely.", "For glass bottles.", "For paper waste."], correct: 1, explanation: "The Secure Core is specifically designed to isolate hazardous batteries and small electronics." },
    { question: "Where is the final downstream destination for batch e-waste collected by Project TUP-e-an?", options: ["Buried in the campus field.", "Thrown in the municipal garbage.", "SM Cares Electronic Waste Collection Program.", "Burned in an incinerator."], correct: 2, explanation: "SM Cares handles the certified, safe downstream recycling." }
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
