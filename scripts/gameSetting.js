//  class Session, routineList: list<Event>
function Session(_routineList) {
  this.routineList = _routineList;
}

//  이름, 요일, 걸리는시간, 시간표의 가이드라인 안에 있는지, 몇교시
function Event(_name, _day, _period, _duration, _guideline) {
  this.name = _name;
  this.day = _day;
  this.period = _period;
  this.duration = _duration;
  this.guideline = _guideline;
}

Event.prototype.showDetail = function () {
  if(document.getElementById("screen") != null){
    document.getElementById("screen").innerHTML += ("이벤트 이름: "+this.name+"<br/>");
    var dayTemp;
    switch (this.day) {
      case 0:
        dayTemp = "월요일";
        break;
      case 1:
        dayTemp = "화요일";
        break;
      case 2:
        dayTemp = "수요일";
        break;
      case 3:
        dayTemp = "목요일";
        break;
      case 4:
        dayTemp = "금요일";
        break;
      case 5:
        dayTemp = "토요일";
        break;
      case 6:
        dayTemp = "일요일";
        break;
      default:
        break;
    }
    document.getElementById("screen").innerHTML += ("요일: "+dayTemp+"<br/>");
    document.getElementById("screen").innerHTML += ("소요 시간: "+this.duration+"분<br/>");
    document.getElementById("screen").innerHTML += ("In Guideline: "+this.guideline+"<br/>");
    document.getElementById("screen").innerHTML += ("What period: "+this.period+"교시<br/>");
    document.getElementById("screen").innerHTML += "<br/>";
  }
};

//  personality, department, status
var personality = Array();  //  stack array로 받음
var department = 9;  //  integer
var health = 1;
var relationship = 1;
var grade = 1;

//  잠에 드는 시간 - 일어나는 시간 (분)
var capacity = 200;

document.getElementById("screen").innerHTML += "*initial status <br/>";
document.getElementById("screen").innerHTML += health + "<br/>";
document.getElementById("screen").innerHTML += relationship + "<br/>";
document.getElementById("screen").innerHTML += grade + "<br/>";
document.getElementById("screen").innerHTML += "<br/>";

personality.push("health");
personality.push("health");
personality.push("relationship");
personality.push("relationship");
personality.push("grade");
personality.push("grade");
document.getElementById("screen").innerHTML += "<br/>";

document.getElementById("screen").innerHTML += "*personality <br/>";
document.getElementById("screen").innerHTML += personality[0] + "<br/>";
document.getElementById("screen").innerHTML += personality[1] + "<br/>";
document.getElementById("screen").innerHTML += personality[2] + "<br/>";
document.getElementById("screen").innerHTML += personality[3] + "<br/>";
document.getElementById("screen").innerHTML += personality[4] + "<br/>";
document.getElementById("screen").innerHTML += personality[5] + "<br/>";
document.getElementById("screen").innerHTML += "<br/>";

//  priority 0, 1, 2, 3, 4, 5 -> +0.36, +0.30, +0.24, +0.18, +0.12, +0.06
for (var i=0; i<6; i++) {
    if(personality[i] === "health") {
      health += (2.5-i)*0.06;
    } else if(personality[i] === "relationship") {
      relationship += (2.5-i)*0.06;
    } else if(personality[i] === "grade") {
      grade += (2.5-i)*0.06;
    }
}

document.getElementById("screen").innerHTML += "*status after personality <br/>";
document.getElementById("screen").innerHTML += health + "<br/>";
document.getElementById("screen").innerHTML += relationship + "<br/>";
document.getElementById("screen").innerHTML += grade + "<br/>";
document.getElementById("screen").innerHTML += "<br/>";

document.getElementById("screen").innerHTML += "*department <br/>";
document.getElementById("screen").innerHTML += department+"<br/>";
document.getElementById("screen").innerHTML += "<br/>";

//  eventList 만들기
var eventList = new Array();
for( var i=0; i<10; i++ ) {
  eventList[i] = new Array();
}

document.getElementById("screen").innerHTML += "*event list<br/>";

var event = new Event("월요일 수업 1", 0, 2, 90, 1);
event.showDetail();
eventList[event.day][event.period] = event;

event = new Event("화요일 수업 1", 1, 2, 90, 2);
event.showDetail();
eventList[event.day][event.period] = event;

event = new Event("수요일 수업 1", 2, 2, 90, 1);
event.showDetail();
eventList[event.day][event.period] = event;

event = new Event("목요일 수업 1", 3, 2, 90, 2);
event.showDetail();
eventList[event.day][event.period] = event;

event = new Event("금요일 수업 1", 4, 2, 90, 1);
event.showDetail();
eventList[event.day][event.period] = event;

event = new Event("토요일 동아리 1", 5, 5, 90, 0);
event.showDetail();
eventList[event.day][event.period] = event;

event = new Event("일요일 조모임 1", 6, 7, 90, 0);
event.showDetail();
eventList[event.day][event.period] = event;

document.getElementById("screen").innerHTML += "*event list array<br/>";
for( var i=0; i<7; i++){
  for( var j=0; j<10; j++) {
    if( eventList[i][j] === undefined )
      document.getElementById("screen").innerHTML += eventList[i][j]+"  | ";
    else
      document.getElementById("screen").innerHTML += eventList[i][j].name+" | ";
  }
  document.getElementById("screen").innerHTML += "<br/>";
}
