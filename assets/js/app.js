var startButton = document.querySelector("#start"); // button on start screen that starts quiz
var timerSpan = document.querySelector("#timer");
var scoreSpan = document.querySelector(".score");

var questionHeading = document.querySelector("#question");
var answerList = document.querySelector("#answers")
var answerResult = document.querySelector("#answer-result");

// main sections of page
var startSection = document.querySelector("#start-section");
var questionSection = document.querySelector("#question-section");
var scoreSection = document.querySelector("#score-section");
var leaderboardSection = document.querySelector("#leaderboard-section");


var questionCounter = 0;
var right = 0;
var wrong = 0;

var interval;
var time = 30;
var score = 70;


//array of objects for questions
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
  randomizeQuestionsAnswers(); // shuffle quesitons array
  startSection.classList.add("hidden"); // hide current section
  questionSection.classList.remove("hidden"); // show #question-section

  timerSpan.textContent = time;

  startTimer();
});


function startTimer() {
  questionCounter = 0;
  renderQuestion(questionCounter); // start the questions
  interval = setInterval(function() {
    // if times up: cleanup and show scoresection with score
    if (time === 0) {
      renderScore();
      return;
    }
    
    time--;
    timerSpan.textContent = time;
  }, 1000); // every second;
} //end timer


// renders score section
function renderScore() {
  clearInterval(interval); // stop timer
  questionSection.classList.add("hidden");
  scoreSection.classList.remove("hidden");
  scoreSpan.textContent = `Right: ${right}    Wrong: ${wrong} `;

}


// renders question and choices takes in index 
function renderQuestion(index) { 
  // if quiz is completed
  if (questionCounter === questionsArray.length) {
    renderScore();
    return;
  } else {
    questionHeading.textContent = questionsArray[index].question;
  
    for (var i = 0; i < questionsArray[index].choices.length; i++) {
      var li = document.createElement("li");
      li.id = i;
      li.textContent = questionsArray[index].choices[i];
      answerList.append(li);
    }
  } // end else
} // end renderQuestion()


// removes choices that were generated for question
function removeList() {
  // undefined if is falsy
  while (answerList.lastChild) {
    answerList.removeChild(answerList.lastChild);
  }
  console.log("removed children");
}


// randomizes the questionsArray 
function randomizeQuestionsAnswers() {
  // randomizes order of questions and answers in questionsArray
  questionsArray.sort(function(a,b) {return 0.5 - Math.random()});
  // randomly sort choices array for each question
  for (var i = 0; i < questionsArray.length; i++) {
    questionsArray[i].choices.sort(function(a,b) {return 0.5 - Math.random()});
  }
}


function answerClick(event) {
  var elem = event.target;
  if (elem.matches("li")) {
    if (elem.textContent === questionsArray[questionCounter].answer) {
      answerResult.textContent = "Correct!"
      right++;
    } else {
      // write incorrect and move on
      answerResult.textContent = "Wrong";
      wrong++;
    }
    questionCounter++;
    removeList();
    renderQuestion(questionCounter);
  }
}

answerList.addEventListener("click", answerClick);



