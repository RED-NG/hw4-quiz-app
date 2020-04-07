var questions = [
  {
    question: "2+2 is...",
    choices: ["1", "2", "3", "4"],
    answer: "4",
  },
  {
    question: "2+3 is...",
    choices: ["2", "10", "9", "5"],
    answer: "5",
  },
  {
    question: "2+4 is...",
    choices: ["7", "6", "3", "5"],
    answer: "6",
  },
  {
    question: "2+5 is...",
    choices: ["25", "6", "7", "5"],
    answer: "7",
  },
];

const leaderboardArray = [
  { id: 1, name: "Philip", score: "75" },
  { id: 2, name: "Dicker", score: "34" },
  { id: 3, name: "Piper", score: "44" },
];
var startBtn = document.querySelector("#startBtn");
var btn1 = document.querySelector("#choice1");
var btn2 = document.querySelector("#choice2");
var btn3 = document.querySelector("#choice3");
var btn4 = document.querySelector("#choice4");
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
var submitBtn = document.querySelector("#endBtn");
var highScoreBtn = document.querySelector("#highScores");
var tryAgainBtn = document.querySelector("#tryAgainBtn");

//hide elements and divs not necessary during start screen
$("#endScreen").hide();
$("#timer").hide();
$("#questionWrap").hide();
$("#result").hide();
$(".scores-container").hide();

//quiz start on start button click
startBtn.addEventListener("click", startGame);

function startGame() {
  // console.log("Hello world");
  // this.style.display = "none";
  startBtn.style.display = "none";
  $("#highScores").hide();
  $("#disclaimer").hide();
  $("#timer").show();
  $("#questionWrap").show();
  setTime();
  newQuestion();
  newChoices();
  $(".scores-container").hide();
}

//questions and choice buttons populate screen
function newQuestion() {
  if (questionIndex < questions.length) {
    questionTitle.innerHTML = questions[questionIndex].question;
  } else {
    endGame();
  }
  questionIndex++;
}

function newChoices() {
  if (choicesIndex < questions.length) {
    btn1.innerHTML = questions[choicesIndex].choices[0];
    btn2.innerHTML = questions[choicesIndex].choices[1];
    btn3.innerHTML = questions[choicesIndex].choices[2];
    btn4.innerHTML = questions[choicesIndex].choices[3];
  } else {
    endGame();
  }
  choicesIndex++;
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
    newChoices();
    newQuestion();
  }
  e.stopPropagation();
}

parentOfChoices.addEventListener("click", answerResult);
console.log(questions[questionIndex].answer);

//handle user answer and result and subtract 15 seconds from counter if wrong
function answerResult(event) {
  var choiceResult = event.target.textContent;
  console.log(choiceResult);

  if (choiceResult === questions[answerIndex].answer) {
    resultDiv.innerHTML = "";
    console.log("correct!");
    setTimeout(function () {
      $("#result").show();
      var ansResult = document.createElement("p");
      ansResult.textContent = "Correct!";
      resultDiv.append(ansResult);
    });
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
  answerIndex++;
}

//timer ticking
function setTime() {
  timer = setInterval(function () {
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
  $(".scores-container").show();
}

//show high score list
highScoreBtn.addEventListener("click", function () {
  $(".scores-container").show();
  showLeaderboard();
});

//record user's result in localstorage and display on leaderboard
submitBtn.addEventListener("click", function () {
  var userScore = {
    id: leaderboardArray.length + 1,
    name: document.querySelector("#name").value,
    score: timerValue.innerHTML,
  };

  console.log(userScore);

  leaderboardArray.push(userScore);
  console.log(leaderboardArray);

  localStorage.setItem("leaderboard", userScore);

  // var scoreInput = localStorage.getItem("leaderboard");
  showLeaderboard();
});

function showLeaderboard() {
  // for (var i = 0; leaderboardArray.length > 0; i++) {
  // var tableBody = document.querySelector(".tableRow");
  // var tr = document.createElement("tr");
  // tr.classList.add("tableRow");
  // var thPosition = document.createElement("th");
  // thPosition.setAttribute("scope", "row");
  // thPosition.textContent = `${i + 4}`;
  // tableBody.append(thPosition);
  // var tdName = document.createElement("td");
  // tdName.classList.add("newRow");
  // tdName.innerHTML = `${leaderboardArray[i].name}`;
  // tableBody.append(tdName);
  // var tdScore = document.createElement("td");
  // tdScore.setAttribute("class", "tableRow");
  // tdScore.innerHTML = `${leaderboardArray[i].score}`;
  // tableBody.appendChild(tdScore);

  var table = $(".table");
  table.find("tbody tr").remove();
  leaderboardArray.forEach((leaderboardArray) => {
    let index = 1;
    table.append(
      "<tr><td>" +
        leaderboardArray.id +
        "</td><td>" +
        leaderboardArray.name +
        "</td><td>" +
        leaderboardArray.score +
        "</td></tr>"
    );
    index + 1;
  });
}

//restart the game
tryAgainBtn.addEventListener("click", function () {
  if (questionIndex !== 0) {
    questionIndex = 0;
  }
  if (choicesIndex !== 0) {
    choicesIndex = 0;
  }
  if (answerIndex !== 0) {
    answerIndex = 0;
  }
  if (counter !== 75) {
    counter = 75;
    timerValue = 75;
  }
  endGameScreen.style.display = "none";
  $(".clearTime").show();
  startGame();
});
