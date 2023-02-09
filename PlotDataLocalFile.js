function plotData() {
  // Get the canvas and its context
  var canvas = document.getElementById("plot");
  var context = canvas.getContext("2d");

  // Clear the canvas
  context.clearRect(0, 0, canvas.width, canvas.height);

  // Move the origin to the center of the canvas
  context.translate(canvas.width / 2, canvas.height / 2);
  context.scale(1, -1);

  // Set the stroke style for the axis and grid lines
  context.strokeStyle = "black";

  // Plot the x and y axis lines
  context.beginPath();
  context.moveTo(0, canvas.height / 2);
  context.lineTo(canvas.width, canvas.height / 2);
  context.moveTo(canvas.width / 2, 0);
  context.lineTo(canvas.width / 2, canvas.height);
  context.stroke();

  // Set the scale of the axis
  var scale = 40;
  var xstep = 0.1;

  // Set the stroke style for the grid lines
  context.strokeStyle = "gray";

  // Draw the grid lines
  context.beginPath();
  for (var x = 0; x > -canvas.height / 2; x -= scale) {
    context.moveTo(x, -canvas.height / 2);
    context.lineTo(x, canvas.height / 2);
  }
  for (var x = 0; x < canvas.width / 2; x += scale) {
    context.moveTo(x, -canvas.height / 2);
    context.lineTo(x, canvas.height / 2);
  }

  for (var y = 0 ; y < canvas.height / 2; y += scale) {
    context.moveTo(-canvas.width / 2, y);
    context.lineTo(canvas.width / 2, y);
  }
  for (var y = 0; y > -canvas.height / 2; y -= scale) {
    context.moveTo(-canvas.width / 2, y);
    context.lineTo(canvas.width / 2, y);
  }
  context.stroke();

  // Set the color of the x and y axis to black
  context.strokeStyle = "black";

  // Draw the x and y axis
  context.beginPath();
  context.moveTo(-canvas.width / 2, 0);
  context.lineTo(canvas.width / 2, 0);
  context.moveTo(0, -canvas.height / 2);
  context.lineTo(0, canvas.height / 2);
  context.stroke();

  // Read the data file
  var filename = document.getElementById("filename").value;
  var protocol = filename.split(":")[0];
  //window.alert(location.protocol);
  if (location.protocol == "file:") {
    // Read the local file using the File API
    var input = document.createElement("input");
    input.type = "file";
    input.accept = ".dat";
    input.addEventListener("change", function() {
      var file = input.files[0];
      var reader = new FileReader();
      reader.onload = function() {
        // Parse the CSV data
        var data = reader.result.split("\n").map(function(line) {
          return line.split(",").map(parseFloat);
        });

        // Plot the data
        plot(context,data);
      };
      reader.readAsText(file);
    });
    input.click();
  } else {
    // Read the remote file using XMLHttpRequest
    var xhr = new XMLHttpRequest();
    xhr.open("GET", filename, true);
    xhr.onload = function() {
      if (xhr.status == 200) {
        // Parse the CSV data
        var data = xhr.responseText.split("\n").map(function(line) {
          return line.split(",").map(parseFloat);
        });

        // Plot the data
        plot(context,data);
      }
    };
    xhr.send();
  }
}  

function plot(context,data)
{
      // Set the stroke style for the data points
      context.strokeStyle = "red";
 
      // Plot the data points
      context.beginPath();
      context.lineWidth = 2;
      data.forEach(function(point, index) {
        var x = point[0];
        var y = point[1];
        //var y = canvas.height - point[1]; // Invert the y-coordinate
        if (index == 0) {
          context.moveTo(x, y);
        } else {
          context.lineTo(x, y);
        }
      });
      context.stroke();		
}

