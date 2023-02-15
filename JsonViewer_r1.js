document.addEventListener("DOMContentLoaded", function() {

      var data;
      
      function update() {
        var fileInput = document.getElementById("fileName");
        var files = fileInput.files;
        if (files.length === 0) {
          alert("Please select a file.");
          return;
        }
        var file = files[0];
        var reader = new FileReader();
        reader.readAsText(file);
        reader.onload = function() {
          // parse the contents of the file as JSON and display it in the left container
          var json = JSON.parse(reader.result);
          data = json;
          displayJson(json);
        };
        //reader.readAsText(file);
      }

      function displayJson(json) {
        var leftContainer = document.getElementById("leftContainer");
        leftContainer.innerHTML = '';
      
        // Create a recursive function to display the JSON contents as a tree
        function createNode(node, parentNode) {
          var nodeDiv = document.createElement("div");
          nodeDiv.style.marginLeft = "10px";
      
          for (var key in node) {
            var keyValuePairDiv = document.createElement("div");
      
            keyValuePairDiv.innerHTML = key + ":" + JSON.stringify(node[key]);
            keyValuePairDiv.style.fontWeight = "bold";
      
            nodeDiv.appendChild(keyValuePairDiv);
      
            if (typeof node[key] === "object") {
              createNode(node[key], keyValuePairDiv);
            }
          }
          parentNode.appendChild(nodeDiv);
        }
      
        createNode(json, leftContainer);
      }
      
      
      function expandAll() {
        var leftContainer = document.getElementById("leftContainer");
        var nodeDivs = leftContainer.getElementsByTagName("div");
      
        for (var i = 0; i < nodeDivs.length; i++) {
          nodeDivs[i].style.display = "block";
        }
      }
      
      function collapseAll() {
        var leftContainer = document.getElementById("leftContainer");
        var nodeDivs = leftContainer.getElementsByTagName("div");
      
        for (var i = 0; i < nodeDivs.length; i++) {
          nodeDivs[i].style.display = "none";
        }
      }
      
      function clear() {
        document.getElementById("leftContainer").innerHTML = '';
      }
      
      function selectItem() {
        // Code to print the name of the selected item on the right side of the page
        var selectedItem = event.target.innerHTML;
        document.getElementById("rightContainer").innerHTML = selectedItem;
      }
    
      function editItem() {
        var item = event.target;
        var value = item.innerHTML;
        var index = Array.from(item.parentNode.children).indexOf(item);
      
        item.innerHTML = "<input type='text' value='" + value + "'>";
      
        var input = item.children[0];
        input.addEventListener("keydown", function(e) {
          if (e.key === "Enter") {
            item.innerHTML = input.value;
            if (index >= 0 && index < data.length) {
              data[index] = input.value;
            }
          }
        });
      }
      
      document.getElementById("update").addEventListener("click", update);
      document.getElementById("expandAll").addEventListener("click", expandAll);
      document.getElementById("collapseAll").addEventListener("click", collapseAll);
      document.getElementById("clear").addEventListener("click", clear);
      document.getElementById("fileName").addEventListener("change", update);
      
      var leftContainer = document.getElementById("leftContainer");
      leftContainer.addEventListener("click", selectItem);
      leftContainer.addEventListener("dblclick", editItem);
      
    } );