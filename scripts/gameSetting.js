var thisGame = {};

thisGame.department;
  //  이번 게임에서 선택한 학과
thisGame.timeTable;
  //  이번 게임에서 선택한 이벤트들로 구성된 시간표
thisGame.status = {};
thisGame.status.health = 1;
thisGame.status.grade = 1;
thisGame.status.relationship = 1;
  //  이번 게임의 스탯
thisGame.status.load;
  // 학기 전체의 load;

var dayofweek = ["월", "화", "수", "목", "금", "토", "일"];

let Period = {
  // 시간 : 교시
  "AM 8:00" : 0, 0 : "AM 8:00",
  "AM 9:30" : 1, 1 : "AM 9:30",
  "AM 11:00" : 2, 2 : "AM 11:00",
  "PM 12:30" : 3, 3 : "AM 12:30",
  "PM 2:00" : 4, 4 : "PM 2:30",
  "PM 3:30" : 5, 5 : "PM 3:30",
  "PM 5:00" : 6, 6 : "PM 5:00",
  "PM 6:30" : 7, 7 : "PM 6:30",
  "PM 8:00" : 8, 8 : "PM 8:00",
  "PM 9:30" : 9, 9 : "PM 9:30",
  "PM 10~" : 10, 10 : "PM 10~"
}


class SingleEvent {
  constructor(
    _name,                //  String
    _duration,            //  float
    _deltaHealth,         //  float
    _deltaRelationship,   //  float
    _isLecture,           //  boolean
    _load,                //  float
    _lectureNumber        //  String
  ) {
    //  event
    this.name = _name;  //  이벤트 이름
    this.duration = _duration;  //  한 번 수행하는데 걸리는 시간 (분)
    this.deltaHealth = _deltaHealth;  //  체력 스탯 변화량
    this.deltaRelationship = _deltaRelationship;  //  인간관계 스탯 변화량

    //  lecture
    this.isLecture = _isLecture;  //  lecture ? true : false
    this.load = _load;  //  duration이랑 구분해야됨, 한 학기 전체 로드
    this.lectureNumber = _lectureNumber;  //  학수번호
  }
//  model 만드시는 분께서 capacity(남은 가용시간)를 받아 load를 업데이트 시키는 메소드도 만들어 주세요
}

class SinglePopUpEvent {
  constructor (
    _name, // String
    _time, // boolean array (16주중 되는 시간 true)
    _relationshipCeil, // float (Ceil은 상한, Floor는 하한)
    _relationshipFloor, // float
    _healthCeil, // float
    _healthFloor, // float
    _gradeCeil, // float
    _gradeFloor, // float
    _description
  ){
    this.name = _name;
    this.time = _time;
    this.relationshipCeil = _relationshipCeil;
    this.relationshipFloor = _relationshipFloor;
    this.healthCeil = _healthCeil;
    this.healthFloor = _healthFloor;
    this.gradeCeil = _gradeCeil;
    this.gradeFloor = _gradeFloor;
    this.description = _description;
  }
}

//  SingleEvent pool
let Event = {
  "객체지향프로그래밍A" : new SingleEvent("객체지향프로그래밍", 90, -0.02, 0, true, 100, "CSED232"),
  "객체지향프로그래밍B" : new SingleEvent("객체지향프로그래밍", 90, -0.02, 0, true, 100, "CSED232")
} // 전체 과목(Period 단위)를 저장

let PopUpEvent = {
  "개총" : new SinglePopUpEvent("개총", [1, 2, 3], null, null, null, null, null, null, "새로운 학기의 시작은 개총과 함께~?"),
}
