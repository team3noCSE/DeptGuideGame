var active=0;
var stack=new Array();
var personalityTestScreen=document.getElementById("personalityTestScreen");

function personal(clicked){
  if(!clicked.classList.contains('enabled')){
    clicked.classList.add('enabled');
    stack.push(clicked.textContent);
    var text=document.createTextNode(stack[active]);
    active++
  }
}
function reset(){
  var row1Squares = document.querySelectorAll('.row1 .square');
	for(var i = 0; i < row1Squares.length; i++) {
		var node = row1Squares[i];
		if(node.classList.contains('enabled')){
			node.classList.toggle('enabled');
		}
	}
  var row2Squares = document.querySelectorAll('.row2 .square');
	for(var i = 0; i < row2Squares.length; i++) {
		var node = row2Squares[i];
		if(node.classList.contains('enabled')){
			node.classList.toggle('enabled');
		}

	}
	for(var i=0;i<active;i++){
		stack.pop()
	}
	active=0;
	document.getElementById("demo").innerHTML="";
}
function confirm_personal(num){
  console.log(active);
  if(active==num){
    return true;
  }
  else{
    alert("선택 덜했네?");
    return false;
  }
}
