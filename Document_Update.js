const output = document.getElementById("output");
const textField = document.getElementById("text-field");
const fontSelect = document.getElementById("font-select");
const boldCheckbox = document.getElementById("bold-checkbox");
const italicCheckbox = document.getElementById("italic-checkbox");
const submitButton = document.getElementById("submit-button");

function submitText() {
  let font = fontSelect.value;
  let bold = boldCheckbox.checked ? "bold" : "normal";
  let italic = italicCheckbox.checked ? "italic" : "normal";
  let text = textField.value;

  output.innerHTML += `<p style="text-align: left; font-family: ${font}; font-weight: ${bold}; font-style: ${italic};">${text}</p></left>`;
}

submitButton.addEventListener("click", submitText);

  