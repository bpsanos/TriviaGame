$(document).ready(function(){

  // start the game when user clicks on Start button
  $("#start-button").on("click", gameState.startTimer);

});

// information about the state of game play
var gameState = {

  // set the time at 60 seconds, and count down by 1 second
  timeRemaining : 60,

  // start the timer, hide the start page, show the questions
  startTimer: function() {
    $("#timer").text("Time remaining: " + gameState.timeRemaining);
    setInterval(gameState.countdown, 1000);
    $("#start-page").hide();
    trivia.displayQuestions();
  },

  // decrement the timer and update the UI; stop the timer at 0
  countdown: function() {
    gameState.timeRemaining--;
    $("#timer").text("Time remaining: " + gameState.timeRemaining);
    if (gameState.timeRemaining === 0) {
      gameState.stopTimer();
      $("#timer").empty();
    }
  },

  // stop the timer and check the answers
  stopTimer: function() {
    clearInterval();
    trivia.checkAnswers();
  },

  // hide the quetions and display the end page with results
  showEndPage: function(numCorrect, numIncorrect, numUnanswered) {
    $("#end-page").show();
    $("#questions-box").empty();
    $("#timer").empty();
    $("#timer").hide();
    $("#correct-answers").text("Correct answers (YAY!): " + numCorrect);
    $("#incorrect-answers").text("Incorrect answers (Nope!): " + numIncorrect);
    $("#unanswered").text("Skipped questions (Meh): " + numUnanswered);
  }
}

// functions to handle the building questions page and scoring
var trivia = {

  // pull questions from the array of questions, loop through them, and append to UI
  displayQuestions: function() {
    var divContainer = $("#questions-box");
    var answerGroup = $(".form-check");
    divContainer.append('<h2>Answer the following questions:</h2>');
            
    for (var i = 0; i < questionBank.length; i++) {

      divContainer.append('<div id="question">' + questionBank[i].question + '</div>');

      var answer1 = questionBank[i].answers[0];
      var answer2 = questionBank[i].answers[1];
      var answer3 = questionBank[i].answers[2];

      divContainer.append('<div class="form-check"><input class="form-check-input" type="radio" name="radio-group'+i+'" id="radio'+i+'"><label class="form-check-label" id="radio'+i+'label" for="radio'+i+'">' + answer1 + '</label></div>');
      divContainer.append('<div class="form-check"><input class="form-check-input" type="radio" name="radio-group'+i+'" id="radio'+i+'"><label class="form-check-label" id="radio'+i+'label" for="radio'+i+'">' + answer2 + '</label></div>');
      divContainer.append('<div class="form-check"><input class="form-check-input" type="radio" name="radio-group'+i+'" id="radio'+i+'"><label class="form-check-label" id="radio'+i+'label" for="radio'+i+'">' + answer3 + '</label></div>');
    }

    // add a Done button to the end of the page and register its click handler
    var doneButton = '<button class="btn btn-primary" id="done-button" type="submit">Done</button>';
    divContainer.append(doneButton);
    $("#done-button").on("click", gameState.stopTimer);
  },

  // test if the user answers are correct, incorrect, or if there are unanswered questions
  checkAnswers: function() {
    var correctAnswer;
    var userAnswer;
    var numCorrect = 0;
    var numIncorrect = 0;
    var numUnanswered = 0;

    // loop through to compare the text of the label with the user answers
    // increment score counts appropriately
    for (var i = 0; i < questionBank.length; i++) {
      correctAnswer = questionBank[i].correct;
      userAnswer = $('input[id=radio'+i+']:checked + label').text();

      if (userAnswer === correctAnswer) {
        numCorrect++;
      } else if (userAnswer === "") {
        numUnanswered++;
      } else if (userAnswer !== correctAnswer) {
        {
          numIncorrect++;
        }
      }
    }

    // show the end page with the score tally
    gameState.showEndPage(numCorrect, numIncorrect, numUnanswered);
  },
}

// array of objects with the questions, possible answers, and the correct answer
var questionBank =
[
  {
    question: "How many hours a day do most cats spend sleeping?",
    answers: ["5-10 Hours", "13-16 Hours", "18-20 Hours"],
    correct: "13-16 Hours"
  },

  {
    question: "What is Spongebob's pet 'cat' named?",
    answers: ["Gary", "Gill", "Greg"],
    correct: "Gary"
  },
  {
    question: "What ancient society worshipped cats?",
    answers: ["The Argonians", "The Greeks", "The Egyptians"],
    correct: "The Egyptians"
  },
  {
    question: "IS cATs CuTe?",
    answers: ["Yes", "Yes", "Yes"],
    correct: "Yes"
  },
  {
    question: "A cat held office as mayor for 20 years in which state?",
    answers: ["Florida", "Idaho", "Alaska"],
    correct: "Alaska"
  },
  {
    question: "Who is tired of looking up cat facts?",
    answers: ["Me", "I am", "JK cats are amazing"],
    correct: "JK cats are amazing"
  },
  {
    question: "How fast can the average cat run?",
    answers: ["30 mph", "15 mph", "20 mph"],
    correct: "30 mph"
  },
  {
    question: "What did 'Nyan Cat' have for a body?",
    answers: ["Bagel", "Pizza", "Poptart"],
    correct: "Poptart"
  },
  {
    question: "What is NOT a real cat breed?",
    answers: ["Maine Coon", "Bengal", "Turk Vin"],
    correct: "Turk Vin"
  },
  {
    question: "How old was the oldest cat recorded?",
    answers: ["29", "38","40"],
    correct: "38"
  }
]