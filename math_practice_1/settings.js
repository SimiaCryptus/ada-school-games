// settings.js

// Function to load settings from local storage
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

// Function to save settings to local storage
function saveSettings(settings) {
    localStorage.setItem('gameSettings', JSON.stringify(settings));
}

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
    alert('Settings saved successfully!');
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
```

### Explanation

1. **loadSettings()**:
   - This function retrieves the game settings from the browser's local storage. If no settings are found, it returns default settings.

2. **saveSettings(settings)**:
   - This function saves the provided settings object to local storage.

3. **applySettings(settings)**:
   - This function updates the settings UI elements based on the provided settings object. It sets the difficulty level and sound preference.

4. **handleSettingsFormSubmit(event)**:
   - This function handles the form submission event for the settings page. It prevents the default form submission behavior, retrieves the selected settings from the form, saves them to local storage, applies the new settings, and displays a success message.

5. **initSettingsPage()**:
   - This function initializes the settings page by loading the current settings and applying them to the UI. It also sets up an event listener for the settings form submission.

6. **DOMContentLoaded Event Listener**:
   - This ensures that the settings page is initialized only after the DOM is fully loaded.

### HTML Form Example

Here is an example of what the settings form in `settings.html` might look like:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Settings</title>
    <link rel="stylesheet" href="styles.css">
    <script src="settings.js" defer></script>
</head>
<body>
    <h1>Settings</h1>
    <form id="settings-form">
        <label for="difficulty">Difficulty:</label>
        <select id="difficulty" name="difficulty">
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
        </select>
        <br>
        <label for="sound">Sound:</label>
        <input type="checkbox" id="sound" name="sound">
        <br>
        <button type="submit">Save Settings</button>
    </form>
    <button onclick="window.location.href='index.html'">Back to Game</button>
</body>
</html>