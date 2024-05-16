// games.js


const games = [
    {
        title: "Math Practice 1",
        url: "math_practice_1/index.html"
    }
];

document.addEventListener('DOMContentLoaded', () => {
    const gameGrid = document.getElementById('gameGrid');

    games.forEach(game => {
        const gameCard = document.createElement('div');
        gameCard.classList.add('game-card');

        const title = document.createElement('h3');
        title.textContent = game.title;
        gameCard.appendChild(title);

        const thumbnail = document.createElement('img');
        thumbnail.src = `${game.url.replace('index.html', '')}thumbnail.png`;
        thumbnail.alt = `${game.title} Thumbnail`;
        gameCard.appendChild(thumbnail);

        const playButton = document.createElement('a');
        playButton.href = game.url;
        playButton.classList.add('play-button');
        playButton.textContent = 'Play Now';
        gameCard.appendChild(playButton);

        gameGrid.appendChild(gameCard);
    });
});