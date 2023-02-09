$(document).ready(function(){
    $("#select-menu").change(function(){
        var selectedOption = $("#select-menu option:selected").text();
        $("#dialog").text("Option " + selectedOption + " selected").dialog({
            autoOpen: true,
            width: 400,
            buttons: [
              {
                text: "OK",
                click: function() {
                  $( this ).dialog( "close" );
                }
              }
            ]
          });
    });
});
