function buttonStartgame()
{
  document.getElementById("initialMenuScreen").style.display = "none";
  document.getElementById("loadingScreen").style.display = "block";
  var x = document.getElementsByClassName("gameTip");
  for(var i=0;i<10;i++)
  {
    x[i].style.display="none"
  }
  var result = Math.floor(Math.random() * 10);
  x[result].style.display = "block";

  //  5초 후에 다음 화면으로 이동
  setTimeout(fromLoadingToGame, 5000);

  function fromLoadingToGame() {
    document.getElementById("loadingScreen").style.display = "none";
    document.getElementById("inGameScreen").style.display = "block";
  }

}
function buttonLoadgame()
{
  document.getElementById("initialMenuScreen").style.display = "none";
  document.getElementById("loadingScreen").style.display='block';
  var x = document.getElementsByClassName("gameTip");
  for(var i=0;i<10;i++)
  {
    x[i].style.display="none"
  }
  var result = Math.floor(Math.random() * 10);
  x[result].style.display = "block";

  //  5초 후에 다음 화면으로 이동
}
function buttonAchievement()
{
  document.getElementById("initialMenuScreen").style.display = "none";
  document.getElementById("achievementScreen").style.display='block';
  var x = document.getElementsByClassName("achievementCell");
  for(var i=0;i<5;i++)
  {
    x[i].style.display="block"
  }
}

function fromPersonalityToDepartment() {
  document.getElementById("personalityTestScreen").style.display = "none";
  document.getElementById("departmentChoiceScreen").style.display = "block";
}
