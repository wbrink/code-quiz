var startButton = document.querySelector("#start"); // button on start screen that starts quiz
var timerSpan = document.querySelector("#timer");
var scoreSpan = document.querySelector(".score");

var questionHeading = document.querySelector("#question");
var answerList = document.querySelector("#answers")

// main sections of page
var startSection = document.querySelector("#start-section");
var questionSection = document.querySelector("#question-section");
var scoreSection = document.querySelector("#score-section");
var leaderboardSection = document.querySelector("#leaderboard-section");


var questionCounter = 0;
var right = 0;
var wrong = 0;

var interval;
var time = 5;
var score = 70;



//array of question objects
var questionsArray = [
  {
    question: "Commonly used data types DO NOT include:",
    choices: ["strings", "booleans", "alerts", "numbers"],
    answer: "alerts"
  },
  {
    question: "The condition in an if / else statement is enclosed within ____.",
    choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
    answer: "parentheses"
  },
  {
    question: "String vlaues must be enclosed within _____ when being assigned to variables.",
    choices: ["commas", "curly braces", "quotes", "parentheses"],
    answer: "quotes"
  },
  {
    question: "A very useful tool used during development and debugging for printing content to the debugger is:",
    choices: ["JavaScript", "terminal/bash", "for loops", "console.log"],
    answer: "console.log"
  }
]

// start button listener
startButton.addEventListener("click", (e) => {
  startSection.classList.add("hidden"); // hide current section
  questionSection.classList.remove("hidden"); // show #question-section

  timerSpan.textContent = time;

  startTimer();
});


function startTimer() {
  startGame(); // start the questions
  interval = setInterval(function() {
    // if times up: cleanup and show scoresection with score
    if (time === 0) {
      console.log("times up")
      clearInterval(interval); 
      // show scoresection
      questionSection.classList.add("hidden");
      scoreSection.classList.remove("hidden");
      scoreSpan.textContent = score;
      return;
    }
    // 
    time--;
    timerSpan.textContent = time;
  }, 1000); // every second;
} //end timer


// shows first question
function startGame() {
  question = 0; 
  questionHeading.textContent = questionsArray[0].question;
  
  for (var i = 0; i < questionsArray[0].choices.length; i++) {
    var li = document.createElement("li");
    li.id = i;
    li.textContent = questionsArray[0].choices[i];
    answerList.append(li);
  }

}

function randomizeQuestionsAnswers() {
  // randomizes order of questions and answers in questionsArray
}


function answerClick(event) {
  // add to score then go move to next question
}

answerList.addEventListener("click", answerClick);



