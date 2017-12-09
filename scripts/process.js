//this is semester_processing javascript file by_yoonbeomjoon

/*function eventHandler() {
	//alert("hello world!");
var renderer=PIXI.autoDetectRenderer(512, 512, {
	transparent: true,
	resolution: 1
});*/

/*
document.body.appendChild(render,view);

var stage = new PIXI.Container();

PIXI.loader
	.add("spritesheet", "character_standard_01-1.png")
	.load(setup);

var sprite;

function setup() {
	stage.interactive=true;

	var rect = new PIXI.Rectangle(0,0,666,832);
	var textue = PIXI.loader.resources["spritesheet"].texture;
	texture.fame = rect;

	sprite = new PIXI.Sprite(texture);

	stage.addChild(sprite);

	animatoinLoop();
}

function animationLoop() {
	requestAnimationFrame(animationLoop);

	renderer.render(stage);
}
}
*/




var app = new PIXI.Application(1920, 1080, {backgroundColor : 0x1099bb});
document.body.appendChild(app.view);




var ruler = PIXI.Sprite.fromImage('images/ruler.png');
// center the sprite's anchor point
//ruler.anchor.set(0.5);
// move the sprite to the center of the screen
ruler.x = app.renderer.width *0.5;
ruler.y = app.renderer.height *(-0.03);
ruler.x-=400;

ruler.scale.x*=1.24;
ruler.scale.y*=1.24;
// create a new Sprite from an image path




app.stage.addChild(ruler);

 var a=1;
 app.ticker.add(()=>
 {
 	ruler.x-=a;
 });


var room = PIXI.Sprite.fromImage('room/room_default_day.png');
room.y+=100;
app.stage.addChild(room);

var bunny = PIXI.Sprite.fromImage('room/room_default_ponix.png');
// center the sprite's anchor point
//bunny.anchor.set(0.5);
// move the sprite to the center of the screen
//bunny.x = app.renderer.width *0.5;
//bunny.y = app.renderer.height *0.6;

bunny.y+=100
app.stage.addChild(bunny);

var numberstyle = new PIXI.TextStyle({
  fontFamily: 'Consolas',
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
var daynumber = 150;
var dday;
/*
 	var dday = new PIXI.Text(daynumber,numberstyle);
 app.ticker.add(()=>
 {
 	delta=100;
 	app.stage.removeChild(dday);
 	delete dday;
 	daynumber-=1;
 	var dday = new PIXI.Text(daynumber,numberstyle);
  dday.anchor.set(0.5);
  dday.x = 260;
  dday.y = 480
  app.stage.addChild(dday);

 });
*/
/*
var graphics = new PIXI.Graphics();
  graphics.lineStyle(2, 0xFF00FF, 1);
  graphics.beginFill(0xFFFF99, 0.25);
  graphics.drawRect(50, 200, 700, 300);
 */
var leftblock = new PIXI.Graphics();
  //leftblock.lineStyle(2, 0xFF00FF, 1);
  leftblock.beginFill(0x1099bb, 1);
  leftblock.drawRect(0, 0, 500, 100);
  app.stage.addChild(leftblock);

var rightblock = new PIXI.Graphics();
  //rightblock.lineStyle(2, 0xFF00FF, 1);
  rightblock.beginFill(0x1099bb, 1);
  rightblock.drawRect(1420, 0, 500, 100);
  app.stage.addChild(rightblock);



var renderer = PIXI.autoDetectRenderer(512,512,{
	transparent: true,
	resolution: 1
});
app.stage.addChild(renderer);
