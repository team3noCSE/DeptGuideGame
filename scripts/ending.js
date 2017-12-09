class Single_Ending{
  constructor(
    _title,    //String
    _img_name, //String
    _description, //String
  ){
    this.title=_title;
    this.img_name=_img_name;
    this.description=_description;
  }
}
var _title, _img_name, _description;
while(1){
  var randomize=Math.floor(Math.random()*15)+1;
  if(randomize==1){
    _title="님아, 그 강을 건너지 마오";
    _img_name="재수강.png";
    _description="16주 동안의 한 학기, 참 즐거웠었죠?";
    break;
  }
  else if(randomize==2){
    _title="I`ll be back";
    _img_name="illbeback.png";
    _description="끝나지 않은 수업과의 싸움...\ 언젠가 다시 돌아온다";
    break;
  }
  else if(randomize==3){
    _title="A가 없네";
    _img_name="A가없네.png";
    _description="A가 뭔지 알아요? 성실하게 수업을 들으면 받는 학점을 A라 그래요 A가 없네?";
    break;
  }
  else if(randomize==4){
    _title="휴먼굴림체";
    _img_name="휴먼굴림체.png";
    _description="당신은 이번 학기 동안 \
    훌륭하게 굴렀습니다. 구뤠잇!";
    break;
  }
  else if(randomize==5){
      _title="양심?";
      _img_name="양심.png";
      _description="다른 학우들을 제치고\ 높은 학점을 받았군요!\ 양심의 상태가...";
      break;
  }
  else if(randomize==6){
    _title="개똥벌레";
    _img_name="개똥벌레.png";
    _description="나는야 개똥벌레~\
     친구가 없네~";
    break;
  }
  else if(randomize==7){
    _title="인생은 혼자다";
    _img_name="인생은혼자다.png";
    _description="인생 공수래 공수거 아니겠습니까!!";
    break;
  }
  else if(randomize==8){
    _title="노는 게 제일 좋아";
    _img_name="노는게제일좋아.png";
    _description="노는게 제일 좋아!\
     친구들 모여라!";
    break;
  }
  else if(randomize==9){
    _title="이불밖은위험해";
    _img_name="이불밖은위험해.png";
    _description="역시 이불 밖은 위험해...";
    break;
  }
  else if(randomize==10){
    _title="죽겠어요";
    _img_name="죽겠어요.png";
    _description="힘들어 죽겠어요\
     죽겠다구요";
    break;
  }
  else if(randomize==11){
    _title="사는게힘들어";
    _img_name="사는게힘들어엄마.png";
    _description="얼른 집으로 가자";
    break;
  }
  else if(randomize==12){
    _title="핫식스";
    _img_name="핫식스.png";
    _description="내가 핫식스를 마시는지\
     핫식스가 나를 마시는지";
    break;
  }
  else if(randomize==13){
    _title="할수있다능";
    _img_name="할수있다능.png";
    _description="할수있다능 별로 안 어렵다능";
    break;
  }
  else if(randomize==14){
    _title="트로피카나";
    _img_name="트로피카나.png";
    _description="힘이 넘친다! Real Fruit! Real Sparkling!";
    break;
  }
  else if(randomize==15){
    _title="술을 마시자";
    _img_name="술을마시자.png";
    _description="마시는 게 남는 거다! 술을 마시자!";
    break;
  }
}
var this_ending=new Single_Ending(_title,_img_name,_description);
var summary_first = false;
var detail_first = true;
var menu_first = true;
var Result_pic=document.createElement('img');
document.getElementById("Result_pic").src="../DeptGuideGame/images/ending/"+this_ending.img_name;
document.getElementById("Result_name").innerHTML=this_ending.title;
function show_summary(){
  if(!detail_first){
    document.getElementById("Detail").style.display="none";
  }
  if(!menu_first){
    document.getElementById("main").style.display="none";
    document.getElementById("end").style.display="none";
  }
  if(!summary_first){
    document.getElementById("Result_name").style.display="block";
    document.getElementById("Result_pic").style.display="block";
  }
}
function show_detail(){
  if(!summary_first){
    document.getElementById("Result_pic").style.display="none";
    document.getElementById("Result_name").style.display="none";
  }
  if(!menu_first){
    document.getElementById("main").style.display="none";
    document.getElementById("end").style.display="none";
  }
  if(detail_first){
    var Details=document.createElement('div');
    Details.id="Detail";
    Details.style="position:absolute; left:80px; top:225px; width:1745px; height:670px; background-color:white; border:1px solid black; font-size:70px; font-family: a옛날목욕탕L,맑은 고딕;";
    Details.appendChild(document.createTextNode(this_ending.description));
    Details.appendChild(document.createElement("br"));
    Details.appendChild(document.createElement("br"));
    var dept="화학";
    Details.appendChild(document.createTextNode("당신은 "+dept+"과를 선택하였습니다."));
    Details.appendChild(document.createElement("br"));
    var lectures=Array();
    var lecture1="객체";
    var lecture2="지옥";
    var lecture3="되라";
    lectures.push(lecture1);
    lectures.push(lecture2);
    lectures.push(lecture3);
    Details.appendChild(document.createTextNode("그리고 "+lectures+"를 수강하였습니다."));
    Details.appendChild(document.createElement("br"));
    Details.appendChild(document.createTextNode("그 결과, "+this_ending.title+"을 얻었습니다."));
    document.getElementById("Ending_menu").appendChild(Details);
    detail_first=false;
  }
  else{
    document.getElementById("Detail").style.display="block";
  }
}
function show_menu(){
  if(!summary_first){
    document.getElementById("Result_pic").style.display="none";
    document.getElementById("Result_name").style.display="none";
  }
  if(!detail_first){
    document.getElementById("Detail").style.display="none";
  }
  if(menu_first){
    var main_menu=document.createElement('div');
    main_menu.id="main";
    main_menu.className="end_button";
    main_menu.style="left: 750px; width:600px; top:375px;";
    main_menu.innerHTML="메인 메뉴로!";
    main_menu.onclick=function(){
      window.location.reload();
    }
    document.getElementById("Ending_menu").appendChild(main_menu);
    var end_program=document.createElement('div');
    end_program.id="end";
    end_program.className="end_button";
    end_program.style="left: 750px; width:600px; top: 575px;";
    end_program.innerHTML="프로그램 종료!";
    end_program.onclick=function(){
      window.close();
    }
    document.getElementById("Ending_menu").appendChild(end_program);
    menu_first=false;
  }
  else{
    document.getElementById("main").style.display="block";
    document.getElementById("end").style.display="block";
  }
}