
let healthPerCircle = -0.01;
let relationshipPerCircle = 0.01;

Event["동아리(공연분과)"] = new SingleEvent("동아리(공연분과)", 1.5, -0.01, 0.01, false, ""); // 추가 로드 18
Event["동아리(공연분과)"].addGaechongJongchong();
Event["동아리(공연분과)"].addPerformance();

Event["동아리(체육분과)"] = new SingleEvent("동아리(체육분과)", 1.5, -0.01, 0.01, false, ""); // 추가 로드 22
Event["동아리(체육분과)"].addGaechongJongchong();
Event["동아리(체육분과)"].addLoad(2,"대회를 준비합니다. ",3);
Event["동아리(체육분과)"].addLoad(2,"대회가 열렸습니다! ",4);
Event["동아리(체육분과)"].addLoad(2,"대회 막바지입니다. ",5);
for( var i=0; i<8; i++ ) {
  Event["동아리(체육분과)"].addLoad(2,"연습 경기가 있습니다. ",i*2);
}

Event["동아리(학술분과)"] = new SingleEvent("동아리(학술분과)", 1.5, -0.01, 0.01, false, ""); // 추가 로드 21
Event["동아리(학술분과)"].addGaechongJongchong();
for( var i=0; i<16; i++ ) {
  if( i===7 || i===15 )
    continue;
  Event["동아리(학술분과)"].addLoad(1.5,"스터디가 있습니다. ",i);
}

Event["동아리(취미분과)"] = new SingleEvent("동아리(취미분과)", 1.5, -0.01, 0.01, false, ""); // 추가 로드 21
Event["동아리(취미분과)"].addGaechongJongchong();
for( var i=0; i<16; i++ ) {
  if( i===7 || i===15 )
    continue;
  Event["동아리(취미분과)"].addLoad(1.5,"취미 모임이 있습니다. ",i);
}

Event["동아리(전시분과)"] = new SingleEvent("동아리(전시분과)", 1.5, -0.01, 0.01, false, ""); // 추가 로드 21
Event["동아리(전시분과)"].addGaechongJongchong();
for( var i=0; i<16; i++ ) {
  if( i===7 || i===15 )
    continue;
  Event["동아리(전시분과)"].addLoad(1.5,"창작 모임이 있습니다. ",i);
}

Event["동아리(사회분과)"] = new SingleEvent("동아리(사회분과)", 1.5, -0.01, 0.01, false, ""); // 추가 로드 21
Event["동아리(사회분과)"].addGaechongJongchong();
for( var i=0; i<16; i++ ) {
  if( i===7 || i===15 )
    continue;
  Event["동아리(사회분과)"].addLoad(1.5,"봉사활동이 있습니다. ",i);
}

// random
Event["과외"] = new SingleEvent("과외", 5, -0.01, 0, false, "");
Event["SMP"] = new SingleEvent("SMP", 5, -0.01, 0, false, "");
Event["학생단체"] = new SingleEvent("학생단체", 5, -0.01, 0, false, "");
Event["여행"] = new SingleEvent("여행", 5, -0.01, 0, false, "");
