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

document.addEventListener("DOMContentLoaded", () => {
    startNewRound();
});

function startNewRound() {
    let shuffled = [...allQuizData].sort(() => 0.5 - Math.random());
    currentRoundQuestions = shuffled.slice(0, 3);
    currentQuestionIndex = 0;
    score = 0;
    loadQuiz();
}

function loadQuiz() {
    const questionBox = document.getElementById("quiz-question");
    const optionsList = document.getElementById("quiz-options");
    const resultDiv = document.getElementById("quiz-result");
    const nextBtn = document.getElementById("next-btn");
    
    resultDiv.style.display = "none";
    nextBtn.style.display = "none";
    optionsList.innerHTML = "";

    document.getElementById("q-current").textContent = currentQuestionIndex + 1;
    document.getElementById("q-total").textContent = currentRoundQuestions.length;

    const currentQuiz = currentRoundQuestions[currentQuestionIndex];
    questionBox.textContent = currentQuiz.question;

    currentQuiz.options.forEach((option, index) => {
        const btn = document.createElement("button");
        btn.textContent = option;
        btn.onclick = () => checkAnswer(index, btn);
        optionsList.appendChild(btn);
    });
}

function checkAnswer(selectedIndex, clickedBtn) {
    const currentQuiz = currentRoundQuestions[currentQuestionIndex];
    const resultDiv = document.getElementById("quiz-result");
    const nextBtn = document.getElementById("next-btn");
    const buttons = document.querySelectorAll(".options-list button");
    
    buttons.forEach(b => b.disabled = true);
    
    resultDiv.style.display = "block";
    nextBtn.style.display = "block";

    if (selectedIndex === currentQuiz.correct) {
        score++;
        resultDiv.innerHTML = `<strong>🎉 Correct!</strong> <br> ${currentQuiz.explanation}`;
        resultDiv.className = "correct";
        clickedBtn.style.background = "#2E7D32";
        clickedBtn.style.color = "#FFF";
    } else {
        resultDiv.innerHTML = `<strong>💥 Incorrect!</strong> <br> ${currentQuiz.explanation}`;
        resultDiv.className = "incorrect";
        clickedBtn.style.background = "#C62828";
        clickedBtn.style.color = "#FFF";
        buttons[currentQuiz.correct].style.border = "2px solid #2E7D32";
    }
}

document.getElementById("next-btn").addEventListener("click", () => {
    currentQuestionIndex++;
    
    if (currentQuestionIndex < currentRoundQuestions.length) {
        loadQuiz();
    } else {
        showFinalScore();
    }
});

function showFinalScore() {
    const quizContainer = document.querySelector(".quiz-container");
    
    let resultMessage = "";
    if (score === 3) resultMessage = "Eco-Warrior!";
    else if (score === 2) resultMessage = "Eco-Learner!";
    else if (score === 1) resultMessage = "Keep Growing!";
    else resultMessage = "Every Action Starts with Learning!";
    
    quizContainer.innerHTML = `
        <div style="text-align: center;">
            <h2 style="color: var(--moss); font-size: 2.5rem;">Quiz Complete!</h2>
            <p style="font-size: 1.5rem; font-weight: bold; margin: 1rem 0;">You scored ${score} out of ${currentRoundQuestions.length}</p>
            <p style="font-size: 1.5rem; color: var(--leaf); margin-bottom: 2rem;"><strong>${resultMessage}</strong></p>
            <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                <button id="retry-btn" style="padding: 1rem 2rem; background: var(--moss); color: white; border: none; border-radius: 10px; cursor: pointer; font-weight: bold; transition: all 0.2s;">Play Another Round</button>
                <a href="#learn" style="padding: 1rem 2rem; background: var(--beige); color: var(--text-dark); text-decoration: none; border-radius: 10px; font-weight: bold; display: inline-block; transition: all 0.2s;">Learn More About E-Waste</a>
            </div>
        </div>
    `;

    document.getElementById("retry-btn").addEventListener("click", () => {
        quizContainer.innerHTML = `
            <div class="quiz-status">Question <span id="q-current">1</span> of <span id="q-total">3</span></div>
            <div class="question-box" id="quiz-question">Initializing Quiz...</div>
            <div class="options-list" id="quiz-options"></div>
            <div id="quiz-result"></div>
            <button id="next-btn" style="display: none;">Next Question ➔</button>
        `;
        
        document.getElementById("next-btn").addEventListener("click", () => {
            currentQuestionIndex++;
            if (currentQuestionIndex < currentRoundQuestions.length) {
                loadQuiz();
            } else {
                showFinalScore();
            }
        });

        startNewRound();
    });
}