var app_simulator = new PIXI.Application(1920, 1080, {transparent : true});
document.body.appendChild(app_simulator.view);

app_simulator.stage.position.set(
    app_simulator.renderer.width*0.5, app_simulator.renderer.height*0.5);


let this_stat = {
    health          :   0,
    relationship    :   0,
    grade           :   0
}

let timetable = [[1, 0], [2, 3]];

let thisGame = {
    department  :   'none',
    timetable   :   timetable,
    stat        :   [100, 100, 100]
}

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

let question_List = {
//  QUESTION        :   [QUESTION,  
//                       ANSWER-AFFECT-VALUE ARRAY]
    0               :   [   '가장 중요한 것 두개를 고르면?',
                            [
                                ['학점', 'grade', +3],
                                ['인간관계', 'relationship', +2],
                                ['체력', 'health', +1]
                            ],
                            2
                        ],
    1               :   [   '내 인생?',
                            [
                                ['조졌따리', 'grade', -10],
                                ['망했따리', 'relationship', -20],
                                ['띠용~!', 'health', -30],
                                ['기모리~', 'grade', -30]
                            ],
                            3
                        ],
    2               :   [   '가나다라',
                            [
                                ['마바사', 'default', -20],
                                ['아자차', 'relationship', +30],
                                ['카타파하', 'grade', -29]
                            ],
                            2
                        ],
    3               :   [   '0',
                            [
                                ['1', 'grade', 1],
                                ['1', 'grade', 1],
                                ['1', 'grade', 1],
                                ['1', 'grade', 1],
                                ['1', 'grade', 1],
                                ['1', 'grade', 1]
                            ],
                            5
                        ]
}   

var back_temp = new PIXI.Graphics();
back_temp.lineStyle(2, 0x0000FF, 0);
back_temp.beginFill(0xE5E4E0, 1);
back_temp.drawRect(-app_simulator.renderer.width/2, -app_simulator.renderer.height/2, 
                  app_simulator.renderer.width, app_simulator.renderer.height);
app_simulator.stage.addChild(back_temp);
    
// MAIN MENU
mainmenu = new PIXI.Sprite.fromImage('images/menu.png');
//mainmenu.scale.x *= 1;
//mainmenu.scale.y *= 1;
mainmenu.anchor.set(0.5);
mainmenu.x = 0;
mainmenu.y = 0;

button_new_game = new PIXI.Graphics();
button_achievement = new PIXI.Graphics(); ////////
button_new_game.beginFill(0xFFFFFF, 1);
button_new_game.drawRect(app_simulator.renderer.width*(-0.35), app_simulator.renderer.height*0.28, 
                     app_simulator.renderer.width*0.126, app_simulator.renderer.height*0.074);
button_new_game.buttonMode = true;
button_new_game.interactive = true;
button_new_game.alpha = 0;
button_new_game
    .on('pointerdown', new_game_onButtonDown);
/*
    .on('pointerup', new_game_onButtonUp)
    .on('pointerupoutside', new_game_onButtonUp)
    .on('pointerover', new_game_onButtonOver)
    .on('pointerout', new_game_onButtonOut);  
*/
    
function new_game_onButtonDown(){
    for (let i = 0; i < Department_choice_button.length; i++){
        app_simulator.stage.addChild(Department_choice_button[i]._department_button);
        app_simulator.stage.addChild(Department_choice_button[i]._select_button);
        app_simulator.stage.addChild(Department_choice_button[i]._return_button);
    }
        
    app_simulator.stage.removeChild(mainmenu);
    app_simulator.stage.removeChild(button_new_game);
    
    //loading_menu_to_test();
    enable_character_test();
    //this.isdown = true;
}


/*    
function new_game_onButtonUp(){
    
}
        
function new_game_onButtonOver(){    
    this.isOver = true;
    if (this.isdown){
        return;
    }
    //this.texture = icons_Texture[name+'_labeled'];
}

function new_game_onButtonOut(){
    this.isOver = false;
    if (this.isdown){
        return;
    }
    //this.texture = icons_Texture[name]; 
console.log(thisGame['department']);
    }
*/

    
function enable_main_menu(){
    app_simulator.stage.addChild(mainmenu); 
    app_simulator.stage.addChild(button_new_game);
}


enable_main_menu();


// CHARACTER TEST
class Character_test {
    constructor(question,
                 answer,
                 selected_num_available,
                 list
                ){
        
        let _thisclass = this;
        this._question = question;
        this._answer = answer;
        this._selected_num_available = selected_num_available;
        this._list = list;
        
        //////////////////////////////////////////////////////////
        this._question_center = new PIXI.Graphics();
        this._num_of_answers = this._answer.length;
        this._selected_num = 0;
        this._selected = [0, 0, 0, 0, 0, 0];
        this._i = 0;
  
        
        this._question_center.beginFill(color_Template[Department[4]][2]);
        this._question_center.lineStyle(10, color_Template[Department[4]][3], 1);        
        this._random_angle = Math.random()*2*Math.PI;
        for (this._i = 0; this._i<this._num_of_answers; this._i++){
            if (this._i == 0){                
                this._question_center.moveTo(
                    250*Math.cos((this._i*2*Math.PI + this._random_angle)/this._num_of_answers),
                    250*Math.sin((this._i*2*Math.PI + this._random_angle)/this._num_of_answers)
                );   
            } else {                
                this._question_center.lineTo(
                    250*Math.cos((this._i*2*Math.PI + this._random_angle)/this._num_of_answers),
                    250*Math.sin((this._i*2*Math.PI + this._random_angle)/this._num_of_answers)
                ); 
            }        
        }
        this._question_center.lineTo(
                250*Math.cos(this._random_angle/this._num_of_answers),
                250*Math.sin(this._random_angle/this._num_of_answers)
            );    
        this._question_center.endFill();
        
        //////////////////////////////////////////////////////////
        
        //this._answer_buttons = [];
        
        this._temp_index = 0;
        
        if (this._num_of_answers > 0){
            this._answer_buttons_0 = new PIXI.Graphics();
            //this._answer_buttons.push(new PIXI.Graphics()); 
            this._answer_buttons_0.beginFill(color_Template[Department[0]][2]);
            this._answer_buttons_0.lineStyle(0, color_Template[Department[0]][2], 0);  
            this._answer_buttons_0.moveTo(0,0);
            this._answer_buttons_0.lineTo(
                1102*Math.cos((this._random_angle)/this._num_of_answers),
                1102*Math.sin((this._random_angle)/this._num_of_answers)
            ); 
            this._answer_buttons_0.arc(
                0, 0, 2000, 
                0,
                (2*Math.PI + this._random_angle)/this._num_of_answers
            );
            this._answer_buttons_0.lineTo(0, 0);
            this._answer_buttons_0.endFill();
            
            this._answer_buttons_0.buttonMode = true;
            this._answer_buttons_0.interactive = true;
            this._answer_buttons_0.alpha = 0.6;
            
            
            this._answer_buttons_0
                .on('pointerdown', answer_onButtonDown_0)
                .on('pointerup', answer_onButtonUp_0)
                .on('pointerupoutside', answer_onButtonUp_0)
                .on('pointerover', answer_onButtonOver_0)
                .on('pointerout', answer_onButtonOut_0); 
            
            function answer_onButtonDown_0(){
                console.log(0);
                this.isdown = true;
                if (_thisclass._selected[0] == 0){
                    _thisclass._selected[0] = 1;
                    _thisclass._answer_buttons_0.alpha = 1;
                    if(_thisclass._answer[0][1] == 'grade'){
                        thisGame['stat'][2] += _thisclass._answer[0][2];
                        thisGame['stat'][1] += (Math.random()-0.5)*2;
                        thisGame['stat'][0] += (Math.random()-0.5)*2;
                    } else if(_thisclass._answer[0][1] == 'relationship'){
                        thisGame['stat'][2] += (Math.random()-0.5)*2;                    
                        thisGame['stat'][1] += _thisclass._answer[0][2];
                        thisGame['stat'][0] += (Math.random()-0.5)*2;
                    } else if(_thisclass._answer[0][1] == 'health'){
                        thisGame['stat'][2] += (Math.random()-0.5)*2;
                        thisGame['stat'][1] += (Math.random()-0.5)*2;
                        thisGame['stat'][0] += _thisclass._answer[0][2];
                    } else {
                        thisGame['stat'][2] += (Math.random()-0.5)*4;
                        thisGame['stat'][1] += (Math.random()-0.5)*4;
                        thisGame['stat'][0] += (Math.random()-0.5)*4;
                    }
                    console.log(thisGame['stat'][0]);
                    console.log(thisGame['stat'][1]);
                    console.log(thisGame['stat'][2]);
                    _thisclass._selected_num = _thisclass._selected_num + 1;
                }
                if (_thisclass._selected_num == _thisclass._selected_num_available){
                    character_test_run();
                    _thisclass.hide_this();
                }
            }
            function answer_onButtonUp_0(){
                if (this.isOver){
                } else {
                }
            }
            function answer_onButtonOver_0(){    
                this.isOver = true;
                if (this.isdown){
                    return;
                }
            }
            function answer_onButtonOut_0(){
                this.isOver = false;
                if (this.isdown){
                    return;
                }
            }
        }
        
        if (this._num_of_answers > 1){
            this._answer_buttons_1 = new PIXI.Graphics();
            //this._answer_buttons.push(new PIXI.Graphics()); 
            this._answer_buttons_1.beginFill(color_Template[Department[1]][2]);
            this._answer_buttons_1.lineStyle(0, color_Template[Department[1]][2], 0);  
            this._answer_buttons_1.moveTo(0,0);
            this._answer_buttons_1.lineTo(
                1102*Math.cos((2*Math.PI + this._random_angle)/this._num_of_answers),
                1102*Math.sin((2*Math.PI + this._random_angle)/this._num_of_answers)
            ); 
            this._answer_buttons_1.arc(
                0, 0, 1102, 
                (2*Math.PI + this._random_angle)/this._num_of_answers,
                (2*2*Math.PI + this._random_angle)/this._num_of_answers
            );
            this._answer_buttons_1.endFill();
            
            this._answer_buttons_1.buttonMode = true;
            this._answer_buttons_1.interactive = true;
            this._answer_buttons_1.alpha = 0.6;
            
            
            this._answer_buttons_1
                .on('pointerdown', answer_onButtonDown_1)
                .on('pointerup', answer_onButtonUp_1)
                .on('pointerupoutside', answer_onButtonUp_1)
                .on('pointerover', answer_onButtonOver_1)
                .on('pointerout', answer_onButtonOut_1); 
            
            function answer_onButtonDown_1(){
                this.isdown = true;
                if (_thisclass._selected[1] == 0){
                    _thisclass._selected[1] = 1;
                    _thisclass._answer_buttons_1.alpha = 1;
                    if(_thisclass._answer[1][1] == 'grade'){
                        thisGame['stat'][2] += _thisclass._answer[1][2];
                        thisGame['stat'][1] += (Math.random()-0.5)*2;
                        thisGame['stat'][0] += (Math.random()-0.5)*2;
                    } else if(_thisclass._answer[1][1] == 'relationship'){
                        thisGame['stat'][2] += (Math.random()-0.5)*2;                    
                        thisGame['stat'][1] += _thisclass._answer[1][2];
                        thisGame['stat'][0] += (Math.random()-0.5)*2;
                    } else if(_thisclass._answer[1][1] == 'health'){
                        thisGame['stat'][2] += (Math.random()-0.5)*2;
                        thisGame['stat'][1] += (Math.random()-0.5)*2;
                        thisGame['stat'][0] += _thisclass._answer[1][2];
                    } else {
                        thisGame['stat'][2] += (Math.random()-0.5)*4;
                        thisGame['stat'][1] += (Math.random()-0.5)*4;
                        thisGame['stat'][0] += (Math.random()-0.5)*4;
                    }
                    console.log(thisGame['stat'][0]);
                    console.log(thisGame['stat'][1]);
                    console.log(thisGame['stat'][2]);
                    _thisclass._selected_num = _thisclass._selected_num + 1;
                }
                if (_thisclass._selected_num == _thisclass._selected_num_available){
                    character_test_run();
                    _thisclass.hide_this();
                }
            }
            function answer_onButtonUp_1(){
                if (this.isOver){
                } else {
                }
            }
            function answer_onButtonOver_1(){    
                this.isOver = true;
                if (this.isdown){
                    return;
                }
            }
            function answer_onButtonOut_1(){
                this.isOver = false;
                if (this.isdown){
                    return;
                }
            }
        }
        
        if (this._num_of_answers > 2){
            this._answer_buttons_2 = new PIXI.Graphics();
            //this._answer_buttons.push(new PIXI.Graphics()); 
            this._answer_buttons_2.beginFill(color_Template[Department[2]][2]);
            this._answer_buttons_2.lineStyle(0, color_Template[Department[2]][2], 0);  
            this._answer_buttons_2.moveTo(0,0);
            this._answer_buttons_2.lineTo(
                1102*Math.cos((2*2*Math.PI + this._random_angle)/this._num_of_answers),
                1102*Math.sin((2*2*Math.PI + this._random_angle)/this._num_of_answers)
            ); 
            this._answer_buttons_2.arc(
                0, 0, 1102, 
                (2*2*Math.PI + this._random_angle)/this._num_of_answers,
                (3*2*Math.PI + this._random_angle)/this._num_of_answers
            );
            this._answer_buttons_2.endFill();
            
            this._answer_buttons_2.buttonMode = true;
            this._answer_buttons_2.interactive = true;
            this._answer_buttons_2.alpha = 0.6;
            
            
            this._answer_buttons_2
                .on('pointerdown', answer_onButtonDown_2)
                .on('pointerup', answer_onButtonUp_2)
                .on('pointerupoutside', answer_onButtonUp_2)
                .on('pointerover', answer_onButtonOver_2)
                .on('pointerout', answer_onButtonOut_2); 
            
            function answer_onButtonDown_2(){
                this.isdown = true;
                if (_thisclass._selected[2] == 0){
                    _thisclass._selected[2] = 1;
                    _thisclass._answer_buttons_2.alpha = 1;
                    if(_thisclass._answer[2][1] == 'grade'){
                        thisGame['stat'][2] += _thisclass._answer[2][2];
                        thisGame['stat'][1] += (Math.random()-0.5)*2;
                        thisGame['stat'][0] += (Math.random()-0.5)*2;
                    } else if(_thisclass._answer[2][1] == 'relationship'){
                        thisGame['stat'][2] += (Math.random()-0.5)*2;                    
                        thisGame['stat'][1] += _thisclass._answer[2][2];
                        thisGame['stat'][0] += (Math.random()-0.5)*2;
                    } else if(_thisclass._answer[2][1] == 'health'){
                        thisGame['stat'][2] += (Math.random()-0.5)*2;
                        thisGame['stat'][1] += (Math.random()-0.5)*2;
                        thisGame['stat'][0] += _thisclass._answer[2][2];
                    } else {
                        thisGame['stat'][2] += (Math.random()-0.5)*4;
                        thisGame['stat'][1] += (Math.random()-0.5)*4;
                        thisGame['stat'][0] += (Math.random()-0.5)*4;
                    }
                    console.log(thisGame['stat'][0]);
                    console.log(thisGame['stat'][1]);
                    console.log(thisGame['stat'][2]);
                    _thisclass._selected_num = _thisclass._selected_num + 1;
                }
                if (_thisclass._selected_num == _thisclass._selected_num_available){
                    character_test_run();
                   _thisclass.hide_this();
                }
            }
            function answer_onButtonUp_2(){
                if (this.isOver){
                } else {
                }
            }
            function answer_onButtonOver_2(){    
                this.isOver = true;
                if (this.isdown){
                    return;
                }
            }
            function answer_onButtonOut_2(){
                this.isOver = false;
                if (this.isdown){
                    return;
                }
            }
        }
        
        if (this._num_of_answers > 3){
            this._answer_buttons_3 = new PIXI.Graphics();
            //this._answer_buttons.push(new PIXI.Graphics()); 
            this._answer_buttons_3.beginFill(color_Template[Department[3]][2]);
            this._answer_buttons_3.lineStyle(0, color_Template[Department[3]][2], 0);  
            this._answer_buttons_3.moveTo(0,0);
            this._answer_buttons_3.lineTo(
                1102*Math.cos((3*2*Math.PI + this._random_angle)/this._num_of_answers),
                1102*Math.sin((3*2*Math.PI + this._random_angle)/this._num_of_answers)
            ); 
            this._answer_buttons_3.arc(
                0, 0, 1102, 
                (3*2*Math.PI + this._random_angle)/this._num_of_answers,
                (4*2*Math.PI + this._random_angle)/this._num_of_answers
            );
            this._answer_buttons_3.endFill();
            
            this._answer_buttons_3.buttonMode = true;
            this._answer_buttons_3.interactive = true;
            this._answer_buttons_3.alpha = 0.6;
            
            
            this._answer_buttons_3
                .on('pointerdown', answer_onButtonDown_3)
                .on('pointerup', answer_onButtonUp_3)
                .on('pointerupoutside', answer_onButtonUp_3)
                .on('pointerover', answer_onButtonOver_3)
                .on('pointerout', answer_onButtonOut_3); 
            
            function answer_onButtonDown_3(){
                this.isdown = true;
                if (_thisclass._selected[3] == 0){
                    _thisclass._selected[3] = 1;
                    _thisclass._answer_buttons_3.alpha = 1;
                    if(_thisclass._answer[3][1] == 'grade'){
                        thisGame['stat'][2] += _thisclass._answer[3][2];
                        thisGame['stat'][1] += (Math.random()-0.5)*2;
                        thisGame['stat'][0] += (Math.random()-0.5)*2;
                    } else if(_thisclass._answer[3][1] == 'relationship'){
                        thisGame['stat'][2] += (Math.random()-0.5)*2;                    
                        thisGame['stat'][1] += _thisclass._answer[3][2];
                        thisGame['stat'][0] += (Math.random()-0.5)*2;
                    } else if(_thisclass._answer[3][1] == 'health'){
                        thisGame['stat'][2] += (Math.random()-0.5)*2;
                        thisGame['stat'][1] += (Math.random()-0.5)*2;
                        thisGame['stat'][0] += _thisclass._answer[3][2];
                    } else {
                        thisGame['stat'][2] += (Math.random()-0.5)*4;
                        thisGame['stat'][1] += (Math.random()-0.5)*4;
                        thisGame['stat'][0] += (Math.random()-0.5)*4;
                    }
                    console.log(thisGame['stat'][0]);
                    console.log(thisGame['stat'][1]);
                    console.log(thisGame['stat'][2]);
                    _thisclass._selected_num = _thisclass._selected_num + 1;
                }  
                if (_thisclass._selected_num == _thisclass._selected_num_available){
                    character_test_run();
                    _thisclass.hide_this();
                }
            }
            function answer_onButtonUp_3(){
                if (this.isOver){
                } else {
                }
            }
            function answer_onButtonOver_3(){    
                this.isOver = true;
                if (this.isdown){
                    return;
                }
            }
            function answer_onButtonOut_3(){
                this.isOver = false;
                if (this.isdown){
                    return;
                }
            }
        }
        
        if (this._num_of_answers > 4){
            this._answer_buttons_4 = new PIXI.Graphics();
            //this._answer_buttons.push(new PIXI.Graphics()); 
            this._answer_buttons_4.beginFill(color_Template[Department[4]][2]);
            this._answer_buttons_4.lineStyle(0, color_Template[Department[4]][2], 0);  
            this._answer_buttons_4.moveTo(0,0);
            this._answer_buttons_4.lineTo(
                1102*Math.cos((4*2*Math.PI + this._random_angle)/this._num_of_answers),
                1102*Math.sin((4*2*Math.PI + this._random_angle)/this._num_of_answers)
            ); 
            this._answer_buttons_4.arc(
                0, 0, 1102, 
                (4*2*Math.PI + this._random_angle)/this._num_of_answers,
                (5*2*Math.PI + this._random_angle)/this._num_of_answers
            );
            this._answer_buttons_4.endFill();
            
            this._answer_buttons_4.buttonMode = true;
            this._answer_buttons_4.interactive = true;
            this._answer_buttons_4.alpha = 0.6;
            
            
            this._answer_buttons_4
                .on('pointerdown', answer_onButtonDown_4)
                .on('pointerup', answer_onButtonUp_4)
                .on('pointerupoutside', answer_onButtonUp_4)
                .on('pointerover', answer_onButtonOver_4)
                .on('pointerout', answer_onButtonOut_4); 
            
            function answer_onButtonDown_4(){
                this.isdown = true;
                if (_thisclass._selected[4] == 0){
                    _thisclass._selected[4] = 1;
                    _thisclass._answer_buttons_4.alpha = 1;
                    if(_thisclass._answer[4][1] == 'grade'){
                        thisGame['stat'][2] += _thisclass._answer[4][2];
                        thisGame['stat'][1] += (Math.random()-0.5)*2;
                        thisGame['stat'][0] += (Math.random()-0.5)*2;
                    } else if(_thisclass._answer[4][1] == 'relationship'){
                        thisGame['stat'][2] += (Math.random()-0.5)*2;                    
                        thisGame['stat'][1] += _thisclass._answer[4][2];
                        thisGame['stat'][0] += (Math.random()-0.5)*2;
                    } else if(_thisclass._answer[4][1] == 'health'){
                        thisGame['stat'][2] += (Math.random()-0.5)*2;
                        thisGame['stat'][1] += (Math.random()-0.5)*2;
                        thisGame['stat'][0] += _thisclass._answer[4][2];
                    } else {
                        thisGame['stat'][2] += (Math.random()-0.5)*4;
                        thisGame['stat'][1] += (Math.random()-0.5)*4;
                        thisGame['stat'][0] += (Math.random()-0.5)*4;
                    }
                    console.log(thisGame['stat'][0]);
                    console.log(thisGame['stat'][1]);
                    console.log(thisGame['stat'][2]);
                    _thisclass._selected_num = _thisclass._selected_num + 1;
                }
                if (_thisclass._selected_num == _thisclass._selected_num_available){
                    character_test_run();
                    _thisclass.hide_this();
                }
            }
            function answer_onButtonUp_4(){
                if (this.isOver){
                } else {
                }
            }
            function answer_onButtonOver_4(){    
                this.isOver = true;
                if (this.isdown){
                    return;
                }
            }
            function answer_onButtonOut_4(){
                this.isOver = false;
                if (this.isdown){
                    return;
                }
            }
        }
        
        if (this._num_of_answers > 5){
            this._answer_buttons_5 = new PIXI.Graphics();
            //this._answer_buttons.push(new PIXI.Graphics()); 
            this._answer_buttons_5.beginFill(color_Template[Department[5]][2]);
            this._answer_buttons_5.lineStyle(0, color_Template[Department[5]][2], 0);  
            this._answer_buttons_5.moveTo(0,0);
            this._answer_buttons_5.lineTo(
                1102*Math.cos((5*2*Math.PI + this._random_angle)/this._num_of_answers),
                1102*Math.sin((5*2*Math.PI + this._random_angle)/this._num_of_answers)
            ); 
            this._answer_buttons_5.arc(
                0, 0, 1102, 
                (5*2*Math.PI + this._random_angle)/this._num_of_answers,
                (6*2*Math.PI + this._random_angle)/this._num_of_answers
            );
            this._answer_buttons_5.endFill();
            
            this._answer_buttons_5.buttonMode = true;
            this._answer_buttons_5.interactive = true;
            this._answer_buttons_5.alpha = 0.6;
            
            
            this._answer_buttons_5
                .on('pointerdown', answer_onButtonDown_5)
                .on('pointerup', answer_onButtonUp_5)
                .on('pointerupoutside', answer_onButtonUp_5)
                .on('pointerover', answer_onButtonOver_5)
                .on('pointerout', answer_onButtonOut_5); 
            
            function answer_onButtonDown_5(){
                this.isdown = true;
                if (_thisclass._selected[5] == 0){
                    _thisclass._selected[5] = 1;
                    _thisclass._answer_buttons_5.alpha = 1;
                    if(_thisclass._answer[5][1] == 'grade'){
                        thisGame['stat'][2] += _thisclass._answer[5][2];
                        thisGame['stat'][1] += (Math.random()-0.5)*2;
                        thisGame['stat'][0] += (Math.random()-0.5)*2;
                    } else if(_thisclass._answer[5][1] == 'relationship'){
                        thisGame['stat'][2] += (Math.random()-0.5)*2;                    
                        thisGame['stat'][1] += _thisclass._answer[5][2];
                        thisGame['stat'][0] += (Math.random()-0.5)*2;
                    } else if(_thisclass._answer[5][1] == 'health'){
                        thisGame['stat'][2] += (Math.random()-0.5)*2;
                        thisGame['stat'][1] += (Math.random()-0.5)*2;
                        thisGame['stat'][0] += _thisclass._answer[5][2];
                    } else {
                        thisGame['stat'][2] += (Math.random()-0.5)*4;
                        thisGame['stat'][1] += (Math.random()-0.5)*4;
                        thisGame['stat'][0] += (Math.random()-0.5)*4;
                    }
                    console.log(thisGame['stat'][0]);
                    console.log(thisGame['stat'][1]);
                    console.log(thisGame['stat'][2]);
                    _thisclass._selected_num = _thisclass._selected_num + 1;
                }
                
                if (_thisclass._selected_num == _thisclass._selected_num_available){
                    character_test_run();
                    _thisclass.hide_this();
                }
            }
            function answer_onButtonUp_5(){
                if (this.isOver){
                } else {
                }
            }
            function answer_onButtonOver_5(){    
                this.isOver = true;
                if (this.isdown){
                    return;
                }
            }
            function answer_onButtonOut_5(){
                this.isOver = false;
                if (this.isdown){
                    return;
                }
            }
        }

    }
    show_this(){
        
        if (this._num_of_answers > 5) { app_simulator.stage.addChild(this._answer_buttons_5); }
        if (this._num_of_answers > 4) { app_simulator.stage.addChild(this._answer_buttons_4); }
        if (this._num_of_answers > 3) { app_simulator.stage.addChild(this._answer_buttons_3); }
        if (this._num_of_answers > 2) { app_simulator.stage.addChild(this._answer_buttons_2); }
        if (this._num_of_answers > 1) { app_simulator.stage.addChild(this._answer_buttons_1); }
        if (this._num_of_answers > 0) { app_simulator.stage.addChild(this._answer_buttons_0); } 
        app_simulator.stage.addChild(this._question_center);
    }
    hide_this(){
        app_simulator.stage.removeChild(this._question_center);
        if (this._num_of_answers > 5) { app_simulator.stage.removeChild(this._answer_buttons_5); }
        if (this._num_of_answers > 4) { app_simulator.stage.removeChild(this._answer_buttons_4); }
        if (this._num_of_answers > 3) { app_simulator.stage.removeChild(this._answer_buttons_3); }
        if (this._num_of_answers > 2) { app_simulator.stage.removeChild(this._answer_buttons_2); }
        if (this._num_of_answers > 1) { app_simulator.stage.removeChild(this._answer_buttons_1); }
        if (this._num_of_answers > 0) { app_simulator.stage.removeChild(this._answer_buttons_0); }     
    }
}
let Character_test_questions = [];
function enable_character_test(){
    for (let i = 0; i < Object.keys(question_List).length; i++){
        Character_test_questions.push(
            new Character_test(question_List[i][0], question_List[i][1], question_List[i][2], Character_test_questions)
        );
        
    }
    Character_test_questions[0].show_this();
}
function character_test_run(){
    console.log('a');
    for (let i = 1; i < Object.keys(question_List).length; i++){        
        if((Character_test_questions[i-1]._selected_num == 
           Character_test_questions[i-1]._selected_num_available) && 
          (Character_test_questions[i]._selected_num != 
           Character_test_questions[i]._selected_num_available)){
            console.log('aaa');
            Character_test_questions[i].show_this();
        } 
    }
    
    if (Character_test_questions[Object.keys(question_List).length - 1]._selected_num ==
       Character_test_questions[Object.keys(question_List).length - 1]._selected_num_available){
        // END TEST
        enable_department_choice();
    }
}

    
// DEPARTMENT CHOICE
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
            thisGame['department'] = _thisclass._name;
            console.log(thisGame['department']);
            _thisclass._select_button.interactive = true;
            _thisclass._select_button.alpha = 1;
            _thisclass._return_button.interactive = true;
            _thisclass._return_button.alpha = 1;
            for (let i = 0; i < list.length; i++){
                if (list[i]._name != thisGame['department']){
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
            console.log(thisGame['department']);

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
            //thisGame['department'] = _thisclass._name;
            console.log(thisGame['department'] + 'confirmed');
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
            console.log(thisGame['department']);

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
            //thisGame['department'] = _thisclass._name;
            console.log(thisGame['department'] + 'confirmed');
            for (let i = 0; i < list.length; i++){
                if (list[i]._name != thisGame['department']){
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
            console.log(thisGame['department']);

        }
        
        app_simulator.stage.addChild(this._department_button);
        app_simulator.stage.addChild(this._select_button);
        app_simulator.stage.addChild(this._return_button);
        
    }
    
}
let Department_choice_button = [];
function enable_department_choice(){
    Department_choice_button.push(new Department_choice(Department[0], -0.66, -0.2, -0.3, 0.05, Department_choice_button));
    Department_choice_button.push(new Department_choice(Department[1], -0.22, -0.2, 0.14, 0.05, Department_choice_button));
    Department_choice_button.push(new Department_choice(Department[2], 0.22, -0.2, 0.58, 0.05, Department_choice_button));
    Department_choice_button.push(new Department_choice(Department[3], 0.66, -0.2, 0.24, 0.05, Department_choice_button));
    Department_choice_button.push(new Department_choice(Department[4], -0.66, 0.15, -0.3, 0.4, Department_choice_button));
    Department_choice_button.push(new Department_choice(Department[5], -0.22, 0.15, 0.14, 0.4, Department_choice_button));
    Department_choice_button.push(new Department_choice(Department[6], 0.22, 0.15, 0.58, 0.4, Department_choice_button));
    Department_choice_button.push(new Department_choice(Department[7], 0.66, 0.15, 0.24, 0.4, Department_choice_button));
    Department_choice_button.push(new Department_choice(Department[8], -0.66, 0.5, -0.3, 0.75, Department_choice_button));
    Department_choice_button.push(new Department_choice(Department[9], -0.22, 0.5, 0.14, 0.75, Department_choice_button));
    Department_choice_button.push(new Department_choice(Department[10], 0.22, 0.5, 0.58, 0.75, Department_choice_button));
    Department_choice_button.push(new Department_choice('RAND', 0.66, 0.5, 0.24, 0.75, Department_choice_button));
}

function loading_menu_to_test() {
    var style = new PIXI.TextStyle({
        fontFamily: 'Arial',
        fontSize: 80,
        fill: ['#ffffff'], // gradient
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
    
    let loadingText = new PIXI.Text('gimori', style);
    loadingText.anchor.set(0.5);
    loadingText.x = 0;
    loadingText.y = 0;
    app_simulator.stage.addChild(loadingText);
    
    var bar1 = new PIXI.Graphics();
    bar1.lineStyle(2,0xFFFF00,1);
    bar1.drawRect(-300,-310,600,50);
    app_simulator.stage.addChild(bar1);
    
    var graphics = new PIXI.Graphics();
    graphics.lineStyle(2, 0xFF00FF, 1);
    graphics.beginFill(0xFF00BB, 0.25);
    graphics.drawRect(-300,-310, 0, 50);
  
    graphics.endFill();
    app_simulator.stage.addChild(graphics);
    
    var a=0;
 
    app_simulator.ticker.add(function(delta=1) {
    
        a+=delta*10;
        graphics.drawRect(-300, -310, a, 50);
        if(a>600)
        {
            //a=600;
            app_simulator.stage.removeChild(loadingText);
            app_simulator.stage.removeChild(bar1);
            app_simulator.stage.removeChild(graphics);
            app_simulator.ticker.stop();
            
            
        }
   
    });
    

    
}




