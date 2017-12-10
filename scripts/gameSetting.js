let healthPerLecture = -0.005;

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

class SinglePopUpEvent {
  constructor (
    _name, // String
    _department, // 과 연관, 과와 관련 없을 경우
    _time, // boolean array (16주중 되는 시간 true)
    _limit, // 발생 횟수 제한
    _priority, // 성향테스트로 나온 값을 반영
    _description // 설명
  ){
    this.name = _name;
    this.department = _department; // 과, 관련 없으면 null
    this.time = _time; // 없으면 null
    this.limit = _limit; // 발생 최대 횟수 제한 있으면 true 없으면 false
    this.priority = _priority; // general 에서는 0,1,2로 구분, general이 아니면 null
    this.description = _description; // 설명
  }
}

//  체력 0, 학점 1, 인간관계 2

let PopUpEvent = {
  // general pop-up event
  "개총" : new SinglePopUpEvent("개총", null,[1, 2, 3], true, 2, "새로운 학기의 시작은 개총과 함께~?"),
  "대면식" : new SinglePopUpEvent("대면식", null, [4], true, 2, "방학 끝나고 오랜만에 선후배들과 만나니 기분이 좋네요. "),
  "밥약" : new SinglePopUpEvent("밥약", null, null, false, 2, "선배 밥 사주세요!"),
  "엠티" : new SinglePopUpEvent("엠티", null, [1,2,3], true, 2, "그거 아세요? MT는 먹고 토하고의 줄임말이라는거?"),
  "밤샘피방" : new SinglePopUpEvent("밤샘피방", null, null, false, 0, "밤샘으로 수업에 집중을 하나도 못하는 주인공.. 점심 대신 낮잠을 선택해 오후 수업 내내 굶주립니다."),
  "수강신청" : new SinglePopUpEvent("수강신청", null, [13,14], true, 1, "당신의 피지컬을 발휘할 시간!! 하지만 포스텍 와이파이는 느립니다..."),
  "동아리공연" : new SinglePopUpEvent("동아리공연", null, [5,6,12,13], false, 0, "공연 동아리에서 정기공연을 하네요. 지나가는 길에 들려서 음악감상도 하니 기분전환이 되네요."),
  "친구동아리공연" : new SinglePopUpEvent("친구동아리공연", null, [5,6,12,13], false, 2, "친구가 동아리 공연을 보러 오라네요. 가서 친구 이름달고 왕창 먹어야지~"),
  "연애" : new SinglePopUpEvent("연애", null, null, true, 2, " ❤ ❤ ❤"),
  "이별" : new SinglePopUpEvent("이별", null, null, true, 2, "인생은 솔로로 살다가 솔로로 가는 것. 아쉬워하지 말아요."),
  "보고서제출" : new SinglePopUpEvent("보고서제출", null, null, false, 1, "내일까지 보고서 제출인데 이걸 어떻게 다 쓰라는 걸까요???"),
  "술약" : new SinglePopUpEvent("술약", null, null, false, 0, "술이 들어간다~ 쭉!쭉쭉!쭉쭉!"),

  // 과-dependent general pop-up event
  "화학레포트" : new SinglePopUpEvent("레포트", 2, null, false, 3, "오늘은 실험이 있는 날입니다. 어제 프리랩과 파이널랩을 손으로 쓰느라 잠을 한 숨도 못 잤어요 ㅠㅠ 10페이지 가량 쓰다보니 손도 아프고 눈도 아프고…1교시는 가서 졸았어요 ㅠㅠ 다음부터는 미리해야겠어요 "),
  "화학실험" : new SinglePopUpEvent("실험", 2, null, false, 3, "오늘은 실험을 하는데 뷰렛에서 용매를 한방울씩 떨어뜨리래요. 어느 덧 저녁시간이 되서 밥을 시켜먹고 실험을 계속 진행해서 10시에 끝났어요. 기가 빨리는 것 같지만 파트너랑도 친해졌어요"),
  "화학세미나" : new SinglePopUpEvent("술약", 2, null, false, 3, "오늘은 왠일로 실험이 일찍 끝나서 과 친구들과 술을 마시러 갔어요. 갔는데 알코올이 알데하이드로 분해되는 유기화학 이야기를 하네요. 머리가 아파와요.."),
  "화공레포트" : new SinglePopUpEvent("레포트", 9, null, false, 3, "오늘은 실험이 있는 날입니다. 어제 프리랩과 파이널랩을 쓰느라 잠을 한 숨도 못 잤어요 ㅠㅠ 10페이지 가량 쓰다보니 손도 아프고 눈도 아프고…1교시는 가서 졸았어요 ㅠㅠ 다음부터는 미리해야겠어요 "),
  "화공산행" : new SinglePopUpEvent("산행", 9, null, true, 3, "오늘은 교수님들과 화공과 산행을 갔어요. 오랜 만에 맑은 공기도 쐬고 맛있는 것도 먹을 수 있어서 너무 좋았어요. 하지만 다음엔 안 가야겠어요 ㅎㅎ "),
  "화공퀴즈" : new SinglePopUpEvent("퀴즈", 9, null, false, 3, "화요일도 퀴즈, 목요일도 퀴즈, 금요일도 퀴즈… 어떤 과목들은 시험이 3번이라서 퀴즈와 시험이 끝나지 않아요. 공부를 해서 학점은 어느 정도 받을 거 같지만 힘드네요 ㅠㅠ"),
  "화공술약" : new SinglePopUpEvent("술약", 9, null, false, 3, "오늘은 실험이 일찍 끝나서 과 친구들과 술을 마시러 갔어요. 갔는데 알코올이 알데하이드로 분해되는 유기화학 이야기를 하네요. 머리가 아파와요.."),
  "생명산행" : new SinglePopUpEvent("산행",3, null, true, 3 ,"오늘은 교수님들과 산행을 갔어요. 오랜 만에 맑은 공기도 쐬고 맛있는 것도 먹을 수 있어서 너무 좋았어요. 하지만 다음엔 안 가야겠어요 ㅎㅎ " ),
  "생명실험" : new SinglePopUpEvent("실험", 3, null, false, 3, "오늘은 실험을 했어요. 1시부터 시작했는데 뭔가 잘못되서 재실험을 했어요. 12시가 되서야 끝났어요. 기가 빨리는 것 같지만 생명과 친구들과 친해진 것 같기도 해요."),
  "생명술약" : new SinglePopUpEvent("술약", 3, null, false, 3, "오랜만에 과 친구들과 술을 마시러 갔어요. 애들이 술 마시면 세포가 급격하게 죽는데요. 머리가 아파와요"),
  "전자붐붐 EE night": new SinglePopUpEvent("붐붐 EE night", 7, null, true, 3, "오늘은 EE night. 전자과 랩투어도 하고 교수님들과 바비큐 파티도 했어요. 유익했지만 앞으로 어떻게 해야할지 고민이 생겼네요 ㅎㅎ"),
  "전자간담회" : new SinglePopUpEvent("간담회", 7, null, true, 3, "오늘은 전자과 간담회가 있어요. 금요일이라서 쉬려고 했는데 필참이라네요. 교수님과 대화하면서 친분도 쌓은거 같고 밥도 사주셔서 좋았어요.ㅎㅎ"),
  "전자술약" : new SinglePopUpEvent("술약", 7, null, false,3, "오늘은 전자과 친구들과 술을 마시러 갔어요. 스트레스는 풀렸지만 자유전자라서 친해진건지는 잘 모르겠어요"),
  "물리실험" : new SinglePopUpEvent("실험", 1, null, false, 3, "생명과, 화학과만큼은 아니어도 실험시간이 길어 지쳐가는 주인공입니다."),
  "물리휴게실" : new SinglePopUpEvent("휴게실", 1, null, false, 3, "편안한 휴식의 공간일 줄 알고 찾아간 휴게실! 막상 가보니 쇼파나 침대 대신 칸막이 있는 자습실과 칠판이.. 휴식공간이 아니라 공부 공간이었군요. 여기서 휴식을 즐기긴 어려울 것 같네요."),
  "기계시험공부" : new SinglePopUpEvent("시험공부",5, null, false, 3, "시험 문제 풀(pool)이 500문제가 돼서 다 공부하고 시험칠 수 있을지 걱정되네요.."),
  "기계보고서" : new SinglePopUpEvent("보고서", 5, null, false, 3, "실험 과목도 아닌데 실험 보고서를 작성해야 하는 과목이 있네요.. 제출 안하면 실험 점수를 못받는데 관련 내용을 전부 공부하기엔 양이 너무 많습니다. 실험보고서를 쓰고는 있지만 자괴감이 드는 주인공입니다."),
  "기계실험" : new SinglePopUpEvent("실험", 5, null, false, 3, "기계 실험동이 너무 멀어서 저녁 시간에 잡힌 실험을 하러 가기가 힘에 벅찬 주인공입니다."),
  "소재코딩" : new SinglePopUpEvent("코딩", 4, null, false, 3, "엥 소재과에 왠 코딩?!! 뜻밖의 코딩으로 밤을 새게 되는 주인공입니다."),
  "소재회식" : new SinglePopUpEvent("회식", 4, null, true, 3, "과 학생회 친구들과 모여 회식을 했습니다. 다양한 일들을 경험할 수 있어 주인공은 행복합니다."),
  "컴공튜터링" : new SinglePopUpEvent("튜터링", 8, null, false, 3, "튜터링에서 선배의 도움을 받아서 어싸인을 끝냈습니다! 오늘만은 놀아야지~ "),
  "컴공어싸인" : new SinglePopUpEvent("어싸인", 8, null, false, 3, "어싸인을 제출하기도 전에 다음 어싸인이 올라왔어요. 주인공은 끝나지 않을 것만 같은 어싸인 세례에 우울합니다."),
  "수학친목" : new SinglePopUpEvent("친목", 0, null, false, 3, "과 친구들과 친해지고 싶은데 생각보다 다가가기가 쉽지 않네요.. 친목 모임이 거의 없어 주인공은 너무 외롭습니다."),
  "수학퀴즈" : new SinglePopUpEvent("퀴즈", 0, null,false,  3, "매주 있는 퀴즈가 너무도 지겹게 느껴집니다. 오늘  퀴즈를 치러 가지 말지 고민되네요"),
  "산경조모임" : new SinglePopUpEvent("조모임", 6, null, false, 3, "조모임이 너무 많이 잡혀서 두달 째 집에 못가고 있는 주인공. 집이 너무도 그립습니다."),
  "산경시험공부" : new SinglePopUpEvent("시험공부", 6, null, false, 3, "시험기간인데 공부해야 할 ppt분량 100쪽을 넘어갑니다. 눈이 빠질 것 같군요."),
  "산경코딩" : new SinglePopUpEvent("코딩", 6, null, false, 3, "문득 전공이 컴공과인지 헷갈리는 주인공.. 코딩을 많이 해야 하는 주인공은 오늘도 디버깅의 악몽에 시달립니다."),


 }

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
Event["유기화학"].add4Test(7);
Event["유기화학"].addQuiz(7);
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
  Event["디지털시스템설계"].addLoad(Load["LABREPORT"]*9,"지난 실험의 보고서를 작성합니다. ",i);
}
for(var i=8; i<15; i++) {
  Event["디지털시스템설계"].addLoad(Load["LABREPORT"]*9,"텀프로젝트를 진행합니다. ",i);
}
