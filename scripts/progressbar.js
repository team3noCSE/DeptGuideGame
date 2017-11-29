var total_time = 10000; <!-- 시간간격 10초 -->
var current_time = 0;
var refresh_interval = 30;
var timer;

function refresh_bar() {
    if (current_time > total_time) {
        clearInterval(timer);
        current_time = total_time;
    }
    percentage = 100 * current_time / total_time;
    $("#progressbar1").progressbar({
            value: current_time
        })
        .children('span.caption').html("학기 진행중...  " + percentage.toFixed(1) + ' %');
    current_time += refresh_interval;
}

$(function() {
    $("#progressbar1").progressbar({
        max: total_time
    });
    refresh_bar();
    timer = setInterval(refresh_bar, refresh_interval);
});
