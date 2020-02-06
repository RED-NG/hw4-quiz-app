var questions = [
  {
    question: "2+2 is...",
    choices: ["1", "2", "3", "4"],
    answer: "4"
  },
  {
    question: "2+3 is...",
    choices: ["2", "10", "9", "5"],
    answer: "5"
  },
  {
    question: "2+4 is...",
    choices: ["7", "6", "3", "5"],
    answer: "6"
  },
  {
    question: "2+5 is...",
    choices: ["25", "6", "7", "5"],
    answer: "7"
  }
];

var startBtn = document.querySelector("#startBtn");
var btn1 = document.querySelector("#choice1");
var btn2 = document.querySelector("#choice2");
var btn3 = document.querySelector("#choice3");
var btn4 = document.querySelector("#choice4");
var allBtns = document.querySelectorAll(".btn");
var parentOfChoices = document.querySelector("#choices");
var questionTitle = document.querySelector("#questionTitle");
var answeredResult = document.querySelector("#result");
var questionWrapper = document.querySelector("#questionWrap");
var timerDiv = document.querySelector(".clearTime");
var endGameScreen = document.querySelector("#endScreen");
var finalScore = document.querySelector("#playerScore");
var timerValue = document.querySelector("#timer");
var resultDiv = document.querySelector("#result");
var questionIndex = 0;
var choicesIndex = 0;
var answerIndex = 0;
var counter = 75;
var timer;

//hide elements and divs not necessary during start screen
$("#endScreen").hide();
$("#timer").hide();
$("#questionWrap").hide();
$("#result").hide();

//quiz start on start button click
startBtn.addEventListener("click", startGame);

function startGame() {
  // console.log("Hello world");
  this.style.display = "none";
  $("#highScores").hide();
  $("#disclaimer").hide();
  $("#timer").show();
  $("#questionWrap").show();
  setTime();
  newQuestion();
  newChoices();
}

//questions and choice buttons populate screen
function newQuestion() {
  if (questionIndex < questions.length) {
    questionTitle.innerHTML = questions[questionIndex].question;
    questionIndex++;
  } else {
    endGame();
  }
}

function newChoices() {
  if (choicesIndex < questions.length) {
    btn1.innerHTML = questions[choicesIndex].choices[0];
    btn2.innerHTML = questions[choicesIndex].choices[1];
    btn3.innerHTML = questions[choicesIndex].choices[2];
    btn4.innerHTML = questions[choicesIndex].choices[3];
    choicesIndex++;
  } else {
    endGame();
  }
}

//what happens when all questions have been answered or timer runs out
function endGame() {
  if (questionIndex === questions.length) {
    timeOut();
  }
}

//clicked multiple choice buttons generate new question and choices
parentOfChoices.addEventListener("click", clickedChoices, false);

function clickedChoices(e) {
  if (e.target !== e.currentTarget) {
    // var clickedItem = e.target.id;
    // console.log(clickedItem);
    // console.log(e.currentTarget);
    newChoices();
    newQuestion();
  }
  e.stopPropagation();
}

parentOfChoices.addEventListener("click", answerResult);
console.log(questions[questionIndex].answer);

//handle user answer and result and subtract 15 seconds from counter if wrong
function answerResult(event) {
  var choiceResult = event.target.firstChild.textContent;
  console.log(choiceResult);

  if (choiceResult === questions[answerIndex].answer) {
    resultDiv.innerHTML = "";
    console.log("correct!");
    setTimeout(function() {
      $("#result").show();
      var ansResult = document.createElement("p");
      ansResult.textContent = "Correct!";
      resultDiv.append(ansResult);
    }, 100);
  } else {
    resultDiv.innerHTML = "";
    console.log("WRONG!");
    counter -= 15;
    $("#result").show();
    var ansResult = document.createElement("p");
    ansResult.textContent =
      "WRONG! 15 seconds have been deducted from your timer.";
    resultDiv.append(ansResult);
  }
}
answerIndex++;

allBtns[0].addEventListener("click", function() {
  console.log(allBtns[0].innerHTML);
});

//timer ticking
function setTime() {
  timer = setInterval(function() {
    if (counter !== 0) {
      counter--;
      $("#timer").text(counter);
    }
    if (counter === 0) {
      timeOut();
    }
  }, 1000);
}

//function to handle timer timeout
function timeOut() {
  resultDiv.remove();
  clearTimeout(timer);
  questionWrapper.style.display = "none";
  timerDiv.style.display = "none";
  endGameScreen.style.display = "block";
  finalScore.innerHTML = "Your final score is: " + timerValue.innerHTML;
}

// record user's result
