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
var choices = document.querySelector(".btnChoice");
var btn1 = document.querySelector("#choice1");
var btn2 = document.querySelector("#choice2");
var btn3 = document.querySelector("#choice3");
var btn4 = document.querySelector("#choice4");
var questionTitle = document.querySelector("#questionTitle");
var questionIndex = 0;
var choicesIndex = 0;
var counter = 45;
var timer;

$("#endScreen").hide();
$("#timer").hide();
$("#questionWrap").hide();

//quiz start on start button click
startBtn.addEventListener("click", startGame);

function startGame() {
  // console.log("Hello world");
  this.style.display = "none";
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
  }
}

function newChoices() {
  if (choicesIndex < questions.length) {
    btn1.innerHTML = questions[questionIndex].choices[0];
    btn2.innerHTML = questions[questionIndex].choices[1];
    btn3.innerHTML = questions[questionIndex].choices[2];
    btn4.innerHTML = questions[questionIndex].choices[3];
    choicesIndex++;
  }
}

console.log(questions[questionIndex].question);

for (var i = 0; i < choices.length; i++) {
  choices[i].addEventListener("click", function() {
    if (choices[0].innerHTML === questions[0].answer) {
    } else {
    }
    newQuestion();
  });
}

//timer ticking
function setTime() {
  timer = setInterval(function() {
    if (counter > 0) {
      counter--;
      $("#timer").text(counter);
    }
  }, 1000);
}

//handle user answer
// if (selectedAnswer == currentQuestion.answer) {
//   answerResponse = "correct";
// }

//end quiz
// endBtn.addEventListener("click", endQuiz);

// function endQuiz() {
//   $("#endScreen").show();
// }

//record and show score
