

const plotSignal = () => {
    //console.log('plotSignal');
    // Get the canvas element and context
    const canvas = document.getElementById('constellationCanvas');
    const canvasResult = document.getElementById('constellationCanvasResult');
    const noise = document.getElementById('Noise');
    const Mstring = document.getElementById('Matrix').value;
    const ctx = canvas.getContext('2d');
    const ctxRes = canvasResult.getContext('2d');
    var selectMOD = document.getElementById("selectMod");
    var selectedMod = selectMOD.options[selectMOD.selectedIndex].text;
    var modQ = 0;

    switch (selectedMod) {
        case "QAM":
            modQ = 2;
            break;
        case "16QAM":
            modQ = 4;
            break;
        case "64QAM":
            modQ = 6;
            break;
        case "256QAM":
            modQ = 8;
            break;
    }

    let numbers = math.evaluate(Mstring);
    let c11 = math.complex(numbers._data[0][0].re,numbers._data[0][0].im);
    let c21 = math.complex(numbers._data[1][0].re,numbers._data[1][0].im);
    let c12 = math.complex(numbers._data[0][1].re,numbers._data[0][1].im);
    let c22 = math.complex(numbers._data[1][1].re,numbers._data[1][1].im);
    //console.log(c11);
    //console.log(c21);
    //console.log(c12);
    //console.log(c22);
    
    
    ctx.fillStyle = 'white';
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctxRes.fillStyle = 'red';
    ctxRes.clearRect(0, 0, canvasResult.width, canvasResult.height);
 
    // Get the number of samples from the textbox
    const numSamples = document.getElementById('NoOfSample').value;
    // Generate an array of random complex numbers
    //const signal = math.random([numSamples], -1, 1, true);
 
    let noiseLevel_dB = noise.value;
    let noiseLevel = Math.pow(10, noiseLevel_dB/20);
    let signal1 = [];
    let signal2 = [];
    //console.log(noiseLevel_dB);
   

    for (let i = 0; i < numSamples; i++) {
        let step = 2/(modQ-1);
        let lbound = -1.0;
        let real1 = lbound + step*getRandomInt(0, modQ-1)  + gaussianRandom(0, noiseLevel);
        let imag1 = lbound + step*getRandomInt(0, modQ-1) + gaussianRandom(0, noiseLevel);
        signal1.push(math.complex(real1, imag1));
        let real2 = lbound + step*getRandomInt(0, modQ-1)  + gaussianRandom(0, noiseLevel);
        let imag2 = lbound + step*getRandomInt(0, modQ-1) + gaussianRandom(0, noiseLevel);
        signal2.push(math.complex(real2, imag2));
    }

    let real,imag;
    // Scale the canvas
    ctx.save();
    ctx.lineWidth = 1/(canvas.width/4);
    ctx.scale(canvas.width / 4, -canvas.height / 4);
    ctx.translate(2, -2);

    ctxRes.save();
    ctxRes.lineWidth = 1/(canvasResult.width/4);
    ctxRes.scale(canvasResult.width / 4, -canvasResult.height / 4);
    ctxRes.translate(2, -2);

    // Draw the grid
    ctx.strokeStyle = 'gray';
    ctx.beginPath();
    for (let i = -2.0; i <= 2.0; i += 0.2) {
        ctx.moveTo(i, -1.98);
        ctx.lineTo(i, 1.98);
        ctx.moveTo(-1.98, i);
        ctx.lineTo(1.98, i);
    }
    ctx.stroke();

    ctxRes.strokeStyle = 'gray';
    ctxRes.beginPath();
    for (let i = -2.0; i <= 2.0; i += 0.2) {
        ctxRes.moveTo(i, -1.98);
        ctxRes.lineTo(i, 1.98);
        ctxRes.moveTo(-1.98, i);
        ctxRes.lineTo(1.98, i);
    }
    ctxRes.stroke();

    // Draw the X and Y axis
    ctx.strokeStyle = 'black';
    ctx.beginPath();
    ctx.moveTo(-2, 0);
    ctx.lineTo(2, 0);
    ctx.moveTo(0, -2);
    ctx.lineTo(0, 2);
    ctx.stroke();

    ctxRes.strokeStyle = 'black';
    ctxRes.beginPath();
    ctxRes.moveTo(-2, 0);
    ctxRes.lineTo(2, 0);
    ctxRes.moveTo(0, -2);
    ctxRes.lineTo(0, 2);
    ctxRes.stroke();

    // Plot the signal
    ctx.fillStyle = 'blue';

    for (let i = 0; i < numSamples; i++) {
        let s = signal1[i];
        real = s.re;
        imag = s.im;
        ctx.fillRect(real-0.025,imag-0.025,0.05,0.05);
    }

    ctx.fillStyle = 'red';

    for (let i = 0; i < numSamples; i++) {
        let s = signal2[i];
        real = s.re;
        imag = s.im;
        ctx.fillRect(real-0.025,imag-0.025,0.05,0.05);
    }

    ctx.restore();

    ctxRes.fillStyle = 'yellow';

    for (let i = 0; i < numSamples; i++) {
        let s = math.add(math.multiply(c11,signal1[i]),math.multiply(c12,signal2[i]));
        real = s.re;
        imag = s.im;
        ctxRes.fillRect(real-0.025,imag-0.025,0.05,0.05);
    }

    ctxRes.fillStyle = 'purple';

    for (let i = 0; i < numSamples; i++) {
        let s = math.add(math.multiply(c21,signal1[i]),math.multiply(c22,signal2[i]));
        real = s.re;
        imag = s.im;
        ctxRes.fillRect(real-0.025,imag-0.025,0.05,0.05);
    }

    ctxRes.restore();
}

function gaussianRandom(mean, stddev) {
    var u1 = Math.random();
    var u2 = Math.random();
    var z0 = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
    return z0 * stddev + mean;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
