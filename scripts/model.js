function model() { // 일단은 1주 진행
  var capacity;

  for (let week =0; week < 16; week++){
    //7 * 11 시간표 배열이 넘어온다고 가정 (7일 10교시 + 10시 이후)
    // 16주 동안 진행하고, 16개의 이벤트 발생 -> critical 이벤트?

    for (let day = 0; day < 7; day++){
      var firstPeriod = -1;

      for (let peri = 0; peri < 11; peri++){
        if(thisGame.timetable[i][j] != "" && firstPeriod == -1)
          firstPeriod = peri;
        } // 첫 수업시간 찾음

        capacityUpdate(capacity, firstPeriod);

        for (let peri = firstPeriod; peri < 11; peri++){
          if (thisGame.timeTable[i][j] == "") continue;
          let nowEvent = Event[thisGame.timeTable[i][j]];

          thisGame.status.health += statUpdate(timeDependency(nowEvent));
          thisGame.status.relationship += statUpdate(nowEvent.deltaRelationship);
          capacity -= nowEvent.duration;
          // 스텟 업데이트, 가용시간 - 소모시간
        }
      }
      eventHandler();
      // 이벤트 발생 -> 랜덤 발생하는 알고리즘 필요
    }
}
function eventHandler(){

} // 이벤트 발생 (UI랑 연결?)
function capacityUpdate(capacity, firstPeriod){
  var wakeUpTime = 8 + 90 * firstPeriod;

  capacity = 24 - wakeUpTime;
} // 가용시간을 24시 - 오전 첫 수업 시간로 업데이트

function statUpdate(deltastat) {
  return 1 * deltastat;
} // stat을 조절하는 function

function timeDependency(nowEvent) {
  switch(nowEvent.period){
    case Period["AM 8:00"] : return nowEvent.deltaHealth * 1.3
    case Period["AM 9:30"] : return nowEvent.deltaHealth * 1.2
    case Period["AM 11:00"] : return nowEvent.deltaHealth * 1.1
  }
  return nowEvent.deltaHealth
} // 시간에 따른 체력 변화량 조절 (오전 수업 체력 소모량 가중치 있음)
