function StartGame() {
  document.getElementById("screen").style.display = "none";
  document.getElementById("screen2").style.display = "block";
}

var week = 1;
var today = 0;
for(var i=0; i<7; i++)
  routine();

function routine() {
  document.getElementById("screen2").innerHTML += "<"+dayofweek[today]+"요일 시작> <br/>";
  document.getElementById("screen2").innerHTML += "*가용 시간: "+capacity+"분 <br/>";
  document.getElementById("screen2").innerHTML += "<br/>";

  for(var i=0; i<10; i++) {
    var e = eventList[today][i];
    if(e !== undefined) {
      capacity -= e.duration;
      document.getElementById("screen2").innerHTML += "- 수행한 이벤트: "+e.name;
      document.getElementById("screen2").innerHTML += "<br/>";
      document.getElementById("screen2").innerHTML += "*남은 가용시간: "+capacity+"분 <br/>";
      document.getElementById("screen2").innerHTML += "<br/>";
    }
  }
  document.getElementById("screen2").innerHTML += "- "+dayofweek[today]+"요일이 끝났습니다<br/>";
  document.getElementById("screen2").innerHTML += "*남은 가용시간:"+capacity+"분<br/>";
  document.getElementById("screen2").innerHTML += "<br/>";
  today += 1;
  today %= 7;
  capacity = 200;
}
