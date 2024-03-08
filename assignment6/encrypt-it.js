document.addEventListener("DOMContentLoaded", function () {
  updateSlider();
  updateCipherType();
  reset();
  var textInput = document.querySelector("#input-text");
  var shiftSlider = document.querySelector("#shift-slider");

  console.log(textInput);

  var typingTimer = 2000;
  if (textInput.addEventListener) {
    textInput.addEventListener(
      "input",
      function () {
        checkUpperCase();
        clearTimeout(typingTimer);
        typingTimer = setTimeout(function () {
          checkUpperCase();
        }, 100);
      },
      false
    );
  }

  if (shiftSlider.addEventListener) {
    shiftSlider.addEventListener(
      "input",
      function () {
        updateSlider();
        shiftCipher(document.querySelector("#shift-slider").value);
      },
      false
    );
  }
});

function clean() {
  document.querySelector("#encrypt-it").innerText = "Encrypt It!";
  document.querySelector("#result").innerHTML = "";
  document
    .querySelector("#encrypt-it")
    .setAttribute("onclick", "selectCipherError()");
}
function reset() {
  document.querySelector("#encrypt-it").innerText = "Encrypt It!";
  document.querySelector("#cipher-type").value = "select";
  document.querySelector("#input-text").value = "";
  document.querySelector("#result").innerHTML = "";
  document
    .querySelector("#encrypt-it")
    .setAttribute("onclick", "selectCipherError()");
    updateCipherType();
}
function selectCipherError(){
  var errorMessage = document.querySelector('#select-cipher-error')
  var dropdown = document.querySelector('#cipher-type').value;
  console.log(dropdown);
  console.log(errorMessage);
  if(dropdown == 'select'){
    errorMessage.style.display = 'block';
  } else{
    errorMessage.style.display = 'none';
  }
}

function updateCipherType() {
  var cipherType = document.querySelector("#cipher-type").value;
  clean();
  
  switch (cipherType) {
    case "shift":
      enableShiftCipher();
      break;
    case "caeser":
      enableCaeserCipher();
      break;
    default:
    case "select":
      document.querySelector(".shift-slide-container").style.display = 'none';
      document.querySelector("#cipher-type").value = "select";
  }
}

function enableShiftCipher() {
  var shiftContainer = document.querySelector(".shift-slide-container");

  if (shiftContainer.style.display == "none") {
    shiftContainer.style.display = "flex";
    document
      .querySelector("#encrypt-it")
      .setAttribute(
        "onclick",
        "shiftCipher(document.querySelector('#shift-slider').value);"
      );
    document.querySelector("#cipher-type").value = "shift";
    selectCipherError();
  } else {
    shiftContainer.style.display = "none";
  }
}
function enableCaeserCipher() {
  document
    .querySelector("#encrypt-it")
    .setAttribute("onclick", "caeserCipher();");
  document.querySelector(".shift-slide-container").style.display = "none";
  document.querySelector("#cipher-type").value = "caeser";
  selectCipherError();
}

function caeserCipher() {
  const plaintextAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ ";
  const keyLength = plaintextAlphabet.length;
  var key = Array.from(plaintextAlphabet);
  key = shuffleArray(key);

  if (!/^[a-zA-Z\s]+$/.test(document.getElementById("input-text").value)) {
    return;
  }
  var text = document.getElementById("input-text").value.toUpperCase();
  var output = document.getElementById("result");

  var cipherText = [];
  for (var i = 0; i < text.length; i++) {
    const currentChar = text[i];
    // if(currentChar == ' '){
    //   cipherText.push(currentChar);
    //   continue;
    // }
    const shiftedChar = key[plaintextAlphabet.indexOf(currentChar)];
    cipherText.push(shiftedChar);
  }
  cipherText = cipherText.join("");

  console.log(cipherText);
  output.innerHTML = "Key: \"" + key.join("") + "\"<br>" + cipherText;
  document.getElementById("encrypt-it").innerHTML = "Again!";

  return;
}

function shuffleArray(array) {
  let currentIndex = array.length,
    randomIndex;
  while (currentIndex > 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
}

function shiftCipher(offset) {
  const plaintextAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ ";
  const keyLength = plaintextAlphabet.length;
  offset = offset % keyLength;
  var key =
    plaintextAlphabet.slice(offset) + plaintextAlphabet.slice(0, offset);
  console.log(key);
  if (!/^[a-zA-Z\s]+$/.test(document.getElementById("input-text").value)) {
    return;
  }
  var text = document.getElementById("input-text").value.toUpperCase();
  var output = document.getElementById("result");

  var cipherText = [];
  for (var i = 0; i < text.length; i++) {
    const currentChar = text[i];
    if(currentChar == ' '){
      cipherText.push(currentChar);
      continue;
    }
    const shiftedChar = key[plaintextAlphabet.indexOf(currentChar)];
    cipherText.push(shiftedChar);
  }
  cipherText = cipherText.join("");

  console.log(cipherText);
  output.innerHTML = cipherText;

  return;
}

function checkUpperCase() {
  const text = document.getElementById("input-text").value;
  const error = document.getElementById("text-error");
  if (/^[a-zA-Z\s]+$/.test(text) || text == "") {
    console.log("good!");
    error.style.display = "none";
  } else {
    console.log("error!");
    error.style.display = "block";
  }
}

function updateSlider() {
  document.getElementById("slider-value").innerText =
    document.getElementById("shift-slider").value;
}
