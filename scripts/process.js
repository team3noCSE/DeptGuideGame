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



var ruler = PIXI.Sprite.fromImage('images/ruler.png');
// center the sprite's anchor point
//ruler.anchor.set(0.5);
// move the sprite to the center of the screen
ruler.x = app.renderer.width *0.5;
ruler.y +=100;
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

  var dday = new PIXI.Text(daynumber,numberstyle);

/*
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
  leftblock.drawRect(0, 100, 500, 130);
  app.stage.addChild(leftblock);

var rightblock = new PIXI.Graphics();
  //rightblock.lineStyle(2, 0xFF00FF, 1);
  rightblock.beginFill(0x1099bb, 1);
  rightblock.drawRect(1420, 100, 500, 130);
  app.stage.addChild(rightblock);





/*
for(var i=0; i < lectureList.length; i++) {
     console.log(lectureList[i].lectureNumber+": "+lectureList[i].name+"\n");
     console.log(lectureList[i].load[week][1]);
}
*/
var eventstyle = new PIXI.TextStyle({
  fontFamily: 'Consolas',
  fontSize: 80,
  fill: ['#00ffff', '#00ff99'], // gradient
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

var inputTxt = lectureList[2].name;
  var richText = new PIXI.Text(inputTxt,eventstyle);
  richText.anchor.set(0.5);
  richText.x = 1920/2;
  richText.y = 1080/2;
  app.stage.addChild(richText);
/*
for(var i=0;i<lectureList.length;i++)
{
  var eventtext = new PIXI.Text(lectureList[i].lectureNumber+": "+lectureList[i].name+"\n",eventstyle);
  app.stage.addChild(eventtext);
}
*/




//renderImage();

/*
function renderImage()
{
var thing = new PIXI.Sprite.fromImage('images/sibal.png');
thing.interactive=true;
//bunny.on("click",onClick);
app.stage.addChild(thing);
}

function animate()
{
    requestAnimationFrame(animate);
    bunny.rotation += 0.1;
    renderer.render(stage);

}

function onClick(eventData)
{
    //animate()
    requestAnimationFrame(animate);

}
*/

/*
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
class SingleRoutine {
 constructor (
  _name,
  _contents,
  _count
 ){ 
  this.name=_name;
  this.contents=_contents;
  this.count=_count;
 }
}

let Routine = {
  "물주" : new SingleRoutine("물주","주말 동안 물리 문제 9문제를 풀었습니다.",1);
}

function routineHandler() {


}



class SinglePopUpEvent {
 constructor (
   _name, // String
   _time, // boolean array (16주중 되는 시간 true)
   _relationshipCeil, // float (Ceil은 상한, Floor는 하한)
   _relationshipFloor, // float
   _healthCeil, // float
   _healthFloor, // float
   _gradeCeil, // float
   _gradeFloor, // float
   _description
 ){
   this.name = _name;
   this.time = _time;
   this.relationshipCeil = _relationshipCeil;
   this.relationshipFloor = _relationshipFloor;
   this.healthCeil = _healthCeil;
   this.healthFloor = _healthFloor;
   this.gradeCeil = _gradeCeil;
   this.gradeFloor = _gradeFloor;
   this.description = _description;
 }
}

let PopUpEvent = {
 "개총" : new SinglePopUpEvent("개총", [1, 2, 3], null, null, null, null, null, null, "새로운 학기의 시작은 개총과 함께~?");
}

function eventHandler() {

}

*/

