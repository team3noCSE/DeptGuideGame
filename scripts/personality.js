var prior=0;
var stack=new Array();
var row1Squares = document.querySelectorAll('.row1 .square');
for(var i = 0; i < row1Squares.length; i++) {
	var node = row1Squares[i];
	node.onclick=function(){
		if(!this.classList.contains('enabled')){
			this.classList.add('enabled');
			stack.push(this.textContent);
			var text=document.createTextNode(stack[prior]);
			document.getElementById("demo").appendChild(text);
			prior++
		}
	}
}
var row2Squares = document.querySelectorAll('.row2 .square');
for(var i = 0; i < row2Squares.length; i++) {
	var node = row2Squares[i];
	node.onclick=function(){
		if(!this.classList.contains('enabled')){
			this.classList.add('enabled');
			stack.push(this.textContent);
			var text=document.createTextNode(stack[prior]);
			document.getElementById("demo").appendChild(text);
			prior++;
		}
	}
}
function reset(){
	for(var i = 0; i < row1Squares.length; i++) {
		var node = row1Squares[i];
		if(node.classList.contains('enabled')){
			node.classList.toggle('enabled');
		}
	}
	for(var i = 0; i < row2Squares.length; i++) {
		var node = row2Squares[i];
		if(node.classList.contains('enabled')){
			node.classList.toggle('enabled');
		}

	}
	for(var i=0;i<prior;i++){
		stack.pop()
	}
	prior=0;
	document.getElementById("demo").innerHTML="";
}
