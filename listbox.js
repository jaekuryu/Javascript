const textbox = document.getElementById("textbox");
const listbox = document.getElementById("listbox");
const prependBtn = document.getElementById("prependBtn");
const appendBtn = document.getElementById("appendBtn");
const insertBtn = document.getElementById("insertBtn");
const deleteBtn = document.getElementById("deleteBtn");

listbox.addEventListener("change", function() {
  textbox.value = listbox.options[listbox.selectedIndex].text;
});

prependBtn.addEventListener("click", function() {
  const newOption = new Option(textbox.value, textbox.value);
  listbox.add(newOption, listbox.options[0]);
});

appendBtn.addEventListener("click", function() {
  const newOption = new Option(textbox.value, textbox.value);
  listbox.add(newOption);
});

insertBtn.addEventListener("click", function() {
  let selectedIndex = listbox.selectedIndex;
  if (selectedIndex === -1) {
    alert("You have to select a position in the list box");
    return;
  }
  const newOption = new Option(textbox.value, textbox.value);
  listbox.add(newOption, listbox.options[selectedIndex]);
});

deleteBtn.addEventListener("click", function() {
  let selectedIndex = listbox.selectedIndex;
  if (selectedIndex === -1) {
    alert("You have to select a position in the list box");
    return;
  }
  listbox.remove(selectedIndex);
});
