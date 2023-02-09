

const plotSignal = () => {
    //console.log('plotSignal');
    // Get the canvas element and context
    const canvas = document.getElementById('constellationCanvas');
    const noise = document.getElementById('Noise');
    const th = document.getElementById('theta').value * Math.PI/180.0;
    const ctx = canvas.getContext('2d');
    
    ctx.strokeStyle = 'white';
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Get the number of samples from the textbox
    const numSamples = document.getElementById('NoOfSample').value;
    // Generate an array of random complex numbers
    //const signal = math.random([numSamples], -1, 1, true);
 
    let noiseLevel_dB = noise.value;
    let noiseLevel = Math.pow(10, noiseLevel_dB/20);
    let signal = [];
    //console.log(noiseLevel_dB);
   
    for (let i = 0; i < numSamples; i++) {
        let real = Math.round(Math.random())*2-1 + gaussianRandom(0, noiseLevel);
        let imag = Math.round(Math.random())*2-1 + gaussianRandom(0, noiseLevel);
        signal.push(math.complex(real, imag));
        //console.log(real);
    }

    let real,imag;
    // Scale the canvas
    ctx.save();
    ctx.lineWidth = 1/(canvas.width/4);
    ctx.scale(canvas.width / 4, -canvas.height / 4);
    ctx.translate(2, -2);

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
    // Draw the X and Y axis
    ctx.strokeStyle = 'black';
    ctx.beginPath();
    ctx.moveTo(-2, 0);
    ctx.lineTo(2, 0);
    ctx.moveTo(0, -2);
    ctx.lineTo(0, 2);
    ctx.stroke();
    // Plot the signal
    ctx.fillStyle = 'red';
    //let th = Math.PI/6;
    for (let i = 0; i < numSamples; i++) {
        let s = math.multiply( math.pow(Math.E, math.complex(0, th)), signal[i] );
        //console.log(s);
        real = s.re;
        imag = s.im;
        ctx.fillRect(real-0.025,imag-0.025,0.05,0.05);
    }

    ctx.restore();
}

function gaussianRandom(mean, stddev) {
    var u1 = Math.random();
    var u2 = Math.random();
    var z0 = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
    return z0 * stddev + mean;
}
