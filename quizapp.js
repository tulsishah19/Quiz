const container = document.querySelector('.container');
const questionBox = document.querySelector('.question');
const choicesBox = document.querySelector('.choices');
const nextBtn = document.querySelector('.nextBtn');
const scoreCard = document.querySelector('.scoreCard');
const alert = document.querySelector('.alert');
const startBtn = document.querySelector('.startBtn');
const timer = document.querySelector('.timer');


const quiz = [
    {
        question: "Which language runs in a web browser?",
        choices:["Java", "C", "Python", "javascript"],
        answer: "javascript"
    },
    {
        question: "What does CSS stand for?",
        choices:["Central Style Sheets", "Cascading Style Sheets", "Cascading Simple Sheets", "Cars SUVs Sailboats"],
        answer: "Cascading Style Sheets"
    },
    {
        question: "What does HTML stand for?",
        choices:["Hypertext Markup Language", "Hypertext Markdown Language", "Hyperloop Machine Language", "Helicopters Terminaals Motorboats Lamborginis"],
        answer: "Hypertext Markup Language"
    },
    {
        question: "What year was JavaScript launched?",
        choices:["1996", "1995", "1994", "none of the above"],
        answer: "1995"
    }

];
let currentQuestionIndex = 0;
let score = 0;
let quizOver = false;
let timeLeft = 15;
let timerID = null;
const showQuestions = () =>{
    const questionDetails = quiz[currentQuestionIndex];
    questionBox.textContent = questionDetails.question;
    choicesBox.textContent = "";
    for(let i=0; i<questionDetails.choices.length; i++){
        const currentChoice = questionDetails.choices[i];
        const choiceDiv = document.createElement('div');
        choiceDiv.textContent = currentChoice;
        choiceDiv.classList.add('choice');
        choicesBox.appendChild(choiceDiv);
        choiceDiv.addEventListener('click', ()=>{
            if(choiceDiv.classList.contains('selected')){
                choiceDiv.classList.remove('selected');
            }
            else{
                choiceDiv.classList.add('selected');
            }

        });
    }
    if(currentQuestionIndex < quiz.length){
        startTimer();
    }
    //console.log("questionDetails");
}
const checkAnswer = () => {
    const selectedChoice = document.querySelector('.choice.selected');
    if(selectedChoice.textContent === quiz[currentQuestionIndex].answer){
        //alert("Correct Answer!");
        displayAlert("Correct Answer");
        score++;
    }
    else{
        //alert("Wrong answer");
        displayAlert(`Wrong Answer! ${quiz[currentQuestionIndex].answer} is the Correct Answer`);
    }
    timeLeft = 15;
    currentQuestionIndex++;
    if(currentQuestionIndex < quiz.length){
        showQuestions();
    }
    else{
        showScore();
        stopTimer();
        //quizOver = true;
        //timer.style.display = "none";
        
    }
    //console.log(selectedChoice);

}
const showScore = () =>{
    questionBox.textContent = "";
    choicesBox.textContent = "";
    scoreCard.textContent = `You Scored ${score} out of ${quiz.length}!`;
    displayAlert("You have completed this quiz!");
    nextBtn.textContent = "Play Again";
    quizOver = true;
    timer.style.display = "none";
    //nextBtn.addEventListener('click', ()=>{
        //currentQuestionIndex = 0;
        //showQuestions();
        //nextBtn.textContent = "Next";
        //scoreCard.textContent = "";

    //});
}
const displayAlert = (msg) =>{
    alert.style.display = "block";
    alert.textContent = msg;
    setTimeout(()=>{
        alert.style.display = "none";

    }, 2000);
}
const startTimer = () => {
    clearInterval(timerID);
    timer.textContent = timeLeft;
    const countDown = ()=>{
    timeLeft--;
    timer.textContent = timeLeft;
    if(timeLeft === 0){
        const confirmUser = confirm("Time Up!!! Do you want to play the quiz again");
        if(confirmUser){
            timeLeft = 15;
            startQuiz();
        }
        else{
            startBtn.style.display = "block";
            container.style.display = "none";
            return;
        }

    }
    
    }
    timerID = setInterval(countDown, 1000);
}
const stopTimer = () =>{
    clearInterval(timerID);

}
/*const shuffleQuestions = () =>{
    for(let i=quiz.length-1; i>0; i--){
        const j = Math.floor(Math.random() * i+1);
        [quiz[i], quiz[j]] = [quiz[j], quiz[i]];
    }
    currentQuestionIndex = 0;
    showQuestions();
}*/
const startQuiz = () =>{
    timeLeft = 15;
    timer.style.display = "flex";
    showQuestions();
   

}


startBtn.addEventListener('click', ()=>{
    startBtn.style.display = "none";
    container.style.display = "block";
    startQuiz();
    //showQuestions();

});
//showQuestions();
nextBtn.addEventListener('click', ()=>{
    const selectedChoice = document.querySelector('.choice.selected');
    if(!selectedChoice && nextBtn.textContent === "Next"){
        //alert("Select your answer");
        displayAlert("Select your answer");
        return;
    }
    if(quizOver){
        //currentQuestionIndex = 0;
        nextBtn.textContent = "Next";
        scoreCard.textContent = "";
        currentQuestionIndex = 0;
        quizOver = false;
        score = 0;
        startQuiz();

    }
    else{
        checkAnswer();
    }
});