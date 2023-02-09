
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var r = document.getElementById("ViewDistance").value;
var va = document.getElementById("Azimuth").value;
var ve = document.getElementById("Elevation").value;


function p2dtop3d(p3x, p3y, p3z, r, va, ve) {
    // convert angle to radian
    //console.log('va=%f ve=%f',va,ve);
    va = va * Math.PI / 180;
    ve = ve * Math.PI / 180;

    var tmp = p3y;
    p3y = p3z;
    p3z = tmp;
  
    // apply rotation on x axis
    var y1 = p3y * Math.cos(ve) + p3z * Math.sin(ve);
    var z1 = -p3y * Math.sin(ve) + p3z * Math.cos(ve);

    // apply rotation on y axis
    var x2 = p3x * Math.cos(va) + z1 * Math.sin(va);
    var z2 = -p3x * Math.sin(va) + z1 * Math.cos(va);


    // scale the point
    //px = x2 * r / (r + z2);
    //py = y1 * r / (r + z2);
    // Calculate the value of px
    const px = math.evaluate('x2 * r / (r + z2)', { x2, r, z2 });

    // Calculate the value of py
    const py = math.evaluate('y1 * r / (r + z2)', { y1, r, z2 });
  
    return {
      x: px,
      y: py
    };
}



function DrawCube(dim, cx, cy, cz, r, va, ve) {
    var points = [];
    points.push([cx - dim / 2, cy - dim / 2, cz - dim / 2]);
    points.push([cx - dim / 2, cy - dim / 2, cz + dim / 2]);
    points.push([cx - dim / 2, cy + dim / 2, cz - dim / 2]);
    points.push([cx - dim / 2, cy + dim / 2, cz + dim / 2]);
    points.push([cx + dim / 2, cy - dim / 2, cz - dim / 2]);
    points.push([cx + dim / 2, cy - dim / 2, cz + dim / 2]);
    points.push([cx + dim / 2, cy + dim / 2, cz - dim / 2]);
    points.push([cx + dim / 2, cy + dim / 2, cz + dim / 2]);

    
    ctx.strokeStyle = "black";
    ctx.beginPath();
    for (var i = 0; i < 4; i++) {
        var p2d1 = p2dtop3d(points[i][0], points[i][1], points[i][2], r, va, ve);
        var p2d2 = p2dtop3d(points[i + 4][0], points[i + 4][1], points[i + 4][2], r, va, ve);
        ctx.moveTo(p2d1.x, p2d1.y);
        ctx.lineTo(p2d2.x, p2d2.y);
        //console.log("(p2d1[0]=%f,p2d1[1]=%f)-->(p2d2[0]=%f,p2d2[1]=%f)",p2d1.x, p2d1.y,p2d2.x, p2d2.y)
    }
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath();
    for (var i = 0; i < 8; i+=2) {
        var p2d1 = p2dtop3d(points[i][0], points[i][1], points[i][2], r, va, ve);
        var p2d2 = p2dtop3d(points[i + 1][0], points[i + 1][1], points[i + 1][2], r, va, ve);
        ctx.moveTo(p2d1.x, p2d1.y);
        ctx.lineTo(p2d2.x, p2d2.y);
        //console.log("(p2d1[0]=%f,p2d1[1]=%f)-->(p2d2[0]=%f,p2d2[1]=%f)",p2d1.x, p2d1.y,p2d2.x, p2d2.y)
    }
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath();
    for (var i = 0; i < 2; i+=1) {
        var p2d1 = p2dtop3d(points[i][0], points[i][1], points[i][2], r, va, ve);
        var p2d2 = p2dtop3d(points[i + 2][0], points[i + 2][1], points[i + 2][2], r, va, ve);
        ctx.moveTo(p2d1.x, p2d1.y);
        ctx.lineTo(p2d2.x, p2d2.y);
        //console.log("(p2d1[0]=%f,p2d1[1]=%f)-->(p2d2[0]=%f,p2d2[1]=%f)",p2d1.x, p2d1.y,p2d2.x, p2d2.y)
    }
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath();
    for (var i = 4; i < 6; i+=1) {
        var p2d1 = p2dtop3d(points[i][0], points[i][1], points[i][2], r, va, ve);
        var p2d2 = p2dtop3d(points[i + 2][0], points[i + 2][1], points[i + 2][2], r, va, ve);
        ctx.moveTo(p2d1.x, p2d1.y);
        ctx.lineTo(p2d2.x, p2d2.y);
        //console.log("(p2d1[0]=%f,p2d1[1]=%f)-->(p2d2[0]=%f,p2d2[1]=%f)",p2d1.x, p2d1.y,p2d2.x, p2d2.y)
    }
    ctx.closePath();
    ctx.stroke();

}


function DrawAxis(dim, r, va, ve) {
    
    // draw x-axis
    
    ctx.strokeStyle = "red";
    ctx.beginPath();
    var px = p2dtop3d(-dim, 0, 0, r, va, ve).x;
    var py = p2dtop3d(-dim, 0, 0, r, va, ve).y;
    ctx.moveTo(px, py);

    var px = p2dtop3d(dim, 0, 0, r, va, ve).x
    var py = p2dtop3d(dim, 0, 0, r, va, ve).y
    ctx.lineTo(px, py);
    ctx.stroke();
    
    // draw y-axis
    ctx.strokeStyle = "green";
    ctx.beginPath();
    var px = p2dtop3d(0, -dim, 0, r, va, ve).x
    var py = p2dtop3d(0, -dim, 0, r, va, ve).y
    ctx.moveTo(px, py);

    var px = p2dtop3d(0, dim, 0, r, va, ve).x
    var py = p2dtop3d(0, dim, 0, r, va, ve).y
    ctx.lineTo(px, py);
    ctx.stroke();
    
    // draw z-axis
    ctx.strokeStyle = "blue";
    ctx.beginPath();
    var px = p2dtop3d(0, 0, -dim, r, va, ve).x
    var py = p2dtop3d(0, 0, -dim, r, va, ve).y
    ctx.moveTo(px, py);

    var px = p2dtop3d(0, 0, dim, r, va, ve).x
    var py = p2dtop3d(0, 0, dim, r, va, ve).y
    ctx.lineTo(px, py);
    ctx.stroke();
}
  

function draw() {
    //console.log('draw')
    var r = document.getElementById("ViewDistance").value;
    var va = document.getElementById("Azimuth").value;
    var ve = document.getElementById("Elevation").value;

    var s = 1; 
    var dim = 2;
    var cx = 0, cy = 0, cz = 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.lineWidth = 1/(canvas.width/4);
    ctx.scale(s*canvas.width / 4, -s*canvas.height / 4);
    ctx.translate(s*2, -s*2);
    ctx.strokeStyle = "black";
    DrawAxis(2, r, va, ve);
    DrawCube(dim, cx, cy, cz, r, va, ve);
    ctx.restore();
};


