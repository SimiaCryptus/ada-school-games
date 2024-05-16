// main.js

document.addEventListener('DOMContentLoaded', (event) => {
    // Initialize the game when the DOM is fully loaded
    initGame();
});

let currentQuestion = {};
let score = 0;
let difficulty;

try {
    difficulty = loadSettings().difficulty || 'easy'; // Load difficulty from settings
} catch (error) {
    console.error('Error loading settings:', error);
    difficulty = 'easy';
}

// Initialize the game
function initGame() {
     const startButton = document.getElementById('start-button');
     const instructionsButton = document.getElementById('instructions-button');
     const settingsButton = document.getElementById('settings-button');
     
    if (startButton) startButton.addEventListener('click', startGame);
    if (instructionsButton) instructionsButton.addEventListener('click', showInstructions);
    if (settingsButton) settingsButton.addEventListener('click', showSettings);
}

// Start the game
function startGame() {
    score = 0;
    const scoreElement = document.getElementById('score');
    if (scoreElement) scoreElement.innerText = `Score: ${score}`;
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
    const { min, max } = getRangeByDifficulty(difficulty);
    const num1 = getRandomInt(min, max);
    const num2 = getRandomInt(min, max);
    const correctAnswer = num1 + num2;
    const question = `${num1} + ${num2} = ?`;
    const choices = [];

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
    if (selectedAnswer === currentQuestion.correctAnswer) {
        score++;
        feedbackElement.innerText = 'Correct!';
    } else {
        feedbackElement.innerText = 'Try Again!';
    }
    const scoreElement = document.getElementById('score');
    if (scoreElement) scoreElement.innerText = `Score: ${score}`;
    setTimeout(() => {
        feedbackElement.innerText = '';
        generateQuestion();
    }, 1000);
}

// Get a random integer between min (inclusive) and max (inclusive)
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Get range of numbers based on difficulty
function getRangeByDifficulty(difficulty) {
    switch (difficulty) {
        case 'easy':
            return { min: 1, max: 10 };
        case 'medium':
            return { min: 1, max: 20 };
        case 'hard':
            return { min: 1, max: 50 };
        default:
            return { min: 1, max: 10 };
    }
}

// Load settings from utils.js
import { loadSettings } from './utils.js';