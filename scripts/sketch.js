var app = new PIXI.Application(1600, 1200, {transparent : true});
document.body.appendChild(app.view);

// create a new Sprite from an image path
var bunny = PIXI.Sprite.fromImage('images/ang.png');
var effect = PIXI.Texture.fromImage('images/sibal.png');

// center the sprite's anchor point
bunny.anchor.set(0.5);

// move the sprite to the center of the screen
bunny.x = app.renderer.width / 2;
bunny.y = app.renderer.height / 2;

    let time = 0;

// Listen for animate update
app.ticker.add(function(delta) {
    // just for fun, let's rotate mr rabbit a little
    // delta is 1 if running at 100% performance
    // creates frame-independent tranformation
    bunny.rotation += Math.PI/100 * delta;

    time = Math.floor(time + delta);
    if(time%50 == 0){
        bunny.visible = false;
    } else if (time%50 == 20){
        bunny.visible = true;
    }
});

let text = new PIXI.Text('This is EFFECT',{fontFamily : 'Arial', fontSize: 72, fill : 0xff1010, align : 'center'});

text.x = app.renderer.width / 2;
text.y = app.renderer.height / 2;


app.stage.addChild(text);
app.stage.addChild(bunny);

var buttons = [];

var button = new PIXI.Sprite(effect);

button.buttonMode = true;

button.anchor.set(0.5);

button.x = app.renderer.width / 2;
button.y = app.renderer.height / 2;
button.interactive = true;

button
    .on('pointerdown', onButtonDown)
    .on('pointerup', onButtonUp)
    .on('pointerupoutside', onButtonUp)
    .on('pointerover', onButtonOver)
    .on('pointerout', onButtonOut);

app.stage.addChild(button);
buttons.push(button);


function onButtonDown(){
    this.isdown = true;
    this.texture = effect;
    this.alpha = 1;
}

function onButtonUp(){
    this.isdown = false;
    if (this.isOver){
        this.texture = effect;
        this.alpha = 0.3;
    } else {
        this.texture = effect;
    }
}


function onButtonOver(){
    this.isOver = true;
    if (this.isdown){
        return;
    }
    this.texture = effect;
}

function onButtonOut(){
    this.isOver = false;
    if (this.isdown){
        return;
    }
    this.texture = effect;
}
