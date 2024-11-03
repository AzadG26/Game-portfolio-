const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 800;

let score = 0;
let level = 1;
let objects = [];
let isGameActive = true;

// Update score and level
const scoreDisplay = document.getElementById("score");
const levelDisplay = document.getElementById("level");

function createObject() {
  const radius = Math.random() * 20 + 20; // Vary size for levels
  const color = `hsl(${Math.random() * 360}, 70%, 50%)`;
  objects.push({
    x: Math.random() * (canvas.width - radius * 2) + radius,
    y: canvas.height,
    radius,
    color,
    speed: 2 + level * 0.5, // Increase speed with each level
  });
}

function drawObject(obj) {
  ctx.beginPath();
  ctx.arc(obj.x, obj.y, obj.radius, 0, Math.PI * 2);
  ctx.fillStyle = obj.color;
  ctx.fill();
  ctx.closePath();
}

function updateObjects() {
  objects.forEach(obj => {
    obj.y -= obj.speed; // Move object upwards
  });
  objects = objects.filter(obj => obj.y + obj.radius > 0); // Remove objects off-screen
}

canvas.addEventListener("click", (e) => {
  const rect = canvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;

  // Check if clicked object is hit
  objects.forEach((obj, index) => {
    const distance = Math.sqrt((mouseX - obj.x) ** 2 + (mouseY - obj.y) ** 2);
    if (distance < obj.radius) {
      score += 10; // Increment score on hit
      scoreDisplay.textContent = score;
      objects.splice(index, 1); // Remove sliced object
      checkLevelUp();
    }
  });
});

function checkLevelUp() {
  if (score >= level * 50) { // Increase level every 50 points
    level++;
    levelDisplay.textContent = level;
    score = 0; // Reset score for next level
    objects = []; // Clear objects for new level

    // Store the new level in localStorage
    localStorage.setItem("playerLevel", level);
    
    // Redirect to portfolio page on level 5
    if (level > 5) {
      window.location.href = "portfolio.html";
    }
  }
}

function gameLoop() {
  if (!isGameActive) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (Math.random() < 0.03) {
    createObject(); // Add new objects at a controlled rate
  }
  
  updateObjects();
  objects.forEach(drawObject);

  requestAnimationFrame(gameLoop);
}

gameLoop();
