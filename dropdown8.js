function showSelectedOption() {
    var selectMenu = document.getElementById("select-menu");
    var selectedOption = selectMenu.options[selectMenu.selectedIndex].text;
    var w = 300;
    var h = 200;
    var left = (screen.width/2)-(w/2);
    var top = (screen.height/2)-(h/2);
    var popup = window.open("", "Selected Option", "height="+h+",width="+w+", top="+top+", left="+left+", modal=yes, alwaysRaised=yes");
    var btnOK = "<button onclick='window.close()'>OK</button>";
    var btnCancel = "<button onclick='window.close()'>Cancel</button>";
    popup.document.write("<div style='text-align:center;'>" + "Option " + selectedOption + " selected" + "</div>" + 
    "<div style='text-align:center; padding-top:20px;'>" + btnOK + "&nbsp;&nbsp;" + btnCancel + "</div>");
}
