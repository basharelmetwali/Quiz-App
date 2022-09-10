//select Elements
let conutQuestions=document.querySelector(".countQuestions")
let Bullets=document.querySelector(".bullets")      
let questionsHeadcontainer=document.querySelector(".questionHead")
let answerCont=document.querySelectorAll(".answer")
let SubmitButton=document.querySelector(".submit")
let currentQuestions=0;
let rightanswers=0;



//function of get Questions from json file
function getQuest(){
    let myrequest=new XMLHttpRequest();
    myrequest.onreadystatechange=function(){
        if(myrequest.status==200 && myrequest.readyState==4){
     let questions=JSON.parse(myrequest.responseText)
conutQuestions.innerHTML=questions.length;
makeBullets(parseInt(conutQuestions.innerHTML))
makeQuestion(questions[currentQuestions])
    //on click submit
SubmitButton.onclick=function(){
//if the questions end
    if(currentQuestions+1==conutQuestions.innerHTML){
  //remove submit button
   SubmitButton.remove();
   //remove questions space
   document.querySelector(".quesionContent").remove();
   document.querySelector(".quizheader").remove();
   document.querySelector(".bullets").remove();
   getData()
   
   editbullet(conutQuestions.innerHTML)

    }
    else{
checkranswer(questions[currentQuestions])
currentQuestions++;
answerCont.forEach((answer)=>{
    answer.innerHTML="";
})
questionsHeadcontainer.innerHTML=""
editbullet(currentQuestions)

makeQuestion(questions[currentQuestions],conutQuestions.innerHTML)
    }
}
    }

    }









    myrequest.open("GET","../file.json",true)
    myrequest.send()
}

function makeBullets(num){
    for(let i=0;i<num;i++){
 let bullet=document.createElement("span")
 if(i==0){
 }
  Bullets.appendChild(bullet);  

    }
 


}


function makeQuestion(que){
    let questionHead=document.createElement("h1");
    let headText=document.createTextNode(que.title);
    questionHead.appendChild(headText)
    questionsHeadcontainer.appendChild(questionHead)

    //Add Answers
    for(let i=0;i<4;i++){
        //create radio input
        let radioinput=document.createElement("input")
        //set type
        radioinput.type="radio"
        radioinput.id=`answer_${i+1}`
        radioinput.dataset.answer=que[`answer_${i+1}`]
        radioinput.name="quest"
        //make label
        let labelanswer=document.createElement("label")
        let labelText=document.createTextNode(que[`answer_${i+1}`])
        labelanswer.appendChild(labelText)
        labelanswer.htmlFor=`answer_${i+1}`
        answerCont[i].appendChild(radioinput)
        answerCont[i].appendChild(labelanswer)
    }


}


function checkranswer(ranswer){
    let check=document.getElementsByName("quest")
    let choosenanswer;
   for(let i=0;i<4;i++){
    if(check[i].checked){
   choosenanswer=check[i];
    }
   }
   if(choosenanswer.dataset.answer==ranswer["right_answer"]){
    rightanswers++
    console.log(rightanswers)
   }
}
//edit bullets on click submit
function editbullet(numofbullets){
    for(let i=0;i<numofbullets;i++){
   document.querySelectorAll(".bullets span")[i].style.backgroundColor="blue";
    }

}
function getData(){
    let data=document.createElement("div")
    data.className="data";
    if(rightanswers<2){
        data.innerHTML="bad answers!";
        data.style.color="red"
    }
       else if(rightanswers>=2 &&rightanswers<5){
        data.innerHTML="Good answers!";
        data.style.color="#d3d34b"
    }
    else if(rightanswers>=5 && rightanswers<7){
                data.innerHTML="very good answers!";
        data.style.color="green";
    }
    else{
                data.innerHTML="Prefect answers!";
        data.style.color="#2196f3";
    }
    document.querySelector(".Quiz").prepend(data)
}


getQuest()
