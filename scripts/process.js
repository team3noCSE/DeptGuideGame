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



/*
var app = new PIXI.Application(800, 600, {backgroundColor : 0x1099bb});
document.body.appendChild(app.view);



// create a new Sprite from an image path
var bunny = PIXI.Sprite.fromImage('images/ponix/character_application_01.png');
// center the sprite's anchor point
bunny.anchor.set(0.5);
// move the sprite to the center of the screen
bunny.x = app.renderer.width *0.5;
bunny.y = app.renderer.height *0.6;

bunny.scale.x*=0.2;
bunny.scale.y*=0.2;

app.stage.addChild(bunny);


var ruler = PIXI.Sprite.fromImage('images/ruler.png');
// center the sprite's anchor point
ruler.anchor.set(0.5);
// move the sprite to the center of the screen
ruler.x = app.renderer.width *0.5;
ruler.y = app.renderer.height *0.02;

//ruler.scale.x*=0.2;
//ruler.scale.y*=0.2;

app.stage.addChild(ruler);


var graphics = new PIXI.Graphics();
  graphics.lineStyle(2, 0xFF00FF, 1);
  graphics.beginFill(0xFFFF99, 0.25);
  graphics.drawRect(50, 200, 700, 300);
  app.stage.addChild(graphics);

var leftblock = new PIXI.Graphics();
  //leftblock.lineStyle(2, 0xFF00FF, 1);
  leftblock.beginFill(0xFFFF99, 0.25);
  leftblock.drawRect(0, 0, 30, 30);
  app.stage.addChild(leftblock);

var rightblock = new PIXI.Graphics();
  //rightblock.lineStyle(2, 0xFF00FF, 1);
  rightblock.beginFill(0xFFFF99, 0.25);
  rightblock.drawRect(700, 200, 20, 20);
  app.stage.addChild(rightblock);


*/

var renderer = PIXI.autoDetectRenderer(512,512,{
	transparent: true,
	//backgroundColor:0xFF00FF,
	resolution: 1
});

PIXI.loader
	.add("spritesheet", "character_standard_01-1.png")
	.load(setup);

var rat;

function setup() {
	rat = new PIXI.Sprite{
		PIXI.loader.resources["images/character_standard_01-1.png"].texture;
	}

	stage.addChild(sprite);

	animatoinLoop();
}

function animationLoop() {
	requestAnimationFrame(animationLoop);

	renderer.render(stage);
}
