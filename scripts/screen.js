function buttonStartgame()
{
    var x = document.getElementsByClassName("loadingScreen");
    for (var i = 0; i < x.length; i++)
    {
      x[i].style.display = "block";
    }

    var y = document.getElementById("initialMenuScreen");
    y.style.display = "none";
}
function buttonLoadgame()
{
  var x = document.getElementsByClassName("loadingScreen2");
  for (var i = 0; i < x.length; i++)
  {
    x[i].style.display = "block";
  }

  var y = document.getElementById("initialMenuScreen");
  y.style.display = "none";
}
function buttonAchievement()
{
  var x = document.getElementsByClassName("achievementScreen");
  for (var i = 0; i < x.length; i++)
  {
    x[i].style.display = "block";
  }

  var y = document.getElementById("initialMenuScreen");
  y.style.display = "none";
}
