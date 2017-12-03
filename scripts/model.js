function model() {
  var capacity;

  //7 * 11 배열이 넘어온다고 가정 (7일 10교시 + 10시 이후)
  for (let day = 0; day < 7; day++){
    var firstPeriod = -1;

    for (let peri = 0; peri < 11; peri++){
      if(thisGame.timetable[i][j] != "" && firstPeriod == -1)
        firstPeriod = peri;
    }

    capacityUpdate(capacity, firstPeriod);

    for (let peri = firstPeriod; peri < 11; peri++){
      if (thisGame.timeTable[i][j] == "") continue;
      let nowEvent = Event[thisGame.timeTable[i][j]];

      alert("이벤트 : " + nowEvent.name);
      thisGame.status.health += statUpdate(nowEvent.deltaHealth);
      thisGame.status.relationship += statUpdate(nowEvent.deltaRelationship);
      capacity -= nowEvent.duration;

      alert(thisGame.status.health);
      alert(thisGame.status.relationship);
    }
  }
} // 아침 수업 고려

function capacityUpdate(capacity, firstPeriod){
  var wakeUpTime = 8 + 90 * firstPeriod;

  capacity = 24 - wakeUpTime;
} // 가용시간을 24시 - 오전 첫 수업 시간

function statUpdate(deltastat) {
  return 1 * deltastat;
} // stat을 조절하는 funciton
