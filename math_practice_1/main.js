// main.js

document.addEventListener('DOMContentLoaded', (event) => {
    // Initialize the game when the DOM is fully loaded
    initGame();
});

let currentQuestion = {};
let score = 0;
let difficulty = loadSettings().difficulty; // Load difficulty from settings

// Initialize the game
function initGame() {
    document.getElementById('start-button').addEventListener('click', startGame);
    document.getElementById('instructions-button').addEventListener('click', showInstructions);
    document.getElementById('settings-button').addEventListener('click', showSettings);
}

// Start the game
function startGame() {
    score = 0;
    document.getElementById('score').innerText = `Score: ${score}`;
    generateQuestion();
}

// Show instructions
function showInstructions() {
    window.location.href = 'instructions.html';
}

// Show settings
function showSettings() {
    window.location.href = 'settings.html';
}

// Generate a new math question
function generateQuestion() {
    const questionElement = document.getElementById('question-text');
    const answerChoicesElement = document.getElementById('answer-choices');
    answerChoicesElement.innerHTML = ''; // Clear previous choices

    currentQuestion = createQuestion(difficulty);
    questionElement.innerText = currentQuestion.question;

    currentQuestion.choices.forEach((choice, index) => {
        const button = document.createElement('button');
        button.classList.add('answer');
        button.innerText = choice;
        button.addEventListener('click', () => checkAnswer(choice));
        answerChoicesElement.appendChild(button);
    });
}

// Create a math question based on difficulty
function createQuestion(difficulty) {
    let num1, num2, correctAnswer, question;
    const choices = [];

    if (difficulty === 'easy') {
        num1 = getRandomInt(1, 10);
        num2 = getRandomInt(1, 10);
        correctAnswer = num1 + num2;
        question = `${num1} + ${num2} = ?`;
    } else if (difficulty === 'medium') {
        num1 = getRandomInt(1, 20);
        num2 = getRandomInt(1, 20);
        correctAnswer = num1 + num2;
        question = `${num1} + ${num2} = ?`;
    } else if (difficulty === 'hard') {
        num1 = getRandomInt(1, 50);
        num2 = getRandomInt(1, 50);
        correctAnswer = num1 + num2;
        question = `${num1} + ${num2} = ?`;
    }

    choices.push(correctAnswer);
    while (choices.length < 4) {
        const wrongAnswer = getRandomInt(correctAnswer - 10, correctAnswer + 10);
        if (!choices.includes(wrongAnswer) && wrongAnswer >= 0) {
            choices.push(wrongAnswer);
        }
    }

    // Shuffle choices
    choices.sort(() => Math.random() - 0.5);

    return {
        question,
        choices,
        correctAnswer
    };
}

// Check the user's answer
function checkAnswer(selectedAnswer) {
    const feedbackElement = document.getElementById('feedback-message');
    if (selectedAnswer == currentQuestion.correctAnswer) { // Use == for type coercion
        score++;
        feedbackElement.innerText = 'Correct!';
    } else {
        feedbackElement.innerText = 'Try Again!';
    }
    document.getElementById('score').innerText = `Score: ${score}`;
    setTimeout(() => {
        feedbackElement.innerText = '';
        generateQuestion();
    }, 1000);
}

// Get a random integer between min (inclusive) and max (inclusive)
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Load settings from local storage
function loadSettings() {
    const settings = localStorage.getItem('gameSettings');
    if (settings) {
        return JSON.parse(settings);
    } else {
        // Default settings
        return {
            difficulty: 'easy',
            sound: true
        };
    }
}