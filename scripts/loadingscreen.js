function  printOut() {
  var app = new PIXI.Application(1920,1080, {backgroundColor: 0x1099bb});
  document.body.appendChild(app.view); 
 
  var style = new PIXI.TextStyle({
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

  var inputTxt = document.getElementsByClassName('gameTip'); 
  var number= Math.floor(Math.random() * 10);
  var richText = new PIXI.Text(inputTxt[number].innerHTML,style);
  richText.anchor.set(0.5);
  richText.x = 1920/2;
  richText.y = 1080/2;
  app.stage.addChild(richText);
  
  var bar1 = new PIXI.Graphics();
  bar1.lineStyle(2,0xFFFFFF,1);
  bar1.drawRect(1920/2-300,850,600,50);
  app.stage.addChild(bar1);
  
  var graphics = new PIXI.Graphics();
  graphics.lineStyle(2, 0xFF00FF, 1);
  graphics.beginFill(0xFF00BB, 0.25);
  graphics.drawRect(1920/2-300, 850, 0, 50);
  app.stage.addChild(graphics);

  var a=0;
  app.ticker.add(function(delta) {    
      a+=delta;
      graphics.drawRect(1920/2-300, 850, a, 50);
      if(a>600)
      {
        a=600;
      }   
});

}


/*
 this.assets = [Global.pathImages + "ui.json" , Global.pathImages + "animations.json"];
    this.loader = new PIXI.AssetLoader(this.assets);
    this.loader.addEventListener("onProgress", function (e) {
        var percent = 1 - (e.content.loadCount / e.content.assetURLs.length);
        //here just gives me two values ​​[0.5 and 1]
        console.log(percent);
    });
*/


/*
  let velocity=1;
  app.ticker.add(()=>
  {
    graphics.x += velocity;
  });*/
//graphics.width=800;
 //graphics.width+=1*delta;
    //graphics.rotation += 0.1 * delta;
    //graphics.pivot.set(1920/2,950);
/*
let craylength = 600;
  const ticker = new PIXI.ticker.Ticker();
ticker.stop();
ticker.add((deltaTime) => {
  craylength+=1;
  graphics.drawRoundedRect(1920/2-300,900,  craylength,100,10)
  //graphics.x+=0.1*deltaTime;
  //graphics.rotation += 0.1 * deltaTime;
  //graphics.pivot.set(1920/2,950);
});
ticker.start();
*/

/*

data={
  //gameObject
  text='thisisloadingbar',
  posX=100,
  posY=100
}
 function BalanceBoard(data) {
    this.gameObject = data['gameObject'];
    this.text = data['text'];
    this.posX = data['posX'];
    this.posY = data['posY'];

    this.spriteText;

    this.spriteBorder = {
        'frameindex': 0,
        frames: [
            'stats-border-1.png'
        ]
    };

    this.spriteBar = {
        'frameindex': 0,
        frames: [
            'stats-bar-1.png'
        ]
    };
}


BalanceBoard.prototype.build = function() {
    this.spriteBorder['texture'] = PIXI.Texture.fromFrame(this.spriteBorder['frames'][0]);
    this.spriteBorder['object'] = new PIXI.Sprite(this.spriteBorder['texture']);
    this.spriteBorder['frameindex'] = 0;
    this.spriteBorder['object'].anchor.x = 0.5;
    this.spriteBorder['object'].anchor.y = 0.5;

    this.spriteBorder['object'].position.x = -this.spriteBorder['object'].width;
    this.spriteBorder['object'].position.y = -this.spriteBorder['object'].height;
    gameObject.getStage().addChild(this.spriteBorder['object']);

    this.spriteBar['texture'] = PIXI.Texture.fromFrame(this.spriteBar['frames'][0]);
    this.spriteBar['object'] = new PIXI.Sprite(this.spriteBar['texture']);
    this.spriteBar['frameindex'] = 0;
    this.spriteBar['object'].anchor.x = 0.5;
    this.spriteBar['object'].anchor.y = 0.5;


    this.spriteBar['object'].position.x = -this.spriteBar['object'].width;
    this.spriteBar['object'].position.y = -this.spriteBar['object'].height;
    gameObject.getStage().addChild(this.spriteBar['object']);

    this.spriteText = new PIXI.Text(this.text, {
        font: '600 10pt Open Sans',
        fill: 'white'
    });

    this.spriteText.position.x = this.getPosX() - this.spriteText.width / 2;
    this.spriteText.position.y = this.getPosY() - this.spriteText.height / 2;

    gameObject.getStage().addChild(this.spriteText);
};

BalanceBoard.prototype.update = function() {
    this.spriteText.text = this.text;

    this.spriteBorder['object'].position.x = this.getPosX();
    this.spriteBorder['object'].position.y = this.getPosY();

    this.spriteBar['object'].position.x = this.getPosX();
    this.spriteBar['object'].position.y = this.getPosY();

    this.spriteText.position.x = this.getPosX() - this.spriteText.width / 2;
    this.spriteText.position.y = this.getPosY() - this.spriteText.height / 2;
};

BalanceBoard.prototype.getPosX = function() {
    return this.spriteBorder['object'].width / 2 + this.posX;
};

BalanceBoard.prototype.getPosY = function() {
    return this.spriteBorder['object'].height / 2 + this.posY;
};

PIXI.loader
  .add([
    "ang.png",
    "sibal.png"
  ])
  .on("progress", loadProgressHandler)
  .load(setup);

function loadProgressHandler(loader, resource) {

  //Display the file `url` currently being loaded
  console.log("loading: " + resource.url); 

  //Display the precentage of files currently loaded
  console.log("progress: " + loader.progress + "%"); 

  //If you gave your files names as the first argument 
  //of the `add` method, you can access them like this
  //console.log("loading: " + resource.name);
}

function setup() {
  console.log("All files loaded");
}
*/