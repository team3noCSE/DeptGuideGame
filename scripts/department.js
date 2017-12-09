var icons = document.querySelectorAll('.Dep img');
var active=0;
function selected(clicked) {
  var icons = document.querySelectorAll('.Dep img');
  if (clicked.style.outline != "1px solid red") {
    for (var i = 0; i < icons.length; i++) {
      document.getElementById(i).style.outline = "none";
    }
    clicked.style.outline = "1px solid red";
    active=1;
  }
  else {
    clicked.style.outline = "none";
    active=0;
  }
}
function confirm_department(num){
    document.getElementById("departmentChoiceScreen").style.display="none";
    document.getElementById("Ending").style.display="block";
}
