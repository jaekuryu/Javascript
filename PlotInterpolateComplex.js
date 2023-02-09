function plotInterpolation() {
    // get input values
    var numPoints = document.getElementById("NoOfSample").value;
    var A1 = document.getElementById("A1").value;
    var t1 = document.getElementById("t1").value;
    var A2 = document.getElementById("A2").value;
    var t2 = document.getElementById("t2").value;
  
    // convert t1 and t2 from degrees to radians
    t1 = (t1 * Math.PI) / 180;
    t2 = (t2 * Math.PI) / 180;
  
    // create c1 and c2 using input values
    var c1 = { r: A1, phi: t1 };
    var c2 = { r: A2, phi: t2 };
  
    // interpolate between c1 and c2
    var interpolatedPoints = interpolate(c1, c2, numPoints);
  
    // get canvas and context
    var canvas = document.getElementById("plotCanvas");
    var ctx = canvas.getContext("2d");
  
    // clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    // set transform for scaling and translation
    //ctx.setTransform(1, 0, 0, -1, canvas.width/2, canvas.height/2);
  
    // set range for x and y axis
    ctx.save();
    ctx.lineWidth = 1/(canvas.width/4);
    ctx.scale(canvas.width / 4, -canvas.height / 4);
    ctx.translate(2, -2);
  
    // draw axis lines
    ctx.beginPath();
    ctx.moveTo(-2, 0);
    ctx.lineTo(2, 0);
    ctx.moveTo(0, -2);
    ctx.lineTo(0, 2);
    ctx.strokeStyle = "black";
    ctx.stroke();
  
    // plot interpolated points
    for (var i = 0; i < interpolatedPoints.length; i++) {
        var point = interpolatedPoints[i];
        var x = point.r * Math.cos(point.phi);
        var y = point.r * Math.sin(point.phi);
        if (i==0) {
            ctx.fillStyle = "red";
        } else if (i==interpolatedPoints.length-1) {
            ctx.fillStyle = "blue";
        } else {
            ctx.fillStyle = "black";
        }
        
        ctx.beginPath();
        ctx.arc(x, y, 0.04, 0, 2 * Math.PI);
        ctx.fill();
        //console.log(x);
    }

    ctx.restore();
  }
  
  function interpolate(c1, c2, numPoints) {
    var points = [];
    var step = 1 / (numPoints - 1);
    for (var i = 0; i < numPoints; i++) {
        var t = i * step;
        var r = parseFloat(c1.r) + (parseFloat(c2.r) - parseFloat(c1.r)) * t;
        var phi = c1.phi + (c2.phi - c1.phi) * t;
        points.push({ r: r, phi: phi });
    }
    return points;
}

  