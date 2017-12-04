
function  printOut() {
  var app = new PIXI.Application(1920,1080, {backgroundColor: 0x1099bb});
  document.body.appendChild(app.view); 
 
  var style = new PIXI.TextStyle({
  fontFamily: 'Arial',
  fontSize: 80,
  fill: ['#ffffff', '#00ff99'], // gradient
  stroke: '#4a1850',
  strokeThickness: 5,
  dropShadow: true,
  dropShadowColor: '#000000',
  dropShadowBlur: 4,
  dropShadowAngle: Math.PI / 6,
  dropShadowDistance: 6,
  wordWrap: true,
  wordWrapWidth: 440
  });

  var inputTxt = document.getElementsByClassName('gameTip'); 
  //var outputForm = document.getElementById('output_form'); 
  var number= Math.floor(Math.random() * 10);
  //outputForm.innerHTML = inputTxt[number].innerHTML;
  var richText = new PIXI.Text(inputTxt[number].innerHTML,style);
  richText.anchor.set(0.5);
  richText.x = 1920/2;
  richText.y = 1080/2;
  app.stage.addChild(richText);
  
  var graphics = new PIXI.Graphics();
  //graphics.anchor.set(0.5);
  graphics.lineStyle(2, 0xFF00FF, 1);
  graphics.beginFill(0xFF00BB, 0.25);
  graphics.drawRoundedRect(1920/2-300, 900, 600, 100, 10);
  //graphics.endFill();
  graphics.x=1920/2;
  graphics.y=900;
  app.stage.addChild(graphics);
  


/*
  let velocity=1;
  app.ticker.add(()=>
  {
  	graphics.x += velocity;
  });*/
/*
  app.ticker.add(function(delta) {

    graphics.rotation += 0.1 * delta;
    graphics.pivot.set(1920/2,950);
});
*/
let craylength = 600;
  const ticker = new PIXI.ticker.Ticker();
ticker.stop();
ticker.add((deltaTime) => {
  craylength+=1;
  graphics.drawRoundedRect(1920/2-300,900,	craylength,100,10)
  //graphics.x+=0.1*deltaTime;
  //graphics.rotation += 0.1 * deltaTime;
  //graphics.pivot.set(1920/2,950);
});
ticker.start();



}