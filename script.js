const questions = [
    {
        question: "As of 2023, who is the current" +
        " and 5th president of South Africa?",
        answers: [
            {text: "Mmusi Maimane", correct: false},
            {text: "Cyril Ramaphosa", correct: true},
            {text: "Herman Mashaba", correct: false},
            {text: "Nelson Mandela", correct: false},
        ]
    },
    {
        question: " What holiday is dedicated to the Battle of Blood River"+
        ", and symbolizes the end of Apartheid?",
        answers: [
            {text: "Heritage Day", correct: false},
            {text: "Youth Day", correct: false},
            {text: "Women's Day", correct: false},
            {text: "Day of Reconciliation", correct: true}
        ]
    },
    {
        question: "What is the name of the largest gem-quality rough diamond ever discovered in South Africa?",
        answers: [
            {text: "Eureka", correct: false},
            {text: "Hope Diamond", correct: false},
            {text: "Cullinan", correct: true},
            {text: "Centenary Diamond", correct: false},
        ]
    },
    {
        question: "Where did the world's first successful heart transplant take place in South Africa?",
        answers: [
            {text: "Cape Town", correct: true},
            {text: "Pretoria", correct: false},
            {text: "Johannesburg", correct: false},
            {text: "Bloemfontein", correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-btns");
const nextButton = document.getElementById("next-btn");
const startButton = document.getElementById("start-btn");
const quizBoard = document.querySelector(".app");
const usernameInput = document.getElementById("username");
const startScreen = document.getElementById("start-screen");

let currentQuestionIndex = 0;
let score = 0;
quizBoard.style.display = "none";
let username = "";

function newGame() {
    username = usernameInput.value || "Player";
    const playerNameSpan = document.getElementById("player-name");
    playerNameSpan.textContent = username;
    quizBoard.style.display = "block";
    startScreen.style.display = "none";
    startButton.style.display = "none";
}


function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.style.display = "block";
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click", selectAnswer)
    })
}



function resetState(){
    nextButton.style.display = "none";
    while (answerButton.firstChild) {
        answerButton.removeChild(answerButton.firstChild)
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    };

    Array.from(answerButton.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    })
    
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = 'You scored ' + score + ' out of  '+questions.length+'!';
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion()
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else{
        startQuiz();
    }
})




startQuiz();