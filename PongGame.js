var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");

// Game variables
var ballX = canvas.width/2;
var ballY = canvas.height/2;
var ballSpeedX = 1;
var ballSpeedY = 1;

var leftPaddleY = canvas.height/2 - 50;
var rightPaddleY = canvas.height/2 - 50;

var player1Score = 0;
var player2Score = 0;

var paddleSpeed = 10;

// Draw game elements
function draw() {
  //console.log(leftPaddleY);
  //console.log(canvas.width);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "black";
  ctx.fillRect(10, leftPaddleY, 10, 100);
  ctx.fillRect(canvas.width - 20, rightPaddleY, 10, 100);
  ctx.beginPath();
  ctx.arc(ballX, ballY, 10, 0, 2 * Math.PI);
  ctx.fill();
}


// Move the ball on each frame
function updateBall() {
  ballX += ballSpeedX;
  ballY += ballSpeedY;
}

// Move the left paddle based on user input
function moveLeftPaddle(direction) {
  leftPaddleY += direction * paddleSpeed;
  // Check if the paddle is out of bounds
  if (leftPaddleY < 0) {
    leftPaddleY = 0;
  } else if (leftPaddleY + 100 > canvas.height) {
    leftPaddleY = canvas.height - 100;
  }
}

// Move the right paddle based on user input
function moveRightPaddle(direction) {
  rightPaddleY += direction * 10;
  // Check if the paddle is out of bounds
  if (rightPaddleY < 0) {
    rightPaddleY = 0;
  } else if (rightPaddleY + 100 > canvas.height) {
    rightPaddleY = canvas.height - 100;
  }
}

// Check for collisions
function checkCollision() {
  // Check for collisions with left paddle
  if (ballX - 10 <= 20 && ballY >= leftPaddleY && ballY <= leftPaddleY + 100) {
    ballSpeedX = -ballSpeedX;
  }

  // Check for collisions with right paddle
  if (ballX + 10 >= canvas.width - 20 && ballY >= rightPaddleY && ballY <= rightPaddleY + 100) {
    ballSpeedX = -ballSpeedX;
  }

  // Check for collisions with top and bottom edges of game window
  if (ballY - 10 <= 0 || ballY + 10 >= canvas.height) {
    ballSpeedY = -ballSpeedY;
  }
}

// Check for scoring
function checkScore() {
   // Check for ball going out of bounds on left side
   if (ballX - 10 <= 0) {
     player2Score++;
     resetGame();
   }

  // Check for ball going out of bounds on right side
   if (ballX + 10 >= canvas.width) {
     player1Score++;
     resetGame();
   }

   // Check for player 1 winning
   if (player1Score >= 10) {
     alert("Player 1 wins!");
     resetScores();
   }

   // Check for player 2 winning
   if (player2Score >= 10) {
     alert("Player 2 wins!");
     resetScores();
   }

}

// Handle user input
window.addEventListener("keydown", function(event) {
   if (event.code === "KeyQ") {
      moveLeftPaddle(-1);
   }
   else if (event.code === "KeyA") {
      moveLeftPaddle(1);
   }
   else if (event.code === "KeyW") {
      moveRightPaddle(-1);
   }
   else if (event.code === "KeyS") {
      moveRightPaddle(1);
   }
});

// Reset game when ball goes out of bounds
function resetGame() {
   ballX = canvas.width/2;
   ballY = canvas.height/2;
   ballSpeedX = -ballSpeedX;
   ballSpeedY = 5;
}

// Reset scores when a player wins
function resetScores() {
   player1Score = 0;
   player2Score = 0;
}

// Call update functions and render the game
function gameLoop() {
   updateBall();
   checkCollision();
   checkScore();
   draw();
   requestAnimationFrame(gameLoop);
}

gameLoop();






