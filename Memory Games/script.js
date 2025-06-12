const symbols = ['🐶', '🐱', '🐭', '🐹', '🦊', '🐻', '🐼', '🐸'];
let cards = [...symbols, ...symbols];
const board = document.getElementById('game-board');
const movesDisplay = document.getElementById('moves');
const timerDisplay = document.getElementById('timer');
const bestScoresDisplay = document.getElementById('best-scores');
const restartBtn = document.getElementById('restart');
const confettiContainer = document.getElementById('confetti');

let flippedCards = [];
let matchedPairs = 0;
let moves = 0;
let timer;
let seconds = 0;
let gameStarted = false;
let clickable = false;

// Sound effects
const sounds = {
    flip: new Audio('https://actions.google.com/sounds/v1/cartoon/wood_plank_flicks.ogg'),
    match: new Audio('https://actions.google.com/sounds/v1/cartoon/clang_and_wobble.ogg'),
    mismatch: new Audio('https://actions.google.com/sounds/v1/cartoon/slide_whistle_to_drum_hit.ogg'),
};

function shuffle(array) {
    return array.sort(() => 0.5 - Math.random());
}

function createCard(symbol) {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
        <div class="card-inner">
          <div class="card-front">?</div>
          <div class="card-back">${symbol}</div>
        </div>
      `;
    card.addEventListener('click', () => handleCardClick(card, symbol));
    return card;
}

function handleCardClick(card, symbol) {
    if (!clickable) return; // Prevent clicking when disabled
    if (card.classList.contains('flipped') || flippedCards.length === 2) return;

    if (!gameStarted) startTimer();

    card.classList.add('flipped');
    sounds.flip.play();
    flippedCards.push({ card, symbol });

    if (flippedCards.length === 2) {
        clickable = false; // Disable clicking while checking
        moves++;
        movesDisplay.textContent = `Moves: ${moves}`;
        const [first, second] = flippedCards;

        if (first.symbol === second.symbol) {
            matchedPairs++;
            sounds.match.play();
            flippedCards = [];
            clickable = true;
            if (matchedPairs === symbols.length) {
                clearInterval(timer);
                updateBestScores();
                showConfetti();
                setTimeout(() => alert(`🎉 You won in ${moves} moves and ${seconds}s!`), 500);
            }
        } else {
            sounds.mismatch.play();
            setTimeout(() => {
                first.card.classList.remove('flipped');
                second.card.classList.remove('flipped');
                flippedCards = [];
                clickable = true;
            }, 1000);
        }
    }
}

function startTimer() {
    gameStarted = true;
    timer = setInterval(() => {
        seconds++;
        timerDisplay.textContent = `Time: ${seconds}s`;
    }, 1000);
}

function resetGame() {
    clearInterval(timer);
    seconds = 0;
    moves = 0;
    matchedPairs = 0;
    flippedCards = [];
    gameStarted = false;
    movesDisplay.textContent = `Moves: 0`;
    timerDisplay.textContent = `Time: 0s`;
    board.innerHTML = '';
    cards = shuffle([...symbols, ...symbols]);
    cards.forEach(symbol => board.appendChild(createCard(symbol)));
    clickable = false;
    // Memorization phase: flip all cards for 3 seconds
    const allCards = document.querySelectorAll('.card');
    allCards.forEach(card => card.classList.add('flipped'));
    setTimeout(() => {
        allCards.forEach(card => card.classList.remove('flipped'));
        clickable = true;
    }, 3000);
}

function updateBestScores() {
    let bestMoves = localStorage.getItem('bestMoves');
    let bestTime = localStorage.getItem('bestTime');

    if (!bestMoves || moves < bestMoves) {
        localStorage.setItem('bestMoves', moves);
        bestMoves = moves;
    }
    if (!bestTime || seconds < bestTime) {
        localStorage.setItem('bestTime', seconds);
        bestTime = seconds;
    }

    bestScoresDisplay.textContent = `Best Moves: ${bestMoves} | Best Time: ${bestTime}s`;
}

// Confetti effect on win
function showConfetti() {
    const colors = ['#00bcd4', '#ff4081', '#cddc39', '#ffeb3b', '#ff5722'];
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti-piece');
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * window.innerWidth + 'px';
        confetti.style.animationDelay = (Math.random() * 3) + 's';
        confetti.style.opacity = Math.random();
        confettiContainer.appendChild(confetti);

        setTimeout(() => {
            confetti.remove();
        }, 3000);
    }
}

restartBtn.addEventListener('click', resetGame);

// Initialize best scores from localStorage on load
function initBestScores() {
    let bestMoves = localStorage.getItem('bestMoves') || '-';
    let bestTime = localStorage.getItem('bestTime') || '-';
    bestScoresDisplay.textContent = `Best Moves: ${bestMoves} | Best Time: ${bestTime}s`;
}

// Initialize game on page load
window.onload = () => {
    initBestScores();
    resetGame();
};