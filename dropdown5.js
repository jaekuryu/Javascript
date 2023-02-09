function showSelectedOption() {
    var selectMenu = document.getElementById("select-menu");
    var selectedOption = selectMenu.options[selectMenu.selectedIndex].text;
    var dialog = document.getElementById("dialog")
    dialog.innerHTML = "Option " + selectedOption + " selected";
    dialog.style.display = "block";
}
