var total_time = 10000; <!-- 시간간격 10초 -->
var current_time = 0;
var refresh_interval = 30;
var timer;
var stat1 = 30;
var stat2 = 40;
var stat3 = 50;
var dayofweek = ["월", "화", "수", "목", "금", "토", "일"];

function refresh_bar() {
    if (current_time > total_time) {
        clearInterval(timer);
        current_time = total_time;
    }

    for (var i = 1; i <= 7; i++){
      if(current_time < total_time * i / 7 + 15 && current_time > total_time * i / 7 - 15){
      //alert("이벤트가 발생했습니다!!!");
      document.getElementById("dayChange").innerHTML = "오늘은 " + dayofweek[i] + "요일 입니다.";
      break;
    }
    }
    percentage = 100 * current_time / total_time;
    $("#progressbar1").progressbar({
            value: current_time
        })
        .children('span.caption').html("학기 진행중...  " + percentage.toFixed(1) + ' %');
    current_time += refresh_interval;
}

function buttonSession()
{
  document.getElementById("departmentChoiceScreen").style.display = "none";
  document.getElementById("inGameScreen").style.display='block';
  document.getElementById("inSession").style.display='block';
  document.getElementById("sessionScreen").style.display='block';

  $("#progressbar1").progressbar({
      max: total_time
  });
  refresh_bar();
  timer = setInterval(refresh_bar, refresh_interval);
}

/*
$(function() {
    $("#progressbar1").progressbar({
        max: total_time
    });
    refresh_bar();
    timer = setInterval(refresh_bar, refresh_interval);
});
*/
function changeState() {
}
