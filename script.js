const questions = [
    {
        question: "What is the highest selling action-adventure game?",
        answers: [
            { text: "Grand Theft Auto V", correct: true },
            { text: "The Legend of Zelda: Breath of the Wild", correct: false },
            { text: "Red Dead Redemption 2", correct: false },
            { text: "Assassin's Creed Odyssey", correct: false }
        ]
    },
    {
        question: "What is the highest selling role-playing game (RPG)?",
        answers: [
            { text: "Final Fantasy VII", correct: false },
            { text: "The Elder Scrolls V: Skyrim", correct: true },
            { text: "Persona 5", correct: false },
            { text: "The Witcher 3: Wild Hunt", correct: false }
        ]
    },
    {
        question: "What is the highest selling first-person shooter game?",
        answers: [
            { text: "Call of Duty: Modern Warfare", correct: false },
            { text: "Halo 5: Guardians", correct: false },
            { text: "Overwatch", correct: false },
            { text: "Call of Duty: Black Ops", correct: true }
        ]
    },
    {
        question: "What is the highest selling sports game?",
        answers: [
            { text: "FIFA 21", correct: false },
            { text: "NBA 2K21", correct: false },
            { text: "Wii Sports", correct: true },
            { text: "Madden NFL 21", correct: false }
        ]
    },
    {
        question: "What is the highest selling puzzle game?",
        answers: [
            { text: "Candy Crush Saga", correct: false },
            { text: "Tetris", correct: true },
            { text: "Bejeweled", correct: false },
            { text: "Angry Birds", correct: false }
        ]
    }
];

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    const username = document.getElementById("username").value;
    if (username) {
        document.getElementById("login").classList.add("hidden");
        document.getElementById("quiz").classList.remove("hidden");
        showQuestion();
    } else {
        alert("Please enter a username.");
    }
}

function showQuestion() {
    resetState();
    const questionElement = document.getElementById("question");
    const questionCounterElement = document.getElementById("question-counter");
    const answerButtonsElement = document.getElementById("answers");
    
    questionCounterElement.innerText = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
    questionElement.innerText = questions[currentQuestionIndex].question;
    
    questions[currentQuestionIndex].answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("btn");
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    document.getElementById("next-btn").classList.add("hidden");
    const answerButtonsElement = document.getElementById("answers");
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === 'true';
    if (correct) {
        selectedButton.classList.add("correct");
        score++;
    } else {
        selectedButton.classList.add("incorrect");
    }
    Array.from(document.getElementById("answers").children).forEach(button => {
        if (button.dataset.correct === 'true') {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    document.getElementById("next-btn").classList.remove("hidden");
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    document.getElementById("quiz").classList.add("hidden");
    document.getElementById("result").classList.remove("hidden");
    document.getElementById("score").innerText = `Your score is ${score} out of ${questions.length}`;
}

function restartQuiz() {
    score = 0;
    currentQuestionIndex = 0;
    document.getElementById("result").classList.add("hidden");
    document.getElementById("login").classList.remove("hidden");
}

document.getElementById("next-btn").addEventListener("click", nextQuestion);
