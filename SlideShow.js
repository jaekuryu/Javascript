const filename = document.getElementById("filename");
const image = document.getElementById("image");
const loadBtn = document.getElementById("load");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const stopBtn = document.getElementById("stop");

let fileList = [];
let currentIndex = 0;
let playInterval;

loadBtn.addEventListener("click", function() {
  fetch(filename.value)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
    })
    .then(data => {
      fileList = data.split("\n");
      image.src = fileList[0];
    })
    .catch(error => {
        console.log(error);
        alert("File loading failed, please check the file name and try again.");
    });
});

nextBtn.addEventListener("click", function() {
  currentIndex++;
  if (currentIndex >= fileList.length) {
    currentIndex = 0;
  }
  image.src = fileList[currentIndex];
});

prevBtn.addEventListener("click", function() {
  currentIndex--;
  if (currentIndex < 0) {
    currentIndex = fileList.length - 1;
  }
  image.src = fileList[currentIndex];
});

playBtn.addEventListener("click", function() {
  playInterval = setInterval(function() {
    currentIndex++;
    if (currentIndex >= fileList.length) {
      currentIndex = 0;
    }
    image.src = fileList[currentIndex];
  }, 300);
});

stopBtn.addEventListener("click", function() {
  clearInterval(playInterval);
});

