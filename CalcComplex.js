function CalcExpr() {
  // Get the Complex1, Complex2, and Operator values
  const complex1 = document.getElementById("Complex1").value;
  const complex2 = document.getElementById("Complex2").value;
  const operator = document.getElementById("Operator").value;

  // Perform the calculation and set the result in the Result textbox
  const resultTextbox = document.getElementById("Result");
  resultTextbox.value = calculate(complex1, complex2, operator);
}

function calculate(complex1, complex2, operator) {
  // Parse the complex numbers into real and imaginary components
  const complex1Regex = /^([+-]?\d+)\s*([+-])\s*(\d+)j$/;
  const complex1Match = complex1.match(complex1Regex);
  const complex1Real = parseInt(complex1Match[1], 10);
  const complex1Imag = parseInt(complex1Match[3], 10);
  const complex1Sign = complex1Match[2];
  if (complex1Sign === "-") {
    complex1Imag *= -1;
  }

  const complex2Regex = /^([+-]?\d+)\s*([+-])\s*(\d+)j$/;
  const complex2Match = complex2.match(complex2Regex);
  const complex2Real = parseInt(complex2Match[1], 10);
  const complex2Imag = parseInt(complex2Match[3], 10);
  const complex2Sign = complex2Match[2];
  if (complex2Sign === "-") {
    complex2Imag *= -1;
  }

  // Perform the calculation
  let resultReal;
  let resultImag;
  switch (operator) {
    case "+":
      resultReal = complex1Real + complex2Real;
      resultImag = complex1Imag + complex2Imag;
      break;
    case "-":
      resultReal = complex1Real - complex2Real;
      resultImag = complex1Imag - complex2Imag;
      break;
    case "*":
      resultReal = complex1Real * complex2Real - complex1Imag * complex2Imag;
      resultImag = complex1Real * complex2Imag + complex1Imag * complex2Real;
      break;
    case "/":
      resultReal = (complex1Real * complex2Real + complex1Imag * complex2Imag) / (complex2Real * complex2Real + complex2Imag * complex2Imag);
      resultImag = (complex1Imag * complex2Real - complex1Real * complex2Imag) / (complex2Real * complex2Real + complex2Imag * complex2Imag);
      break;
    default:
      throw new Error(`Invalid operator: ${operator}`);
  }

  // Format the result as a string
  let resultSign = "+";
  if (resultImag < 0) {
    resultSign = "-";
    resultImag *= -1;
  }
  return `${resultReal} ${resultSign} ${resultImag}j`;
}

