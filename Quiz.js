const questions = [
    {
        question : "Which of the following is the binary representation of 4 5/8? ",
        answers:[
            {text:"110.101",correct:false},
            {text:"100.101",correct:true},
            {text:"10.011",correct:false},
            {text:"100.11",correct:false}
        ]
    },
    {
        question : "A segment of a track in a mass storage system ",
        answers:[
            {text:"Pixel",correct:false},
            {text:"Address",correct:false},
            {text:"Sector",correct:true},
            {text:"Flip-Flop",correct:false}
        ]
    },
    {
        question : "A numeric value used to identify a memory cell ",
        answers:[
            {text:"Hexadecimal Notation",correct:false},
            {text:"Boolean Operation",correct:false},
            {text:"Bit",correct:false},
            {text:"Address",correct:true}
        ]
    },
    {
        question : "A means of encoding text in which each symbol is represented by 16 bits",
        answers:[
            {text:"ISO",correct:false},
            {text:"ASCII",correct:false},
            {text:"Unicode",correct:true},
            {text:"LZW",correct:false}
        ]
    },
    {
        question : "Which of the following storage systems is best suited for storing and retrieving long strings of data that are processed in their sequential order?",
        answers:[
            {text:"Magnetic Disk",correct:true},
            {text:"Main Memory",correct:false},
            {text:"Optical CDs and DVDs",correct:false},
            {text:"Pen Drive",correct:false}
        ]
    },
    {
        question : "Which of the following bit patterns (represented in hexadecimal notation) represents a negative number in two's complement notation? ",
        answers:[
            {text:"55",correct:false},
            {text:"7F",correct:false},
            {text:"A6",correct:true},
            {text:"08",correct:false}
        ]
    },
    {
        question : "A digital circuit capable of holding a single digit",
        answers:[
            {text:"Pixel",correct:false},
            {text:"Bit",correct:false},
            {text:"Key Field",correct:false},
            {text:"Flip Flop",correct:true}
        ]
    },
    {
        question : "A major standardization organization within the United States",
        answers:[
            {text:"LZW",correct:false},
            {text:"ISO",correct:false},
            {text:"ANSI",correct:true},
            {text:"ASCII",correct:false}
        ]
    },
    {
        question : "Which of the following bit patterns represents the value 5 in two's complement notation?",
        answers:[
            {text:"11111011",correct:false},
            {text:"00000101",correct:true},
            {text:"11110011",correct:false},
            {text:"00011010",correct:false}
        ]
    },
    {
        question : "A means of compressing images by blurring the boundaries between different colors while maintaining all brightness information",
        answers:[
            {text:"JPEG",correct:true},
            {text:"LZW",correct:false},
            {text:"MIDI",correct:false},
            {text:"GIF",correct:false}
        ]
    },
    {
        question : "________ is used to communicate from one city to another.",
        answers:[
            {text:"WAN",correct:true},
            {text:"LAN",correct:false},
            {text:"MAN",correct:false},
            {text:"All of the above",correct:false}
        ]
    },
    {
        question : "Early speedometers are an example of ____________ computers.",
        answers:[
            {text:"Hybrid",correct:false},
            {text:"Digital",correct:false},
            {text:"Analog",correct:true},
            {text:"None of the above",correct:false}
        ]
    },
    {
        question : "Every number system has a base, which is called __________.",
        answers:[
            {text:"Index",correct:false},
            {text:"Subscript",correct:false},
            {text:"Radix",correct:true},
            {text:"None of the above",correct:false}
        ]
    },
    {
        question : "Vacuum tubes were used in ___________________generation.",
        answers:[
            {text:"First",correct:true},
            {text:"Third",correct:false},
            {text:"Fourth",correct:false},
            {text:"Second",correct:false}
        ]
    },
    {
        question : "In computer programming, the algorithm used to order data in a particular sequence",
        answers:[
            {text:"Sort",correct:true},
            {text:"Order",correct:false},
            {text:"Sequence",correct:false},
            {text:"Variable",correct:false}
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;


function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "NEXT";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ") " + currentQuestion.question;
    
    
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    })
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}


function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score += 1;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!<br><br><hr><br>Your percentage is ${((score/questions.length)*100).toFixed(2)}%`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}


nextButton.addEventListener("click",() => {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
});


startQuiz();


