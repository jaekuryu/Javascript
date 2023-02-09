const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

let isDragging = false;
let currentX = canvas.width/2;
let currentY = canvas.height/2;
let initialX = currentX;
let initialY = currentY;
let xOffset = currentX;
let yOffset = currentY;

canvas.addEventListener("mousedown", dragStart);
canvas.addEventListener("mouseup", dragEnd);
canvas.addEventListener("mousemove", drag);

function dragStart(e) {
  initialX = e.clientX - xOffset;
  initialY = e.clientY - yOffset;
  
  if (e.target === canvas) {
    isDragging = true;
  }

}

function dragEnd(e) {
  initialX = currentX;
  initialY = currentY;
  
  isDragging = false;
}

function drag(e) {
  if (isDragging) {
    e.preventDefault();
    currentX = e.clientX - initialX;
    currentY = e.clientY - initialY;
  
    xOffset = currentX;
    yOffset = currentY;
  
    draw();
  
    // Print the distance value at the top left corner of the canvas
    ctx.font = "16px Arial";
    ctx.fillStyle = "black";
    ctx.textAlign = "left";
    ctx.fillText(`Current position: (${currentX}, ${currentY})`, 10, 20);

  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.arc(currentX, currentY, 50, 0, Math.PI * 2, false);
  ctx.fillStyle = "red";
  ctx.fill();
  ctx.strokeStyle = "black";
  ctx.strokeRect(0, 0, canvas.width, canvas.height);
}

draw();
