var initialMenuScreen = document.getElementById("initialMenuScreen");
var loadingScreen = document.getElementById("loadingScreen");
var achievementScreen = document.getElementById("achievementScreen");
var inGameScreen = document.getElementById("inGameScreen");
var personalityTestScreen = document.getElementById("personalityTestScreen");
var departmentChoiceScreen = document.getElementById("departmentChoiceScreen");
var lectureSchedulingScreen = document.getElementById("lectureSchedulingScreen");
var inSession = document.getElementById("inSession");
var optionEvent = document.getElementById("optionEvent");
var nonOptionEvent = document.getElementById("nonOptionEvent");
var miniGame = document.getElementById("miniGame");
var result = document.getElementById("result");

var everyElement = document.getElementsByClassName("hiding");
/*
for ( var i=0; i<everyElement.length; i++ ) {
  everyElement[i].style.display = "none";
//  if( everyElement[i].id == "initialMenuScreen" )
//    everyElement[i].style.display = "block";
}*/

var initialMenuScreen = document.getElementById("initialMenuScreen");
var initialMenuBotton = initialMenuScreen.getElementsByClassName("button");


initialMenuScreen.style.display = "";
for ( var i=0; i<initialMenuBotton.length; i++ ) {
  initialMenuBotton[i].setAttribute("style", "display: block");
}
//var a = document.getElementById("gameStartButton");
//a.setAttribute("style", "display: ");
//gameStartButton.style.display = "";
//show(gameStartButton);
//gameStartButton.onclick = hideAll;


function show(e) {
  e.style.display = "";
}

function hideAll() {
  this.parentNode.setAttribute("style", "display: none!important");
}

function hide() {
  this.style.setAttribute("style", "display: none!important");
}
