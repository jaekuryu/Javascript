// step 12
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

function SphericalToCartesian(r, a, e) {
    if (isNaN(r) || isNaN(a) || isNaN(e)) {
        console.error("Input values must be numbers.");
        return [NaN, NaN, NaN];
    }
    var x = r * Math.sin(e) * Math.cos(a);
    var y = r * Math.sin(e) * Math.sin(a);
    var z = r * Math.cos(e);
    //console.log("x=%f,y=%f,z=%f",x,y,z);
    return [x, y, z];
}

function AzimuthCircleGreat(r,a,d,va,ve) {

    points3d = [];
    th_end = 2*Math.PI;
    th_step = th_end / 40;

    for (var th = 0; th <= th_end; th += th_step) {
        points3d.push( SphericalToCartesian(r, a, th) );
        //console.log(SphericalToCartesian(r, a, th));
    };    

    ctx.beginPath(); 
    for (var i = 0; i < points3d.length -1 ; i ++) {
        var p2d1 = p2dtop3d(points3d[i][0], points3d[i][1], points3d[i][2], d, va, ve);
        var p2d2 = p2dtop3d(points3d[i + 1][0], points3d[i + 1][1], points3d[i + 1][2], d, va, ve);
        ctx.moveTo(p2d1.x, p2d1.y);
        ctx.lineTo(p2d2.x, p2d2.y);
        //console.log(p2d1);
    };
    ctx.closePath();
    ctx.stroke();
}


function ElevationCircle(r,a,d,va,ve) {

    points3d = [];
    th_end = 2*Math.PI;
    th_step = th_end / 40;

    for (var th = 0; th <= th_end; th += th_step) {
        points3d.push( SphericalToCartesian(r, th, a) );
        //console.log(SphericalToCartesian(r, th, a));
    };    

    ctx.beginPath(); 
    for (var i = 0; i < points3d.length -1 ; i ++) {
        var p2d1 = p2dtop3d(points3d[i][0], points3d[i][1], points3d[i][2], d, va, ve);
        var p2d2 = p2dtop3d(points3d[i + 1][0], points3d[i + 1][1], points3d[i + 1][2], d, va, ve);
        ctx.moveTo(p2d1.x, p2d1.y);
        ctx.lineTo(p2d2.x, p2d2.y);
        //console.log(p2d1);
    };
    ctx.closePath();
    ctx.stroke();
}

function TriWave(A, f, t) {
    var T = 2 * Math.PI / f;
    var B = 2 * Math.PI / T;
  
    var Amp;
    if (t >= 0 && t <= 0.5 * (Math.PI / f)) {
        Amp = A / (0.5 * (Math.PI / f)) * t;
    } else if (t > 0.5 * (Math.PI / f) && t <= 1.5 * (Math.PI / f)) {
        Amp = -2 * A / (Math.PI / f) * t + 2 * A;
    } else {
        Amp = A / (0.5 * (Math.PI / f)) * t - 4 * A;
    }
  
    return Amp;
}


function rotate3d(x, y, z, Ax, Ay, Az) {
    // Convert the rotation angles to radians
    //Ax = Ax * Math.PI / 180;
    //Ay = Ay * Math.PI / 180;
    //Az = Az * Math.PI / 180;

    // Define the rotation matrices for each axis
    let rotX = [[1, 0, 0], [0, Math.cos(Ax), -Math.sin(Ax)], [0, Math.sin(Ax), Math.cos(Ax)]];
    let rotY = [[Math.cos(Ay), 0, Math.sin(Ay)], [0, 1, 0], [-Math.sin(Ay), 0, Math.cos(Ay)]];
    let rotZ = [[Math.cos(Az), -Math.sin(Az), 0], [Math.sin(Az), Math.cos(Az), 0], [0, 0, 1]];

    // Multiply the rotation matrices to get the combined rotation matrix
    let rotXY = matrixMultiplication(rotX, rotY);
    let rotXYZ = matrixMultiplication(rotXY, rotZ);

    // Multiply the combined rotation matrix with the point
    let result = matrixVectorMultiplication(rotXYZ, [x, y, z]);

    return result;
}

function matrixMultiplication(A, B) {
    let result = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            for (let k = 0; k < 3; k++) {
                result[i][j] += A[i][k] * B[k][j];
            }
        }
    }
    return result;
}

function matrixVectorMultiplication(A, B) {
    let result = [0, 0, 0];
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            result[i] += A[i][j] * B[j];
        }
    }
    return result;
}

  

function InclinedCircle(r,ia,d,va,ve) {

    points3d = [];
    pi = Math.PI;
    th_end = 2*pi;
    th_step = th_end / 40;

    for (var th = 0; th <= th_end; th += th_step) {
        pt3d = SphericalToCartesian(r, th, 0.5*Math.PI);
        x = pt3d[0];
        y = pt3d[1];
        z = pt3d[2];
        rp3d = rotate3d(x, y, z, 0, -(pi/2-ia), 0);
        points3d.push( rp3d );
        //console.log(rp3d);
    };    

    ctx.beginPath(); 
    for (var i = 0; i < points3d.length -1 ; i ++) {
        var p2d1 = p2dtop3d(points3d[i][0], points3d[i][1], points3d[i][2], d, va, ve);
        var p2d2 = p2dtop3d(points3d[i + 1][0], points3d[i + 1][1], points3d[i + 1][2], d, va, ve);
        ctx.moveTo(p2d1.x, p2d1.y);
        ctx.lineTo(p2d2.x, p2d2.y);
        //console.log(p2d1);
    };
    ctx.closePath();
    ctx.stroke();
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
    var ia = document.getElementById("Inclination").value;

    var s = 1; 
    var dim = 2;
    var coord_r = 1.5;
    var pi = Math.PI;
    var d2r = pi/180;
    var hr = pi/2;
    var cx = 0, cy = 0, cz = 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.lineWidth = 1/(canvas.width/4);
    ctx.scale(s*canvas.width / 4, -s*canvas.height / 4);
    ctx.translate(s*2, -s*2);
    
    DrawAxis(2, r, va, ve);
    ctx.strokeStyle = "black";
    for(t = 0; t < Math.PI; t += pi/9)
        AzimuthCircleGreat(coord_r,t,r,va,ve);
    for(t = 0; t < Math.PI; t += pi/8)  
        ElevationCircle(coord_r,t,r,va,ve);
    ctx.lineWidth = 4 * 1/(canvas.width/4);    
    ctx.strokeStyle = "violet";
    ElevationCircle(coord_r,hr - ia*d2r,r,va,ve);
    ElevationCircle(coord_r,(2*hr - (hr-ia*d2r)),r,va,ve);
    ctx.strokeStyle = "green";
    InclinedCircle(coord_r,hr-ia*d2r,r,va,ve)
    ctx.lineWidth = 1 * 1/(canvas.width/4); 
    ctx.restore();
};


