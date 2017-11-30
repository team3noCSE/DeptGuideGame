var icons = document.querySelectorAll('.Dep img');
function selected(clicked) {
  var icons = document.querySelectorAll('.Dep img');
  if (clicked.style.border != "1px solid red") {
    for (var i = 0; i < icons.length; i++) {
      document.getElementById(i).style.border = "none";
    }
    clicked.style.border = "1px solid red";
  } else {
    clicked.style.border = "none";
  }
}
