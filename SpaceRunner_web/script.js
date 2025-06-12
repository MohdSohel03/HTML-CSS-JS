const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const menuScreen = document.querySelector(".Menu")

// Image elements
const playerImg = new Image();
const asteroidImg = new Image();
const bgImg = new Image();
const starImg = new Image();

// Sounds
const jumpSound = new Audio("assets/collect.wav");
const hitSound = new Audio("assets/hit.wav");

// Game variables
let player = { x: 50, y: 300, width: 50, height: 60, dy: 0, gravity: 0.5, jumpStrength: -10 };
let asteroids = [];
let collectibles = [];
let score = 0;
let health = 3;
let bgX = 0;
let gameOver = false;

// Function to spawn asteroids
function spawnAsteroid() {
  const asteroidY = 350 // Constant Y position for asteroids
  asteroids.push({ x: canvas.width, y: asteroidY, width: 50, height: 50, speed: 5 });
}

// Function to spawn collectibles (stars)
function spawnCollectible() {
  const collectibleY = 350 // Constant Y position for stars
  collectibles.push({ x: canvas.width, y: collectibleY, width: 30, height: 30, speed: 4 });
}

// Collision detection between rectangles
function rectsCollide(r1, r2) {
  return (
    r1.x < r2.x + r2.width &&
    r1.x + r1.width > r2.x &&
    r1.y < r2.y + r2.height &&
    r1.y + r1.height > r2.y
  );
}

// Update game state
function update() {
  if (gameOver) return;

  player.dy += player.gravity;
  player.y += player.dy;

  // Prevent player from falling below the canvas
  if (player.y > canvas.height - player.height) {
    player.y = canvas.height - player.height;
    player.dy = 0;
  }

  // Update asteroid and collectible positions
  asteroids.forEach(a => a.x -= a.speed);
  asteroids = asteroids.filter(a => a.x + a.width > 0);  // Remove off-screen asteroids

  collectibles.forEach(c => c.x -= c.speed);
  collectibles = collectibles.filter(c => c.x + c.width > 0);  // Remove off-screen collectibles

  // Collision check for asteroids
  asteroids.forEach(a => {
    if (rectsCollide(player, a)) {
      hitSound.play();
      health--;
      a.x = -100;  // Move asteroid off-screen once it hits player
      if (health <= 0) {
        triggerGameOver();
      }
    }
  });

  // Collecting stars
  collectibles = collectibles.filter(c => {
    if (rectsCollide(player, c)) {
      score += 10;
      jumpSound.play();
      return false;  // Remove the star from the game once collected
    }
    return true;
  });

  // Parallax effect for background
  bgX -= 1;
  if (bgX <= -canvas.width) bgX = 0;
}

// Draw game elements
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw background with parallax effect
  ctx.drawImage(bgImg, bgX, 0, canvas.width, canvas.height);
  ctx.drawImage(bgImg, bgX + canvas.width, 0, canvas.width, canvas.height);

  // Draw player
  ctx.shadowColor = '#0ff';
  ctx.shadowBlur = 10;
  ctx.drawImage(playerImg, player.x, player.y, player.width, player.height);

  // Draw asteroids
  ctx.shadowColor = '#f00';
  asteroids.forEach(a => ctx.drawImage(asteroidImg, a.x, a.y, a.width, a.height));

  // Draw collectibles (stars)
  ctx.shadowColor = '#ff0';
  collectibles.forEach(c => ctx.drawImage(starImg, c.x, c.y, c.width, c.height));

  // Reset shadow
  ctx.shadowColor = 'transparent';

  // Draw score and health
  ctx.fillStyle = "white";
  ctx.font = "20px Orbitron, sans-serif";
  ctx.fillText("Score: " + score, 10, 30);
  ctx.fillText("Lives: " + health, 700, 30);
}

function startGame() {
  // Initialize game state
  canvas.style.visibility = "visible";
  menuScreen.style.visibility = "hidden"
  gameLoop()
}

// Game loop function
function gameLoop() {
  console.log("start");

  update();
  draw();
  if (!gameOver) requestAnimationFrame(gameLoop);
}

// Trigger game over
function triggerGameOver() {
  gameOver = true;
  document.getElementById("finalScore").textContent = "Final Score: " + score;
  document.getElementById("gameOverScreen").style.display = "block";
}

// Restart game
function restartGame() {
  score = 0;
  health = 3;
  asteroids = [];
  collectibles = [];
  player.y = 300;
  player.dy = 0;
  gameOver = false;
  document.getElementById("gameOverScreen").style.display = "none";
  gameLoop();
}

// Handle player jump on spacebar press
document.addEventListener("keydown", (e) => {
  if (e.code === "Space" && player.y >= canvas.height - player.height) {
    player.dy = player.jumpStrength;
    jumpSound.play();
  }
});

// Ensure all images are loaded before starting the game
let imagesToLoad = 4;
function imageLoaded() {
  imagesToLoad--;
  if (canvas.style.visibility === "visible") {
    // Spawn collectibles every 3 seconds
    gameLoop();
  }
}

// Image sources
playerImg.onload = imageLoaded;
asteroidImg.onload = imageLoaded;
bgImg.onload = imageLoaded;
starImg.onload = imageLoaded;

// Set image sources
playerImg.src = "assets/player.png";
asteroidImg.src = "assets/asteroid.png";
bgImg.src = "assets/parallax_bg.png";
starImg.src = "assets/star.png";

setInterval(spawnAsteroid, 1500);  // Spawn asteroids every 1.5 seconds
setInterval(spawnCollectible, 3000);