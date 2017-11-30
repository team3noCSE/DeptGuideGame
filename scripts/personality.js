
  var prior=1;
  var row1Squares = document.querySelectorAll('.row1 .square');
  var latest=row1Squares[1];
  for(var i = 0; i < row1Squares.length; i++) {
    var node = row1Squares[i];
    node.onclick=function(){
      if(this.classList.contains('enabled')&&this==latest){
        this.classList.toggle('enabled');
        prior--;
      }
      else if (!this.classList.contains('enabled')){
        this.classList.toggle('enabled');
        this.appendChild(document.createTextNode(prior));
        latest=this;
        if(prior!=6)
          prior++;
      }
    }
  }
  var row2Squares = document.querySelectorAll('.row2 .square');
  for(var i = 0; i < row2Squares.length; i++) {
    var node = row2Squares[i];
    node.onclick=function(){
      if(this.classList.contains('enabled')&&this==latest){
        this.classList.toggle('enabled');
        prior--;
      }
      else if (!this.classList.contains('enabled')){
        this.classList.toggle('enabled');
        this.appendChild(document.createTextNode(prior));
        latest=this;
        if(prior!=6)
          prior++;
      }
    }
  }
  function reset(){
    prior=1;
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
  }
