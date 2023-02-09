var searchBtn = document.getElementById("search-btn");
searchBtn.addEventListener("click", performSearch);

function performSearch() {
  var keyword = document.getElementById("search-keyword").value;
  var searchUrl = "https://www.google.com/search?q=" + keyword;
  var resultsDiv = document.getElementById("search-results");

  var xhr = new XMLHttpRequest();
  xhr.open("GET", searchUrl, true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      resultsDiv.innerHTML = xhr.responseText;
    }
  };
  xhr.send();
}
