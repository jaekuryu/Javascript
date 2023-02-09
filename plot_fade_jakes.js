// Implement the fading algorithm using Jakes model
function fadingAlgorithm(data, delayTabs) {
  // Total number of paths in Jakes model
  let numPaths = 2 * delayTabs + 1;
  let jakesData = new Array(numPaths);
  // Creating array of the random number generators 
  for (let i = 0; i < numPaths; i++) {
      jakesData[i] = new Array(2);
      jakesData[i][0] = 1/(i+2) + 0.1*Math.random();
      jakesData[i][1] = 1/(i+2) + 0.1*Math.random();
  }
  let pathGains = new Array(numPaths);
  for (let i = 0; i < numPaths; i++) {
      pathGains[i] = Math.sqrt(-2 * Math.log(jakesData[i][0]) ) * Math.cos(2 * Math.PI * jakesData[i][1]);
  }

  // Applying the Jakes Model fading 
  let fadedData = [...data];
  for (let i = 0; i < data.length; i++) {
    let sum = 0;
    for (let j = 0; j < numPaths; j++) {
      sum += pathGains[j] * Math.cos(2 * Math.PI * j * i / data.length);
    }
    fadedData[i] *= sum;
  }
  
  return fadedData;
}

function plotData() {
  // Get the value from the textbox
  let delayTabs = document.getElementById("textbox").value;

  // Create a sample array of 200 numbers
  let data = [];
  for (let i = 0; i < 200; i++) {
    data.push(Math.random());
  }

  // Apply the fading algorithm to the data
  let fadedData = fadingAlgorithm(data, delayTabs); 
  let maxValue = Math.max.apply(Math, fadedData);
  let minValue = Math.min.apply(Math, fadedData); 
  maxValue = Math.max(Math.abs(maxValue), Math.abs(minValue));
  fadedData = fadedData.map(num => Math.abs(num/maxValue) ); 

  // Get the canvas element
  let canvas = document.getElementById("plot-canvas");
  let ctx = canvas.getContext("2d");
  maxValue = Math.max.apply(Math, fadedData);
  minValue = Math.min.apply(Math, fadedData); 

  ctx.clearRect(0,0,canvas.width,canvas.height);

  ctx.save();
  ctx.strokeStyle = "black";
  ctx.strokeRect(0, 0, canvas.width, canvas.height);
  
  // Scale the canvas so that the Yscale of the canvas is adjusted for the better view of the plot
  let Yscale = 500;
  let Yshift = 100;
  ctx.scale(1, Yscale*1/canvas.height);
  ctx.translate(0, Yshift);

  // Plot the data on the canvas before fading
  ctx.beginPath();
  ctx.strokeStyle = "blue";
  for (let i = 0; i < data.length; i++) {
    let x = i / data.length * canvas.width;
	let y = - 20*Math.log10(data[i]) ;
    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }
  ctx.stroke();

  // Plot the data on the canvas after fading
  ctx.beginPath();
  ctx.strokeStyle = "red";
  for (let i = 0; i < fadedData.length; i++) {
    let x = i / fadedData.length * canvas.width;
	let y = - 20*Math.log10(fadedData[i]);
    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }
  ctx.stroke();

  ctx.restore();
}

