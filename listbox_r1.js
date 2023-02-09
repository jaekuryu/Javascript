const textbox = document.getElementById("textbox");
const listbox = document.getElementById("listbox");
const prependBtn = document.getElementById("prependBtn");
const appendBtn = document.getElementById("appendBtn");
const insertBtn = document.getElementById("insertBtn");
const deleteBtn = document.getElementById("deleteBtn");

function handleListboxChange() {
  textbox.value = listbox.options[listbox.selectedIndex].text;
}

function handlePrependBtnClick() {
  const newOption = new Option(textbox.value, textbox.value);
  listbox.add(newOption, listbox.options[0]);
}

function handleAppendBtnClick() {
  const newOption = new Option(textbox.value, textbox.value);
  listbox.add(newOption);
}

function handleInsertBtnClick() {
  let selectedIndex = listbox.selectedIndex;
  if (selectedIndex === -1) {
    alert("You have to select a position in the list box");
    return;
  }
  const newOption = new Option(textbox.value, textbox.value);
  listbox.add(newOption, listbox.options[selectedIndex]);
}

function handleDeleteBtnClick() {
  let selectedIndex = listbox.selectedIndex;
  if (selectedIndex === -1) {
    alert("You have to select a position in the list box");
    return;
  }
  listbox.remove(selectedIndex);
}

listbox.addEventListener("change", handleListboxChange);
prependBtn.addEventListener("click", handlePrependBtnClick);
appendBtn.addEventListener("click", handleAppendBtnClick);
insertBtn.addEventListener("click", handleInsertBtnClick);
deleteBtn.addEventListener("click", handleDeleteBtnClick);

