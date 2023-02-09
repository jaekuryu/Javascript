function plotExpression() {
  // Get the expression from the textbox
  var expression = document.getElementById("expression").value;

  // Get the canvas and context
  var canvas = document.getElementById("plot");
  var ctx = canvas.getContext("2d");

  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Move the origin to the center of the canvas
  ctx.translate(canvas.width / 2, canvas.height / 2);

  // Set the scale of the axis
  var scale = 40;
  var xstep = 0.1;

  ctx.strokeStyle = "gray";

  // Draw the grid lines
  ctx.beginPath();
  for (var x = 0; x > -canvas.height / 2; x -= scale) {
    ctx.moveTo(x, -canvas.height / 2);
    ctx.lineTo(x, canvas.height / 2);
  }
  for (var x = 0; x < canvas.width / 2; x += scale) {
    ctx.moveTo(x, -canvas.height / 2);
    ctx.lineTo(x, canvas.height / 2);
  }

  for (var y = 0 ; y < canvas.height / 2; y += scale) {
    ctx.moveTo(-canvas.width / 2, y);
    ctx.lineTo(canvas.width / 2, y);
  }
  for (var y = 0; y > -canvas.height / 2; y -= scale) {
    ctx.moveTo(-canvas.width / 2, y);
    ctx.lineTo(canvas.width / 2, y);
  }
  ctx.stroke();

  // Set the color of the x and y axis to black
  ctx.strokeStyle = "black";

  // Draw the x and y axis
  ctx.beginPath();
  ctx.moveTo(-canvas.width / 2, 0);
  ctx.lineTo(canvas.width / 2, 0);
  ctx.moveTo(0, -canvas.height / 2);
  ctx.lineTo(0, canvas.height / 2);
  ctx.stroke();

  // Plot the function
  ctx.strokeStyle = "red";
  ctx.lineWidth = 2; 
  ctx.beginPath();
  for (var x = -canvas.width / 2 / scale; x < canvas.width / 2 / scale; x += xstep) {
    var y = eval(expression);
    ctx.lineTo(x * scale, -y * scale);
  }
  ctx.stroke();
}

