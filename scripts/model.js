
/*
thisGame.timeTable[0][2] = Event["현대대수학I"];
thisGame.timeTable[2][2] = Event["현대대수학I"];

thisGame.timeTable[0][3] = Event["확률및통계"];
thisGame.timeTable[2][3] = Event["확률및통계"];

thisGame.timeTable[1][1] = Event["이산수학"];
thisGame.timeTable[3][1] = Event["이산수학"];

thisGame.timeTable[1][3] = Event["해석학I"];
thisGame.timeTable[3][3] = Event["해석학I"];

thisGame.timeTable[1][5] = Event["미분방정식"];
thisGame.timeTable[3][5] = Event["미분방정식"];

*/
var lectureList = new Array(5);
//  동아리도 들어가야됨
lectureList[0] = Event["현대대수학I"];
lectureList[1] = Event["확률및통계"];
lectureList[2] = Event["이산수학"];
lectureList[3] = Event["해석학I"];
lectureList[4] = Event["미분방정식"];

function calculateLoad(lecture) {
  for(var i=0; i<16; i++)
    thisGame.load += lecture.load[i][0];
}

calculateLoad(Event["현대대수학I"]);
calculateLoad(Event["확률및통계"]);
calculateLoad(Event["이산수학"]);
calculateLoad(Event["해석학I"]);
calculateLoad(Event["미분방정식"]);



function model() { // 일단은 1주 진행
  var capacity=0;
  var loadTillNow = 0;
  var completedLoad = 0;
  //  총 수행한 로드 / grade = (총 수행한 로드)/(전체 로드)
  for (let week =0; week < 16; week++){
    //7 * 11 시간표 배열이 넘어온다고 가정 (7일 10교시 + 10시 이후)
    // 16주 동안 진행하고, 16개의 이벤트 발생 -> critical 이벤트?
    var capacityPerWeek = 0;
    //  얘는 한 주 동안 남은 시간을 계산하여 과제, 공부, 체력충전으로 전환시킴

    for(var i=0; i < lectureList.length; i++) {
      console.log(lectureList[i].lectureNumber+": "+lectureList[i].name+"\n");
      console.log(lectureList[i].load[week][1]);
    }
    for (let day = 0; day < 7; day++){
      var firstPeriod = -1;

      for (let peri = 0; peri < 11; peri++){
        if( thisGame.timeTable[day][peri] !== undefined &&
          thisGame.timeTable[day][peri] !== "" && firstPeriod == -1)
          firstPeriod = peri;
        } // 첫 수업시간 찾음

        capacity = capacityUpdate(firstPeriod);
        //console.log("오늘의 가용시간: "+capacity+"\n");

        for (let peri = firstPeriod; peri < 11; peri++){
          if (thisGame.timeTable[day][peri] === undefined ||
            thisGame.timeTable[day][peri] === "") continue;
          let nowEvent = thisGame.timeTable[day][peri];

          thisGame.status.health += statUpdate(nowEvent.deltaHealth*timeDependency(peri));
          thisGame.status.relationship += statUpdate(nowEvent.deltaRelationship);
          capacity -= nowEvent.duration;
          // 스텟 업데이트, 가용시간 - 소모시간
        }
        //console.log("오늘의 남은시간: "+capacity+"\n");
        if( capacity <= 0 ) {
          capacity = 0;
        }
        // 가용시간은 0 이하로 내려갈 수 없음

        capacityPerWeek += capacity;
        // 남은 시간은 주간 가용시간으로 넘김
      }
      completedLoad = weekCapacityUpdate(capacityPerWeek, completedLoad, week);
      for(var i=0; i<lectureList.length; i++) {
        loadTillNow += lectureList[i].load[week][0];
      }
      thisGame.status.grade = completedLoad/loadTillNow;
      // 주간 로드 반영

      console.log(week+1+"주차 / 현재 체력: "+thisGame.status.health+"\n");
      console.log(week+1+"주차 / 남은 가용시간: "+capacityPerWeek+"\n");
      console.log(week+1+"주차 / 현재 성적: "+thisGame.status.grade+"\n");
      console.log("총 수행한 로드(누적): "+completedLoad+"\n");
      eventHandler(week+1);
      // 이벤트 발생 -> 랜덤 발생하는 알고리즘 필요
    }
    console.log("이번 학기의 총 로드: "+thisGame.load);
    console.log("Grade: "+completedLoad/thisGame.load);
}

function capacityUpdate(firstPeriod){
  var wakeUpTime = 8 + 1.5 * firstPeriod;
  var tempCapacity = 24;
  tempCapacity -= wakeUpTime;
  // 가용시간을 24시 - 오전 첫 수업 시간로 업데이트

  tempCapacity -= thisDuration.meal;
  tempCapacity -= thisDuration.dinguldingul;
  // 밥먹는 시간, 뒹굴거리는 시간 뻄

  tempCapacity -= thisDuration.circle;
  tempCapacity -= thisDuration.hobby;
  //  동아리, 취미 시간 뺌

  return tempCapacity;
}

function statUpdate(deltastat) {
  return 1 * deltastat;
} // stat을 조절하는 function

function timeDependency(period) {
  switch(period){
    case Period["AM 8:00"] : return 1.3;
    case Period["AM 9:30"] : return 1.2;
    case Period["AM 11:00"] : return 1.1;
    default : return 1;
  }
  return nowEvent.deltaHealth
} // 시간에 따른 체력 변화량 조절 (오전 수업 체력 소모량 가중치 있음)

function weekCapacityUpdate(capacityPerWeek, completedLoad, week) {
  // 주간 스탯 변화량
  var tempLoadPerWeek = 0;
  for(var i=0; i<lectureList.length; i++) {
    tempLoadPerWeek += lectureList[i].load[week][0];
  }

  if( capacityPerWeek > tempLoadPerWeek ) {
    // 남은 주간 가용시간이 해야할 일보다 많을 때
    completedLoad += tempLoadPerWeek;
    capacityPerWeek -= tempLoadPerWeek;

    // 수행한 로드의 0.005배가 체력에서 깎임
    thisGame.status.health -= tempLoadPerWeek*0.005;

    // 남은 시간의 0.01배가 체력으로 들어감
    thisGame.status.health += capacityPerWeek*0.01;

    // 체력은 1보다 클 수 없음
    if( thisGame.status.health >= 1 )
      thisGame.status.health = 1;
  }
  else {
    // 남은 주간 가용시간이 해야할 일보다 적을 때
    completedLoad += capacityPerWeek;

    // 수행한 로드의 0.005배가 체력에서 깎임
    thisGame.status.health -= capacityPerWeek*0.005;
  }
  // capacityPerWeek을 과제, 공부, 체력충전으로 전환

  console.log(week+"주차 / 수행해야 할 로드: "+tempLoadPerWeek+"\n");
  return completedLoad;
}


function eventHandler(week) {
  // 일주일 한번 일어남, 과 관련 이벤트는 일정 확률, 이외에는 상황에 맞는 general event

    for (let key in PopUpEvent){
      // 과 관련 이벤트 loop
      let val = PopUpEvent[key];
      if (val.time === null && (week === 7 || week === 8)) continue;
      if (val.department === thisGame.department && val.priority === 3){
         // 과 dependent 이벤트
        if ( val.time === week || val.time === null){
          // 시간이 상관없음이거나 해당하는 week인 경우
          if(Math.random() < 1/16){
            var dialoglist=[];

            var dialog = new PIXI.Sprite.fromImage('room/dialog.png');
            dialoglist.push(dialog);
            app.stage.addChild(dialog);

            var eventstyle = new PIXI.TextStyle({
            fontFamily: 'Consolas',
            fontSize: 50,
            fill: ['#000000'],
            wordWrap: true,
            wordWrapWidth: 1500 // gradient
             //backgroundColor:"green"
            });
            var eventstyle2 = new PIXI.TextStyle({
            fontFamily: 'Consolas',
            fontSize: 65,
            fontWeight: 'bold',
            fill: ['#000000'],
            wordWrap: true,
            wordWrapWidth: 900
             // gradient
             //backgroundColor:"green"
            });

            var inputTxt=val.description;
            var richText = new PIXI.Text(inputTxt,eventstyle);
            richText.anchor.set(0.5);
            richText.x = 1920/2;
            richText.y = 900;
            app.stage.addChild(richText);
            dialoglist.push(richText);

            var inputTxt2="Event! "+val.name;
            var richText2 = new PIXI.Text(inputTxt2,eventstyle2);
            richText2.x = 270;
            richText2.y = 770;
            app.stage.addChild(richText2);
            dialoglist.push(richText2);


            console.log(week+1+"주차 이벤트 :");
            console.log(val.description);

            thisGame.eventCount++;
            val.eventCount++;
            return dialoglist;
          }
        }
      }
      else if (val.department === null){
        let flag = false;

        for (let time in val.time){
          if (time === week) flag = true;
        }

        if (flag === false && val.time !== null) continue;
        if(Math.random() < 2/16){

          console.log(week+"주차 이벤트 :");
          console.log(val.description);
          if(val.priority === 0) // 체력 관련
            thisGame.health *= 0.95;
          else if (val.priority === 1) // 성적 관련
            thisGame.grade *= 0.95;
          else if (val.priority === 2) // 인간관계 관련
            thisGame.relationship *= 0.95;
          thisGame.eventCount++;
          val.eventCount++;
          return;
        }
      }
    }
}
//////////////////////////////////////////////////////////UI///////////////////////////////////////////////////////////

var app = new PIXI.Application(1920, 1080, {backgroundColor : 0x1099bb});
document.body.appendChild(app.view);






var room = PIXI.Sprite.fromImage('room/room_default_day.png');
room.y+=100;
app.stage.addChild(room);

var bunny = PIXI.Sprite.fromImage('room/room_default_ponix.png');
// center the sprite's anchor point
//bunny.anchor.set(0.5);
// move the sprite to the center of the screen
//bunny.x = app.renderer.width *0.5;
//bunny.y = app.renderer.height *0.6;

bunny.y+=100
app.stage.addChild(bunny);


/*
var leftblock = new PIXI.Graphics();
  //leftblock.lineStyle(2, 0xFF00FF, 1);
  leftblock.beginFill(0x1099bb, 1);
  leftblock.drawRect(0, 100, 500, 130);
  app.stage.addChild(leftblock);
*/
var rightblock = new PIXI.Graphics();
  //rightblock.lineStyle(2, 0xFF00FF, 1);
  rightblock.beginFill(0xfff8dc, 1);
  rightblock.drawRect(360,0,1200,240);
  rightblock.lineStyle(4, 0xffd900, 1);
  app.stage.addChild(rightblock);
  rightblock.endFill();





 var capacity=0;
var completedLoad = 0;
week1();
function week1()
{

  //  총 수행한 로드 / grade = (총 수행한 로드)/(전체 로드)
  week=0;
    //7 * 11 시간표 배열이 넘어온다고 가정 (7일 10교시 + 10시 이후)
    // 16주 동안 진행하고, 16개의 이벤트 발생 -> critical 이벤트?
    var capacityPerWeek = 0;
    //  얘는 한 주 동안 남은 시간을 계산하여 과제, 공부, 체력충전으로 전환시킴

    for (let day = 0; day < 7; day++){
      var firstPeriod = -1;

      for (let peri = 0; peri < 11; peri++){
        if( thisGame.timeTable[day][peri] !== undefined &&
          thisGame.timeTable[day][peri] !== "" && firstPeriod == -1)
          firstPeriod = peri;
        } // 첫 수업시간 찾음

        capacity = capacityUpdate(firstPeriod);
        console.log("오늘의 가용시간: "+capacity+"\n");

        for (let peri = firstPeriod; peri < 11; peri++){
          if (thisGame.timeTable[day][peri] === undefined ||
            thisGame.timeTable[day][peri] === "") continue;
          let nowEvent = thisGame.timeTable[day][peri];

          thisGame.status.health += statUpdate(nowEvent.deltaHealth*timeDependency(peri));
          thisGame.status.relationship += statUpdate(nowEvent.deltaRelationship);
          capacity -= nowEvent.duration;
          // 스텟 업데이트, 가용시간 - 소모시간
        }
        console.log("오늘의 남은시간: "+capacity+"\n");
        if( capacity <= 0 ) {
          capacity = 0;
        }
        // 가용시간은 0 이하로 내려갈 수 없음

        capacityPerWeek += capacity;
        // 남은 시간은 주간 가용시간으로 넘김
      }
      completedLoad = weekCapacityUpdate(capacityPerWeek, completedLoad, week);
      // 주간 로드 반영

      console.log(week+"주차 / 현재 체력: "+thisGame.status.health+"\n");
      console.log(week+"주차 / 남은 가용시간: "+capacityPerWeek+"\n");
      console.log("총 수행한 로드(누적): "+completedLoad+"\n");

      //eventHandler(0);
      //eventProcess(week);
      // 이벤트 발생 -> 랜덤 발생하는 알고리즘 필요

      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////   UI

    var eventstyle = new PIXI.TextStyle({
    fontFamily: 'Consolas',
    fontSize: 25,
    fill: ['#000000'], // gradient
     //backgroundColor:"green"

    });

    var totalTextList;
    var richTextList=[];

    for(var i=0; i < lectureList.length; i++) {

    for(var j=0;j<i;j++)
    {
    }
      console.log(lectureList[i].lectureNumber+": "+lectureList[i].name+"\n");
      console.log(lectureList[i].load[week][1]);
      var inputTxt = lectureList[i].name +"의 로드 "+lectureList[i].load[week][1]+'\n';
      totalTextList+=inputTxt;
      var richText = new PIXI.Text(inputTxt,eventstyle);
      richText.anchor.set(0.5);
      richText.x = 960;
      richText.y = 1080/4-30;
      richTextList.push(richText);
    }
    var a=0;
    var b=0;
    var length=lectureList.length;
    var deltatime=40;
    var eraser;
    var totalTextList="1주차의 로그\n\n";
    function erasedialog(eraser)
    {
      if(eraser===NaN||eraser===undefined)
        return;
      for(i=0;i<eraser.length;i++)
      {
        app.stage.removeChild(eraser[i]);
      }
    }

    app.stage.addChild(richTextList[0]);

    var timing = Math.floor(Math.random() * (lectureList.length-1)*deltatime);

    var ticker1=new PIXI.ticker.Ticker();
    ticker1.start();
    ticker1.add(()=>
    {
      a++;
      if(a===timing)
        eraser=eventHandler(0);
      if(a===deltatime*lectureList.length-10)
      {
        if(eraser!==NaN&&eraser!==undefined)
        {
          totalTextList+=eraser[1].text;
          totalTextList+='\n';
        }
        erasedialog(eraser);
        week_end_1();


      }
      else if(a%deltatime===0)
      {
        //console.log(a/deltatime+"생성");
        app.stage.addChild(richTextList[a/deltatime])
      }

      else if(a<deltatime*1&&richTextList[0].y>210)
      {
        //console.log("1");
        richTextList[0].y-=3;
      }
      else if(a<deltatime*2 &&a>deltatime*1-10&& richTextList[1].y>210)
      {
        //console.log("2");
        richTextList[0].y-=3;
        richTextList[1].y-=3;
      }
      else if(a<deltatime*3 &&a>deltatime*2-10&& richTextList[2].y>210)
      {
        //console.log("3");
        richTextList[0].y-=3;
        richTextList[1].y-=3;
        richTextList[2].y-=3;
      }
      else if(a<deltatime*4 &&a>deltatime*3-10&&richTextList[3].y>210)
      {
        //console.log("4");
        richTextList[0].y-=3;
        richTextList[1].y-=3;
        richTextList[2].y-=3;
        richTextList[3].y-=3;
      }
      else if(a<deltatime*5 && a>deltatime*4-10&&richTextList[4].y>210)
      {
        //console.log("5");
        richTextList[0].y-=3;
        richTextList[1].y-=3;
        richTextList[2].y-=3;
        richTextList[3].y-=3;
        richTextList[4].y-=3;
      }

      else if(a<deltatime*6 && a>deltatime*5-10 && richTextList[5].y>210)
      {
        //console.log("6");
        richTextList[0].y-=3;
        richTextList[1].y-=3;
        richTextList[2].y-=3;
        richTextList[3].y-=3;
        richTextList[4].y-=3;
        richTextList[5].y-=3;
      }
       else if(a<deltatime*7 && a>deltatime*6-10 && richTextList[6].y>210)
      {
        //console.log("7");
        richTextList[0].y-=3;
        richTextList[1].y-=3;
        richTextList[2].y-=3;
        richTextList[3].y-=3;
        richTextList[4].y-=3;
        richTextList[5].y-=3;
        richTextList[6].y-=3;
      }
      else if(a<deltatime*8 && a>deltatime*7-10 && richTextList[7].y>210)
      {
        //console.log("8");
        richTextList[0].y-=3;
        richTextList[1].y-=3;
        richTextList[2].y-=3;
        richTextList[3].y-=3;
        richTextList[4].y-=3;
        richTextList[5].y-=3;
        richTextList[6].y-=3;
        richTextList[7].y-=3;
      }
    });


  //setTimeout('week2()',8000 );


function week_end_1(){
   var block = new PIXI.Graphics();
   var block = new PIXI.Graphics();
      block.beginFill(0xffffff, 0.75);
      block.drawRect(0,0,1920,1080);
      block.lineStyle(4, 0xffd900, 1);
      block.endFill();
      app.stage.addChild(block);
   var dialog = new PIXI.Sprite.fromImage('room/dialog.png');
   dialog.scale.y*=3;
   dialog.y-=2000;
    app.stage.addChild(dialog);


    var button = new PIXI.Graphics();
    button.beginFill(0x330000);
    button.drawRoundedRect(1920/2-80,880,160,100,15);
    app.stage.addChild(button);

    button.buttonMode = true;
    button.interactive = true;


    var hwaginstyle = new PIXI.TextStyle({
  fontFamily: 'Consolas',
  fontSize: 40,
  fill: ['#ffffff'], // gradient
  stroke: '#4a1850'
  });

  var hwaginText = new PIXI.Text("확인",hwaginstyle);
  hwaginText.anchor.set(0.5,0);
  hwaginText.x = 1920/2;
  hwaginText.y = 910;
  app.stage.addChild(hwaginText);

var richTextList=[];
var inputTxt;
  for(var i=0; i < lectureList.length; i++) {

   for(var j=0;j<i;j++)
   {
     richTextList[j].y-=100;
   }
     inputTxt = lectureList[i].name +": "+lectureList[i].load[week][1]+'\n';
     totalTextList+=inputTxt;
     var richText = new PIXI.Text(inputTxt,eventstyle);
     richText.anchor.set(0.5);
     richText.x = 1920/2;
     richText.y = 1080/2+100;
     //app.stage.addChild(richText);
     richTextList.push(richText);


     }

    var totalTextListstyle = new PIXI.TextStyle({
   fontFamily: 'Consolas',
   fontSize: 40,
   lineHeight: 50,
   fill: ['#000000'], // gradient
      //backgroundColor:"green"
      wordWrap: true,
    wordWrapWidth: 1500
   });

    var richText = new PIXI.Text(totalTextList,totalTextListstyle);
     richText.anchor.set(0.5);
     richText.x = 960;
     richText.y = 1080/2;
     app.stage.addChild(richText);
    button
      .on('pointerdown', week_end_onButtonDown)
      .on('pointerup', week_end_onButtonUp)
      .on('pointeroutside', week_end_onButtonUp)
      .on('pointerover', week_end_onButtonOver)
      .on('pointerout', week_end_onButtonOut)


    function week_end_onButtonDown(){

    }
    function week_end_onButtonUp(){
      app.stage.removeChild(dialog);
      app.stage.removeChild(this);
      app.stage.removeChild(hwaginText);
      app.stage.removeChild(richText);
      app.stage.removeChild(block);


      var rightblock = new PIXI.Graphics();
      //rightblock.lineStyle(2, 0xFF00FF, 1);
      rightblock.beginFill(0xfff8dc, 1);
      rightblock.drawRect(360,0,1200,240);
      rightblock.lineStyle(4, 0xffd900, 1);
      rightblock.endFill();
      app.stage.addChild(rightblock);
      week16();
    }
    function week_end_onButtonOver(){

    }
    function week_end_onButtonOut(){

    }

}
}




function week2 ()
{

  //  총 수행한 로드 / grade = (총 수행한 로드)/(전체 로드)
  week=1;
    //7 * 11 시간표 배열이 넘어온다고 가정 (7일 10교시 + 10시 이후)
    // 16주 동안 진행하고, 16개의 이벤트 발생 -> critical 이벤트?
    var capacityPerWeek = 0;
    //  얘는 한 주 동안 남은 시간을 계산하여 과제, 공부, 체력충전으로 전환시킴

    for (let day = 0; day < 7; day++){
      var firstPeriod = -1;

      for (let peri = 0; peri < 11; peri++){
        if( thisGame.timeTable[day][peri] !== undefined &&
          thisGame.timeTable[day][peri] !== "" && firstPeriod == -1)
          firstPeriod = peri;
        } // 첫 수업시간 찾음

        capacity = capacityUpdate(firstPeriod);
        console.log("오늘의 가용시간: "+capacity+"\n");

        for (let peri = firstPeriod; peri < 11; peri++){
          if (thisGame.timeTable[day][peri] === undefined ||
            thisGame.timeTable[day][peri] === "") continue;
          let nowEvent = thisGame.timeTable[day][peri];

          thisGame.status.health += statUpdate(nowEvent.deltaHealth*timeDependency(peri));
          thisGame.status.relationship += statUpdate(nowEvent.deltaRelationship);
          capacity -= nowEvent.duration;
          // 스텟 업데이트, 가용시간 - 소모시간
        }
        console.log("오늘의 남은시간: "+capacity+"\n");
        if( capacity <= 0 ) {
          capacity = 0;
        }
        // 가용시간은 0 이하로 내려갈 수 없음

        capacityPerWeek += capacity;
        // 남은 시간은 주간 가용시간으로 넘김
      }
      completedLoad = weekCapacityUpdate(capacityPerWeek, completedLoad, week);
      // 주간 로드 반영

      console.log(week+"주차 / 현재 체력: "+thisGame.status.health+"\n");
      console.log(week+"주차 / 남은 가용시간: "+capacityPerWeek+"\n");
      console.log("총 수행한 로드(누적): "+completedLoad+"\n");

      //eventHandler(0);
      //eventProcess(week);
      // 이벤트 발생 -> 랜덤 발생하는 알고리즘 필요

      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////   UI

    var eventstyle = new PIXI.TextStyle({
    fontFamily: 'Consolas',
    fontSize: 25,
    fill: ['#000000'], // gradient
     //backgroundColor:"green"

    });

    var totalTextList;
    var richTextList=[];

    for(var i=0; i < lectureList.length; i++) {

    for(var j=0;j<i;j++)
    {
      //richTextList[j].y-=100;
    }
      console.log(lectureList[i].lectureNumber+": "+lectureList[i].name+"\n");
      console.log(lectureList[i].load[week][1]);
      var inputTxt = lectureList[i].name +"의 로드: "+lectureList[i].load[week][1]+'\n';
      totalTextList+=inputTxt;
      var richText = new PIXI.Text(inputTxt,eventstyle);
      richText.anchor.set(0.5);
      richText.x = 960;
      richText.y = 1080/4-30;

      //app.stage.addChild(richText);
      richTextList.push(richText);
    }
    var a=0;
    var b=0;
    var length=lectureList.length;
    var deltatime=40;
    var eraser;
    var totalTextList="2주차의 로그\n\n";
    function erasedialog(eraser)
    {

        if(eraser===NaN||eraser===undefined)
          return;
      for(i=0;i<eraser.length;i++)
      {
        app.stage.removeChild(eraser[i]);
      }
    }

    app.stage.addChild(richTextList[0]);

    var timing = Math.floor(Math.random() * (lectureList.length-1)*deltatime);

    var ticker1=new PIXI.ticker.Ticker();
    ticker1.start();
    ticker1.add(()=>
    {
      a++;
      if(a===timing)
        eraser=eventHandler(0);
      if(a===deltatime*lectureList.length-10)
      {
        if(eraser!==NaN&&eraser!==undefined)
        {
         totalTextList+=eraser[1].text;
         totalTextList+='\n';
        }
        erasedialog(eraser);
        week_end_2();


      }
      else if(a%deltatime===0)
      {
        //console.log(a/deltatime+"생성");
        app.stage.addChild(richTextList[a/deltatime])
      }

      else if(a<deltatime*1&&richTextList[0].y>210)
      {
        //console.log("1");
        richTextList[0].y-=3;
      }
      else if(a<deltatime*2 &&a>deltatime*1-10&& richTextList[1].y>210)
      {
        //console.log("2");
        richTextList[0].y-=3;
        richTextList[1].y-=3;
      }
      else if(a<deltatime*3 &&a>deltatime*2-10&& richTextList[2].y>210)
      {
        //console.log("3");
        richTextList[0].y-=3;
        richTextList[1].y-=3;
        richTextList[2].y-=3;
      }
      else if(a<deltatime*4 &&a>deltatime*3-10&&richTextList[3].y>210)
      {
        //console.log("4");
        richTextList[0].y-=3;
        richTextList[1].y-=3;
        richTextList[2].y-=3;
        richTextList[3].y-=3;
      }
      else if(a<deltatime*5 && a>deltatime*4-10&&richTextList[4].y>210)
      {
        //console.log("5");
        richTextList[0].y-=3;
        richTextList[1].y-=3;
        richTextList[2].y-=3;
        richTextList[3].y-=3;
        richTextList[4].y-=3;
      }

      else if(a<deltatime*6 && a>deltatime*5-10 && richTextList[5].y>210)
      {
        //console.log("6");
        richTextList[0].y-=3;
        richTextList[1].y-=3;
        richTextList[2].y-=3;
        richTextList[3].y-=3;
        richTextList[4].y-=3;
        richTextList[5].y-=3;
      }
       else if(a<deltatime*7 && a>deltatime*6-10 && richTextList[6].y>210)
      {
        //console.log("7");
        richTextList[0].y-=3;
        richTextList[1].y-=3;
        richTextList[2].y-=3;
        richTextList[3].y-=3;
        richTextList[4].y-=3;
        richTextList[5].y-=3;
        richTextList[6].y-=3;
      }
      else if(a<deltatime*8 && a>deltatime*7-10 && richTextList[7].y>210)
      {
        //console.log("8");
        richTextList[0].y-=3;
        richTextList[1].y-=3;
        richTextList[2].y-=3;
        richTextList[3].y-=3;
        richTextList[4].y-=3;
        richTextList[5].y-=3;
        richTextList[6].y-=3;
        richTextList[7].y-=3;
      }
    });


  //setTimeout('week2()',8000 );


function week_end_2(){
   var block = new PIXI.Graphics();
   var block = new PIXI.Graphics();
      block.beginFill(0xffffff, 0.75);
      block.drawRect(0,0,1920,1080);
      block.lineStyle(4, 0xffd900, 1);
      block.endFill();
      app.stage.addChild(block);
   var dialog = new PIXI.Sprite.fromImage('room/dialog.png');
   dialog.scale.y*=3;
   dialog.y-=2000;
    app.stage.addChild(dialog);


    var button = new PIXI.Graphics();
    button.beginFill(0x330000);
    button.drawRoundedRect(1920/2-80,880,160,100,15);
    app.stage.addChild(button);

    button.buttonMode = true;
    button.interactive = true;


    var hwaginstyle = new PIXI.TextStyle({
  fontFamily: 'Consolas',
  fontSize: 40,
  fill: ['#ffffff'], // gradient
  stroke: '#4a1850'
  });

  var hwaginText = new PIXI.Text("확인",hwaginstyle);
  hwaginText.anchor.set(0.5,0);
  hwaginText.x = 1920/2;
  hwaginText.y = 910;
  app.stage.addChild(hwaginText);

var richTextList=[];
var inputTxt;
  for(var i=0; i < lectureList.length; i++) {

   for(var j=0;j<i;j++)
   {
     richTextList[j].y-=100;
   }
     inputTxt = lectureList[i].name +": "+lectureList[i].load[week][1]+'\n';
     totalTextList+=inputTxt;
     var richText = new PIXI.Text(inputTxt,eventstyle);
     richText.anchor.set(0.5);
     richText.x = 1920/2;
     richText.y = 1080/2+100;
     //app.stage.addChild(richText);
     richTextList.push(richText);


     }

    var totalTextListstyle = new PIXI.TextStyle({
   fontFamily: 'Consolas',
   fontSize: 40,
   lineHeight: 50,
   fill: ['#000000'], // gradient
      //backgroundColor:"green"
      wordWrap: true,
    wordWrapWidth: 1500
   });

    var richText = new PIXI.Text(totalTextList,totalTextListstyle);
     richText.anchor.set(0.5);
     richText.x = 1920/2;
     richText.y = 1080/2;
     app.stage.addChild(richText);
    button
      .on('pointerdown', week_end_onButtonDown)
      .on('pointerup', week_end_onButtonUp)
      .on('pointeroutside', week_end_onButtonUp)
      .on('pointerover', week_end_onButtonOver)
      .on('pointerout', week_end_onButtonOut)


    function week_end_onButtonDown(){

    }
    function week_end_onButtonUp(){
      app.stage.removeChild(dialog);
      app.stage.removeChild(this);
      app.stage.removeChild(hwaginText);
      app.stage.removeChild(richText);
      app.stage.removeChild(block);


      var rightblock = new PIXI.Graphics();
      //rightblock.lineStyle(2, 0xFF00FF, 1);
      rightblock.beginFill(0xfff8dc, 1);
      rightblock.drawRect(360,0,1200,240);
      rightblock.lineStyle(4, 0xffd900, 1);
      rightblock.endFill();
      app.stage.addChild(rightblock);
      week3();
    }
    function week_end_onButtonOver(){

    }
    function week_end_onButtonOut(){

    }

}
}


function week3()
{

  //  총 수행한 로드 / grade = (총 수행한 로드)/(전체 로드)
  week=2;
    //7 * 11 시간표 배열이 넘어온다고 가정 (7일 10교시 + 10시 이후)
    // 16주 동안 진행하고, 16개의 이벤트 발생 -> critical 이벤트?
    var capacityPerWeek = 0;
    //  얘는 한 주 동안 남은 시간을 계산하여 과제, 공부, 체력충전으로 전환시킴

    for (let day = 0; day < 7; day++){
      var firstPeriod = -1;

      for (let peri = 0; peri < 11; peri++){
        if( thisGame.timeTable[day][peri] !== undefined &&
          thisGame.timeTable[day][peri] !== "" && firstPeriod == -1)
          firstPeriod = peri;
        } // 첫 수업시간 찾음

        capacity = capacityUpdate(firstPeriod);
        console.log("오늘의 가용시간: "+capacity+"\n");

        for (let peri = firstPeriod; peri < 11; peri++){
          if (thisGame.timeTable[day][peri] === undefined ||
            thisGame.timeTable[day][peri] === "") continue;
          let nowEvent = thisGame.timeTable[day][peri];

          thisGame.status.health += statUpdate(nowEvent.deltaHealth*timeDependency(peri));
          thisGame.status.relationship += statUpdate(nowEvent.deltaRelationship);
          capacity -= nowEvent.duration;
          // 스텟 업데이트, 가용시간 - 소모시간
        }
        console.log("오늘의 남은시간: "+capacity+"\n");
        if( capacity <= 0 ) {
          capacity = 0;
        }
        // 가용시간은 0 이하로 내려갈 수 없음

        capacityPerWeek += capacity;
        // 남은 시간은 주간 가용시간으로 넘김
      }
      completedLoad = weekCapacityUpdate(capacityPerWeek, completedLoad, week);
      // 주간 로드 반영

      console.log(week+"주차 / 현재 체력: "+thisGame.status.health+"\n");
      console.log(week+"주차 / 남은 가용시간: "+capacityPerWeek+"\n");
      console.log("총 수행한 로드(누적): "+completedLoad+"\n");

      //eventHandler(0);
      //eventProcess(week);
      // 이벤트 발생 -> 랜덤 발생하는 알고리즘 필요

      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////   UI

    var eventstyle = new PIXI.TextStyle({
    fontFamily: 'Consolas',
    fontSize: 25,
    fill: ['#000000'], // gradient
     //backgroundColor:"green"
    });

    var totalTextList;
    var richTextList=[];

    for(var i=0; i < lectureList.length; i++) {

    for(var j=0;j<i;j++)
    {
      //richTextList[j].y-=100;
    }
      console.log(lectureList[i].lectureNumber+": "+lectureList[i].name+"\n");
      console.log(lectureList[i].load[week][1]);
      var inputTxt = lectureList[i].name +"의 로드: "+lectureList[i].load[week][1]+'\n';
      totalTextList+=inputTxt;
      var richText = new PIXI.Text(inputTxt,eventstyle);
      richText.anchor.set(0.5);
      richText.x = 960;
      richText.y = 1080/4-30;
      //app.stage.addChild(richText);
      richTextList.push(richText);
    }
    var a=0;
    var b=0;
    var length=lectureList.length;
    var deltatime=40;
    var eraser;
    var totalTextList="3주차의 로그\n\n";
    function erasedialog(eraser)
    {

        if(eraser===NaN||eraser===undefined)
          return;
      for(i=0;i<eraser.length;i++)
      {
        app.stage.removeChild(eraser[i]);
      }
    }

    app.stage.addChild(richTextList[0]);

    var timing = Math.floor(Math.random() * (lectureList.length-1)*deltatime);

    var ticker1=new PIXI.ticker.Ticker();
    ticker1.start();
    ticker1.add(()=>
    {
      a++;
      if(a===timing)
        eraser=eventHandler(0);
      if(a===deltatime*lectureList.length-10)
      {
        if(eraser!==NaN&&eraser!==undefined)
        {
         totalTextList+=eraser[1].text;
         totalTextList+='\n';
        }
        erasedialog(eraser);
        week_end_3();


      }
      else if(a%deltatime===0)
      {
        //console.log(a/deltatime+"생성");
        app.stage.addChild(richTextList[a/deltatime])
      }

      else if(a<deltatime*1&&richTextList[0].y>210)
      {
        //console.log("1");
        richTextList[0].y-=3;
      }
      else if(a<deltatime*2 &&a>deltatime*1-10&& richTextList[1].y>210)
      {
        //console.log("2");
        richTextList[0].y-=3;
        richTextList[1].y-=3;
      }
      else if(a<deltatime*3 &&a>deltatime*2-10&& richTextList[2].y>210)
      {
        //console.log("3");
        richTextList[0].y-=3;
        richTextList[1].y-=3;
        richTextList[2].y-=3;
      }
      else if(a<deltatime*4 &&a>deltatime*3-10&&richTextList[3].y>210)
      {
        //console.log("4");
        richTextList[0].y-=3;
        richTextList[1].y-=3;
        richTextList[2].y-=3;
        richTextList[3].y-=3;
      }
      else if(a<deltatime*5 && a>deltatime*4-10&&richTextList[4].y>210)
      {
        //console.log("5");
        richTextList[0].y-=3;
        richTextList[1].y-=3;
        richTextList[2].y-=3;
        richTextList[3].y-=3;
        richTextList[4].y-=3;
      }

      else if(a<deltatime*6 && a>deltatime*5-10 && richTextList[5].y>210)
      {
        //console.log("6");
        richTextList[0].y-=3;
        richTextList[1].y-=3;
        richTextList[2].y-=3;
        richTextList[3].y-=3;
        richTextList[4].y-=3;
        richTextList[5].y-=3;
      }
       else if(a<deltatime*7 && a>deltatime*6-10 && richTextList[6].y>210)
      {
        //console.log("7");
        richTextList[0].y-=3;
        richTextList[1].y-=3;
        richTextList[2].y-=3;
        richTextList[3].y-=3;
        richTextList[4].y-=3;
        richTextList[5].y-=3;
        richTextList[6].y-=3;
      }
      else if(a<deltatime*8 && a>deltatime*7-10 && richTextList[7].y>210)
      {
        //console.log("8");
        richTextList[0].y-=3;
        richTextList[1].y-=3;
        richTextList[2].y-=3;
        richTextList[3].y-=3;
        richTextList[4].y-=3;
        richTextList[5].y-=3;
        richTextList[6].y-=3;
        richTextList[7].y-=3;
      }
    });


  //setTimeout('week2()',8000 );


function week_end_3(){
   var block = new PIXI.Graphics();
   var block = new PIXI.Graphics();
      block.beginFill(0xffffff, 0.75);
      block.drawRect(0,0,1920,1080);
      block.lineStyle(4, 0xffd900, 1);
      block.endFill();
      app.stage.addChild(block);
   var dialog = new PIXI.Sprite.fromImage('room/dialog.png');
   dialog.scale.y*=3;
   dialog.y-=2000;
    app.stage.addChild(dialog);


    var button = new PIXI.Graphics();
    button.beginFill(0x330000);
    button.drawRoundedRect(1920/2-80,880,160,100,15);
    app.stage.addChild(button);

    button.buttonMode = true;
    button.interactive = true;


    var hwaginstyle = new PIXI.TextStyle({
  fontFamily: 'Consolas',
  fontSize: 40,
  fill: ['#ffffff'], // gradient
  stroke: '#4a1850'
  });

  var hwaginText = new PIXI.Text("확인",hwaginstyle);
  hwaginText.anchor.set(0.5,0);
  hwaginText.x = 1920/2;
  hwaginText.y = 910;
  app.stage.addChild(hwaginText);

var richTextList=[];
var inputTxt;
  for(var i=0; i < lectureList.length; i++) {

   for(var j=0;j<i;j++)
   {
     richTextList[j].y-=100;
   }
     inputTxt = lectureList[i].name +": "+lectureList[i].load[week][1]+'\n';
     totalTextList+=inputTxt;
     var richText = new PIXI.Text(inputTxt,eventstyle);
     richText.anchor.set(0.5);
     richText.x = 1920/2;
     richText.y = 1080/2+100;
     //app.stage.addChild(richText);
     richTextList.push(richText);


     }

    var totalTextListstyle = new PIXI.TextStyle({
   fontFamily: 'Consolas',
   fontSize: 40,
   lineHeight: 50,
   fill: ['#000000'], // gradient
      //backgroundColor:"green"
      wordWrap: true,
    wordWrapWidth: 1500
   });

    var richText = new PIXI.Text(totalTextList,totalTextListstyle);
     richText.anchor.set(0.5);
     richText.x = 1920/2;
     richText.y = 1080/2;
     app.stage.addChild(richText);
    button
      .on('pointerdown', week_end_onButtonDown)
      .on('pointerup', week_end_onButtonUp)
      .on('pointeroutside', week_end_onButtonUp)
      .on('pointerover', week_end_onButtonOver)
      .on('pointerout', week_end_onButtonOut)


    function week_end_onButtonDown(){

    }
    function week_end_onButtonUp(){
      app.stage.removeChild(dialog);
      app.stage.removeChild(this);
      app.stage.removeChild(hwaginText);
      app.stage.removeChild(richText);
      app.stage.removeChild(block);


      var rightblock = new PIXI.Graphics();
      //rightblock.lineStyle(2, 0xFF00FF, 1);
      rightblock.beginFill(0xfff8dc, 1);
      rightblock.drawRect(360,0,1200,240);
      rightblock.lineStyle(4, 0xffd900, 1);
      rightblock.endFill();
      app.stage.addChild(rightblock);
      week4();
    }
    function week_end_onButtonOver(){

    }
    function week_end_onButtonOut(){

    }

}

}
function week4()
{

  //  총 수행한 로드 / grade = (총 수행한 로드)/(전체 로드)
  week=3;
    //7 * 11 시간표 배열이 넘어온다고 가정 (7일 10교시 + 10시 이후)
    // 16주 동안 진행하고, 16개의 이벤트 발생 -> critical 이벤트?
    var capacityPerWeek = 0;
    //  얘는 한 주 동안 남은 시간을 계산하여 과제, 공부, 체력충전으로 전환시킴

    for (let day = 0; day < 7; day++){
      var firstPeriod = -1;

      for (let peri = 0; peri < 11; peri++){
        if( thisGame.timeTable[day][peri] !== undefined &&
          thisGame.timeTable[day][peri] !== "" && firstPeriod == -1)
          firstPeriod = peri;
        } // 첫 수업시간 찾음

        capacity = capacityUpdate(firstPeriod);
        console.log("오늘의 가용시간: "+capacity+"\n");

        for (let peri = firstPeriod; peri < 11; peri++){
          if (thisGame.timeTable[day][peri] === undefined ||
            thisGame.timeTable[day][peri] === "") continue;
          let nowEvent = thisGame.timeTable[day][peri];

          thisGame.status.health += statUpdate(nowEvent.deltaHealth*timeDependency(peri));
          thisGame.status.relationship += statUpdate(nowEvent.deltaRelationship);
          capacity -= nowEvent.duration;
          // 스텟 업데이트, 가용시간 - 소모시간
        }
        console.log("오늘의 남은시간: "+capacity+"\n");
        if( capacity <= 0 ) {
          capacity = 0;
        }
        // 가용시간은 0 이하로 내려갈 수 없음

        capacityPerWeek += capacity;
        // 남은 시간은 주간 가용시간으로 넘김
      }
      completedLoad = weekCapacityUpdate(capacityPerWeek, completedLoad, week);
      // 주간 로드 반영

      console.log(week+"주차 / 현재 체력: "+thisGame.status.health+"\n");
      console.log(week+"주차 / 남은 가용시간: "+capacityPerWeek+"\n");
      console.log("총 수행한 로드(누적): "+completedLoad+"\n");

      //eventHandler(0);
      //eventProcess(week);
      // 이벤트 발생 -> 랜덤 발생하는 알고리즘 필요

      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////   UI

    var eventstyle = new PIXI.TextStyle({
    fontFamily: 'Consolas',
    fontSize: 25,
    fill: ['#000000'], // gradient
     //backgroundColor:"green"
    });

    var totalTextList;
    var richTextList=[];

    for(var i=0; i < lectureList.length; i++) {

    for(var j=0;j<i;j++)
    {
      //richTextList[j].y-=100;
    }
      console.log(lectureList[i].lectureNumber+": "+lectureList[i].name+"\n");
      console.log(lectureList[i].load[week][1]);
      var inputTxt = lectureList[i].name +"의 로드: "+lectureList[i].load[week][1]+'\n';
      totalTextList+=inputTxt;
      var richText = new PIXI.Text(inputTxt,eventstyle);
      richText.anchor.set(0.5);
      richText.x = 960;
      richText.y = 1080/4-30;
      //app.stage.addChild(richText);
      richTextList.push(richText);
    }
    var a=0;
    var b=0;
    var length=lectureList.length;
    var deltatime=40;
    var eraser;
    var totalTextList="4주차의 로그\n\n";
    function erasedialog(eraser)
    {

        if(eraser===NaN||eraser===undefined)
          return;
      for(i=0;i<eraser.length;i++)
      {
        app.stage.removeChild(eraser[i]);
      }
    }

    app.stage.addChild(richTextList[0]);

    var timing = Math.floor(Math.random() * (lectureList.length-1)*deltatime);

    var ticker1=new PIXI.ticker.Ticker();
    ticker1.start();
    ticker1.add(()=>
    {
      a++;
      if(a===timing)
        eraser=eventHandler(0);
      if(a===deltatime*lectureList.length-10)
      {
        if(eraser!==NaN&&eraser!==undefined)
        {
         totalTextList+=eraser[1].text;
         totalTextList+='\n';
        }
        erasedialog(eraser);
        week_end_4();


      }
      else if(a%deltatime===0)
      {
        //console.log(a/deltatime+"생성");
        app.stage.addChild(richTextList[a/deltatime])
      }

      else if(a<deltatime*1&&richTextList[0].y>210)
      {
        //console.log("1");
        richTextList[0].y-=3;
      }
      else if(a<deltatime*2 &&a>deltatime*1-10&& richTextList[1].y>210)
      {
        //console.log("2");
        richTextList[0].y-=3;
        richTextList[1].y-=3;
      }
      else if(a<deltatime*3 &&a>deltatime*2-10&& richTextList[2].y>210)
      {
        //console.log("3");
        richTextList[0].y-=3;
        richTextList[1].y-=3;
        richTextList[2].y-=3;
      }
      else if(a<deltatime*4 &&a>deltatime*3-10&&richTextList[3].y>210)
      {
        //console.log("4");
        richTextList[0].y-=3;
        richTextList[1].y-=3;
        richTextList[2].y-=3;
        richTextList[3].y-=3;
      }
      else if(a<deltatime*5 && a>deltatime*4-10&&richTextList[4].y>210)
      {
        //console.log("5");
        richTextList[0].y-=3;
        richTextList[1].y-=3;
        richTextList[2].y-=3;
        richTextList[3].y-=3;
        richTextList[4].y-=3;
      }

      else if(a<deltatime*6 && a>deltatime*5-10 && richTextList[5].y>210)
      {
        //console.log("6");
        richTextList[0].y-=3;
        richTextList[1].y-=3;
        richTextList[2].y-=3;
        richTextList[3].y-=3;
        richTextList[4].y-=3;
        richTextList[5].y-=3;
      }
       else if(a<deltatime*7 && a>deltatime*6-10 && richTextList[6].y>210)
      {
        //console.log("7");
        richTextList[0].y-=3;
        richTextList[1].y-=3;
        richTextList[2].y-=3;
        richTextList[3].y-=3;
        richTextList[4].y-=3;
        richTextList[5].y-=3;
        richTextList[6].y-=3;
      }
      else if(a<deltatime*8 && a>deltatime*7-10 && richTextList[7].y>210)
      {
        //console.log("8");
        richTextList[0].y-=3;
        richTextList[1].y-=3;
        richTextList[2].y-=3;
        richTextList[3].y-=3;
        richTextList[4].y-=3;
        richTextList[5].y-=3;
        richTextList[6].y-=3;
        richTextList[7].y-=3;
      }
    });


  //setTimeout('week2()',8000 );


function week_end_4(){
   var block = new PIXI.Graphics();
   var block = new PIXI.Graphics();
      block.beginFill(0xffffff, 0.75);
      block.drawRect(0,0,1920,1080);
      block.lineStyle(4, 0xffd900, 1);
      block.endFill();
      app.stage.addChild(block);
   var dialog = new PIXI.Sprite.fromImage('room/dialog.png');
   dialog.scale.y*=3;
   dialog.y-=2000;
    app.stage.addChild(dialog);


    var button = new PIXI.Graphics();
    button.beginFill(0x330000);
    button.drawRoundedRect(1920/2-80,880,160,100,15);
    app.stage.addChild(button);

    button.buttonMode = true;
    button.interactive = true;


    var hwaginstyle = new PIXI.TextStyle({
  fontFamily: 'Consolas',
  fontSize: 40,
  fill: ['#ffffff'], // gradient
  stroke: '#4a1850'
  });

  var hwaginText = new PIXI.Text("확인",hwaginstyle);
  hwaginText.anchor.set(0.5,0);
  hwaginText.x = 1920/2;
  hwaginText.y = 910;
  app.stage.addChild(hwaginText);

var richTextList=[];
var inputTxt;
  for(var i=0; i < lectureList.length; i++) {

   for(var j=0;j<i;j++)
   {
     richTextList[j].y-=100;
   }
     inputTxt = lectureList[i].name +": "+lectureList[i].load[week][1]+'\n';
     totalTextList+=inputTxt;
     var richText = new PIXI.Text(inputTxt,eventstyle);
     richText.anchor.set(0.5);
     richText.x = 1920/2;
     richText.y = 1080/2+100;
     //app.stage.addChild(richText);
     richTextList.push(richText);


     }

    var totalTextListstyle = new PIXI.TextStyle({
   fontFamily: 'Consolas',
   fontSize: 40,
   lineHeight: 50,
   fill: ['#000000'], // gradient
      //backgroundColor:"green"
      wordWrap: true,
    wordWrapWidth: 1500
   });

    var richText = new PIXI.Text(totalTextList,totalTextListstyle);
     richText.anchor.set(0.5);
     richText.x = 1920/2;
     richText.y = 1080/2;
     app.stage.addChild(richText);
    button
      .on('pointerdown', week_end_onButtonDown)
      .on('pointerup', week_end_onButtonUp)
      .on('pointeroutside', week_end_onButtonUp)
      .on('pointerover', week_end_onButtonOver)
      .on('pointerout', week_end_onButtonOut)


    function week_end_onButtonDown(){

    }
    function week_end_onButtonUp(){
      app.stage.removeChild(dialog);
      app.stage.removeChild(this);
      app.stage.removeChild(hwaginText);
      app.stage.removeChild(richText);
      app.stage.removeChild(block);


      var rightblock = new PIXI.Graphics();
      //rightblock.lineStyle(2, 0xFF00FF, 1);
      rightblock.beginFill(0xfff8dc, 1);
      rightblock.drawRect(360,0,1200,240);
      rightblock.lineStyle(4, 0xffd900, 1);
      rightblock.endFill();
      app.stage.addChild(rightblock);
      week5();
    }
    function week_end_onButtonOver(){

    }
    function week_end_onButtonOut(){

    }

}
}
function week5()
{

  //  총 수행한 로드 / grade = (총 수행한 로드)/(전체 로드)
  week=4;
    //7 * 11 시간표 배열이 넘어온다고 가정 (7일 10교시 + 10시 이후)
    // 16주 동안 진행하고, 16개의 이벤트 발생 -> critical 이벤트?
    var capacityPerWeek = 0;
    //  얘는 한 주 동안 남은 시간을 계산하여 과제, 공부, 체력충전으로 전환시킴

    for (let day = 0; day < 7; day++){
      var firstPeriod = -1;

      for (let peri = 0; peri < 11; peri++){
        if( thisGame.timeTable[day][peri] !== undefined &&
          thisGame.timeTable[day][peri] !== "" && firstPeriod == -1)
          firstPeriod = peri;
        } // 첫 수업시간 찾음

        capacity = capacityUpdate(firstPeriod);
        console.log("오늘의 가용시간: "+capacity+"\n");

        for (let peri = firstPeriod; peri < 11; peri++){
          if (thisGame.timeTable[day][peri] === undefined ||
            thisGame.timeTable[day][peri] === "") continue;
          let nowEvent = thisGame.timeTable[day][peri];

          thisGame.status.health += statUpdate(nowEvent.deltaHealth*timeDependency(peri));
          thisGame.status.relationship += statUpdate(nowEvent.deltaRelationship);
          capacity -= nowEvent.duration;
          // 스텟 업데이트, 가용시간 - 소모시간
        }
        console.log("오늘의 남은시간: "+capacity+"\n");
        if( capacity <= 0 ) {
          capacity = 0;
        }
        // 가용시간은 0 이하로 내려갈 수 없음

        capacityPerWeek += capacity;
        // 남은 시간은 주간 가용시간으로 넘김
      }
      completedLoad = weekCapacityUpdate(capacityPerWeek, completedLoad, week);
      // 주간 로드 반영

      console.log(week+"주차 / 현재 체력: "+thisGame.status.health+"\n");
      console.log(week+"주차 / 남은 가용시간: "+capacityPerWeek+"\n");
      console.log("총 수행한 로드(누적): "+completedLoad+"\n");

      //eventHandler(0);
      //eventProcess(week);
      // 이벤트 발생 -> 랜덤 발생하는 알고리즘 필요

      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////   UI

    var eventstyle = new PIXI.TextStyle({
    fontFamily: 'Consolas',
    fontSize: 25,
    fill: ['#000000'], // gradient
     //backgroundColor:"green"

    });

    var totalTextList;
    var richTextList=[];

    for(var i=0; i < lectureList.length; i++) {

    for(var j=0;j<i;j++)
    {
      //richTextList[j].y-=100;
    }
      console.log(lectureList[i].lectureNumber+": "+lectureList[i].name+"\n");
      console.log(lectureList[i].load[week][1]);
      var inputTxt = lectureList[i].name +"의 로드: "+lectureList[i].load[week][1]+'\n';
      totalTextList+=inputTxt;
      var richText = new PIXI.Text(inputTxt,eventstyle);
      richText.anchor.set(0.5);
      richText.x = 960;
      richText.y = 1080/4-30;
      //app.stage.addChild(richText);
      richTextList.push(richText);
    }
    var a=0;
    var b=0;
    var length=lectureList.length;
    var deltatime=40;
    var eraser;
    var totalTextList="5주차의 로그\n\n";
    function erasedialog(eraser)
    {

        if(eraser===NaN||eraser===undefined)
          return;
      for(i=0;i<eraser.length;i++)
      {
        app.stage.removeChild(eraser[i]);
      }
    }

    app.stage.addChild(richTextList[0]);

    var timing = Math.floor(Math.random() * (lectureList.length-1)*deltatime);

    var ticker1=new PIXI.ticker.Ticker();
    ticker1.start();
    ticker1.add(()=>
    {
      a++;
      if(a===timing)
        eraser=eventHandler(0);
      if(a===deltatime*lectureList.length-10)
      {
        if(eraser!==NaN&&eraser!==undefined)
        {
         totalTextList+=eraser[1].text;
         totalTextList+='\n';
        }
        erasedialog(eraser);
        week_end_5();


      }
      else if(a%deltatime===0)
      {
        //console.log(a/deltatime+"생성");
        app.stage.addChild(richTextList[a/deltatime])
      }

      else if(a<deltatime*1&&richTextList[0].y>210)
      {
        //console.log("1");
        richTextList[0].y-=3;
      }
      else if(a<deltatime*2 &&a>deltatime*1-10&& richTextList[1].y>210)
      {
        //console.log("2");
        richTextList[0].y-=3;
        richTextList[1].y-=3;
      }
      else if(a<deltatime*3 &&a>deltatime*2-10&& richTextList[2].y>210)
      {
        //console.log("3");
        richTextList[0].y-=3;
        richTextList[1].y-=3;
        richTextList[2].y-=3;
      }
      else if(a<deltatime*4 &&a>deltatime*3-10&&richTextList[3].y>210)
      {
        //console.log("4");
        richTextList[0].y-=3;
        richTextList[1].y-=3;
        richTextList[2].y-=3;
        richTextList[3].y-=3;
      }
      else if(a<deltatime*5 && a>deltatime*4-10&&richTextList[4].y>210)
      {
        //console.log("5");
        richTextList[0].y-=3;
        richTextList[1].y-=3;
        richTextList[2].y-=3;
        richTextList[3].y-=3;
        richTextList[4].y-=3;
      }

      else if(a<deltatime*6 && a>deltatime*5-10 && richTextList[5].y>210)
      {
        //console.log("6");
        richTextList[0].y-=3;
        richTextList[1].y-=3;
        richTextList[2].y-=3;
        richTextList[3].y-=3;
        richTextList[4].y-=3;
        richTextList[5].y-=3;
      }
       else if(a<deltatime*7 && a>deltatime*6-10 && richTextList[6].y>210)
      {
        //console.log("7");
        richTextList[0].y-=3;
        richTextList[1].y-=3;
        richTextList[2].y-=3;
        richTextList[3].y-=3;
        richTextList[4].y-=3;
        richTextList[5].y-=3;
        richTextList[6].y-=3;
      }
      else if(a<deltatime*8 && a>deltatime*7-10 && richTextList[7].y>210)
      {
        //console.log("8");
        richTextList[0].y-=3;
        richTextList[1].y-=3;
        richTextList[2].y-=3;
        richTextList[3].y-=3;
        richTextList[4].y-=3;
        richTextList[5].y-=3;
        richTextList[6].y-=3;
        richTextList[7].y-=3;
      }
    });


  //setTimeout('week2()',8000 );


function week_end_5(){
   var block = new PIXI.Graphics();
   var block = new PIXI.Graphics();
      block.beginFill(0xffffff, 0.75);
      block.drawRect(0,0,1920,1080);
      block.lineStyle(4, 0xffd900, 1);
      block.endFill();
      app.stage.addChild(block);
   var dialog = new PIXI.Sprite.fromImage('room/dialog.png');
   dialog.scale.y*=3;
   dialog.y-=2000;
    app.stage.addChild(dialog);


    var button = new PIXI.Graphics();
    button.beginFill(0x330000);
    button.drawRoundedRect(1920/2-80,880,160,100,15);
    app.stage.addChild(button);

    button.buttonMode = true;
    button.interactive = true;


    var hwaginstyle = new PIXI.TextStyle({
  fontFamily: 'Consolas',
  fontSize: 40,
  fill: ['#ffffff'], // gradient
  stroke: '#4a1850'
  });

  var hwaginText = new PIXI.Text("확인",hwaginstyle);
  hwaginText.anchor.set(0.5,0);
  hwaginText.x = 1920/2;
  hwaginText.y = 910;
  app.stage.addChild(hwaginText);

var richTextList=[];
var inputTxt;
  for(var i=0; i < lectureList.length; i++) {

   for(var j=0;j<i;j++)
   {
     richTextList[j].y-=100;
   }
     inputTxt = lectureList[i].name +": "+lectureList[i].load[week][1]+'\n';
     totalTextList+=inputTxt;
     var richText = new PIXI.Text(inputTxt,eventstyle);
     richText.anchor.set(0.5);
     richText.x = 1920/2;
     richText.y = 1080/2+100;
     //app.stage.addChild(richText);
     richTextList.push(richText);


     }

    var totalTextListstyle = new PIXI.TextStyle({
   fontFamily: 'Consolas',
   fontSize: 40,
   lineHeight: 50,
   fill: ['#000000'], // gradient
      //backgroundColor:"green"
      wordWrap: true,
    wordWrapWidth: 1500
   });

    var richText = new PIXI.Text(totalTextList,totalTextListstyle);
     richText.anchor.set(0.5);
     richText.x = 1920/2;
     richText.y = 1080/2;
     app.stage.addChild(richText);
    button
      .on('pointerdown', week_end_onButtonDown)
      .on('pointerup', week_end_onButtonUp)
      .on('pointeroutside', week_end_onButtonUp)
      .on('pointerover', week_end_onButtonOver)
      .on('pointerout', week_end_onButtonOut)


    function week_end_onButtonDown(){

    }
    function week_end_onButtonUp(){
      app.stage.removeChild(dialog);
      app.stage.removeChild(this);
      app.stage.removeChild(hwaginText);
      app.stage.removeChild(richText);
      app.stage.removeChild(block);


      var rightblock = new PIXI.Graphics();
      //rightblock.lineStyle(2, 0xFF00FF, 1);
      rightblock.beginFill(0xfff8dc, 1);
      rightblock.drawRect(360,0,1200,240);
      rightblock.lineStyle(4, 0xffd900, 1);
      rightblock.endFill();
      app.stage.addChild(rightblock);
      week6();
    }
    function week_end_onButtonOver(){

    }
    function week_end_onButtonOut(){

    }

}
}
function week6()
{

  //  총 수행한 로드 / grade = (총 수행한 로드)/(전체 로드)
  week=5;
    //7 * 11 시간표 배열이 넘어온다고 가정 (7일 10교시 + 10시 이후)
    // 16주 동안 진행하고, 16개의 이벤트 발생 -> critical 이벤트?
    var capacityPerWeek = 0;
    //  얘는 한 주 동안 남은 시간을 계산하여 과제, 공부, 체력충전으로 전환시킴

    for (let day = 0; day < 7; day++){
      var firstPeriod = -1;

      for (let peri = 0; peri < 11; peri++){
        if( thisGame.timeTable[day][peri] !== undefined &&
          thisGame.timeTable[day][peri] !== "" && firstPeriod == -1)
          firstPeriod = peri;
        } // 첫 수업시간 찾음

        capacity = capacityUpdate(firstPeriod);
        console.log("오늘의 가용시간: "+capacity+"\n");

        for (let peri = firstPeriod; peri < 11; peri++){
          if (thisGame.timeTable[day][peri] === undefined ||
            thisGame.timeTable[day][peri] === "") continue;
          let nowEvent = thisGame.timeTable[day][peri];

          thisGame.status.health += statUpdate(nowEvent.deltaHealth*timeDependency(peri));
          thisGame.status.relationship += statUpdate(nowEvent.deltaRelationship);
          capacity -= nowEvent.duration;
          // 스텟 업데이트, 가용시간 - 소모시간
        }
        console.log("오늘의 남은시간: "+capacity+"\n");
        if( capacity <= 0 ) {
          capacity = 0;
        }
        // 가용시간은 0 이하로 내려갈 수 없음

        capacityPerWeek += capacity;
        // 남은 시간은 주간 가용시간으로 넘김
      }
      completedLoad = weekCapacityUpdate(capacityPerWeek, completedLoad, week);
      // 주간 로드 반영

      console.log(week+"주차 / 현재 체력: "+thisGame.status.health+"\n");
      console.log(week+"주차 / 남은 가용시간: "+capacityPerWeek+"\n");
      console.log("총 수행한 로드(누적): "+completedLoad+"\n");

      //eventHandler(0);
      //eventProcess(week);
      // 이벤트 발생 -> 랜덤 발생하는 알고리즘 필요

      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////   UI

    var eventstyle = new PIXI.TextStyle({
    fontFamily: 'Consolas',
    fontSize: 25,
    fill: ['#000000'], // gradient
     //backgroundColor:"green"
    });

    var totalTextList;
    var richTextList=[];

    for(var i=0; i < lectureList.length; i++) {

    for(var j=0;j<i;j++)
    {
      //richTextList[j].y-=100;
    }
      console.log(lectureList[i].lectureNumber+": "+lectureList[i].name+"\n");
      console.log(lectureList[i].load[week][1]);
      var inputTxt = lectureList[i].name +"의 로드: "+lectureList[i].load[week][1]+'\n';
      totalTextList+=inputTxt;
      var richText = new PIXI.Text(inputTxt,eventstyle);
      richText.anchor.set(0.5);
      richText.x = 960;
      richText.y = 1080/4-30;
      //app.stage.addChild(richText);
      richTextList.push(richText);
    }
    var a=0;
    var b=0;
    var length=lectureList.length;
    var deltatime=40;
    var eraser;
    var totalTextList="6주차의 로그\n\n";
    function erasedialog(eraser)
    {

        if(eraser===NaN||eraser===undefined)
          return;
      for(i=0;i<eraser.length;i++)
      {
        app.stage.removeChild(eraser[i]);
      }
    }

    app.stage.addChild(richTextList[0]);

    var timing = Math.floor(Math.random() * (lectureList.length-1)*deltatime);

    var ticker1=new PIXI.ticker.Ticker();
    ticker1.start();
    ticker1.add(()=>
    {
      a++;
      if(a===timing)
        eraser=eventHandler(0);
      if(a===deltatime*lectureList.length-10)
      {
        if(eraser!==NaN&&eraser!==undefined)
        {
         totalTextList+=eraser[1].text;
         totalTextList+='\n';
        }
        erasedialog(eraser);
        week_end_6();


      }
      else if(a%deltatime===0)
      {
        //console.log(a/deltatime+"생성");
        app.stage.addChild(richTextList[a/deltatime])
      }

      else if(a<deltatime*1&&richTextList[0].y>210)
      {
        //console.log("1");
        richTextList[0].y-=3;
      }
      else if(a<deltatime*2 &&a>deltatime*1-10&& richTextList[1].y>210)
      {
        //console.log("2");
        richTextList[0].y-=3;
        richTextList[1].y-=3;
      }
      else if(a<deltatime*3 &&a>deltatime*2-10&& richTextList[2].y>210)
      {
        //console.log("3");
        richTextList[0].y-=3;
        richTextList[1].y-=3;
        richTextList[2].y-=3;
      }
      else if(a<deltatime*4 &&a>deltatime*3-10&&richTextList[3].y>210)
      {
        //console.log("4");
        richTextList[0].y-=3;
        richTextList[1].y-=3;
        richTextList[2].y-=3;
        richTextList[3].y-=3;
      }
      else if(a<deltatime*5 && a>deltatime*4-10&&richTextList[4].y>210)
      {
        //console.log("5");
        richTextList[0].y-=3;
        richTextList[1].y-=3;
        richTextList[2].y-=3;
        richTextList[3].y-=3;
        richTextList[4].y-=3;
      }

      else if(a<deltatime*6 && a>deltatime*5-10 && richTextList[5].y>210)
      {
        //console.log("6");
        richTextList[0].y-=3;
        richTextList[1].y-=3;
        richTextList[2].y-=3;
        richTextList[3].y-=3;
        richTextList[4].y-=3;
        richTextList[5].y-=3;
      }
       else if(a<deltatime*7 && a>deltatime*6-10 && richTextList[6].y>210)
      {
        //console.log("7");
        richTextList[0].y-=3;
        richTextList[1].y-=3;
        richTextList[2].y-=3;
        richTextList[3].y-=3;
        richTextList[4].y-=3;
        richTextList[5].y-=3;
        richTextList[6].y-=3;
      }
      else if(a<deltatime*8 && a>deltatime*7-10 && richTextList[7].y>210)
      {
        //console.log("8");
        richTextList[0].y-=3;
        richTextList[1].y-=3;
        richTextList[2].y-=3;
        richTextList[3].y-=3;
        richTextList[4].y-=3;
        richTextList[5].y-=3;
        richTextList[6].y-=3;
        richTextList[7].y-=3;
      }
    });


  //setTimeout('week2()',8000 );


function week_end_6(){
   var block = new PIXI.Graphics();
   var block = new PIXI.Graphics();
      block.beginFill(0xffffff, 0.75);
      block.drawRect(0,0,1920,1080);
      block.lineStyle(4, 0xffd900, 1);
      block.endFill();
      app.stage.addChild(block);
   var dialog = new PIXI.Sprite.fromImage('room/dialog.png');
   dialog.scale.y*=3;
   dialog.y-=2000;
    app.stage.addChild(dialog);


    var button = new PIXI.Graphics();
    button.beginFill(0x330000);
    button.drawRoundedRect(1920/2-80,880,160,100,15);
    app.stage.addChild(button);

    button.buttonMode = true;
    button.interactive = true;


    var hwaginstyle = new PIXI.TextStyle({
  fontFamily: 'Consolas',
  fontSize: 40,
  fill: ['#ffffff'], // gradient
  stroke: '#4a1850'
  });

  var hwaginText = new PIXI.Text("확인",hwaginstyle);
  hwaginText.anchor.set(0.5,0);
  hwaginText.x = 1920/2;
  hwaginText.y = 910;
  app.stage.addChild(hwaginText);

var richTextList=[];
var inputTxt;
  for(var i=0; i < lectureList.length; i++) {

   for(var j=0;j<i;j++)
   {
     richTextList[j].y-=100;
   }
     inputTxt = lectureList[i].name +": "+lectureList[i].load[week][1]+'\n';
     totalTextList+=inputTxt;
     var richText = new PIXI.Text(inputTxt,eventstyle);
     richText.anchor.set(0.5);
     richText.x = 1920/2;
     richText.y = 1080/2+100;
     //app.stage.addChild(richText);
     richTextList.push(richText);


     }

    var totalTextListstyle = new PIXI.TextStyle({
   fontFamily: 'Consolas',
   fontSize: 40,
   lineHeight: 50,
   fill: ['#000000'], // gradient
      //backgroundColor:"green"
      wordWrap: true,
    wordWrapWidth: 1500
   });

    var richText = new PIXI.Text(totalTextList,totalTextListstyle);
     richText.anchor.set(0.5);
     richText.x = 1920/2;
     richText.y = 1080/2;
     app.stage.addChild(richText);
    button
      .on('pointerdown', week_end_onButtonDown)
      .on('pointerup', week_end_onButtonUp)
      .on('pointeroutside', week_end_onButtonUp)
      .on('pointerover', week_end_onButtonOver)
      .on('pointerout', week_end_onButtonOut)


    function week_end_onButtonDown(){

    }
    function week_end_onButtonUp(){
      app.stage.removeChild(dialog);
      app.stage.removeChild(this);
      app.stage.removeChild(hwaginText);
      app.stage.removeChild(richText);
      app.stage.removeChild(block);


      var rightblock = new PIXI.Graphics();
      //rightblock.lineStyle(2, 0xFF00FF, 1);
      rightblock.beginFill(0xfff8dc, 1);
      rightblock.drawRect(360,0,1200,240);
      rightblock.lineStyle(4, 0xffd900, 1);
      rightblock.endFill();
      app.stage.addChild(rightblock);
      week7();
    }
    function week_end_onButtonOver(){

    }
    function week_end_onButtonOut(){

    }

}
}

function week7()
{

  //  총 수행한 로드 / grade = (총 수행한 로드)/(전체 로드)
  week=6;
    //7 * 11 시간표 배열이 넘어온다고 가정 (7일 10교시 + 10시 이후)
    // 16주 동안 진행하고, 16개의 이벤트 발생 -> critical 이벤트?
    var capacityPerWeek = 0;
    //  얘는 한 주 동안 남은 시간을 계산하여 과제, 공부, 체력충전으로 전환시킴

    for (let day = 0; day < 7; day++){
      var firstPeriod = -1;

      for (let peri = 0; peri < 11; peri++){
        if( thisGame.timeTable[day][peri] !== undefined &&
          thisGame.timeTable[day][peri] !== "" && firstPeriod == -1)
          firstPeriod = peri;
        } // 첫 수업시간 찾음

        capacity = capacityUpdate(firstPeriod);
        console.log("오늘의 가용시간: "+capacity+"\n");

        for (let peri = firstPeriod; peri < 11; peri++){
          if (thisGame.timeTable[day][peri] === undefined ||
            thisGame.timeTable[day][peri] === "") continue;
          let nowEvent = thisGame.timeTable[day][peri];

          thisGame.status.health += statUpdate(nowEvent.deltaHealth*timeDependency(peri));
          thisGame.status.relationship += statUpdate(nowEvent.deltaRelationship);
          capacity -= nowEvent.duration;
          // 스텟 업데이트, 가용시간 - 소모시간
        }
        console.log("오늘의 남은시간: "+capacity+"\n");
        if( capacity <= 0 ) {
          capacity = 0;
        }
        // 가용시간은 0 이하로 내려갈 수 없음

        capacityPerWeek += capacity;
        // 남은 시간은 주간 가용시간으로 넘김
      }
      completedLoad = weekCapacityUpdate(capacityPerWeek, completedLoad, week);
      // 주간 로드 반영

      console.log(week+"주차 / 현재 체력: "+thisGame.status.health+"\n");
      console.log(week+"주차 / 남은 가용시간: "+capacityPerWeek+"\n");
      console.log("총 수행한 로드(누적): "+completedLoad+"\n");

      //eventHandler(0);
      //eventProcess(week);
      // 이벤트 발생 -> 랜덤 발생하는 알고리즘 필요

      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////   UI

    var eventstyle = new PIXI.TextStyle({
    fontFamily: 'Consolas',
    fontSize: 25,
    fill: ['#000000'], // gradient
     //backgroundColor:"green"
    });

    var totalTextList;
    var richTextList=[];

    for(var i=0; i < lectureList.length; i++) {

    for(var j=0;j<i;j++)
    {
      //richTextList[j].y-=100;
    }
      console.log(lectureList[i].lectureNumber+": "+lectureList[i].name+"\n");
      console.log(lectureList[i].load[week][1]);
      var inputTxt = lectureList[i].name +"의 로드: "+lectureList[i].load[week][1]+'\n';
      totalTextList+=inputTxt;
      var richText = new PIXI.Text(inputTxt,eventstyle);
      richText.anchor.set(0.5);
      richText.x = 960;
      richText.y = 1080/4-30;
      //app.stage.addChild(richText);
      richTextList.push(richText);
    }
    var a=0;
    var b=0;
    var length=lectureList.length;
    var deltatime=40;
    var eraser;
    var totalTextList="7주차의 로그\n\n";
    function erasedialog(eraser)
    {

        if(eraser===NaN||eraser===undefined)
          return;
      for(i=0;i<eraser.length;i++)
      {
        app.stage.removeChild(eraser[i]);
      }
    }

    app.stage.addChild(richTextList[0]);

    var timing = Math.floor(Math.random() * (lectureList.length-1)*deltatime);

    var ticker1=new PIXI.ticker.Ticker();
    ticker1.start();
    ticker1.add(()=>
    {
      a++;
      if(a===timing)
        eraser=eventHandler(0);
      if(a===deltatime*lectureList.length-10)
      {
        if(eraser!==NaN&&eraser!==undefined)
        {
         totalTextList+=eraser[1].text;
         totalTextList+='\n';
        }
        erasedialog(eraser);
        week_end_7();


      }
      else if(a%deltatime===0)
      {
        //console.log(a/deltatime+"생성");
        app.stage.addChild(richTextList[a/deltatime])
      }

      else if(a<deltatime*1&&richTextList[0].y>210)
      {
        //console.log("1");
        richTextList[0].y-=3;
      }
      else if(a<deltatime*2 &&a>deltatime*1-10&& richTextList[1].y>210)
      {
        //console.log("2");
        richTextList[0].y-=3;
        richTextList[1].y-=3;
      }
      else if(a<deltatime*3 &&a>deltatime*2-10&& richTextList[2].y>210)
      {
        //console.log("3");
        richTextList[0].y-=3;
        richTextList[1].y-=3;
        richTextList[2].y-=3;
      }
      else if(a<deltatime*4 &&a>deltatime*3-10&&richTextList[3].y>210)
      {
        //console.log("4");
        richTextList[0].y-=3;
        richTextList[1].y-=3;
        richTextList[2].y-=3;
        richTextList[3].y-=3;
      }
      else if(a<deltatime*5 && a>deltatime*4-10&&richTextList[4].y>210)
      {
        //console.log("5");
        richTextList[0].y-=3;
        richTextList[1].y-=3;
        richTextList[2].y-=3;
        richTextList[3].y-=3;
        richTextList[4].y-=3;
      }

      else if(a<deltatime*6 && a>deltatime*5-10 && richTextList[5].y>210)
      {
        //console.log("6");
        richTextList[0].y-=3;
        richTextList[1].y-=3;
        richTextList[2].y-=3;
        richTextList[3].y-=3;
        richTextList[4].y-=3;
        richTextList[5].y-=3;
      }
       else if(a<deltatime*7 && a>deltatime*6-10 && richTextList[6].y>210)
      {
        //console.log("7");
        richTextList[0].y-=3;
        richTextList[1].y-=3;
        richTextList[2].y-=3;
        richTextList[3].y-=3;
        richTextList[4].y-=3;
        richTextList[5].y-=3;
        richTextList[6].y-=3;
      }
      else if(a<deltatime*8 && a>deltatime*7-10 && richTextList[7].y>210)
      {
        //console.log("8");
        richTextList[0].y-=3;
        richTextList[1].y-=3;
        richTextList[2].y-=3;
        richTextList[3].y-=3;
        richTextList[4].y-=3;
        richTextList[5].y-=3;
        richTextList[6].y-=3;
        richTextList[7].y-=3;
      }
    });


  //setTimeout('week2()',8000 );


function week_end_7(){
   var block = new PIXI.Graphics();
   var block = new PIXI.Graphics();
      block.beginFill(0xffffff, 0.75);
      block.drawRect(0,0,1920,1080);
      block.lineStyle(4, 0xffd900, 1);
      block.endFill();
      app.stage.addChild(block);
   var dialog = new PIXI.Sprite.fromImage('room/dialog.png');
   dialog.scale.y*=3;
   dialog.y-=2000;
    app.stage.addChild(dialog);


    var button = new PIXI.Graphics();
    button.beginFill(0x330000);
    button.drawRoundedRect(1920/2-80,880,160,100,15);
    app.stage.addChild(button);

    button.buttonMode = true;
    button.interactive = true;


    var hwaginstyle = new PIXI.TextStyle({
  fontFamily: 'Consolas',
  fontSize: 40,
  fill: ['#ffffff'], // gradient
  stroke: '#4a1850'
  });

  var hwaginText = new PIXI.Text("확인",hwaginstyle);
  hwaginText.anchor.set(0.5,0);
  hwaginText.x = 1920/2;
  hwaginText.y = 910;
  app.stage.addChild(hwaginText);

var richTextList=[];
var inputTxt;
  for(var i=0; i < lectureList.length; i++) {

   for(var j=0;j<i;j++)
   {
     richTextList[j].y-=100;
   }
     inputTxt = lectureList[i].name +": "+lectureList[i].load[week][1]+'\n';
     totalTextList+=inputTxt;
     var richText = new PIXI.Text(inputTxt,eventstyle);
     richText.anchor.set(0.5);
     richText.x = 1920/2;
     richText.y = 1080/2+100;
     //app.stage.addChild(richText);
     richTextList.push(richText);


     }

    var totalTextListstyle = new PIXI.TextStyle({
   fontFamily: 'Consolas',
   fontSize: 40,
   lineHeight: 50,
   fill: ['#000000'], // gradient
      //backgroundColor:"green"
      wordWrap: true,
    wordWrapWidth: 1500
   });

    var richText = new PIXI.Text(totalTextList,totalTextListstyle);
     richText.anchor.set(0.5);
     richText.x = 1920/2;
     richText.y = 1080/2;
     app.stage.addChild(richText);
    button
      .on('pointerdown', week_end_onButtonDown)
      .on('pointerup', week_end_onButtonUp)
      .on('pointeroutside', week_end_onButtonUp)
      .on('pointerover', week_end_onButtonOver)
      .on('pointerout', week_end_onButtonOut)


    function week_end_onButtonDown(){

    }
    function week_end_onButtonUp(){
      app.stage.removeChild(dialog);
      app.stage.removeChild(this);
      app.stage.removeChild(hwaginText);
      app.stage.removeChild(richText);
      app.stage.removeChild(block);


      var rightblock = new PIXI.Graphics();
      //rightblock.lineStyle(2, 0xFF00FF, 1);
      rightblock.beginFill(0xfff8dc, 1);
      rightblock.drawRect(360,0,1200,240);
      rightblock.lineStyle(4, 0xffd900, 1);
      rightblock.endFill();
      app.stage.addChild(rightblock);
      week8();
    }
    function week_end_onButtonOver(){

    }
    function week_end_onButtonOut(){

    }

}
}


function week8()
{


  //  총 수행한 로드 / grade = (총 수행한 로드)/(전체 로드)
  week=7;
    //7 * 11 시간표 배열이 넘어온다고 가정 (7일 10교시 + 10시 이후)
    // 16주 동안 진행하고, 16개의 이벤트 발생 -> critical 이벤트?
    var capacityPerWeek = 0;
    //  얘는 한 주 동안 남은 시간을 계산하여 과제, 공부, 체력충전으로 전환시킴

    for (let day = 0; day < 7; day++){
      var firstPeriod = -1;

      for (let peri = 0; peri < 11; peri++){
        if( thisGame.timeTable[day][peri] !== undefined &&
          thisGame.timeTable[day][peri] !== "" && firstPeriod == -1)
          firstPeriod = peri;
        } // 첫 수업시간 찾음

        capacity = capacityUpdate(firstPeriod);
        console.log("오늘의 가용시간: "+capacity+"\n");

        for (let peri = firstPeriod; peri < 11; peri++){
          if (thisGame.timeTable[day][peri] === undefined ||
            thisGame.timeTable[day][peri] === "") continue;
          let nowEvent = thisGame.timeTable[day][peri];

          thisGame.status.health += statUpdate(nowEvent.deltaHealth*timeDependency(peri));
          thisGame.status.relationship += statUpdate(nowEvent.deltaRelationship);
          capacity -= nowEvent.duration;
          // 스텟 업데이트, 가용시간 - 소모시간
        }
        console.log("오늘의 남은시간: "+capacity+"\n");
        if( capacity <= 0 ) {
          capacity = 0;
        }
        // 가용시간은 0 이하로 내려갈 수 없음

        capacityPerWeek += capacity;
        // 남은 시간은 주간 가용시간으로 넘김
      }
      completedLoad = weekCapacityUpdate(capacityPerWeek, completedLoad, week);
      // 주간 로드 반영

      console.log(week+"주차 / 현재 체력: "+thisGame.status.health+"\n");
      console.log(week+"주차 / 남은 가용시간: "+capacityPerWeek+"\n");
      console.log("총 수행한 로드(누적): "+completedLoad+"\n");

      //eventHandler(0);
      //eventProcess(week);
      // 이벤트 발생 -> 랜덤 발생하는 알고리즘 필요

      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////   UI

    var eventstyle = new PIXI.TextStyle({
    fontFamily: 'Consolas',
    fontSize: 25,
    fill: ['#000000'], // gradient
     //backgroundColor:"green"
    });

    var totalTextList;
    var richTextList=[];

    for(var i=0; i < lectureList.length; i++) {

    for(var j=0;j<i;j++)
    {
      //richTextList[j].y-=100;
    }
      console.log(lectureList[i].lectureNumber+": "+lectureList[i].name+"\n");
      console.log(lectureList[i].load[week][1]);
      var inputTxt = lectureList[i].name +"의 로드: "+lectureList[i].load[week][1]+'\n';
      totalTextList+=inputTxt;
      var richText = new PIXI.Text(inputTxt,eventstyle);
      richText.anchor.set(0.5);
      richText.x = 960;
      richText.y = 1080/4-30;
      //app.stage.addChild(richText);
      richTextList.push(richText);
    }
    var a=0;
    var b=0;
    var length=lectureList.length;
    var deltatime=40;
    var eraser;
    var totalTextList="8주차의 로그\n\n";
    function erasedialog(eraser)
    {

        if(eraser===NaN||eraser===undefined)
          return;
      for(i=0;i<eraser.length;i++)
      {
        app.stage.removeChild(eraser[i]);
      }
    }

    app.stage.addChild(richTextList[0]);

    var timing = Math.floor(Math.random() * (lectureList.length-1)*deltatime);

    var ticker1=new PIXI.ticker.Ticker();
    ticker1.start();
    ticker1.add(()=>
    {
      a++;
      if(a===timing)
        eraser=eventHandler(0);
      if(a===deltatime*lectureList.length-10)
      {
        if(eraser!==NaN&&eraser!==undefined)
        {
         totalTextList+=eraser[1].text;
         totalTextList+='\n';
        }
        erasedialog(eraser);
        week_end_8();


      }
      else if(a%deltatime===0)
      {
        //console.log(a/deltatime+"생성");
        app.stage.addChild(richTextList[a/deltatime])
      }

      else if(a<deltatime*1&&richTextList[0].y>210)
      {
        //console.log("1");
        richTextList[0].y-=3;
      }
      else if(a<deltatime*2 &&a>deltatime*1-10&& richTextList[1].y>210)
      {
        //console.log("2");
        richTextList[0].y-=3;
        richTextList[1].y-=3;
      }
      else if(a<deltatime*3 &&a>deltatime*2-10&& richTextList[2].y>210)
      {
        //console.log("3");
        richTextList[0].y-=3;
        richTextList[1].y-=3;
        richTextList[2].y-=3;
      }
      else if(a<deltatime*4 &&a>deltatime*3-10&&richTextList[3].y>210)
      {
        //console.log("4");
        richTextList[0].y-=3;
        richTextList[1].y-=3;
        richTextList[2].y-=3;
        richTextList[3].y-=3;
      }
      else if(a<deltatime*5 && a>deltatime*4-10&&richTextList[4].y>210)
      {
        //console.log("5");
        richTextList[0].y-=3;
        richTextList[1].y-=3;
        richTextList[2].y-=3;
        richTextList[3].y-=3;
        richTextList[4].y-=3;
      }

      else if(a<deltatime*6 && a>deltatime*5-10 && richTextList[5].y>210)
      {
        //console.log("6");
        richTextList[0].y-=3;
        richTextList[1].y-=3;
        richTextList[2].y-=3;
        richTextList[3].y-=3;
        richTextList[4].y-=3;
        richTextList[5].y-=3;
      }
       else if(a<deltatime*7 && a>deltatime*6-10 && richTextList[6].y>210)
      {
        //console.log("7");
        richTextList[0].y-=3;
        richTextList[1].y-=3;
        richTextList[2].y-=3;
        richTextList[3].y-=3;
        richTextList[4].y-=3;
        richTextList[5].y-=3;
        richTextList[6].y-=3;
      }
      else if(a<deltatime*8 && a>deltatime*7-10 && richTextList[7].y>210)
      {
        //console.log("8");
        richTextList[0].y-=3;
        richTextList[1].y-=3;
        richTextList[2].y-=3;
        richTextList[3].y-=3;
        richTextList[4].y-=3;
        richTextList[5].y-=3;
        richTextList[6].y-=3;
        richTextList[7].y-=3;
      }
    });


  //setTimeout('week2()',8000 );


function week_end_8(){
   var block = new PIXI.Graphics();
   var block = new PIXI.Graphics();
      block.beginFill(0xffffff, 0.75);
      block.drawRect(0,0,1920,1080);
      block.lineStyle(4, 0xffd900, 1);
      block.endFill();
      app.stage.addChild(block);
   var dialog = new PIXI.Sprite.fromImage('room/dialog.png');
   dialog.scale.y*=3;
   dialog.y-=2000;
    app.stage.addChild(dialog);


    var button = new PIXI.Graphics();
    button.beginFill(0x330000);
    button.drawRoundedRect(1920/2-80,880,160,100,15);
    app.stage.addChild(button);

    button.buttonMode = true;
    button.interactive = true;


    var hwaginstyle = new PIXI.TextStyle({
  fontFamily: 'Consolas',
  fontSize: 40,
  fill: ['#ffffff'], // gradient
  stroke: '#4a1850'
  });

  var hwaginText = new PIXI.Text("확인",hwaginstyle);
  hwaginText.anchor.set(0.5,0);
  hwaginText.x = 1920/2;
  hwaginText.y = 910;
  app.stage.addChild(hwaginText);

var richTextList=[];
var inputTxt;
  for(var i=0; i < lectureList.length; i++) {

   for(var j=0;j<i;j++)
   {
     richTextList[j].y-=100;
   }
     inputTxt = lectureList[i].name +": "+lectureList[i].load[week][1]+'\n';
     totalTextList+=inputTxt;
     var richText = new PIXI.Text(inputTxt,eventstyle);
     richText.anchor.set(0.5);
     richText.x = 1920/2;
     richText.y = 1080/2+100;
     //app.stage.addChild(richText);
     richTextList.push(richText);


     }

    var totalTextListstyle = new PIXI.TextStyle({
   fontFamily: 'Consolas',
   fontSize: 40,
   lineHeight: 50,
   fill: ['#000000'], // gradient
      //backgroundColor:"green"
      wordWrap: true,
    wordWrapWidth: 1500
   });

    var richText = new PIXI.Text(totalTextList,totalTextListstyle);
     richText.anchor.set(0.5);
     richText.x = 1920/2;
     richText.y = 1080/2;
     app.stage.addChild(richText);
    button
      .on('pointerdown', week_end_onButtonDown)
      .on('pointerup', week_end_onButtonUp)
      .on('pointeroutside', week_end_onButtonUp)
      .on('pointerover', week_end_onButtonOver)
      .on('pointerout', week_end_onButtonOut)


    function week_end_onButtonDown(){

    }
    function week_end_onButtonUp(){
      app.stage.removeChild(dialog);
      app.stage.removeChild(this);
      app.stage.removeChild(hwaginText);
      app.stage.removeChild(richText);
      app.stage.removeChild(block);


      var rightblock = new PIXI.Graphics();
      //rightblock.lineStyle(2, 0xFF00FF, 1);
      rightblock.beginFill(0xfff8dc, 1);
      rightblock.drawRect(360,0,1200,240);
      rightblock.lineStyle(4, 0xffd900, 1);
      rightblock.endFill();
      app.stage.addChild(rightblock);
      week9();
    }
    function week_end_onButtonOver(){

    }
    function week_end_onButtonOut(){

    }

}

}
function week9()
{


  //  총 수행한 로드 / grade = (총 수행한 로드)/(전체 로드)
  week=8;
    //7 * 11 시간표 배열이 넘어온다고 가정 (7일 10교시 + 10시 이후)
    // 16주 동안 진행하고, 16개의 이벤트 발생 -> critical 이벤트?
    var capacityPerWeek = 0;
    //  얘는 한 주 동안 남은 시간을 계산하여 과제, 공부, 체력충전으로 전환시킴

    for (let day = 0; day < 7; day++){
      var firstPeriod = -1;

      for (let peri = 0; peri < 11; peri++){
        if( thisGame.timeTable[day][peri] !== undefined &&
          thisGame.timeTable[day][peri] !== "" && firstPeriod == -1)
          firstPeriod = peri;
        } // 첫 수업시간 찾음

        capacity = capacityUpdate(firstPeriod);
        console.log("오늘의 가용시간: "+capacity+"\n");

        for (let peri = firstPeriod; peri < 11; peri++){
          if (thisGame.timeTable[day][peri] === undefined ||
            thisGame.timeTable[day][peri] === "") continue;
          let nowEvent = thisGame.timeTable[day][peri];

          thisGame.status.health += statUpdate(nowEvent.deltaHealth*timeDependency(peri));
          thisGame.status.relationship += statUpdate(nowEvent.deltaRelationship);
          capacity -= nowEvent.duration;
          // 스텟 업데이트, 가용시간 - 소모시간
        }
        console.log("오늘의 남은시간: "+capacity+"\n");
        if( capacity <= 0 ) {
          capacity = 0;
        }
        // 가용시간은 0 이하로 내려갈 수 없음

        capacityPerWeek += capacity;
        // 남은 시간은 주간 가용시간으로 넘김
      }
      completedLoad = weekCapacityUpdate(capacityPerWeek, completedLoad, week);
      // 주간 로드 반영

      console.log(week+"주차 / 현재 체력: "+thisGame.status.health+"\n");
      console.log(week+"주차 / 남은 가용시간: "+capacityPerWeek+"\n");
      console.log("총 수행한 로드(누적): "+completedLoad+"\n");

      //eventHandler(0);
      //eventProcess(week);
      // 이벤트 발생 -> 랜덤 발생하는 알고리즘 필요

      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////   UI

    var eventstyle = new PIXI.TextStyle({
    fontFamily: 'Consolas',
    fontSize: 25,
    fill: ['#000000'], // gradient
     //backgroundColor:"green"
    });

    var totalTextList;
    var richTextList=[];

    for(var i=0; i < lectureList.length; i++) {

    for(var j=0;j<i;j++)
    {
      //richTextList[j].y-=100;
    }
      console.log(lectureList[i].lectureNumber+": "+lectureList[i].name+"\n");
      console.log(lectureList[i].load[week][1]);
      var inputTxt = lectureList[i].name +"의 로드: "+lectureList[i].load[week][1]+'\n';
      totalTextList+=inputTxt;
      var richText = new PIXI.Text(inputTxt,eventstyle);
      richText.anchor.set(0.5);
      richText.x = 960;
      richText.y = 1080/4-30;
      //app.stage.addChild(richText);
      richTextList.push(richText);
    }
    var a=0;
    var b=0;
    var length=lectureList.length;
    var deltatime=40;
    var eraser;
    var totalTextList="9주차의 로그\n\n";
    function erasedialog(eraser)
    {

        if(eraser===NaN||eraser===undefined)
          return;
      for(i=0;i<eraser.length;i++)
      {
        app.stage.removeChild(eraser[i]);
      }
    }

    app.stage.addChild(richTextList[0]);

    var timing = Math.floor(Math.random() * (lectureList.length-1)*deltatime);

    var ticker1=new PIXI.ticker.Ticker();
    ticker1.start();
    ticker1.add(()=>
    {
      a++;
      if(a===timing)
        eraser=eventHandler(0);
      if(a===deltatime*lectureList.length-10)
      {
        if(eraser!==NaN&&eraser!==undefined)
        {
         totalTextList+=eraser[1].text;
         totalTextList+='\n';
        }
        erasedialog(eraser);
        week_end_9();


      }
      else if(a%deltatime===0)
      {
        //console.log(a/deltatime+"생성");
        app.stage.addChild(richTextList[a/deltatime])
      }

      else if(a<deltatime*1&&richTextList[0].y>210)
      {
        //console.log("1");
        richTextList[0].y-=3;
      }
      else if(a<deltatime*2 &&a>deltatime*1-10&& richTextList[1].y>210)
      {
        //console.log("2");
        richTextList[0].y-=3;
        richTextList[1].y-=3;
      }
      else if(a<deltatime*3 &&a>deltatime*2-10&& richTextList[2].y>210)
      {
        //console.log("3");
        richTextList[0].y-=3;
        richTextList[1].y-=3;
        richTextList[2].y-=3;
      }
      else if(a<deltatime*4 &&a>deltatime*3-10&&richTextList[3].y>210)
      {
        //console.log("4");
        richTextList[0].y-=3;
        richTextList[1].y-=3;
        richTextList[2].y-=3;
        richTextList[3].y-=3;
      }
      else if(a<deltatime*5 && a>deltatime*4-10&&richTextList[4].y>210)
      {
        //console.log("5");
        richTextList[0].y-=3;
        richTextList[1].y-=3;
        richTextList[2].y-=3;
        richTextList[3].y-=3;
        richTextList[4].y-=3;
      }

      else if(a<deltatime*6 && a>deltatime*5-10 && richTextList[5].y>210)
      {
        //console.log("6");
        richTextList[0].y-=3;
        richTextList[1].y-=3;
        richTextList[2].y-=3;
        richTextList[3].y-=3;
        richTextList[4].y-=3;
        richTextList[5].y-=3;
      }
       else if(a<deltatime*7 && a>deltatime*6-10 && richTextList[6].y>210)
      {
        //console.log("7");
        richTextList[0].y-=3;
        richTextList[1].y-=3;
        richTextList[2].y-=3;
        richTextList[3].y-=3;
        richTextList[4].y-=3;
        richTextList[5].y-=3;
        richTextList[6].y-=3;
      }
      else if(a<deltatime*8 && a>deltatime*7-10 && richTextList[7].y>210)
      {
        //console.log("8");
        richTextList[0].y-=3;
        richTextList[1].y-=3;
        richTextList[2].y-=3;
        richTextList[3].y-=3;
        richTextList[4].y-=3;
        richTextList[5].y-=3;
        richTextList[6].y-=3;
        richTextList[7].y-=3;
      }
    });


  //setTimeout('week2()',8000 );


function week_end_9(){
   var block = new PIXI.Graphics();
   var block = new PIXI.Graphics();
      block.beginFill(0xffffff, 0.75);
      block.drawRect(0,0,1920,1080);
      block.lineStyle(4, 0xffd900, 1);
      block.endFill();
      app.stage.addChild(block);
   var dialog = new PIXI.Sprite.fromImage('room/dialog.png');
   dialog.scale.y*=3;
   dialog.y-=2000;
    app.stage.addChild(dialog);


    var button = new PIXI.Graphics();
    button.beginFill(0x330000);
    button.drawRoundedRect(1920/2-80,880,160,100,15);
    app.stage.addChild(button);

    button.buttonMode = true;
    button.interactive = true;


    var hwaginstyle = new PIXI.TextStyle({
  fontFamily: 'Consolas',
  fontSize: 40,
  fill: ['#ffffff'], // gradient
  stroke: '#4a1850'
  });

  var hwaginText = new PIXI.Text("확인",hwaginstyle);
  hwaginText.anchor.set(0.5,0);
  hwaginText.x = 1920/2;
  hwaginText.y = 910;
  app.stage.addChild(hwaginText);

var richTextList=[];
var inputTxt;
  for(var i=0; i < lectureList.length; i++) {

   for(var j=0;j<i;j++)
   {
     richTextList[j].y-=100;
   }
     inputTxt = lectureList[i].name +": "+lectureList[i].load[week][1]+'\n';
     totalTextList+=inputTxt;
     var richText = new PIXI.Text(inputTxt,eventstyle);
     richText.anchor.set(0.5);
     richText.x = 1920/2;
     richText.y = 1080/2+100;
     //app.stage.addChild(richText);
     richTextList.push(richText);


     }

    var totalTextListstyle = new PIXI.TextStyle({
   fontFamily: 'Consolas',
   fontSize: 40,
   lineHeight: 50,
   fill: ['#000000'], // gradient
      //backgroundColor:"green"
      wordWrap: true,
    wordWrapWidth: 1500
   });

    var richText = new PIXI.Text(totalTextList,totalTextListstyle);
     richText.anchor.set(0.5);
     richText.x = 1920/2;
     richText.y = 1080/2;
     app.stage.addChild(richText);
    button
      .on('pointerdown', week_end_onButtonDown)
      .on('pointerup', week_end_onButtonUp)
      .on('pointeroutside', week_end_onButtonUp)
      .on('pointerover', week_end_onButtonOver)
      .on('pointerout', week_end_onButtonOut)


    function week_end_onButtonDown(){

    }
    function week_end_onButtonUp(){
      app.stage.removeChild(dialog);
      app.stage.removeChild(this);
      app.stage.removeChild(hwaginText);
      app.stage.removeChild(richText);
      app.stage.removeChild(block);


      var rightblock = new PIXI.Graphics();
      //rightblock.lineStyle(2, 0xFF00FF, 1);
      rightblock.beginFill(0xfff8dc, 1);
      rightblock.drawRect(360,0,1200,240);
      rightblock.lineStyle(4, 0xffd900, 1);
      rightblock.endFill();
      app.stage.addChild(rightblock);
      week10();
    }
    function week_end_onButtonOver(){

    }
    function week_end_onButtonOut(){

    }

}
}
function week10()
{


  //  총 수행한 로드 / grade = (총 수행한 로드)/(전체 로드)
  week=9;
    //7 * 11 시간표 배열이 넘어온다고 가정 (7일 10교시 + 10시 이후)
    // 16주 동안 진행하고, 16개의 이벤트 발생 -> critical 이벤트?
    var capacityPerWeek = 0;
    //  얘는 한 주 동안 남은 시간을 계산하여 과제, 공부, 체력충전으로 전환시킴

    for (let day = 0; day < 7; day++){
      var firstPeriod = -1;

      for (let peri = 0; peri < 11; peri++){
        if( thisGame.timeTable[day][peri] !== undefined &&
          thisGame.timeTable[day][peri] !== "" && firstPeriod == -1)
          firstPeriod = peri;
        } // 첫 수업시간 찾음

        capacity = capacityUpdate(firstPeriod);
        console.log("오늘의 가용시간: "+capacity+"\n");

        for (let peri = firstPeriod; peri < 11; peri++){
          if (thisGame.timeTable[day][peri] === undefined ||
            thisGame.timeTable[day][peri] === "") continue;
          let nowEvent = thisGame.timeTable[day][peri];

          thisGame.status.health += statUpdate(nowEvent.deltaHealth*timeDependency(peri));
          thisGame.status.relationship += statUpdate(nowEvent.deltaRelationship);
          capacity -= nowEvent.duration;
          // 스텟 업데이트, 가용시간 - 소모시간
        }
        console.log("오늘의 남은시간: "+capacity+"\n");
        if( capacity <= 0 ) {
          capacity = 0;
        }
        // 가용시간은 0 이하로 내려갈 수 없음

        capacityPerWeek += capacity;
        // 남은 시간은 주간 가용시간으로 넘김
      }
      completedLoad = weekCapacityUpdate(capacityPerWeek, completedLoad, week);
      // 주간 로드 반영

      console.log(week+"주차 / 현재 체력: "+thisGame.status.health+"\n");
      console.log(week+"주차 / 남은 가용시간: "+capacityPerWeek+"\n");
      console.log("총 수행한 로드(누적): "+completedLoad+"\n");

      //eventHandler(0);
      //eventProcess(week);
      // 이벤트 발생 -> 랜덤 발생하는 알고리즘 필요

      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////   UI

    var eventstyle = new PIXI.TextStyle({
    fontFamily: 'Consolas',
    fontSize: 25,
    fill: ['#000000'], // gradient
     //backgroundColor:"green"
    });

    var totalTextList;
    var richTextList=[];

    for(var i=0; i < lectureList.length; i++) {

    for(var j=0;j<i;j++)
    {
      //richTextList[j].y-=100;
    }
      console.log(lectureList[i].lectureNumber+": "+lectureList[i].name+"\n");
      console.log(lectureList[i].load[week][1]);
      var inputTxt = lectureList[i].name +"의 로드: "+lectureList[i].load[week][1]+'\n';
      totalTextList+=inputTxt;
      var richText = new PIXI.Text(inputTxt,eventstyle);
      richText.anchor.set(0.5);
      richText.x = 960;
      richText.y = 1080/4-30;
      //app.stage.addChild(richText);
      richTextList.push(richText);
    }
    var a=0;
    var b=0;
    var length=lectureList.length;
    var deltatime=40;
    var eraser;
    var totalTextList="10주차의 로그\n\n";
    function erasedialog(eraser)
    {

        if(eraser===NaN||eraser===undefined)
          return;
      for(i=0;i<eraser.length;i++)
      {
        app.stage.removeChild(eraser[i]);
      }
    }

    app.stage.addChild(richTextList[0]);

    var timing = Math.floor(Math.random() * (lectureList.length-1)*deltatime);

    var ticker1=new PIXI.ticker.Ticker();
    ticker1.start();
    ticker1.add(()=>
    {
      a++;
      if(a===timing)
        eraser=eventHandler(0);
      if(a===deltatime*lectureList.length-10)
      {
        if(eraser!==NaN&&eraser!==undefined)
        {
         totalTextList+=eraser[1].text;
         totalTextList+='\n';
        }
        erasedialog(eraser);
        week_end_10();


      }
      else if(a%deltatime===0)
      {
        //console.log(a/deltatime+"생성");
        app.stage.addChild(richTextList[a/deltatime])
      }

      else if(a<deltatime*1&&richTextList[0].y>210)
      {
        //console.log("1");
        richTextList[0].y-=3;
      }
      else if(a<deltatime*2 &&a>deltatime*1-10&& richTextList[1].y>210)
      {
        //console.log("2");
        richTextList[0].y-=3;
        richTextList[1].y-=3;
      }
      else if(a<deltatime*3 &&a>deltatime*2-10&& richTextList[2].y>210)
      {
        //console.log("3");
        richTextList[0].y-=3;
        richTextList[1].y-=3;
        richTextList[2].y-=3;
      }
      else if(a<deltatime*4 &&a>deltatime*3-10&&richTextList[3].y>210)
      {
        //console.log("4");
        richTextList[0].y-=3;
        richTextList[1].y-=3;
        richTextList[2].y-=3;
        richTextList[3].y-=3;
      }
      else if(a<deltatime*5 && a>deltatime*4-10&&richTextList[4].y>210)
      {
        //console.log("5");
        richTextList[0].y-=3;
        richTextList[1].y-=3;
        richTextList[2].y-=3;
        richTextList[3].y-=3;
        richTextList[4].y-=3;
      }

      else if(a<deltatime*6 && a>deltatime*5-10 && richTextList[5].y>210)
      {
        //console.log("6");
        richTextList[0].y-=3;
        richTextList[1].y-=3;
        richTextList[2].y-=3;
        richTextList[3].y-=3;
        richTextList[4].y-=3;
        richTextList[5].y-=3;
      }
       else if(a<deltatime*7 && a>deltatime*6-10 && richTextList[6].y>210)
      {
        //console.log("7");
        richTextList[0].y-=3;
        richTextList[1].y-=3;
        richTextList[2].y-=3;
        richTextList[3].y-=3;
        richTextList[4].y-=3;
        richTextList[5].y-=3;
        richTextList[6].y-=3;
      }
      else if(a<deltatime*8 && a>deltatime*7-10 && richTextList[7].y>210)
      {
        //console.log("8");
        richTextList[0].y-=3;
        richTextList[1].y-=3;
        richTextList[2].y-=3;
        richTextList[3].y-=3;
        richTextList[4].y-=3;
        richTextList[5].y-=3;
        richTextList[6].y-=3;
        richTextList[7].y-=3;
      }
    });


  //setTimeout('week2()',8000 );


function week_end_10(){
   var block = new PIXI.Graphics();
   var block = new PIXI.Graphics();
      block.beginFill(0xffffff, 0.75);
      block.drawRect(0,0,1920,1080);
      block.lineStyle(4, 0xffd900, 1);
      block.endFill();
      app.stage.addChild(block);
   var dialog = new PIXI.Sprite.fromImage('room/dialog.png');
   dialog.scale.y*=3;
   dialog.y-=2000;
    app.stage.addChild(dialog);


    var button = new PIXI.Graphics();
    button.beginFill(0x330000);
    button.drawRoundedRect(1920/2-80,880,160,100,15);
    app.stage.addChild(button);

    button.buttonMode = true;
    button.interactive = true;


    var hwaginstyle = new PIXI.TextStyle({
  fontFamily: 'Consolas',
  fontSize: 40,
  fill: ['#ffffff'], // gradient
  stroke: '#4a1850'
  });

  var hwaginText = new PIXI.Text("확인",hwaginstyle);
  hwaginText.anchor.set(0.5,0);
  hwaginText.x = 1920/2;
  hwaginText.y = 910;
  app.stage.addChild(hwaginText);

var richTextList=[];
var inputTxt;
  for(var i=0; i < lectureList.length; i++) {

   for(var j=0;j<i;j++)
   {
     richTextList[j].y-=100;
   }
     inputTxt = lectureList[i].name +": "+lectureList[i].load[week][1]+'\n';
     totalTextList+=inputTxt;
     var richText = new PIXI.Text(inputTxt,eventstyle);
     richText.anchor.set(0.5);
     richText.x = 1920/2;
     richText.y = 1080/2+100;
     //app.stage.addChild(richText);
     richTextList.push(richText);


     }

    var totalTextListstyle = new PIXI.TextStyle({
   fontFamily: 'Consolas',
   fontSize: 40,
   lineHeight: 50,
   fill: ['#000000'], // gradient
      //backgroundColor:"green"
      wordWrap: true,
    wordWrapWidth: 1500
   });

    var richText = new PIXI.Text(totalTextList,totalTextListstyle);
     richText.anchor.set(0.5);
     richText.x = 1920/2;
     richText.y = 1080/2;
     app.stage.addChild(richText);
    button
      .on('pointerdown', week_end_onButtonDown)
      .on('pointerup', week_end_onButtonUp)
      .on('pointeroutside', week_end_onButtonUp)
      .on('pointerover', week_end_onButtonOver)
      .on('pointerout', week_end_onButtonOut)


    function week_end_onButtonDown(){

    }
    function week_end_onButtonUp(){
      app.stage.removeChild(dialog);
      app.stage.removeChild(this);
      app.stage.removeChild(hwaginText);
      app.stage.removeChild(richText);
      app.stage.removeChild(block);


      var rightblock = new PIXI.Graphics();
      //rightblock.lineStyle(2, 0xFF00FF, 1);
      rightblock.beginFill(0xfff8dc, 1);
      rightblock.drawRect(360,0,1200,240);
      rightblock.lineStyle(4, 0xffd900, 1);
      rightblock.endFill();
      app.stage.addChild(rightblock);
      week11();
    }
    function week_end_onButtonOver(){

    }
    function week_end_onButtonOut(){

    }

}
}
function week11()
{


  //  총 수행한 로드 / grade = (총 수행한 로드)/(전체 로드)
  week=10;
    //7 * 11 시간표 배열이 넘어온다고 가정 (7일 10교시 + 10시 이후)
    // 16주 동안 진행하고, 16개의 이벤트 발생 -> critical 이벤트?
    var capacityPerWeek = 0;
    //  얘는 한 주 동안 남은 시간을 계산하여 과제, 공부, 체력충전으로 전환시킴

    for (let day = 0; day < 7; day++){
      var firstPeriod = -1;

      for (let peri = 0; peri < 11; peri++){
        if( thisGame.timeTable[day][peri] !== undefined &&
          thisGame.timeTable[day][peri] !== "" && firstPeriod == -1)
          firstPeriod = peri;
        } // 첫 수업시간 찾음

        capacity = capacityUpdate(firstPeriod);
        console.log("오늘의 가용시간: "+capacity+"\n");

        for (let peri = firstPeriod; peri < 11; peri++){
          if (thisGame.timeTable[day][peri] === undefined ||
            thisGame.timeTable[day][peri] === "") continue;
          let nowEvent = thisGame.timeTable[day][peri];

          thisGame.status.health += statUpdate(nowEvent.deltaHealth*timeDependency(peri));
          thisGame.status.relationship += statUpdate(nowEvent.deltaRelationship);
          capacity -= nowEvent.duration;
          // 스텟 업데이트, 가용시간 - 소모시간
        }
        console.log("오늘의 남은시간: "+capacity+"\n");
        if( capacity <= 0 ) {
          capacity = 0;
        }
        // 가용시간은 0 이하로 내려갈 수 없음

        capacityPerWeek += capacity;
        // 남은 시간은 주간 가용시간으로 넘김
      }
      completedLoad = weekCapacityUpdate(capacityPerWeek, completedLoad, week);
      // 주간 로드 반영

      console.log(week+"주차 / 현재 체력: "+thisGame.status.health+"\n");
      console.log(week+"주차 / 남은 가용시간: "+capacityPerWeek+"\n");
      console.log("총 수행한 로드(누적): "+completedLoad+"\n");

      //eventHandler(0);
      //eventProcess(week);
      // 이벤트 발생 -> 랜덤 발생하는 알고리즘 필요

      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////   UI

    var eventstyle = new PIXI.TextStyle({
    fontFamily: 'Consolas',
    fontSize: 25,
    fill: ['#000000'], // gradient
     //backgroundColor:"green"
    });

    var totalTextList;
    var richTextList=[];

    for(var i=0; i < lectureList.length; i++) {

    for(var j=0;j<i;j++)
    {
      //richTextList[j].y-=100;
    }
      console.log(lectureList[i].lectureNumber+": "+lectureList[i].name+"\n");
      console.log(lectureList[i].load[week][1]);
      var inputTxt = lectureList[i].name +"의 로드: "+lectureList[i].load[week][1]+'\n';
      totalTextList+=inputTxt;
      var richText = new PIXI.Text(inputTxt,eventstyle);
      richText.anchor.set(0.5);
      richText.x = 960;
      richText.y = 1080/4-30;
      //app.stage.addChild(richText);
      richTextList.push(richText);
    }
    var a=0;
    var b=0;
    var length=lectureList.length;
    var deltatime=40;
    var eraser;
    var totalTextList="11주차의 로그\n\n";
    function erasedialog(eraser)
    {

        if(eraser===NaN||eraser===undefined)
          return;
      for(i=0;i<eraser.length;i++)
      {
        app.stage.removeChild(eraser[i]);
      }
    }

    app.stage.addChild(richTextList[0]);

    var timing = Math.floor(Math.random() * (lectureList.length-1)*deltatime);

    var ticker1=new PIXI.ticker.Ticker();
    ticker1.start();
    ticker1.add(()=>
    {
      a++;
      if(a===timing)
        eraser=eventHandler(0);
      if(a===deltatime*lectureList.length-10)
      {
        if(eraser!==NaN&&eraser!==undefined)
        {
         totalTextList+=eraser[1].text;
         totalTextList+='\n';
        }
        erasedialog(eraser);
        week_end_11();


      }
      else if(a%deltatime===0)
      {
        //console.log(a/deltatime+"생성");
        app.stage.addChild(richTextList[a/deltatime])
      }

      else if(a<deltatime*1&&richTextList[0].y>210)
      {
        //console.log("1");
        richTextList[0].y-=3;
      }
      else if(a<deltatime*2 &&a>deltatime*1-10&& richTextList[1].y>210)
      {
        //console.log("2");
        richTextList[0].y-=3;
        richTextList[1].y-=3;
      }
      else if(a<deltatime*3 &&a>deltatime*2-10&& richTextList[2].y>210)
      {
        //console.log("3");
        richTextList[0].y-=3;
        richTextList[1].y-=3;
        richTextList[2].y-=3;
      }
      else if(a<deltatime*4 &&a>deltatime*3-10&&richTextList[3].y>210)
      {
        //console.log("4");
        richTextList[0].y-=3;
        richTextList[1].y-=3;
        richTextList[2].y-=3;
        richTextList[3].y-=3;
      }
      else if(a<deltatime*5 && a>deltatime*4-10&&richTextList[4].y>210)
      {
        //console.log("5");
        richTextList[0].y-=3;
        richTextList[1].y-=3;
        richTextList[2].y-=3;
        richTextList[3].y-=3;
        richTextList[4].y-=3;
      }

      else if(a<deltatime*6 && a>deltatime*5-10 && richTextList[5].y>210)
      {
        //console.log("6");
        richTextList[0].y-=3;
        richTextList[1].y-=3;
        richTextList[2].y-=3;
        richTextList[3].y-=3;
        richTextList[4].y-=3;
        richTextList[5].y-=3;
      }
       else if(a<deltatime*7 && a>deltatime*6-10 && richTextList[6].y>210)
      {
        //console.log("7");
        richTextList[0].y-=3;
        richTextList[1].y-=3;
        richTextList[2].y-=3;
        richTextList[3].y-=3;
        richTextList[4].y-=3;
        richTextList[5].y-=3;
        richTextList[6].y-=3;
      }
      else if(a<deltatime*8 && a>deltatime*7-10 && richTextList[7].y>210)
      {
        //console.log("8");
        richTextList[0].y-=3;
        richTextList[1].y-=3;
        richTextList[2].y-=3;
        richTextList[3].y-=3;
        richTextList[4].y-=3;
        richTextList[5].y-=3;
        richTextList[6].y-=3;
        richTextList[7].y-=3;
      }
    });


  //setTimeout('week2()',8000 );


function week_end_11(){
   var block = new PIXI.Graphics();
   var block = new PIXI.Graphics();
      block.beginFill(0xffffff, 0.75);
      block.drawRect(0,0,1920,1080);
      block.lineStyle(4, 0xffd900, 1);
      block.endFill();
      app.stage.addChild(block);
   var dialog = new PIXI.Sprite.fromImage('room/dialog.png');
   dialog.scale.y*=3;
   dialog.y-=2000;
    app.stage.addChild(dialog);


    var button = new PIXI.Graphics();
    button.beginFill(0x330000);
    button.drawRoundedRect(1920/2-80,880,160,100,15);
    app.stage.addChild(button);

    button.buttonMode = true;
    button.interactive = true;


    var hwaginstyle = new PIXI.TextStyle({
  fontFamily: 'Consolas',
  fontSize: 40,
  fill: ['#ffffff'], // gradient
  stroke: '#4a1850'
  });

  var hwaginText = new PIXI.Text("확인",hwaginstyle);
  hwaginText.anchor.set(0.5,0);
  hwaginText.x = 1920/2;
  hwaginText.y = 910;
  app.stage.addChild(hwaginText);

var richTextList=[];
var inputTxt;
  for(var i=0; i < lectureList.length; i++) {

   for(var j=0;j<i;j++)
   {
     richTextList[j].y-=100;
   }
     inputTxt = lectureList[i].name +": "+lectureList[i].load[week][1]+'\n';
     totalTextList+=inputTxt;
     var richText = new PIXI.Text(inputTxt,eventstyle);
     richText.anchor.set(0.5);
     richText.x = 1920/2;
     richText.y = 1080/2+100;
     //app.stage.addChild(richText);
     richTextList.push(richText);


     }

    var totalTextListstyle = new PIXI.TextStyle({
   fontFamily: 'Consolas',
   fontSize: 40,
   lineHeight: 50,
   fill: ['#000000'], // gradient
      //backgroundColor:"green"
      wordWrap: true,
    wordWrapWidth: 1500
   });

    var richText = new PIXI.Text(totalTextList,totalTextListstyle);
     richText.anchor.set(0.5);
     richText.x = 1920/2;
     richText.y = 1080/2;
     app.stage.addChild(richText);
    button
      .on('pointerdown', week_end_onButtonDown)
      .on('pointerup', week_end_onButtonUp)
      .on('pointeroutside', week_end_onButtonUp)
      .on('pointerover', week_end_onButtonOver)
      .on('pointerout', week_end_onButtonOut)


    function week_end_onButtonDown(){

    }
    function week_end_onButtonUp(){
      app.stage.removeChild(dialog);
      app.stage.removeChild(this);
      app.stage.removeChild(hwaginText);
      app.stage.removeChild(richText);
      app.stage.removeChild(block);


      var rightblock = new PIXI.Graphics();
      //rightblock.lineStyle(2, 0xFF00FF, 1);
      rightblock.beginFill(0xfff8dc, 1);
      rightblock.drawRect(360,0,1200,240);
      rightblock.lineStyle(4, 0xffd900, 1);
      rightblock.endFill();
      app.stage.addChild(rightblock);
      week12();
    }
    function week_end_onButtonOver(){

    }
    function week_end_onButtonOut(){

    }

}
}
function week12()
{


  //  총 수행한 로드 / grade = (총 수행한 로드)/(전체 로드)
  week=11;
    //7 * 11 시간표 배열이 넘어온다고 가정 (7일 10교시 + 10시 이후)
    // 16주 동안 진행하고, 16개의 이벤트 발생 -> critical 이벤트?
    var capacityPerWeek = 0;
    //  얘는 한 주 동안 남은 시간을 계산하여 과제, 공부, 체력충전으로 전환시킴

    for (let day = 0; day < 7; day++){
      var firstPeriod = -1;

      for (let peri = 0; peri < 11; peri++){
        if( thisGame.timeTable[day][peri] !== undefined &&
          thisGame.timeTable[day][peri] !== "" && firstPeriod == -1)
          firstPeriod = peri;
        } // 첫 수업시간 찾음

        capacity = capacityUpdate(firstPeriod);
        console.log("오늘의 가용시간: "+capacity+"\n");

        for (let peri = firstPeriod; peri < 11; peri++){
          if (thisGame.timeTable[day][peri] === undefined ||
            thisGame.timeTable[day][peri] === "") continue;
          let nowEvent = thisGame.timeTable[day][peri];

          thisGame.status.health += statUpdate(nowEvent.deltaHealth*timeDependency(peri));
          thisGame.status.relationship += statUpdate(nowEvent.deltaRelationship);
          capacity -= nowEvent.duration;
          // 스텟 업데이트, 가용시간 - 소모시간
        }
        console.log("오늘의 남은시간: "+capacity+"\n");
        if( capacity <= 0 ) {
          capacity = 0;
        }
        // 가용시간은 0 이하로 내려갈 수 없음

        capacityPerWeek += capacity;
        // 남은 시간은 주간 가용시간으로 넘김
      }
      completedLoad = weekCapacityUpdate(capacityPerWeek, completedLoad, week);
      // 주간 로드 반영

      console.log(week+"주차 / 현재 체력: "+thisGame.status.health+"\n");
      console.log(week+"주차 / 남은 가용시간: "+capacityPerWeek+"\n");
      console.log("총 수행한 로드(누적): "+completedLoad+"\n");

      //eventHandler(0);
      //eventProcess(week);
      // 이벤트 발생 -> 랜덤 발생하는 알고리즘 필요

      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////   UI

    var eventstyle = new PIXI.TextStyle({
    fontFamily: 'Consolas',
    fontSize: 25,
    fill: ['#000000'], // gradient
     //backgroundColor:"green"
    });

    var totalTextList;
    var richTextList=[];

    for(var i=0; i < lectureList.length; i++) {

    for(var j=0;j<i;j++)
    {
      //richTextList[j].y-=100;
    }
      console.log(lectureList[i].lectureNumber+": "+lectureList[i].name+"\n");
      console.log(lectureList[i].load[week][1]);
      var inputTxt = lectureList[i].name +"의 로드: "+lectureList[i].load[week][1]+'\n';
      totalTextList+=inputTxt;
      var richText = new PIXI.Text(inputTxt,eventstyle);
      richText.anchor.set(0.5);
      richText.x = 960;
      richText.y = 1080/4-30;
      //app.stage.addChild(richText);
      richTextList.push(richText);
    }
    var a=0;
    var b=0;
    var length=lectureList.length;
    var deltatime=40;
    var eraser;
    var totalTextList="12주차의 로그\n\n";
    function erasedialog(eraser)
    {

        if(eraser===NaN||eraser===undefined)
          return;
      for(i=0;i<eraser.length;i++)
      {
        app.stage.removeChild(eraser[i]);
      }
    }

    app.stage.addChild(richTextList[0]);

    var timing = Math.floor(Math.random() * (lectureList.length-1)*deltatime);

    var ticker1=new PIXI.ticker.Ticker();
    ticker1.start();
    ticker1.add(()=>
    {
      a++;
      if(a===timing)
        eraser=eventHandler(0);
      if(a===deltatime*lectureList.length-10)
      {
        if(eraser!==NaN&&eraser!==undefined)
        {
         totalTextList+=eraser[1].text;
         totalTextList+='\n';
        }
        erasedialog(eraser);
        week_end_12();


      }
      else if(a%deltatime===0)
      {
        //console.log(a/deltatime+"생성");
        app.stage.addChild(richTextList[a/deltatime])
      }

      else if(a<deltatime*1&&richTextList[0].y>210)
      {
        //console.log("1");
        richTextList[0].y-=3;
      }
      else if(a<deltatime*2 &&a>deltatime*1-10&& richTextList[1].y>210)
      {
        //console.log("2");
        richTextList[0].y-=3;
        richTextList[1].y-=3;
      }
      else if(a<deltatime*3 &&a>deltatime*2-10&& richTextList[2].y>210)
      {
        //console.log("3");
        richTextList[0].y-=3;
        richTextList[1].y-=3;
        richTextList[2].y-=3;
      }
      else if(a<deltatime*4 &&a>deltatime*3-10&&richTextList[3].y>210)
      {
        //console.log("4");
        richTextList[0].y-=3;
        richTextList[1].y-=3;
        richTextList[2].y-=3;
        richTextList[3].y-=3;
      }
      else if(a<deltatime*5 && a>deltatime*4-10&&richTextList[4].y>210)
      {
        //console.log("5");
        richTextList[0].y-=3;
        richTextList[1].y-=3;
        richTextList[2].y-=3;
        richTextList[3].y-=3;
        richTextList[4].y-=3;
      }

      else if(a<deltatime*6 && a>deltatime*5-10 && richTextList[5].y>210)
      {
        //console.log("6");
        richTextList[0].y-=3;
        richTextList[1].y-=3;
        richTextList[2].y-=3;
        richTextList[3].y-=3;
        richTextList[4].y-=3;
        richTextList[5].y-=3;
      }
       else if(a<deltatime*7 && a>deltatime*6-10 && richTextList[6].y>210)
      {
        //console.log("7");
        richTextList[0].y-=3;
        richTextList[1].y-=3;
        richTextList[2].y-=3;
        richTextList[3].y-=3;
        richTextList[4].y-=3;
        richTextList[5].y-=3;
        richTextList[6].y-=3;
      }
      else if(a<deltatime*8 && a>deltatime*7-10 && richTextList[7].y>210)
      {
        //console.log("8");
        richTextList[0].y-=3;
        richTextList[1].y-=3;
        richTextList[2].y-=3;
        richTextList[3].y-=3;
        richTextList[4].y-=3;
        richTextList[5].y-=3;
        richTextList[6].y-=3;
        richTextList[7].y-=3;
      }
    });


  //setTimeout('week2()',8000 );


function week_end_12(){
   var block = new PIXI.Graphics();
   var block = new PIXI.Graphics();
      block.beginFill(0xffffff, 0.75);
      block.drawRect(0,0,1920,1080);
      block.lineStyle(4, 0xffd900, 1);
      block.endFill();
      app.stage.addChild(block);
   var dialog = new PIXI.Sprite.fromImage('room/dialog.png');
   dialog.scale.y*=3;
   dialog.y-=2000;
    app.stage.addChild(dialog);


    var button = new PIXI.Graphics();
    button.beginFill(0x330000);
    button.drawRoundedRect(1920/2-80,880,160,100,15);
    app.stage.addChild(button);

    button.buttonMode = true;
    button.interactive = true;


    var hwaginstyle = new PIXI.TextStyle({
  fontFamily: 'Consolas',
  fontSize: 40,
  fill: ['#ffffff'], // gradient
  stroke: '#4a1850'
  });

  var hwaginText = new PIXI.Text("확인",hwaginstyle);
  hwaginText.anchor.set(0.5,0);
  hwaginText.x = 1920/2;
  hwaginText.y = 910;
  app.stage.addChild(hwaginText);

var richTextList=[];
var inputTxt;
  for(var i=0; i < lectureList.length; i++) {

   for(var j=0;j<i;j++)
   {
     richTextList[j].y-=100;
   }
     inputTxt = lectureList[i].name +": "+lectureList[i].load[week][1]+'\n';
     totalTextList+=inputTxt;
     var richText = new PIXI.Text(inputTxt,eventstyle);
     richText.anchor.set(0.5);
     richText.x = 1920/2;
     richText.y = 1080/2+100;
     //app.stage.addChild(richText);
     richTextList.push(richText);


     }

    var totalTextListstyle = new PIXI.TextStyle({
   fontFamily: 'Consolas',
   fontSize: 40,
   lineHeight: 50,
   fill: ['#000000'], // gradient
      //backgroundColor:"green"
      wordWrap: true,
    wordWrapWidth: 1500
   });

    var richText = new PIXI.Text(totalTextList,totalTextListstyle);
     richText.anchor.set(0.5);
     richText.x = 1920/2;
     richText.y = 1080/2;
     app.stage.addChild(richText);
    button
      .on('pointerdown', week_end_onButtonDown)
      .on('pointerup', week_end_onButtonUp)
      .on('pointeroutside', week_end_onButtonUp)
      .on('pointerover', week_end_onButtonOver)
      .on('pointerout', week_end_onButtonOut)


    function week_end_onButtonDown(){

    }
    function week_end_onButtonUp(){
      app.stage.removeChild(dialog);
      app.stage.removeChild(this);
      app.stage.removeChild(hwaginText);
      app.stage.removeChild(richText);
      app.stage.removeChild(block);


      var rightblock = new PIXI.Graphics();
      //rightblock.lineStyle(2, 0xFF00FF, 1);
      rightblock.beginFill(0xfff8dc, 1);
      rightblock.drawRect(360,0,1200,240);
      rightblock.lineStyle(4, 0xffd900, 1);
      rightblock.endFill();
      app.stage.addChild(rightblock);
      week13();
    }
    function week_end_onButtonOver(){

    }
    function week_end_onButtonOut(){

    }

}
}
function week13()
{


  //  총 수행한 로드 / grade = (총 수행한 로드)/(전체 로드)
  week=12;
    //7 * 11 시간표 배열이 넘어온다고 가정 (7일 10교시 + 10시 이후)
    // 16주 동안 진행하고, 16개의 이벤트 발생 -> critical 이벤트?
    var capacityPerWeek = 0;
    //  얘는 한 주 동안 남은 시간을 계산하여 과제, 공부, 체력충전으로 전환시킴

    for (let day = 0; day < 7; day++){
      var firstPeriod = -1;

      for (let peri = 0; peri < 11; peri++){
        if( thisGame.timeTable[day][peri] !== undefined &&
          thisGame.timeTable[day][peri] !== "" && firstPeriod == -1)
          firstPeriod = peri;
        } // 첫 수업시간 찾음

        capacity = capacityUpdate(firstPeriod);
        console.log("오늘의 가용시간: "+capacity+"\n");

        for (let peri = firstPeriod; peri < 11; peri++){
          if (thisGame.timeTable[day][peri] === undefined ||
            thisGame.timeTable[day][peri] === "") continue;
          let nowEvent = thisGame.timeTable[day][peri];

          thisGame.status.health += statUpdate(nowEvent.deltaHealth*timeDependency(peri));
          thisGame.status.relationship += statUpdate(nowEvent.deltaRelationship);
          capacity -= nowEvent.duration;
          // 스텟 업데이트, 가용시간 - 소모시간
        }
        console.log("오늘의 남은시간: "+capacity+"\n");
        if( capacity <= 0 ) {
          capacity = 0;
        }
        // 가용시간은 0 이하로 내려갈 수 없음

        capacityPerWeek += capacity;
        // 남은 시간은 주간 가용시간으로 넘김
      }
      completedLoad = weekCapacityUpdate(capacityPerWeek, completedLoad, week);
      // 주간 로드 반영

      console.log(week+"주차 / 현재 체력: "+thisGame.status.health+"\n");
      console.log(week+"주차 / 남은 가용시간: "+capacityPerWeek+"\n");
      console.log("총 수행한 로드(누적): "+completedLoad+"\n");

      //eventHandler(0);
      //eventProcess(week);
      // 이벤트 발생 -> 랜덤 발생하는 알고리즘 필요

      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////   UI

    var eventstyle = new PIXI.TextStyle({
    fontFamily: 'Consolas',
    fontSize: 25,
    fill: ['#000000'], // gradient
     //backgroundColor:"green"
    });

    var totalTextList;
    var richTextList=[];

    for(var i=0; i < lectureList.length; i++) {

    for(var j=0;j<i;j++)
    {
      //richTextList[j].y-=100;
    }
      console.log(lectureList[i].lectureNumber+": "+lectureList[i].name+"\n");
      console.log(lectureList[i].load[week][1]);
      var inputTxt = lectureList[i].name +"의 로드: "+lectureList[i].load[week][1]+'\n';
      totalTextList+=inputTxt;
      var richText = new PIXI.Text(inputTxt,eventstyle);
      richText.anchor.set(0.5);
      richText.x = 960;
      richText.y = 1080/4-30;
      //app.stage.addChild(richText);
      richTextList.push(richText);
    }
    var a=0;
    var b=0;
    var length=lectureList.length;
    var deltatime=40;
    var eraser;
    var totalTextList="13주차의 로그\n\n";
    function erasedialog(eraser)
    {

        if(eraser===NaN||eraser===undefined)
          return;
      for(i=0;i<eraser.length;i++)
      {
        app.stage.removeChild(eraser[i]);
      }
    }

    app.stage.addChild(richTextList[0]);

    var timing = Math.floor(Math.random() * (lectureList.length-1)*deltatime);

    var ticker1=new PIXI.ticker.Ticker();
    ticker1.start();
    ticker1.add(()=>
    {
      a++;
      if(a===timing)
        eraser=eventHandler(0);
      if(a===deltatime*lectureList.length-10)
      {
        if(eraser!==NaN&&eraser!==undefined)
        {
         totalTextList+=eraser[1].text;
         totalTextList+='\n';
        }
        erasedialog(eraser);
        week_end_13();


      }
      else if(a%deltatime===0)
      {
        //console.log(a/deltatime+"생성");
        app.stage.addChild(richTextList[a/deltatime])
      }

      else if(a<deltatime*1&&richTextList[0].y>210)
      {
        //console.log("1");
        richTextList[0].y-=3;
      }
      else if(a<deltatime*2 &&a>deltatime*1-10&& richTextList[1].y>210)
      {
        //console.log("2");
        richTextList[0].y-=3;
        richTextList[1].y-=3;
      }
      else if(a<deltatime*3 &&a>deltatime*2-10&& richTextList[2].y>210)
      {
        //console.log("3");
        richTextList[0].y-=3;
        richTextList[1].y-=3;
        richTextList[2].y-=3;
      }
      else if(a<deltatime*4 &&a>deltatime*3-10&&richTextList[3].y>210)
      {
        //console.log("4");
        richTextList[0].y-=3;
        richTextList[1].y-=3;
        richTextList[2].y-=3;
        richTextList[3].y-=3;
      }
      else if(a<deltatime*5 && a>deltatime*4-10&&richTextList[4].y>210)
      {
        //console.log("5");
        richTextList[0].y-=3;
        richTextList[1].y-=3;
        richTextList[2].y-=3;
        richTextList[3].y-=3;
        richTextList[4].y-=3;
      }

      else if(a<deltatime*6 && a>deltatime*5-10 && richTextList[5].y>210)
      {
        //console.log("6");
        richTextList[0].y-=3;
        richTextList[1].y-=3;
        richTextList[2].y-=3;
        richTextList[3].y-=3;
        richTextList[4].y-=3;
        richTextList[5].y-=3;
      }
       else if(a<deltatime*7 && a>deltatime*6-10 && richTextList[6].y>210)
      {
        //console.log("7");
        richTextList[0].y-=3;
        richTextList[1].y-=3;
        richTextList[2].y-=3;
        richTextList[3].y-=3;
        richTextList[4].y-=3;
        richTextList[5].y-=3;
        richTextList[6].y-=3;
      }
      else if(a<deltatime*8 && a>deltatime*7-10 && richTextList[7].y>210)
      {
        //console.log("8");
        richTextList[0].y-=3;
        richTextList[1].y-=3;
        richTextList[2].y-=3;
        richTextList[3].y-=3;
        richTextList[4].y-=3;
        richTextList[5].y-=3;
        richTextList[6].y-=3;
        richTextList[7].y-=3;
      }
    });


  //setTimeout('week2()',8000 );


function week_end_13(){
   var block = new PIXI.Graphics();
   var block = new PIXI.Graphics();
      block.beginFill(0xffffff, 0.75);
      block.drawRect(0,0,1920,1080);
      block.lineStyle(4, 0xffd900, 1);
      block.endFill();
      app.stage.addChild(block);
   var dialog = new PIXI.Sprite.fromImage('room/dialog.png');
   dialog.scale.y*=3;
   dialog.y-=2000;
    app.stage.addChild(dialog);


    var button = new PIXI.Graphics();
    button.beginFill(0x330000);
    button.drawRoundedRect(1920/2-80,880,160,100,15);
    app.stage.addChild(button);

    button.buttonMode = true;
    button.interactive = true;


    var hwaginstyle = new PIXI.TextStyle({
  fontFamily: 'Consolas',
  fontSize: 40,
  fill: ['#ffffff'], // gradient
  stroke: '#4a1850'
  });

  var hwaginText = new PIXI.Text("확인",hwaginstyle);
  hwaginText.anchor.set(0.5,0);
  hwaginText.x = 1920/2;
  hwaginText.y = 910;
  app.stage.addChild(hwaginText);

var richTextList=[];
var inputTxt;
  for(var i=0; i < lectureList.length; i++) {

   for(var j=0;j<i;j++)
   {
     richTextList[j].y-=100;
   }
     inputTxt = lectureList[i].name +": "+lectureList[i].load[week][1]+'\n';
     totalTextList+=inputTxt;
     var richText = new PIXI.Text(inputTxt,eventstyle);
     richText.anchor.set(0.5);
     richText.x = 1920/2;
     richText.y = 1080/2+100;
     //app.stage.addChild(richText);
     richTextList.push(richText);


     }

    var totalTextListstyle = new PIXI.TextStyle({
   fontFamily: 'Consolas',
   fontSize: 40,
   lineHeight: 50,
   fill: ['#000000'], // gradient
      //backgroundColor:"green"
      wordWrap: true,
    wordWrapWidth: 1500
   });

    var richText = new PIXI.Text(totalTextList,totalTextListstyle);
     richText.anchor.set(0.5);
     richText.x = 1920/2;
     richText.y = 1080/2;
     app.stage.addChild(richText);
    button
      .on('pointerdown', week_end_onButtonDown)
      .on('pointerup', week_end_onButtonUp)
      .on('pointeroutside', week_end_onButtonUp)
      .on('pointerover', week_end_onButtonOver)
      .on('pointerout', week_end_onButtonOut)


    function week_end_onButtonDown(){

    }
    function week_end_onButtonUp(){
      app.stage.removeChild(dialog);
      app.stage.removeChild(this);
      app.stage.removeChild(hwaginText);
      app.stage.removeChild(richText);
      app.stage.removeChild(block);


      var rightblock = new PIXI.Graphics();
      //rightblock.lineStyle(2, 0xFF00FF, 1);
      rightblock.beginFill(0xfff8dc, 1);
      rightblock.drawRect(360,0,1200,240);
      rightblock.lineStyle(4, 0xffd900, 1);
      rightblock.endFill();
      app.stage.addChild(rightblock);
      week14();
    }
    function week_end_onButtonOver(){

    }
    function week_end_onButtonOut(){

    }

}
}
function week14()
{


  //  총 수행한 로드 / grade = (총 수행한 로드)/(전체 로드)
  week=13;
    //7 * 11 시간표 배열이 넘어온다고 가정 (7일 10교시 + 10시 이후)
    // 16주 동안 진행하고, 16개의 이벤트 발생 -> critical 이벤트?
    var capacityPerWeek = 0;
    //  얘는 한 주 동안 남은 시간을 계산하여 과제, 공부, 체력충전으로 전환시킴

    for (let day = 0; day < 7; day++){
      var firstPeriod = -1;

      for (let peri = 0; peri < 11; peri++){
        if( thisGame.timeTable[day][peri] !== undefined &&
          thisGame.timeTable[day][peri] !== "" && firstPeriod == -1)
          firstPeriod = peri;
        } // 첫 수업시간 찾음

        capacity = capacityUpdate(firstPeriod);
        console.log("오늘의 가용시간: "+capacity+"\n");

        for (let peri = firstPeriod; peri < 11; peri++){
          if (thisGame.timeTable[day][peri] === undefined ||
            thisGame.timeTable[day][peri] === "") continue;
          let nowEvent = thisGame.timeTable[day][peri];

          thisGame.status.health += statUpdate(nowEvent.deltaHealth*timeDependency(peri));
          thisGame.status.relationship += statUpdate(nowEvent.deltaRelationship);
          capacity -= nowEvent.duration;
          // 스텟 업데이트, 가용시간 - 소모시간
        }
        console.log("오늘의 남은시간: "+capacity+"\n");
        if( capacity <= 0 ) {
          capacity = 0;
        }
        // 가용시간은 0 이하로 내려갈 수 없음

        capacityPerWeek += capacity;
        // 남은 시간은 주간 가용시간으로 넘김
      }
      completedLoad = weekCapacityUpdate(capacityPerWeek, completedLoad, week);
      // 주간 로드 반영

      console.log(week+"주차 / 현재 체력: "+thisGame.status.health+"\n");
      console.log(week+"주차 / 남은 가용시간: "+capacityPerWeek+"\n");
      console.log("총 수행한 로드(누적): "+completedLoad+"\n");

      //eventHandler(0);
      //eventProcess(week);
      // 이벤트 발생 -> 랜덤 발생하는 알고리즘 필요

      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////   UI

    var eventstyle = new PIXI.TextStyle({
    fontFamily: 'Consolas',
    fontSize: 25,
    fill: ['#000000'], // gradient
     //backgroundColor:"green"
    });

    var totalTextList;
    var richTextList=[];

    for(var i=0; i < lectureList.length; i++) {

    for(var j=0;j<i;j++)
    {
      //richTextList[j].y-=100;
    }
      console.log(lectureList[i].lectureNumber+": "+lectureList[i].name+"\n");
      console.log(lectureList[i].load[week][1]);
      var inputTxt = lectureList[i].name +"의 로드: "+lectureList[i].load[week][1]+'\n';
      totalTextList+=inputTxt;
      var richText = new PIXI.Text(inputTxt,eventstyle);
      richText.anchor.set(0.5);
      richText.x = 960;
      richText.y = 1080/4-30;
      //app.stage.addChild(richText);
      richTextList.push(richText);
    }
    var a=0;
    var b=0;
    var length=lectureList.length;
    var deltatime=40;
    var eraser;
    var totalTextList="14주차의 로그\n\n";
    function erasedialog(eraser)
    {

        if(eraser===NaN||eraser===undefined)
          return;
      for(i=0;i<eraser.length;i++)
      {
        app.stage.removeChild(eraser[i]);
      }
    }

    app.stage.addChild(richTextList[0]);

    var timing = Math.floor(Math.random() * (lectureList.length-1)*deltatime);

    var ticker1=new PIXI.ticker.Ticker();
    ticker1.start();
    ticker1.add(()=>
    {
      a++;
      if(a===timing)
        eraser=eventHandler(0);
      if(a===deltatime*lectureList.length-10)
      {
        if(eraser!==NaN&&eraser!==undefined)
        {
         totalTextList+=eraser[1].text;
         totalTextList+='\n';
        }
        erasedialog(eraser);
        week_end_14();


      }
      else if(a%deltatime===0)
      {
        //console.log(a/deltatime+"생성");
        app.stage.addChild(richTextList[a/deltatime])
      }

      else if(a<deltatime*1&&richTextList[0].y>210)
      {
        //console.log("1");
        richTextList[0].y-=3;
      }
      else if(a<deltatime*2 &&a>deltatime*1-10&& richTextList[1].y>210)
      {
        //console.log("2");
        richTextList[0].y-=3;
        richTextList[1].y-=3;
      }
      else if(a<deltatime*3 &&a>deltatime*2-10&& richTextList[2].y>210)
      {
        //console.log("3");
        richTextList[0].y-=3;
        richTextList[1].y-=3;
        richTextList[2].y-=3;
      }
      else if(a<deltatime*4 &&a>deltatime*3-10&&richTextList[3].y>210)
      {
        //console.log("4");
        richTextList[0].y-=3;
        richTextList[1].y-=3;
        richTextList[2].y-=3;
        richTextList[3].y-=3;
      }
      else if(a<deltatime*5 && a>deltatime*4-10&&richTextList[4].y>210)
      {
        //console.log("5");
        richTextList[0].y-=3;
        richTextList[1].y-=3;
        richTextList[2].y-=3;
        richTextList[3].y-=3;
        richTextList[4].y-=3;
      }

      else if(a<deltatime*6 && a>deltatime*5-10 && richTextList[5].y>210)
      {
        //console.log("6");
        richTextList[0].y-=3;
        richTextList[1].y-=3;
        richTextList[2].y-=3;
        richTextList[3].y-=3;
        richTextList[4].y-=3;
        richTextList[5].y-=3;
      }
       else if(a<deltatime*7 && a>deltatime*6-10 && richTextList[6].y>210)
      {
        //console.log("7");
        richTextList[0].y-=3;
        richTextList[1].y-=3;
        richTextList[2].y-=3;
        richTextList[3].y-=3;
        richTextList[4].y-=3;
        richTextList[5].y-=3;
        richTextList[6].y-=3;
      }
      else if(a<deltatime*8 && a>deltatime*7-10 && richTextList[7].y>210)
      {
        //console.log("8");
        richTextList[0].y-=3;
        richTextList[1].y-=3;
        richTextList[2].y-=3;
        richTextList[3].y-=3;
        richTextList[4].y-=3;
        richTextList[5].y-=3;
        richTextList[6].y-=3;
        richTextList[7].y-=3;
      }
    });


  //setTimeout('week2()',8000 );


function week_end_14(){
   var block = new PIXI.Graphics();
   var block = new PIXI.Graphics();
      block.beginFill(0xffffff, 0.75);
      block.drawRect(0,0,1920,1080);
      block.lineStyle(4, 0xffd900, 1);
      block.endFill();
      app.stage.addChild(block);
   var dialog = new PIXI.Sprite.fromImage('room/dialog.png');
   dialog.scale.y*=3;
   dialog.y-=2000;
    app.stage.addChild(dialog);


    var button = new PIXI.Graphics();
    button.beginFill(0x330000);
    button.drawRoundedRect(1920/2-80,880,160,100,15);
    app.stage.addChild(button);

    button.buttonMode = true;
    button.interactive = true;


    var hwaginstyle = new PIXI.TextStyle({
  fontFamily: 'Consolas',
  fontSize: 40,
  fill: ['#ffffff'], // gradient
  stroke: '#4a1850'
  });

  var hwaginText = new PIXI.Text("확인",hwaginstyle);
  hwaginText.anchor.set(0.5,0);
  hwaginText.x = 1920/2;
  hwaginText.y = 910;
  app.stage.addChild(hwaginText);

var richTextList=[];
var inputTxt;
  for(var i=0; i < lectureList.length; i++) {

   for(var j=0;j<i;j++)
   {
     richTextList[j].y-=100;
   }
     inputTxt = lectureList[i].name +": "+lectureList[i].load[week][1]+'\n';
     totalTextList+=inputTxt;
     var richText = new PIXI.Text(inputTxt,eventstyle);
     richText.anchor.set(0.5);
     richText.x = 1920/2;
     richText.y = 1080/2+100;
     //app.stage.addChild(richText);
     richTextList.push(richText);


     }

    var totalTextListstyle = new PIXI.TextStyle({
   fontFamily: 'Consolas',
   fontSize: 40,
   lineHeight: 50,
   fill: ['#000000'], // gradient
      //backgroundColor:"green"
      wordWrap: true,
    wordWrapWidth: 1500
   });

    var richText = new PIXI.Text(totalTextList,totalTextListstyle);
     richText.anchor.set(0.5);
     richText.x = 1920/2;
     richText.y = 1080/2;
     app.stage.addChild(richText);
    button
      .on('pointerdown', week_end_onButtonDown)
      .on('pointerup', week_end_onButtonUp)
      .on('pointeroutside', week_end_onButtonUp)
      .on('pointerover', week_end_onButtonOver)
      .on('pointerout', week_end_onButtonOut)


    function week_end_onButtonDown(){

    }
    function week_end_onButtonUp(){
      app.stage.removeChild(dialog);
      app.stage.removeChild(this);
      app.stage.removeChild(hwaginText);
      app.stage.removeChild(richText);
      app.stage.removeChild(block);


      var rightblock = new PIXI.Graphics();
      //rightblock.lineStyle(2, 0xFF00FF, 1);
      rightblock.beginFill(0xfff8dc, 1);
      rightblock.drawRect(360,0,1200,240);
      rightblock.lineStyle(4, 0xffd900, 1);
      rightblock.endFill();
      app.stage.addChild(rightblock);
      week15();
    }
    function week_end_onButtonOver(){

    }
    function week_end_onButtonOut(){

    }

}
}
function week15()
{


  //  총 수행한 로드 / grade = (총 수행한 로드)/(전체 로드)
  week=14;
    //7 * 11 시간표 배열이 넘어온다고 가정 (7일 10교시 + 10시 이후)
    // 16주 동안 진행하고, 16개의 이벤트 발생 -> critical 이벤트?
    var capacityPerWeek = 0;
    //  얘는 한 주 동안 남은 시간을 계산하여 과제, 공부, 체력충전으로 전환시킴

    for (let day = 0; day < 7; day++){
      var firstPeriod = -1;

      for (let peri = 0; peri < 11; peri++){
        if( thisGame.timeTable[day][peri] !== undefined &&
          thisGame.timeTable[day][peri] !== "" && firstPeriod == -1)
          firstPeriod = peri;
        } // 첫 수업시간 찾음

        capacity = capacityUpdate(firstPeriod);
        console.log("오늘의 가용시간: "+capacity+"\n");

        for (let peri = firstPeriod; peri < 11; peri++){
          if (thisGame.timeTable[day][peri] === undefined ||
            thisGame.timeTable[day][peri] === "") continue;
          let nowEvent = thisGame.timeTable[day][peri];

          thisGame.status.health += statUpdate(nowEvent.deltaHealth*timeDependency(peri));
          thisGame.status.relationship += statUpdate(nowEvent.deltaRelationship);
          capacity -= nowEvent.duration;
          // 스텟 업데이트, 가용시간 - 소모시간
        }
        console.log("오늘의 남은시간: "+capacity+"\n");
        if( capacity <= 0 ) {
          capacity = 0;
        }
        // 가용시간은 0 이하로 내려갈 수 없음

        capacityPerWeek += capacity;
        // 남은 시간은 주간 가용시간으로 넘김
      }
      completedLoad = weekCapacityUpdate(capacityPerWeek, completedLoad, week);
      // 주간 로드 반영

      console.log(week+"주차 / 현재 체력: "+thisGame.status.health+"\n");
      console.log(week+"주차 / 남은 가용시간: "+capacityPerWeek+"\n");
      console.log("총 수행한 로드(누적): "+completedLoad+"\n");

      //eventHandler(0);
      //eventProcess(week);
      // 이벤트 발생 -> 랜덤 발생하는 알고리즘 필요

      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////   UI

    var eventstyle = new PIXI.TextStyle({
    fontFamily: 'Consolas',
    fontSize: 25,
    fill: ['#000000'], // gradient
     //backgroundColor:"green"
    });

    var totalTextList;
    var richTextList=[];

    for(var i=0; i < lectureList.length; i++) {

    for(var j=0;j<i;j++)
    {
      //richTextList[j].y-=100;
    }
      console.log(lectureList[i].lectureNumber+": "+lectureList[i].name+"\n");
      console.log(lectureList[i].load[week][1]);
      var inputTxt = lectureList[i].name +"의 로드: "+lectureList[i].load[week][1]+'\n';
      totalTextList+=inputTxt;
      var richText = new PIXI.Text(inputTxt,eventstyle);
      richText.anchor.set(0.5);
      richText.x = 960;
      richText.y = 1080/4-30;
      //app.stage.addChild(richText);
      richTextList.push(richText);
    }
    var a=0;
    var b=0;
    var length=lectureList.length;
    var deltatime=40;
    var eraser;
    var totalTextList="15주차의 로그\n\n";
    function erasedialog(eraser)
    {

        if(eraser===NaN||eraser===undefined)
          return;
      for(i=0;i<eraser.length;i++)
      {
        app.stage.removeChild(eraser[i]);
      }
    }

    app.stage.addChild(richTextList[0]);

    var timing = Math.floor(Math.random() * (lectureList.length-1)*deltatime);

    var ticker1=new PIXI.ticker.Ticker();
    ticker1.start();
    ticker1.add(()=>
    {
      a++;
      if(a===timing)
        eraser=eventHandler(0);
      if(a===deltatime*lectureList.length-10)
      {
        if(eraser!==NaN&&eraser!==undefined)
        {
         totalTextList+=eraser[1].text;
         totalTextList+='\n';
        }
        erasedialog(eraser);
        week_end_15();


      }
      else if(a%deltatime===0)
      {
        //console.log(a/deltatime+"생성");
        app.stage.addChild(richTextList[a/deltatime])
      }

      else if(a<deltatime*1&&richTextList[0].y>210)
      {
        //console.log("1");
        richTextList[0].y-=3;
      }
      else if(a<deltatime*2 &&a>deltatime*1-10&& richTextList[1].y>210)
      {
        //console.log("2");
        richTextList[0].y-=3;
        richTextList[1].y-=3;
      }
      else if(a<deltatime*3 &&a>deltatime*2-10&& richTextList[2].y>210)
      {
        //console.log("3");
        richTextList[0].y-=3;
        richTextList[1].y-=3;
        richTextList[2].y-=3;
      }
      else if(a<deltatime*4 &&a>deltatime*3-10&&richTextList[3].y>210)
      {
        //console.log("4");
        richTextList[0].y-=3;
        richTextList[1].y-=3;
        richTextList[2].y-=3;
        richTextList[3].y-=3;
      }
      else if(a<deltatime*5 && a>deltatime*4-10&&richTextList[4].y>210)
      {
        //console.log("5");
        richTextList[0].y-=3;
        richTextList[1].y-=3;
        richTextList[2].y-=3;
        richTextList[3].y-=3;
        richTextList[4].y-=3;
      }

      else if(a<deltatime*6 && a>deltatime*5-10 && richTextList[5].y>210)
      {
        //console.log("6");
        richTextList[0].y-=3;
        richTextList[1].y-=3;
        richTextList[2].y-=3;
        richTextList[3].y-=3;
        richTextList[4].y-=3;
        richTextList[5].y-=3;
      }
       else if(a<deltatime*7 && a>deltatime*6-10 && richTextList[6].y>210)
      {
        //console.log("7");
        richTextList[0].y-=3;
        richTextList[1].y-=3;
        richTextList[2].y-=3;
        richTextList[3].y-=3;
        richTextList[4].y-=3;
        richTextList[5].y-=3;
        richTextList[6].y-=3;
      }
      else if(a<deltatime*8 && a>deltatime*7-10 && richTextList[7].y>210)
      {
        //console.log("8");
        richTextList[0].y-=3;
        richTextList[1].y-=3;
        richTextList[2].y-=3;
        richTextList[3].y-=3;
        richTextList[4].y-=3;
        richTextList[5].y-=3;
        richTextList[6].y-=3;
        richTextList[7].y-=3;
      }
    });


  //setTimeout('week2()',8000 );


function week_end_15(){
   var block = new PIXI.Graphics();
   var block = new PIXI.Graphics();
      block.beginFill(0xffffff, 0.75);
      block.drawRect(0,0,1920,1080);
      block.lineStyle(4, 0xffd900, 1);
      block.endFill();
      app.stage.addChild(block);
   var dialog = new PIXI.Sprite.fromImage('room/dialog.png');
   dialog.scale.y*=3;
   dialog.y-=2000;
    app.stage.addChild(dialog);


    var button = new PIXI.Graphics();
    button.beginFill(0x330000);
    button.drawRoundedRect(1920/2-80,880,160,100,15);
    app.stage.addChild(button);

    button.buttonMode = true;
    button.interactive = true;


    var hwaginstyle = new PIXI.TextStyle({
  fontFamily: 'Consolas',
  fontSize: 40,
  fill: ['#ffffff'], // gradient
  stroke: '#4a1850'
  });

  var hwaginText = new PIXI.Text("확인",hwaginstyle);
  hwaginText.anchor.set(0.5,0);
  hwaginText.x = 1920/2;
  hwaginText.y = 910;
  app.stage.addChild(hwaginText);

var richTextList=[];
var inputTxt;
  for(var i=0; i < lectureList.length; i++) {

   for(var j=0;j<i;j++)
   {
     richTextList[j].y-=100;
   }
     inputTxt = lectureList[i].name +": "+lectureList[i].load[week][1]+'\n';
     totalTextList+=inputTxt;
     var richText = new PIXI.Text(inputTxt,eventstyle);
     richText.anchor.set(0.5);
     richText.x = 1920/2;
     richText.y = 1080/2+100;
     //app.stage.addChild(richText);
     richTextList.push(richText);


     }

    var totalTextListstyle = new PIXI.TextStyle({
   fontFamily: 'Consolas',
   fontSize: 40,
   lineHeight: 50,
   fill: ['#000000'], // gradient
      //backgroundColor:"green"
      wordWrap: true,
    wordWrapWidth: 1500
   });

    var richText = new PIXI.Text(totalTextList,totalTextListstyle);
     richText.anchor.set(0.5);
     richText.x = 1920/2;
     richText.y = 1080/2;
     app.stage.addChild(richText);
    button
      .on('pointerdown', week_end_onButtonDown)
      .on('pointerup', week_end_onButtonUp)
      .on('pointeroutside', week_end_onButtonUp)
      .on('pointerover', week_end_onButtonOver)
      .on('pointerout', week_end_onButtonOut)


    function week_end_onButtonDown(){

    }
    function week_end_onButtonUp(){
      app.stage.removeChild(dialog);
      app.stage.removeChild(this);
      app.stage.removeChild(hwaginText);
      app.stage.removeChild(richText);
      app.stage.removeChild(block);


      var rightblock = new PIXI.Graphics();
      //rightblock.lineStyle(2, 0xFF00FF, 1);
      rightblock.beginFill(0xfff8dc, 1);
      rightblock.drawRect(360,0,1200,240);
      rightblock.lineStyle(4, 0xffd900, 1);
      rightblock.endFill();
      app.stage.addChild(rightblock);
      week16();
    }
    function week_end_onButtonOver(){

    }
    function week_end_onButtonOut(){

    }

}
}
function week16()
{


  //  총 수행한 로드 / grade = (총 수행한 로드)/(전체 로드)
  week=15;
    //7 * 11 시간표 배열이 넘어온다고 가정 (7일 10교시 + 10시 이후)
    // 16주 동안 진행하고, 16개의 이벤트 발생 -> critical 이벤트?
    var capacityPerWeek = 0;
    //  얘는 한 주 동안 남은 시간을 계산하여 과제, 공부, 체력충전으로 전환시킴

    for (let day = 0; day < 7; day++){
      var firstPeriod = -1;

      for (let peri = 0; peri < 11; peri++){
        if( thisGame.timeTable[day][peri] !== undefined &&
          thisGame.timeTable[day][peri] !== "" && firstPeriod == -1)
          firstPeriod = peri;
        } // 첫 수업시간 찾음

        capacity = capacityUpdate(firstPeriod);
        console.log("오늘의 가용시간: "+capacity+"\n");

        for (let peri = firstPeriod; peri < 11; peri++){
          if (thisGame.timeTable[day][peri] === undefined ||
            thisGame.timeTable[day][peri] === "") continue;
          let nowEvent = thisGame.timeTable[day][peri];

          thisGame.status.health += statUpdate(nowEvent.deltaHealth*timeDependency(peri));
          thisGame.status.relationship += statUpdate(nowEvent.deltaRelationship);
          capacity -= nowEvent.duration;
          // 스텟 업데이트, 가용시간 - 소모시간
        }
        console.log("오늘의 남은시간: "+capacity+"\n");
        if( capacity <= 0 ) {
          capacity = 0;
        }
        // 가용시간은 0 이하로 내려갈 수 없음

        capacityPerWeek += capacity;
        // 남은 시간은 주간 가용시간으로 넘김
      }
      completedLoad = weekCapacityUpdate(capacityPerWeek, completedLoad, week);
      // 주간 로드 반영

      console.log(week+"주차 / 현재 체력: "+thisGame.status.health+"\n");
      console.log(week+"주차 / 남은 가용시간: "+capacityPerWeek+"\n");
      console.log("총 수행한 로드(누적): "+completedLoad+"\n");

      //eventHandler(0);
      //eventProcess(week);
      // 이벤트 발생 -> 랜덤 발생하는 알고리즘 필요

      /////////////////////////////////////////////////////////////////////////////////////////////////////////////////   UI

    var eventstyle = new PIXI.TextStyle({
    fontFamily: 'Consolas',
    fontSize: 25,
    fill: ['#000000'], // gradient
     //backgroundColor:"green"
    });

    var totalTextList;
    var richTextList=[];

    for(var i=0; i < lectureList.length; i++) {

    for(var j=0;j<i;j++)
    {
      //richTextList[j].y-=100;
    }
      console.log(lectureList[i].lectureNumber+": "+lectureList[i].name+"\n");
      console.log(lectureList[i].load[week][1]);
      var inputTxt = lectureList[i].name +"의 로드: "+lectureList[i].load[week][1]+'\n';
      totalTextList+=inputTxt;
      var richText = new PIXI.Text(inputTxt,eventstyle);
      richText.anchor.set(0.5);
      richText.x = 960;
      richText.y = 1080/4-30;
      //app.stage.addChild(richText);
      richTextList.push(richText);
    }
    var a=0;
    var b=0;
    var length=lectureList.length;
    var deltatime=40;
    var eraser;
    var totalTextList="16주차의 로그\n\n";
    function erasedialog(eraser)
    {

        if(eraser===NaN||eraser===undefined)
          return;
      for(i=0;i<eraser.length;i++)
      {
        app.stage.removeChild(eraser[i]);
      }
    }

    app.stage.addChild(richTextList[0]);

    var timing = Math.floor(Math.random() * (lectureList.length-1)*deltatime);

    var ticker1=new PIXI.ticker.Ticker();
    ticker1.start();
    ticker1.add(()=>
    {
      a++;
      if(a===timing)
        eraser=eventHandler(0);
      if(a===deltatime*lectureList.length-10)
      {
        if(eraser!==NaN&&eraser!==undefined)
        {
         totalTextList+=eraser[1].text;
         totalTextList+='\n';
        }
        erasedialog(eraser);
        week_end_16();


      }
      else if(a%deltatime===0)
      {
        //console.log(a/deltatime+"생성");
        app.stage.addChild(richTextList[a/deltatime])
      }

      else if(a<deltatime*1&&richTextList[0].y>210)
      {
        //console.log("1");
        richTextList[0].y-=3;
      }
      else if(a<deltatime*2 &&a>deltatime*1-10&& richTextList[1].y>210)
      {
        //console.log("2");
        richTextList[0].y-=3;
        richTextList[1].y-=3;
      }
      else if(a<deltatime*3 &&a>deltatime*2-10&& richTextList[2].y>210)
      {
        //console.log("3");
        richTextList[0].y-=3;
        richTextList[1].y-=3;
        richTextList[2].y-=3;
      }
      else if(a<deltatime*4 &&a>deltatime*3-10&&richTextList[3].y>210)
      {
        //console.log("4");
        richTextList[0].y-=3;
        richTextList[1].y-=3;
        richTextList[2].y-=3;
        richTextList[3].y-=3;
      }
      else if(a<deltatime*5 && a>deltatime*4-10&&richTextList[4].y>210)
      {
        //console.log("5");
        richTextList[0].y-=3;
        richTextList[1].y-=3;
        richTextList[2].y-=3;
        richTextList[3].y-=3;
        richTextList[4].y-=3;
      }

      else if(a<deltatime*6 && a>deltatime*5-10 && richTextList[5].y>210)
      {
        //console.log("6");
        richTextList[0].y-=3;
        richTextList[1].y-=3;
        richTextList[2].y-=3;
        richTextList[3].y-=3;
        richTextList[4].y-=3;
        richTextList[5].y-=3;
      }
       else if(a<deltatime*7 && a>deltatime*6-10 && richTextList[6].y>210)
      {
        //console.log("7");
        richTextList[0].y-=3;
        richTextList[1].y-=3;
        richTextList[2].y-=3;
        richTextList[3].y-=3;
        richTextList[4].y-=3;
        richTextList[5].y-=3;
        richTextList[6].y-=3;
      }
      else if(a<deltatime*8 && a>deltatime*7-10 && richTextList[7].y>210)
      {
        //console.log("8");
        richTextList[0].y-=3;
        richTextList[1].y-=3;
        richTextList[2].y-=3;
        richTextList[3].y-=3;
        richTextList[4].y-=3;
        richTextList[5].y-=3;
        richTextList[6].y-=3;
        richTextList[7].y-=3;
      }
    });


  //setTimeout('week2()',8000 );


function week_end_16(){
   var block = new PIXI.Graphics();
   var block = new PIXI.Graphics();
      block.beginFill(0xffffff, 0.75);
      block.drawRect(0,0,1920,1080);
      block.lineStyle(4, 0xffd900, 1);
      block.endFill();
      app.stage.addChild(block);
   var dialog = new PIXI.Sprite.fromImage('room/dialog.png');
   dialog.scale.y*=3;
   dialog.y-=2000;
    app.stage.addChild(dialog);


    var button = new PIXI.Graphics();
    button.beginFill(0x330000);
    button.drawRoundedRect(1920/2-80,880,160,100,15);
    app.stage.addChild(button);

    button.buttonMode = true;
    button.interactive = true;


    var hwaginstyle = new PIXI.TextStyle({
  fontFamily: 'Consolas',
  fontSize: 40,
  fill: ['#ffffff'], // gradient
  stroke: '#4a1850'
  });

  var hwaginText = new PIXI.Text("확인",hwaginstyle);
  hwaginText.anchor.set(0.5,0);
  hwaginText.x = 1920/2;
  hwaginText.y = 910;
  app.stage.addChild(hwaginText);

var richTextList=[];
var inputTxt;
  for(var i=0; i < lectureList.length; i++) {

   for(var j=0;j<i;j++)
   {
     richTextList[j].y-=100;
   }
     inputTxt = lectureList[i].name +": "+lectureList[i].load[week][1]+'\n';
     totalTextList+=inputTxt;
     var richText = new PIXI.Text(inputTxt,eventstyle);
     richText.anchor.set(0.5);
     richText.x = 1920/2;
     richText.y = 1080/2+100;
     //app.stage.addChild(richText);
     richTextList.push(richText);


     }

    var totalTextListstyle = new PIXI.TextStyle({
   fontFamily: 'Consolas',
   fontSize: 40,
   lineHeight: 50,
   fill: ['#000000'], // gradient
      //backgroundColor:"green"
      wordWrap: true,
    wordWrapWidth: 1500
   });

    var richText = new PIXI.Text(totalTextList,totalTextListstyle);
     richText.anchor.set(0.5);
     richText.x = 1920/2;
     richText.y = 1080/2;
     app.stage.addChild(richText);
    button
      .on('pointerdown', week_end_onButtonDown)
      .on('pointerup', week_end_onButtonUp)
      .on('pointeroutside', week_end_onButtonUp)
      .on('pointerover', week_end_onButtonOver)
      .on('pointerout', week_end_onButtonOut)


    function week_end_onButtonDown(){

    }
    function week_end_onButtonUp(){
      app.stage.removeChild(dialog);
      app.stage.removeChild(this);
      app.stage.removeChild(hwaginText);
      app.stage.removeChild(richText);
      app.stage.removeChild(block);


      var rightblock = new PIXI.Graphics();
      //rightblock.lineStyle(2, 0xFF00FF, 1);
      rightblock.beginFill(0xfff8dc, 1);
      rightblock.drawRect(360,0,1200,240);
      rightblock.lineStyle(4, 0xffd900, 1);
      rightblock.endFill();
      app.stage.addChild(rightblock);
      exit();
    }
    function week_end_onButtonOver(){

    }
    function week_end_onButtonOut(){

    }

}
}
function exit() {
  for (var i = app.stage.children.length - 1; i >= 0; i--) {  app.stage.removeChild(app.stage.children[i]);};
  app.destroy(app.stage);
  ending();

}


//////////////////////////////////////////////////////////UI///////////////////////////////////////////////////////////









}
