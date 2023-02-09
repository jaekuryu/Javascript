function sin(x) { return Math.sin(x); }
function cos(x) { return Math.cos(x); }
function tan(x) { return Math.tan(x); }
function abs(x) { return Math.abs(x); }

function plot() {
  var expression = document.getElementById('expression').value;
  var canvas = document.getElementById('plot');
  var ctx = canvas.getContext('2d');

  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Plot the axis lines
  ctx.beginPath();
  ctx.moveTo(canvas.width / 2, 0);
  ctx.lineTo(canvas.width / 2, canvas.height);
  ctx.moveTo(0, canvas.height / 2);
  ctx.lineTo(canvas.width, canvas.height / 2);
  ctx.strokeStyle = 'black';
  ctx.stroke();

  // Plot the grid lines
  ctx.beginPath();
  for (var t = 0; t < 2 * Math.PI; t += Math.PI / 6) {
    ctx.moveTo(canvas.width / 2, canvas.height / 2);
    ctx.lineTo(canvas.width / 2 + canvas.width / 2 * Math.cos(t), canvas.height / 2 - canvas.height / 2 * Math.sin(t));
  }
  for (var r = 10; r < canvas.width / 2; r += 10) {
    ctx.moveTo(canvas.width / 2, canvas.height / 2);
    ctx.arc(canvas.width / 2, canvas.height / 2, r, 0, 2 * Math.PI);
  }
  ctx.strokeStyle = 'gray';
  ctx.stroke();

  // Plot the function
  ctx.beginPath();
  for (var t = 0; t < 2 * Math.PI; t += 0.01) {
    // Evaluate the expression 
    var r = eval(expression);
    var x = r * Math.cos(t);
    var y = r * Math.sin(t);
    if (t == 0) {
      ctx.moveTo(x + canvas.width / 2, canvas.height / 2 - y);
    } else {
      ctx.lineTo(x + canvas.width / 2, canvas.height / 2 - y);
    }
  }
  ctx.lineWidth = 2;
  ctx.strokeStyle = 'red';
  ctx.stroke();
}

