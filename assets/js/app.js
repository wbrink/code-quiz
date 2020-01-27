// DOM variables
var startButton = document.querySelector("#start"); // button on start screen that starts quiz
var timerSpan = document.querySelector("#timer");
var scoreSpan = document.querySelector(".score");

var questionHeading = document.querySelector("#question");
var answerList = document.querySelector("#answers");
var answerResult = document.querySelector("#answer-result");

var initialsForm = document.querySelector("#initials-form");
var initialsInput = document.querySelector("#initials");

// main sections of page
var startSection = document.querySelector("#start-section");
var questionSection = document.querySelector("#question-section");
var scoreSection = document.querySelector("#score-section");
var leaderboardSection = document.querySelector("#leaderboard-section");
var leaderList = document.querySelector(".leader-list");
var clearLeadersButton = document.querySelector("#clear-leaderboard");
var goBackButton = document.querySelector("#go-back");

// app variables
var questionCounter = 0;
var right = 0; // answered correctly
var wrong = 0; // answered incorrectly

var interval;
var perQuestionInterval;
var time = 75; //in seconds
var playerScore = 0;

//variable to tell how much time it took to answer question
var perQuestionTimer = 15;

var leaderboard;

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
  },
  {
    question: "What is the name of a function parameter that takes a function",
    choices: ["callback", "anonymous", "event handler", "alert"],
    answer: "callback"
  }
];

// start button listener
startButton.addEventListener("click", e => {
  //handle leaderboard
  leaderboard = JSON.parse(localStorage.getItem("leaderboard"));

  if (leaderboard) {
    sortLeaderboard();
  } else {
    leaderboard = [];
  }

  randomizeQuestionsAnswers(); // shuffle quesitons array
  startSection.classList.add("hidden"); // hide current section
  questionSection.classList.remove("hidden"); // show #question-section

  timerSpan.textContent = time;

  startTimer();
});

// starts the game clock
function startTimer() {
  questionCounter = 0;
  renderQuestion(questionCounter); // start the questions
  interval = setInterval(function() {
    // if times up: cleanup and show scoresection with score
    if (time <= 0) {
      timerSpan.textContent = 0;
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
  scoreSpan.textContent = playerScore;
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
  }

  perQuestionTimer = 15;
  // interval timer to tell how long to answer single question
  perQuestionInterval = setInterval(function() {
    if (perQuestionTimer == 0) {
      clearInterval(perQuestionInterval);
      console.log("here");
    }
    perQuestionTimer--;
    console.log(perQuestionTimer);
  }, 1000);
}

// removes choices that were generated for question
function removeList() {
  // undefined if is falsy
  while (answerList.lastChild) {
    answerList.removeChild(answerList.lastChild);
  }
}

// randomizes the questionsArray
function randomizeQuestionsAnswers() {
  // randomizes order of questions and answers in questionsArray
  questionsArray.sort(function(a, b) {
    return 0.5 - Math.random();
  });
  // randomly sort choices array for each question
  for (var i = 0; i < questionsArray.length; i++) {
    questionsArray[i].choices.sort(function(a, b) {
      return 0.5 - Math.random();
    });
  }
}

// call back for when question answer choice is clicked
function answerClick(event) {
  clearInterval(perQuestionInterval);
  var elem = event.target;
  if (elem.matches("li")) {
    if (elem.textContent === questionsArray[questionCounter].answer) {
      answerResult.textContent = "Correct!";
      if (perQuestionTimer >= 5) {
        playerScore += 20; // 20 points for answering correct within 10 seconds
      } else {
        playerScore += 5; // 5 points for answering correct but taking longer than 10 seconds
      }
    } else {
      // write incorrect and move on
      time = time - 15;
      answerResult.textContent = "Wrong";
    }
    questionCounter++;
    removeList();
    renderQuestion(questionCounter);
  }
}

answerList.addEventListener("click", answerClick); // click on choice for question section

initialsForm.addEventListener("submit", e => {
  e.preventDefault(); // don't want reload
  var playerName = initialsInput.value;
  if (!playerName) {
    return;
  }

  if (leaderboard.length < 50) {
    leaderboard.push({ name: playerName, score: playerScore });
    console.log("added");
  } else {
    if (playerScore > parseInt(leaderboard[leaderboard.length - 1].score)) {
      leaderboard.pop();
      leaderboard.push({ name: playerName, score: playerScore });
      console.log("added");
    }
  }
  sortLeaderboard();

  localStorage.setItem("leaderboard", JSON.stringify(leaderboard)); // set it in local storage

  scoreSection.classList.add("hidden");
  leaderboardSection.classList.remove("hidden");
  renderLeaderboard();
});

function renderLeaderboard() {
  time = 30;
  for (var i = 0; i < leaderboard.length; i++) {
    var li = document.createElement("li");
    li.setAttribute("data-index", i);
    li.textContent = leaderboard[i].name;
    var span = document.createElement("span");
    span.textContent = leaderboard[i].score;
    li.append(span);
    leaderList.append(li);
  }

  console.log(leaderboard);
}

// has to be sorted in descending order
function sortLeaderboard() {
  leaderboard.sort((a, b) => {
    if (a.score < b.score) {
      return 1;
    }
    if (a.score > b.score) {
      return -1;
    }
    return 0;
  });
}

clearLeadersButton.addEventListener("click", e => {
  localStorage.removeItem("leaderboard");
  // console.log("leaderboard cleared");
  removeAllChildren(leaderList);
});

goBackButton.addEventListener("click", function(e) {
  leaderboardSection.classList.add("hidden");
  startSection.classList.remove("hidden");
});

function removeAllChildren(element) {
  while (element.lastChild) {
    element.removeChild(element.lastChild);
  }
}
