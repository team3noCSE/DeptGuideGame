function buttonStartgame()
{
  document.getElementById("initialScreen").style.display = "none";
  document.getElementById("loadingScreen").style.display = "block";
  var x = document.getElementsByClassName("gameTip");
  for(var i=0;i<10;i++)
  {
    x[i].style.display="none"
  }
  var result = Math.floor(Math.random() * 10);
  x[result].style.display = "block";    
}
function buttonLoadgame()
{
  document.getElementById("initialScreen").style.display = "none";
  document.getElementById("loadingScreen").style.display='block';
  var x = document.getElementsByClassName("gameTip");
  for(var i=0;i<10;i++)
  {
    x[i].style.display="none"
  }
  var result = Math.floor(Math.random() * 10);
  x[result].style.display = "block";    
}
function buttonAchievement()
{
  document.getElementById("initialScreen").style.display = "none";
  document.getElementById("achievementScreen").style.display='block';
  var x = document.getElementsByClassName("achievementCell");
  for(var i=0;i<5;i++)
  {
    x[i].style.display="none"
  }
  var result = Math.floor(Math.random() * 5);
  x[result].style.display = "block";    
  
}

function settimeout_startgame()
{
  setTimeout(buttonStartgame,3000);
}
function settimeout_loadgame()
{
  setTimeout(buttonLoadgame,3000);
}