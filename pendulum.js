const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// Set the length and mass of the pendulum
const L = 100;
const m = 1;

// Set the initial angle and angular velocity of the pendulum
let theta = Math.PI / 4;
let omega = 0;

// Set the gravitational acceleration
const g = 9.81;

// Set the time step
const dt = 0.01;

// Set the rendering rate
const FPS = 60;

// Set the stroke style for the pendulum
ctx.strokeStyle = "black";

// Set the radius of the ball
const r = 10;

// Set the initial position of the ball
let x = canvas.width / 2 + L * Math.sin(theta);
let y = canvas.height / 2 + L * Math.cos(theta);

// Set the initial position of the pivot point
const pivotX = canvas.width / 2;
const pivotY = canvas.height / 2;

// Set up the mouse events
canvas.addEventListener("mousedown", onMouseDown);
canvas.addEventListener("mouseup", onMouseUp);
canvas.addEventListener("mousemove", onMouseMove);

let isDragging = false;

// Function to handle mouse down event
function onMouseDown(event) {
  // Check if the mouse is within the ball
  if (Math.abs(event.clientX - x) < r && Math.abs(event.clientY - y) < r) {
    isDragging = true;
  }
}

// Function to handle mouse up event
function onMouseUp(event) {
  isDragging = false;
}

// Function to handle mouse move event
function onMouseMove(event) {
  if (isDragging) {
    x = event.clientX;
    y = event.clientY;
  }
}

// Function to animate the pendulum
function animate() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Calculate the angular acceleration using the differential equation of motion for a pendulum
  let alpha = -g * Math.sin(theta) / L;

  // Update the angular velocity and angle
  omega += alpha * dt;
  theta += omega * dt;

  // Calculate the position of the ball based on the mouse position or the pendulum equation
  if (isDragging) {
    // Set the position of the ball to the mouse position
    x = event.clientX;
    y = event.clientY;
  } else {
    // Calculate the position of the ball using the pendulum equation
    x = pivotX + L * Math.sin(theta);
    y = pivotY + L * Math.cos(theta);
  }

    // Draw the pendulum
  ctx.beginPath();
  ctx.moveTo(pivotX, pivotY);
  ctx.lineTo(x, y);
  ctx.stroke();

  // Draw the ball at the end of the pendulum
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  ctx.fillStyle = "black";
  ctx.fill();
}

