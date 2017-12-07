var summary_first = true;
var detail_first = true;
var menu_first = true;
var ending_name="huh";
function show_summary(){
  if(!detail_first){
    document.getElementById("Detail").style.display="none";
  }
  if(!menu_first){
    document.getElementById("main").style.display="none";
    document.getElementById("end").style.display="none";
  }
  if(summary_first){
    var result_pic=document.createElement('img');
    result_pic.id="Result_pic";
    result_pic.style="position:absolute; left:370px; top:230px; width:1186; height:670px;"
    result_pic.src="../DeptGuideGame/images/"+ending_name+".png";
    document.getElementById("Ending_menu").appendChild(result_pic);
    summary_first=false;
  }
  else{
    document.getElementById("Result_pic").style.display="block";
  }
}
function show_detail(){
  if(!summary_first){
    document.getElementById("Result_pic").style.display="none";
  }
  if(!menu_first){
    document.getElementById("main").style.display="none";
    document.getElementById("end").style.display="none";
  }
  if(detail_first){
    var Details=document.createElement('div');
    Details.id="Detail";
    Details.style="position:absolute; left:80px; top:225px; width:1745px; height:670px; background-color:white; border:1px solid black; font-size:70px; font-family: a옛날목욕탕L,맑은 고딕;";
    Details.appendChild(document.createTextNode("16주 동안의 한 학기, 참 즐거웠었죠?"));
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
    Details.appendChild(document.createTextNode("그 결과, "+ending_name+"을 얻었습니다."));
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
