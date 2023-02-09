function showSelectedOption() {
    var selectMenu = document.getElementById("select-menu");
    var selectedOption = selectMenu.options[selectMenu.selectedIndex].text;
    var popup = window.open("", "Selected Option", "height=200,width=300, modal=yes, alwaysRaised=yes");
    var btnOK = "<button onclick='window.close()'>OK</button>";
    var btnCancel = "<button onclick='window.close()'>Cancel</button>";
    popup.document.write("<div style='text-align:center;'>" + "Option " + selectedOption + " selected" + "</div>" + 
    "<div style='text-align:center; padding-top:20px;'>" + btnOK + "&nbsp;&nbsp;" + btnCancel + "</div>");
}
