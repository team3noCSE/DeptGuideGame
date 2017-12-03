var app_department_choice = new PIXI.Application(1920, 1080, {transparent : true});
document.body.appendChild(app_department_choice.view);

var sibal = PIXI.Texture.fromImage('images/departments/01_MATH_black.png');


class Department {
    constructor(name, object, colorset, relative_x, relative_y){
        this._name = name;
        this._object = PIXI.Texture.fromImage(object);
        this._colorset = colorset;
        this._relative_x = relative_x;
        this._relative_y = relative_y;
        this._visibility = true;
        
        console.log('constructor called');
        
        //object.anchor.set(0.5);
        //object.x = app.renderer.width*(this._relative_x);
        //object.y = app.renderer.height*(this._relative_y);
        
        this._button = new PIXI.Sprite(this._object);
        this._button.buttonMode = true;
        this._button.anchor.set(0.5);
        
        this._button.x = app_department_choice.renderer.width*this._relative_x;
        this._button.y = app_department_choice.renderer.height*this._relative_y;
        this._button.interactive = true;
        
        this._button
            .on('pointerdown', onButtonDown)
            .on('pointerup', this.onButtonUp)
            .on('pointerupoutside', this.onButtonUp)
            .on('pointerover', this.onButtonOver)
            .on('pointerout', this.onButtonOut);
        
        function onButtonDown(){
            console.log('onButtonDown'); 
            this.isdown = true;
            if(this.isOver){
                console.log('hi');
                this.alpha = 1;
                this.isOver = false;
                this.texture = sibal;
            } else {
                this.isOver = true;
                this.alpha = 0.5;
            }
        }
        
        //this.texture = this._object;
        //this._button.alpha = 0.5;
        
    
    
        app_department_choice.stage.addChild(this._button);

    }
    
    /*
    onButtonDown(){
        console.log('onButtonDown');
        
        this.isdown = true;
        if(this.isOver){
            console.log('hi');
            this.alpha = 1;
            this.isOver = false;
        } else {
            this.isOver = true;
            this.alpha = 0.5;
        }
        
        //this.texture = this._object;
        //this._button.alpha = 0.5;
        
    }
    */
    
    onButtonUp(){
        /*
        this.isdown = false;
        if (this.isOver){
            this.texture = this._object;
            this.alpha = 0.3;
        } else {
            this.texture = this._object;
        }
        */
    }

    onButtonOver(){
        console.log('onbutton!');
        /*
        this.isOver = true;
        if (this.isdown){
            return;
        }
        this.texture = this._object;
        */
    }

    onButtonOut(){
        /*
        this.isOver = false;
        if (this.isdown){
            return;
        }
        this.texture = this._object;
        */
    }
}
// LET COLORSET WORKS LIKE:
// MAIN, SUB1, SUB2, SUB3
/*
var dep_MATH = new department('MATH', 
                              'images/departments/01_MATH_black.png')

*/
var dep_PHYS = new Department('PHYS', 
                              'images/departments/02_PHYS_black.png',
                             [0x065D7A, 0xDAEA60, 0x00D8CD, 0xEFF1C5],
                             0.5, 0.5
                             );




/*
var dep_CHEM = new department('CHEM', 'images/departments/03_CHEM_black.png',
                             []);
                             */