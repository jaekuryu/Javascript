window.onload = function() {
  let canvas = document.getElementById("canvas");
  let ctx = canvas.getContext("2d");
  let startBtn = document.getElementById("startBtn");
  let stopBtn = document.getElementById("stopBtn");
  let resetBtn = document.getElementById("resetBtn");
  let speedSlider = document.getElementById("speedSlider");
  let animationId;
  let position = 0;
  let velocity = 0;
  let springConstant = 1;
  let damping = 0.01;
  let mass = 1;
  let gravity = 9.8;
  let speed = 1; // animation speed
  let speedscale = 0.05;

  startBtn.addEventListener("click", startSimulation);
  stopBtn.addEventListener("click", stopSimulation);
  resetBtn.addEventListener("click", resetSimulation);
  speedSlider.addEventListener("input", setSpeed);

  function drawInit() {

     // Initial state
     position = canvas.height/2 - 5;
     ctx.beginPath();
     ctx.moveTo(canvas.width/2, canvas.height/2);
     ctx.lineTo(canvas.width/2, canvas.height/2 + position);
     ctx.stroke();
     ctx.fillRect(canvas.width/2-5, canvas.height/2 + position, 10, 10); 
     console.log(position);

  } 

  function startSimulation() {
    animationId = requestAnimationFrame(simulate);
  }

  function stopSimulation() {
    cancelAnimationFrame(animationId);
  }

  function resetSimulation() {
    cancelAnimationFrame(animationId);
    drawInit();
  }


  function setSpeed() {
    speed = speedSlider.value;
  }

  function simulate() {
     let acceleration = ((-springConstant * position - damping * velocity) + (mass * gravity)) / mass;
     velocity += acceleration * speed * speedscale;
     position += velocity * speed * speedscale;
     ctx.clearRect(0, 0, canvas.width, canvas.height);
     ctx.beginPath();
     ctx.moveTo(canvas.width/2, canvas.height/2);
     ctx.lineTo(canvas.width/2, canvas.height/2 + position);
     ctx.stroke();
     ctx.fillRect(canvas.width/2-5, canvas.height/2 + position, 10, 10);
     animationId = requestAnimationFrame(simulate);
  }

  drawInit();

}




