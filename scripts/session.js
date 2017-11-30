var total_time = 60000; <!-- 시간간격 10초 -->
var current_time = 0;
var refresh_interval = 30;
var timer;
var stat1 = 30;
var stat2 = 40;
var stat3 = 50;

function refresh_bar() {
    if (current_time > total_time) {
        clearInterval(timer);
        current_time = total_time;
    }

    if (current_time === total_time / 2) {
      alert("이벤트가 발생했습니다!!!");
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
  document.getElementById("initialMenuScreen").style.display = "none";
    document.getElementById("inGameScreen").style.display='block';
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
