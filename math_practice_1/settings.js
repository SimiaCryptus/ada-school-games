// settings.js

// Load settings from utils.js
import { loadSettings, saveSettings } from './utils.js';

// Function to save settings to local storage

// Function to update the game based on the selected settings
function applySettings(settings) {
    // Update difficulty level
    const difficultyElement = document.getElementById('difficulty');
    difficultyElement.value = settings.difficulty;

    // Update sound preference
    const soundElement = document.getElementById('sound');
    soundElement.checked = settings.sound;
}

// Function to handle settings form submission
function handleSettingsFormSubmit(event) {
    event.preventDefault();

    const difficulty = document.getElementById('difficulty').value;
    const sound = document.getElementById('sound').checked;

    const newSettings = {
        difficulty: difficulty,
        sound: sound
    };

    saveSettings(newSettings);
    applySettings(newSettings);
    const feedbackElement = document.getElementById('feedback-message');
    feedbackElement.innerText = 'Settings saved successfully!';
    setTimeout(() => {
        feedbackElement.innerText = '';
    }, 3000);
}

// Function to initialize the settings page
function initSettingsPage() {
    const settings = loadSettings();
    applySettings(settings);

    const settingsForm = document.getElementById('settings-form');
    settingsForm.addEventListener('submit', handleSettingsFormSubmit);
}

// Initialize the settings page when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initSettingsPage);
