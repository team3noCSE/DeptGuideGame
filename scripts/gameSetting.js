let healthPerLecture = -0.005;

var thisGame = {};

thisGame.department;
  //  이번 게임에서 선택한 학과
thisGame.timeTable;
  //  이번 게임에서 선택한 이벤트들로 구성된 시간표
thisGame.status = {};
thisGame.status.health = 1;
thisGame.status.grade = 0;
//  grade = (수행한 로드)/(전체 로드)
thisGame.status.relationship = 0;
  //  이번 게임의 스탯

thisGame.load = 0;
  // 학기 전체의 load;

var dayofweek = ["월", "화", "수", "목", "금", "토", "일"];

let Load = {
  "QUIZ" : 0.8,

  "ASSIGN" : 1.2,
  "LABASSIGN" : 0.4,
  "HOMEWORK" : 0.8,

  "MIDTERM" : 2.4,      //  두번 있음, 4.8
  "FINAL" : 2.4,        //  두번 있음, 4.8
  "3TEST" : 1.6,
  "4TEST" : 1.2,

  "PRESENTATION" : 1.6,  //  두번 있음, 3.2

  "LABREPORT" : 0.8
}

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
    //_load,                  2*16 array
    _lectureNumber        //  String
  ) {
    //  event
    this.name = _name;  //  이벤트 이름
    this.duration = _duration;  //  한 번 수행하는데 걸리는 시간 (분)
    this.deltaHealth = _deltaHealth;  //  체력 스탯 변화량
    this.deltaRelationship = _deltaRelationship;  //  인간관계 스탯 변화량

    //  lecture
    this.isLecture = _isLecture;  //  lecture ? true : false
    this.load = Array(16);  //  duration이랑 구분해야됨, 한 학기 전체 로드
    for(var i=0; i<16; i++) {
      this.load[i] = Array(2);
      this.load[i][0] = 0;
      this.load[i][1] = "";
    }
    this.lectureNumber = _lectureNumber;  //  학수번호
  }
//  model 만드시는 분께서 capacity(남은 가용시간)를 받아 load를 업데이트 시키는 메소드도 만들어 주세요
  addQuiz(weight) {
    for(var i=1; i<16; i++) {
      if( i===7 || i===15 ) {
        continue;
      }
      this.load[i][0] += Load["QUIZ"]*weight;
      this.load[i][1] += "퀴즈가 있습니다. ";
    }
  }

  add4Quiz(weight) {
    var adjust = Math.floor(Math.random() * 4) - 1;
    this.load[2+adjust][0] += Load["QUIZ"]*weight;
    this.load[5+adjust][0] += Load["QUIZ"]*weight;
    this.load[8+adjust][0] += Load["QUIZ"]*weight;
    this.load[11+adjust][0] += Load["QUIZ"]*weight;

    this.load[2+adjust][1] += "퀴즈가 있습니다. ";
    this.load[5+adjust][1] += "퀴즈가 있습니다. ";
    this.load[8+adjust][1] += "퀴즈가 있습니다. ";
    this.load[11+adjust][1] += "퀴즈가 있습니다. ";
  }

  addHomeWork1Week(weight) {
    for(var i=1; i<16; i++) {
      if( i===7 || i===15 ) {
        continue;
      }
      this.load[i][0] += Load["HOMEWORK"]*weight;
      this.load[i][1] += "숙제가 있습니다. ";
    }
  }

  addHomeWork2Week(weight) {
    for(var i=0; i<16; i++) {
      if( i===7 || i===15 ) {
        continue;
      }
      if( i%2 === 0 ){
        continue;
      }
      this.load[i][0] += Load["HOMEWORK"]*weight;
      this.load[i][1] += "숙제가 있습니다. ";
    }
  }
  addHomeWork4Week(weight) {
    // 4주에 한번씩 숙제가 나옴
    // 2, 6, 10, 14주에 나오며 +-1주 adjust
    var adjust = Math.floor(Math.random() * 4) - 1;

    for(var i=0; i<4; i++) {
      this.load[i*4+1+adjust][0] += Load["HOMEWORK"]*weight;
      this.load[i*4+1+adjust][1] += "숙제가 있습니다. ";
    }
  }

  add3Assign(weight) {
    // adjust as plus 1 or minus 1 or 0
    var adjust = Math.floor(Math.random() * 5) - 2;

    // assign 1
    this.load[3+adjust][0] += Load["ASSIGN"]*weight;
    this.load[4+adjust][0] += Load["ASSIGN"]*weight;
    // assign 2
    this.load[8+adjust][0] += Load["ASSIGN"]*weight;
    this.load[9+adjust][0] += Load["ASSIGN"]*weight;
    // assign 3
    this.load[12+adjust][0] += Load["ASSIGN"]*weight;
    this.load[13+adjust][0] += Load["ASSIGN"]*weight;

    // assign 1
    this.load[3+adjust][0] += "어사인먼트1이 나왔습니다. ";
    this.load[4+adjust][0] += "어사인먼트1 제출기한이 임박했습니다! ";
    // assign 2
    this.load[8+adjust][0] += "어사인먼트2가 나왔습니다. ";
    this.load[9+adjust][0] += "어사인먼트2 제출기한이 임박했습니다! ";
    // assign 3
    this.load[12+adjust][0] += "어사인먼트3가 나왔습니다. ";
    this.load[13+adjust][0] += "어사인먼트3 제출기한이 임박했습니다! ";
  }

  addLabAssign(weight) {
    for(var i=1; i<16; i++) {
      if( i===7 || i===15 ) {
        continue;
      }
      this.load[i][0] += Load["LABASSIGN"]*weight;
      this.load[i][1] += "랩(TA수업/연습시간) 과제가 있습니다. ";
    }
  }

  addMidTerm(weight) {
    this.load[6][0] += Load["MIDTERM"]*weight;
    this.load[7][0] += Load["MIDTERM"]*weight;

    this.load[6][1] += "중간고사에 대비하세요! ";
    this.load[7][1] += "중간고사가 있습니다! ";
  }

  addFinal(weight) {
    this.load[14][0] += Load["MIDTERM"]*weight;
    this.load[15][0] += Load["MIDTERM"]*weight;

    this.load[14][1] += "기말고사에 대비하세요! ";
    this.load[15][1] += "기말고사가 있습니다! ";
  }

  add3Test(weight) {
    var adjust = Math.floor(Math.random() * 4) - 1;
    this.load[4+adjust][0] += Load["3TEST"]*weight;
    this.load[5+adjust][0] += Load["3TEST"]*weight;
    this.load[9+adjust][0] += Load["3TEST"]*weight;
    this.load[10+adjust][0] += Load["3TEST"]*weight;
    this.load[14][0] += Load["3TEST"]*weight;
    this.load[15][0] += Load["3TEST"]*weight;

    this.load[4+adjust][1] += "첫번째 중간고사에 대비하세요! ";
    this.load[5+adjust][1] += "첫번째 중간고사가 있습니다. ";
    this.load[9+adjust][1] += "두번째 중간고사에 대비하세요! ";
    this.load[10+adjust][1] += "두번째 중간고사가 있습니다. ";
    this.load[14][1] += "기말고사에 대비하세요! ";
    this.load[15][1] += "기말고사가 있습니다! ";
  }

  add4Test(weight) {
    var adjust = Math.floor(Math.random() * 4) - 1;
    this.load[2+adjust][0] += Load["4TEST"]*weight;
    this.load[3+adjust][0] += Load["4TEST"]*weight;
    this.load[6+adjust][0] += Load["4TEST"]*weight;
    this.load[7+adjust][0] += Load["4TEST"]*weight;
    this.load[10+adjust][0] += Load["4TEST"]*weight;
    this.load[11+adjust][0] += Load["4TEST"]*weight;
    this.load[14][0] += Load["4TEST"]*weight;
    this.load[15][0] += Load["4TEST"]*weight;

    this.load[2+adjust][1] += "첫번째 중간고사에 대비하세요! ";
    this.load[3+adjust][1] += "첫번째 중간고사가 있습니다. ";
    this.load[6+adjust][1] += "두번째 중간고사에 대비하세요! ";
    this.load[7+adjust][1] += "두번째 중간고사가 있습니다. ";
    this.load[10+adjust][1] += "두번째 중간고사에 대비하세요! ";
    this.load[11+adjust][1] += "두번째 중간고사가 있습니다. ";
    this.load[14][1] += "기말고사에 대비하세요! ";
    this.load[15][1] += "기말고사가 있습니다! ";
  }

  addMidPresentation(weight, description) {
    var adjust = Math.floor(Math.random() * 5) - 2;
    this.load[4+adjust][0] += Load["PRESENTATION"]*weight;
    this.load[5+adjust][0] += Load["PRESENTATION"]*weight;
    this.load[4+adjust][1] += "중간발표를 준비하세요!"+description+" ";
    this.load[5+adjust][1] += "중간발표가 있습니다."+description+" ";
  }

  addFinalPresentation(weight, description) {
    var adjust = Math.floor(Math.random() * 5) - 2;
    this.load[12+adjust][0] += Load["PRESENTATION"]*weight*2;
    this.load[13+adjust][0] += Load["PRESENTATION"]*weight*2;
    this.load[12+adjust][1] += "기말발표를 준비하세요!"+description+" ";
    this.load[13+adjust][1] += "기말발표가 있습니다."+description+" ";
  }

  addLabReport(weight) {
    for(var i=1; i<16; i++) {
      if( i===7 || i===15 ) {
        continue;
      }
      this.load[i][0] += Load["LABREPORT"]*weight;
      this.load[i][0] += Load["LABREPORT"]*weight;
      this.load[i][1] += "이번 실험의 프리랩 보고서를 작성해야합니다. ";
      this.load[i][1] += "지난 실험의 파이널랩 보고서를 작성해야합니다. ";
    }
  }

  addLoad(load, description, period) {
    this.load[period][0] += load;
    this.load[period][1] += description;
  }

  addGaechongJongchong() {
    this.load[1][0] += 3;
    this.load[14][0] += 3;

    this.load[1][1] += "개총이 있습니다.";
    this.load[14][1] += "종총이 있습니다.";
  }

  addPerformance() {
    this.load[9][0] += 3;
    this.load[10][0] += 3;
    this.load[11][0] += 3;
    this.load[12][0] += 3;
    this.load[13][0] += 6;

    this.load[9][1] += "공연 연습이 있습니다. ";
    this.load[10][1] += "공연 연습이 있습니다. ";;
    this.load[11][1] += "공연 연습이 있습니다. ";;
    this.load[12][1] += "공연 연습이 있습니다. ";;
    this.load[13][1] += "공연이 있습니다! ";;
  }


}

//  SingleEvent pool
var Event = {};


// MATH
Event["현대대수학I"] = new SingleEvent("현대대수학I", 1.5, healthPerLecture, 0, true, "MATH301");  //5, 112시간
Event["현대대수학I"].addQuiz(5);
Event["현대대수학I"].addMidTerm(5);
Event["현대대수학I"].addFinal(5);

Event["해석학I"] = new SingleEvent("해석학I", 1.5, healthPerLecture, 0, true, "MATH311");  //5, 112시간
Event["해석학I"].addQuiz(5);
Event["해석학I"].addMidTerm(5);
Event["해석학I"].addFinal(5);


Event["미분방정식"] = new SingleEvent("미분방정식", 1.5, healthPerLecture, 0, true, "MATH200");  // 1, 22.4시간
Event["미분방정식"].addQuiz(1);
Event["미분방정식"].addMidTerm(1);
Event["미분방정식"].addFinal(1);

Event["확률및통계"] = new SingleEvent("확률및통계", 1.5, healthPerLecture, 0, true, "MATH230");  // 2, 44.8시간
Event["확률및통계"].addQuiz(2);
Event["확률및통계"].addMidTerm(2);
Event["확률및통계"].addFinal(2);

Event["이산수학"] = new SingleEvent("이산수학", 1.5, healthPerLecture, 0, true, "MATH261");  // 1, 22.4시간
Event["이산수학"].addQuiz(1);
Event["이산수학"].addMidTerm(1);
Event["이산수학"].addFinal(1);


// IME
Event["최적화개론"] = new SingleEvent("최적화개론", 1.5, healthPerLecture, 0, true, "IMEN261"); // 1
Event["최적화개론"].add3Test(1);
Event["최적화개론"].addHomeWork4Week(1);

Event["정보시스템기술"] = new SingleEvent("정보시스템기술", 1.5, healthPerLecture, 0, true, "IMEN281");  // 6, 134.4시간
Event["정보시스템기술"].addLabAssign(6);
Event["정보시스템기술"].add3Assign(6);
Event["정보시스템기술"].addMidTerm(6);
Event["정보시스템기술"].addFinal(6);

Event["제품생산공정설계I"] = new SingleEvent("제품생산공정설계I", 1, healthPerLecture*(2/3), 0, true, "IMEN230");  // 1, 14.4시간
Event["제품생산공정설계I"].addMidTerm(1);
Event["제품생산공정설계I"].addFinal(1);
Event["제품생산공정설계I"].addMidPresentation(1, "(동영상)");
Event["제품생산공정설계I"].addFinalPresentation(1, "(동영상)");

Event["실험계획개론"] = new SingleEvent("실험계획개론", 1.5, healthPerLecture, 0, true, "IMEN242"); // 5
Event["실험계획개론"].add3Test(5);
Event["실험계획개론"].addHomeWork2Week(5);

Event["비즈니스플래닝"] = new SingleEvent("비즈니스플래닝", 1.5, healthPerLecture, 0, true, "IMEN412"); // 4
Event["비즈니스플래닝"].addMidTerm(4);
Event["비즈니스플래닝"].addFinal(4);
Event["비즈니스플래닝"].addMidPresentation(4, "(사업계획서)");
Event["비즈니스플래닝"].addFinalPresentation(4, "(사업계획데모, 전문투자자)");

// Chemistry
Event["화학분석"] = new SingleEvent("화학분석", 1.5, healthPerLecture, 0, true, "CHEM243"); // 2
Event["화학분석"].add3Test(2);
Event["화학분석"].addHomeWork4Week(2);

Event["유기화학"] = new SingleEvent("유기화학", 1.5, healthPerLecture, 0, true, "CHEM221"); // 7
Event["유기화학"].add4test(7);
Event["유기화학"].addquiz(7);
Event["유기화학"].addHomeWork4Week(7);

Event["화학수학"] = new SingleEvent("화학수학", 1.5, healthPerLecture, 0, true, "CHEM213"); // 2
Event["화학수학"].addHomeWork4Week(2);

Event["분석화학실험"] = new SingleEvent("분석화학실험", 4.5, healthPerLecture*3, 0, true, "CHEM245"); // 9
Event["분석화학실험"].addQuiz(9);
Event["분석화학실험"].addLabReport(9);
var adjust = Math.floor(Math.random() * 11);
Event["분석화학실험"].addLoad(5, "풀랩 보고서를 준비합니다. ", adjust);
Event["분석화학실험"].addLoad(5, "풀랩 보고서를 위한 실험을 진행합니다. ", adjust+1);
Event["분석화학실험"].addLoad(5, "지난 실험의 풀랩 보고서를 작성합니다. ", adjust+2);
Event["분석화학실험"].addLoad(5, "풀랩 보고서를 마무리합니다. ", adjust+3);

// CE
Event["화공물리화학"] = new SingleEvent("화공물리화학", 1.5, healthPerLecture, 0, true, "CHEB201"); // 5
Event["화공물리화학"].add3Test(5);
Event["화공물리화학"].addHomeWork1Week(5);
Event["화공물리화학"].add4Quiz(5);

Event["화학생명공학"] = new SingleEvent("화학생명공학", 1.5, healthPerLecture, 0, true, "CHEB208"); // 3
Event["화학생명공학"].addMidTerm(3);
Event["화학생명공학"].addFinal(3);
Event["화학생명공학"].add4Quiz(3);

Event["화학생명공학실험"] = new SingleEvent("화학생명공학실험", 4.5, healthPerLecture*3, 0, true, "CHEB213"); // 8
Event["화학생명공학실험"].addQuiz(8);
Event["화학생명공학실험"].addLabReport(8);
var adjust = Math.floor(Math.random() * 11);
Event["화학생명공학실험"].addLoad(5, "풀랩 보고서를 준비합니다. ", adjust);
Event["화학생명공학실험"].addLoad(5, "풀랩 보고서를 위한 실험을 진행합니다. ", adjust+1);
Event["화학생명공학실험"].addLoad(5, "지난 실험의 풀랩 보고서를 작성합니다. ", adjust+2);
Event["화학생명공학실험"].addLoad(5, "풀랩 보고서를 마무리합니다. ", adjust+3);

//Life
Event["생명과학의원리"] = new SingleEvent("생명과학의원리", 1.5, healthPerLecture, 0, true, "LIFE218"); // 6
Event["생명과학의원리"].addHomeWork1Week(6);

Event["생명과학실험원리론및실습"] = new SingleEvent("생명과학실험원리론및실습", 6, healthPerLecture*4, 0, true, "LIFE209"); // 8
Event["생명과학실험원리론및실습"].addQuiz(8);
Event["생명과학실험원리론및실습"].addLabReport(8);
var adjust = Math.floor(Math.random() * 11);
Event["생명과학실험원리론및실습"].addLoad(8, "풀랩 보고서를 준비합니다. ", adjust);
Event["생명과학실험원리론및실습"].addLoad(8, "풀랩 보고서를 위한 실험을 진행합니다. ", adjust+1);
Event["생명과학실험원리론및실습"].addLoad(8, "지난 실험의 풀랩 보고서를 작성합니다. ", adjust+2);
Event["생명과학실험원리론및실습"].addLoad(8, "풀랩 보고서를 마무리합니다. ", adjust+3);

//Event["생태학과야외실습"]


//EE
Event["디지털시스템설계"] = new SingleEvent("디지털시스템설계", 1.5, healthPerLecture, 0, true, "EECE273"); // 9
Event["디지털시스템설계"].addMidTerm(9);
Event["디지털시스템설계"].addFinal(9);
Event["디지털시스템설계"].addHomeWork4Week(9);
for(var i=1; i<8; i++) {
  Event["디지털시스템설계"].addLoad(Load["LABREPORT"]*9,"지난 실험의 보고서를 작성합니다. ");
}
for(var i=8; i<15; i++) {
  Event["디지털시스템설계"].addLoad(Load["LABREPORT"]*9,"텀프로젝트를 진행합니다. ");
}
