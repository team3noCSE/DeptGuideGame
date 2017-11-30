var icons = document.querySelectorAll('.Dep img');
var active=0;
function selected(clicked) {
  var icons = document.querySelectorAll('.Dep img');
  if (clicked.style.border != "1px solid red") {
    for (var i = 0; i < icons.length; i++) {
      document.getElementById(i).style.border = "none";
    }
    clicked.style.border = "1px solid red";
    active=1;
  }
  else {
    clicked.style.border = "none";
    active=0;
  }
}
function confirm_department(num){
  if(active==num){
    return true;
  }
  else{
    alert("선택 덜했네?");
    return false;
  }
}
