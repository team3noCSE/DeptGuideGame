var app_simulator = new PIXI.Application(1920, 1080, {transparent : true, antialias : true});
document.body.appendChild(app_simulator.view);

app_simulator.stage.position.set(
    app_simulator.renderer.width*0.5, app_simulator.renderer.height*0.5);

/* 해야 하는 것
    버튼 제대로 작동하도록: 
*/

let Department = {
// DEPARTMENT   :   VALUE
    MATH        :   0,      0   :   'MATH',
    PHYS        :   1,      1   :   'PHYS',
    CHEM        :   2,      2   :   'CHEM',
    LIFE        :   3,      3   :   'LIFE',
    MSE         :   4,      4   :   'MSE',
    ME          :   5,      5   :   'ME',
    IME         :   6,      6   :   'IME',
    EE          :   7,      7   :   'EE',
    CSE         :   8,      8   :   'CSE',
    CE          :   9,      9   :   'CE',
    CITE        :   10,     10  :   'CITE'
}

let icons_Texture = {
//  DEPARTMENT(_~~) :
    MATH            :   PIXI.Texture.fromImage('images/departments/01_MATH_black.png'),
    MATH_labeled    :   PIXI.Texture.fromImage('images/departments/01_MATH_black_labeled.png'),
    PHYS            :   PIXI.Texture.fromImage('images/departments/02_PHYS_black.png'),
    PHYS_labeled    :   PIXI.Texture.fromImage('images/departments/02_PHYS_black_labeled.png'),
    CHEM            :   PIXI.Texture.fromImage('images/departments/03_CHEM_black.png'),
    CHEM_labeled    :   PIXI.Texture.fromImage('images/departments/03_CHEM_black_labeled.png'),
    LIFE            :   PIXI.Texture.fromImage('images/departments/04_LIFE_black.png'),
    LIFE_labeled    :   PIXI.Texture.fromImage('images/departments/04_LIFE_black_labeled.png'),
    MSE             :   PIXI.Texture.fromImage('images/departments/05_MSE_black.png'),
    MSE_labeled     :   PIXI.Texture.fromImage('images/departments/05_MSE_black_labeled.png'),  
    ME              :   PIXI.Texture.fromImage('images/departments/06_ME_black.png'),
    ME_labeled      :   PIXI.Texture.fromImage('images/departments/06_ME_black_labeled.png'),  
    IME             :   PIXI.Texture.fromImage('images/departments/07_IME_black.png'),
    IME_labeled     :   PIXI.Texture.fromImage('images/departments/07_IME_black_labeled.png'),  
    EE              :   PIXI.Texture.fromImage('images/departments/08_EE_black.png'),
    EE_labeled      :   PIXI.Texture.fromImage('images/departments/08_EE_black_labeled.png'),  
    CSE             :   PIXI.Texture.fromImage('images/departments/09_CSE_black.png'),
    CSE_labeled     :   PIXI.Texture.fromImage('images/departments/09_CSE_black_labeled.png'),  
    CE              :   PIXI.Texture.fromImage('images/departments/10_CE_black.png'),
    CE_labeled      :   PIXI.Texture.fromImage('images/departments/10_CE_black_labeled.png'),  
    CITE            :   PIXI.Texture.fromImage('images/ang.png'),  // TEMPORARY
    CITE_labeled    :   PIXI.Texture.fromImage('images/sibal.png'),
    RAND            :   PIXI.Texture.fromImage('images/hohoho.png'),
    RAND_labeled    :   PIXI.Texture.fromImage('images/hahaha.png')
}

let color_Template = {
//  DEPARTMENT      :   [MAIN1,    SUB1,     SUB2,     SUB3    ]
//                      [70%       20%       7%        3%      ]
    MATH            :   [0xBB4430, 0x7EBDC2, 0xF3DFA2, 0xEFE6DD],
    PHYS            :   [0x065D7A, 0xDAEA60, 0x00D8CD, 0xEFF1C5],
    CHEM            :   [0x53131E, 0xB5D6B2, 0xFFFACC, 0xFFEFBD],
    LIFE            :   [0x7DC95E, 0x648767, 0xBFC0C0, 0xCEE7E6],
    MSE             :   [0x5F4842, 0xAF8D86, 0xC5C3C6, 0x1985A1],
    ME              :   [0xFFE74C, 0xFF5964, 0xFFFFFF, 0x38618C],
    IME             :   [0x1F271B, 0x0B4F6C, 0xCBB9A8, 0xDCC7BE],
    EE              :   [0x96939B, 0xE8E8E8, 0x564256, 0xFC814A],
    CSE             :   [0x9DBEBB, 0xF4E9CD, 0x031926, 0xBCA3AC],
    CE              :   [0xC6E0FF, 0x315659, 0x2978A0, 0xBCAB79],
    CITE            :   [0xADF7B6, 0xFCF5C7, 0xFFC09F, 0x79ADDC],
    RAND            :   [0xADF7B6, 0xFCF5C7, 0xFFC09F, 0x79ADDC]
}

var back_temp = new PIXI.Graphics();
back_temp.lineStyle(2, 0x0000FF, 0);
back_temp.beginFill(0xE5E4E0, 1);
back_temp.drawRect(-app_simulator.renderer.width/2, -app_simulator.renderer.height/2, 
                  app_simulator.renderer.width, app_simulator.renderer.height);
app_simulator.stage.addChild(back_temp);
    
let save_department_choice = 'none';
// thisGame.department = 'none';


class Department_choice {
    constructor(name, 
                 department_button_x, department_button_y, 
                 select_button_x, select_button_y,
                 list
                ){
        
        let _thisclass = this;
        this._name = name;
        this._object = icons_Texture[name];
        this._colorset = color_Template[name];
        this._department_button_x = department_button_x;
        this._department_button_y = department_button_y;
        this._select_button_x = select_button_x;
        this._select_button_y = select_button_y;
        this._return_button_x = select_button_x + 0.08;
        this._return_button_y = select_button_y;
        
        //////////////////////////////////////////////////////////
        this._department_button = new PIXI.Sprite(this._object);
        this._select_button = new PIXI.Graphics();
        this._return_button = new PIXI.Graphics();
        
        //////////////////////////////////////////////////////////
        this._department_button.scale.x *= 0.3;
        this._department_button.scale.y *= 0.3;
        this._department_button.buttonMode = true;
        this._department_button.anchor.set(0.5);
        this._department_button.x = app_simulator.renderer.width*this._department_button_x/2; 
        this._department_button.y = app_simulator.renderer.height*this._department_button_y/2;
        this._department_button.interactive = true;
        
        
        this._select_button.beginFill(color_Template[name][1], 1);
        this._select_button.drawRect(app_simulator.renderer.width*this._select_button_x/2 - 170, 
                                     app_simulator.renderer.height*this._select_button_y/2 - 40, 
                                     140, 80);
        this._select_button.beginFill(color_Template[name][0], 1);
        this._select_button.drawRect(app_simulator.renderer.width*this._select_button_x/2 - 160,
                                     app_simulator.renderer.height*this._select_button_y/2 - 30,
                                     120, 60);
        this._select_button.buttonMode = true;
        this._select_button.interactive = false;
        this._select_button.alpha = 0;
        
        this._return_button.beginFill(color_Template[name][3], 1);
        this._return_button.drawRect(app_simulator.renderer.width*this._return_button_x/2 - 20, 
                                     app_simulator.renderer.height*this._return_button_y/2 - 40, 
                                     140, 80);
        this._return_button.beginFill(color_Template[name][2], 1);
        this._return_button.drawRect(app_simulator.renderer.width*this._return_button_x/2 - 10,
                                     app_simulator.renderer.height*this._return_button_y/2 - 30,
                                     120, 60);
        this._return_button.buttonMode = true;
        this._return_button.interactive = false;
        this._return_button.alpha = 0;
        
        ///////////////////////////////////////////////////////////
        this._department_button
            .on('pointerdown', department_onButtonDown)
            .on('pointerup', department_onButtonUp)
            .on('pointerupoutside', department_onButtonUp)
            .on('pointerover', department_onButtonOver)
            .on('pointerout', department_onButtonOut);        

        function department_onButtonDown(){
            this.isdown = true;
            this.texture = icons_Texture[name+'_labeled']; 
            save_department_choice = _thisclass._name;
            console.log(save_department_choice);
            _thisclass._select_button.interactive = true;
            _thisclass._select_button.alpha = 1;
            _thisclass._return_button.interactive = true;
            _thisclass._return_button.alpha = 1;
            for (let i = 0; i < list.length; i++){
                if (list[i]._name != save_department_choice){
                    console.log('hi');
                    list[i]._department_button.alpha = 0;
                    list[i]._department_button.interactive = false;
                }
            }
        }
        
        function department_onButtonUp(){
            if (this.isOver){
                this.texture = icons_Texture[name+'_labeled'];
            } else {
                this.texture = icons_Texture[name];
            }
        }
        
        function department_onButtonOver(){    
            this.isOver = true;
            if (this.isdown){
                return;
            }
            this.texture = icons_Texture[name+'_labeled'];
        }

        function department_onButtonOut(){
            this.isOver = false;
            if (this.isdown){
                return;
            }
            this.texture = icons_Texture[name];
            console.log(save_department_choice);

        }
        
        ///////////////////////////////////////////////////////////
        this._select_button
            .on('pointerdown', select_onButtonDown)
            .on('pointerup', select_onButtonUp)
            .on('pointerupoutside', select_onButtonUp)
            .on('pointerover', select_onButtonOver)
            .on('pointerout', select_onButtonOut);
        
        
        function select_onButtonDown(){
            this.isdown = true;
            //this.texture = icons_Texture[name+'_labeled']; 
            //save_department_choice = _thisclass._name;
            console.log(save_department_choice + 'confirmed');
            for (let i = 0; i < list.length; i++){
                app_simulator.stage.removeChild(list[i]._department_button);
                app_simulator.stage.removeChild(list[i]._select_button);
                app_simulator.stage.removeChild(list[i]._return_button);
            }
        }
        
        function select_onButtonUp(){
            if (this.isOver){
                //this.texture = icons_Texture[name+'_labeled'];
            } else {
                //this.texture = icons_Texture[name];
            }
        }
        
        function select_onButtonOver(){    
            this.isOver = true;
            if (this.isdown){
                return;
            }
            //this.texture = icons_Texture[name+'_labeled'];
        }

        function select_onButtonOut(){
            this.isOver = false;
            if (this.isdown){
                return;
            }
            //this.texture = icons_Texture[name];
            console.log(save_department_choice);

        }
        
        ///////////////////////////////////////////////////////////
        this._return_button
            .on('pointerdown', return_onButtonDown)
            .on('pointerup', return_onButtonUp)
            .on('pointerupoutside', return_onButtonUp)
            .on('pointerover', return_onButtonOver)
            .on('pointerout', return_onButtonOut);
        
        
        function return_onButtonDown(){
            this.isdown = true;
            //this.texture = icons_Texture[name+'_labeled']; 
            //save_department_choice = _thisclass._name;
            console.log(save_department_choice + 'confirmed');
            for (let i = 0; i < list.length; i++){
                if (list[i]._name != save_department_choice){
                    list[i]._department_button.interactive = true;
                    list[i]._department_button.alpha = 1;
                }
            }
            _thisclass._select_button.interactive = false;
            _thisclass._select_button.alpha = 0;
            _thisclass._return_button.interactive = false;
            _thisclass._return_button.alpha = 0;
        }
        
        function return_onButtonUp(){
            if (this.isOver){
                //this.texture = icons_Texture[name+'_labeled'];
            } else {
                //this.texture = icons_Texture[name];
            }
        }
        
        function return_onButtonOver(){    
            this.isOver = true;
            if (this.isdown){
                return;
            }
            //this.texture = icons_Texture[name+'_labeled'];
        }

        function return_onButtonOut(){
            this.isOver = false;
            if (this.isdown){
                return;
            }
            //this.texture = icons_Texture[name];
            console.log(save_department_choice);

        }
        
        app_simulator.stage.addChild(this._department_button);
        app_simulator.stage.addChild(this._select_button);
        app_simulator.stage.addChild(this._return_button);
        
    }
}

let button = [];
button.push(new Department_choice(Department[0], -0.66, -0.2, -0.3, 0.05, button));
button.push(new Department_choice(Department[1], -0.22, -0.2, 0.14, 0.05, button));
button.push(new Department_choice(Department[2], 0.22, -0.2, 0.58, 0.05, button));
button.push(new Department_choice(Department[3], 0.66, -0.2, 0.24, 0.05, button));
button.push(new Department_choice(Department[4], -0.66, 0.15, -0.3, 0.4, button));
button.push(new Department_choice(Department[5], -0.22, 0.15, 0.14, 0.4, button));
button.push(new Department_choice(Department[6], 0.22, 0.15, 0.58, 0.4, button));
button.push(new Department_choice(Department[7], 0.66, 0.15, 0.24, 0.4, button));
button.push(new Department_choice(Department[8], -0.66, 0.5, -0.3, 0.75, button));
button.push(new Department_choice(Department[9], -0.22, 0.5, 0.14, 0.75, button));
button.push(new Department_choice(Department[10], 0.22, 0.5, 0.58, 0.75, button));
button.push(new Department_choice('RAND', 0.66, 0.5, 0.24, 0.75, button));

for(let i = 0; i < Object.keys(Department).length/2; i++){
    if(button[i]._name == save_department_choice){
        console.log('sibal');
    }   
}