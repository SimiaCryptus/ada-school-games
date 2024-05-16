// utils.js

// Function to load settings from local storage
export function loadSettings() {
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

// Function to save settings to local storage
export function saveSettings(settings) {
    localStorage.setItem('gameSettings', JSON.stringify(settings));
}
