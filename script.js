//Global variables
var title = document.getElementById('title');
var questionSection = document.getElementById('questionSection');
var gameRule = document.getElementById('gameRule');
var optCount = document.getElementById('optCount');
var highscoreCont = document.getElementById('highscoreCont');
var highscoreBtns = document.getElementById('highscoreBtns');
var startBtn = document.getElementById('startBtn');
var submitCont = document.getElementById('submitCont');
var validationCont = document.getElementById('validationCont');
var secs = document.getElementById('seconds');
var currentIndex = 0;
var currentEl;
var score = 0;
var initials = '';
var secondsLeft = 60;
var timeInterval;

//Set Timer
function setTime() {
  timeInterval = setInterval(function () {
    secondsLeft--;
    secs.textContent = secondsLeft;

    //If the time is up it will stop showing the missing questions
    if (secondsLeft === 0) {
      clearInterval(timeInterval); //Stops the timer
      cleanArea();
      displaySubmit(); //Shows the missing initials input
      title.innerText = 'Good try!';

      return secondsLeft;
    }

  }, 1000);
}

//Data
var qunsArr = [
  {
    qn: 'Inside which HTML element do we put the JavaScript?',
    ans: {
      opt1: '<js>',
      opt2: '<javascript>',
      opt3: '<script>',
      opt4: '<scripting>'
    },
    correct: 'opt3',
  },
  {
    qn: 'What is the correct JavaScript syntax to change the content of the HTML element below? <p id="demo">This is a demonstration.</p>',
    ans: {
      opt1: '#demo.innerHTML = "Hello World!";',
      opt2: 'document.getElementById("demo").innerHTML = "Hello World!";',
      opt3: 'document.getElement("p").innerHTML = "Hello World!";',
      opt4: 'document.getElementByName("p").innerHTML = "Hello World!";'
    },
    correct: 'opt2',
  },
  {
    qn: 'Where is the correct place to insert a JavaScript?',
    ans: {
      opt1: 'The <head> section',
      opt2: 'The <body> section',
      opt3: 'Both the <head> section and the <body> section are correct',
      opt4: 'The <html> section'
    },
    correct: 'opt3',
  },
  {
    qn: 'What is the correct syntax for referring to an external script called "xxx.js"?',
    ans: {
      opt1: '<script src="xxx.js">',
      opt2: '<script href="xxx.js">',
      opt3: '<script name="xxx.js">',
      opt4: '<script alt="xxx.js">'
    },
    correct: 'opt1',
  },
  {
    qn: 'How do you create a fuction in JavaScript?',
    ans: {
      opt1: 'function = myFunction()',
      opt2: 'function myFunction()',
      opt3: 'function:myFunction();',
      opt4: 'function myFuntion());',
    },
    correct: 'opt2'
  }
];

// Clean the areas for the next views
function cleanArea() {
  //Clear parent questions div
  while (optCount.firstChild) {
    optCount.removeChild(optCount.firstChild);
  }

  //Clear parent result display
  while (validationCont.firstChild) {
    validationCont.removeChild(validationCont.firstChild);
  }
}

// If the answers are incorrect the timer change
function substractTime() {
  secondsLeft -= 5;
  secs.textContent = secondsLeft;
  clearInterval(timeInterval);
  setTime();
}

// Disabled buttons after the user click the answer
function blockBtns() {
  // Gets optCount children
  var allBtns = optCount.childNodes;

  // Sets new classes for each child
  allBtns.forEach((element, index) => {
    element.className = 'block bg-orange-600 text-white font-bold py-2 px-4 rounded-full opacity-50 cursor-not-allowed my-3 focus:outline-none';
  });
}

//Run the function after click
startBtn.addEventListener("click", function () {

  //Set timer first time
  if (currentIndex === 0) {
    //Call timer function
    setTime();
  }

  cleanArea();

  //Runs in the last question
  if (currentIndex === qunsArr.length) {
    clearInterval(timeInterval);
    displaySubmit();
    return;
  }

  //Reassignment the currentEl value according to the index's array
  currentEl = qunsArr[currentIndex];

  //Set variable with the current answer' object  and change the gameRule text
  var question = currentEl.qn;
 gameRule.innerText = question;

  //Set variable with the current answer' object
  var answers = currentEl.ans;

  //Loop the answers object and gets the options
  for (const opt in answers) {
    //Create elements
    var ansBtn = document.createElement('button');

    //Set attributes
    ansBtn.className = 'focus:outline-none bg-orange-600 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-full block text-left my-3';
    ansBtn.setAttribute('value', opt);

    //Change text
    ansBtn.innerText = answers[opt];
    startBtn.innerText = 'Next';

    //Append children
    optCount.appendChild(ansBtn);
  }

  //Increment current index +1
  currentIndex++;
});

//Validate answers
//if tha value is the sames as the correct answer it shows an icon and text
optCount.addEventListener('click', function (e) {

  blockBtns();

  if (e.target.value === currentEl.correct) {
    //Create elements
    var correctIcon = document.createElement('i');
    var correctText = document.createElement('span');

    //Set classes
    correctIcon.className = 'fas fa-check text-orange-600';
    correctText.className = 'text-orange-600';
    validationCont.className = 'my-5';
    optCount.className = 'disabled';

    //Change text
    correctText.innerText = ' Correct';

    //Append children
    validationCont.appendChild(correctIcon);
    validationCont.appendChild(correctText);

    //Increments score by one
    score++;
  } else { // if tha value is not the same as the correct answer it shows an icon and text
    //Time is subtracted from the clock when the answer is incorrect
    substractTime();

    //Create elements
    var incorrectIcon = document.createElement('i');
    var incorrectText = document.createElement('span');

    //Set classes
    incorrectIcon.className = 'fas fa-times text-orange-400';
    incorrectText.className = 'text-orange-600';
    validationCont.className = 'my-5';

    //Change text
    incorrectText.innerText = ' Wrong';

    //Append Children
    validationCont.appendChild(incorrectIcon);
    validationCont.appendChild(incorrectText);
  }
});

//Show submit view
function displaySubmit() {
  //Create elements
  var inputInitials = document.createElement('input');
  var submitBtn = document.createElement('button');

  //Set classes and attributes
  inputInitials.setAttribute('placeholder', 'Enter initials');
  inputInitials.setAttribute('required', 'true');
  inputInitials.className = 'w-2/3 lg:w-full bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block appearance-none leading-normal';
  submitBtn.className = 'focus:outline-none bg-orange-600 hover:bg-orange-4 text-white font-bold py-2 px-4 rounded-full block text-left';
  startBtn.className = 'hidden';
  submitCont.className = 'col-start-2 text-center mt-3';
  submitBtn.id = 'submitBtn';
 gameRule.className = 'text-left lg:text-center my-5';

  //Change text
  gameRule.innerText = 'Your final Score is: ' + score;
  title.innerText = 'All done!';
  submitBtn.innerText = 'Submit';

  //Append children
  questionSection.appendChild(inputInitials);
  submitCont.appendChild(submitBtn);

  //Gets input value
  inputInitials.addEventListener("keyup", function () {
    initials = inputInitials.value.toUpperCase();
  });

  //Shows Score views
  submitBtn.addEventListener("click", function () {
    //Call saveData function
    saveData();

    //Create elements
    var againBtn = document.createElement('button');
    var clearBtn = document.createElement('button');

    //Change text
    title.innerText = 'Highscores';
    againBtn.innerText = 'Try again';

    //Set classes
    clearBtn.className = 'focus:outline-none bg-transparent hover:bg-orange-500 text-orange-400 font-semibold hover:text-white p-2 border border-orange-400 hover:border-transparent rounded-full my-3 ml-3';
    againBtn.className = 'focus:outline-none bg-orange-400 hover:bg-orange-600 text-white font-bold p-2 rounded-full text-left my-3';
    submitBtn.className = 'hidden';

    //Append children
    highscoreBtns.appendChild(againBtn);
    highscoreBtns.appendChild(clearBtn);

    //Gets players array and parse into a JSON
    var playersArr = JSON.parse(localStorage.getItem('players'));

    //Create an element per each player
    playersArr.forEach(player => {
      //Create elements
      var highscoreDiv = document.createElement('div');
      var namePharagraph = document.createElement('span');
      var scoreParagraph = document.createElement('span');

      //Set classes and attributes
      highscoreDiv.className = 'bg-orange-400 border-l-4 border-orange-600 text-orange-100 p-4 mb-3 text-left w-2/3 lg:w-full';
      namePharagraph.className = 'font-bold mr-5';
      inputInitials.className = 'hidden';
      submitCont.className = 'col-start-2 flex mt-8 mx-auto';
     gameRule.className = 'text-left lg:text-center my-5';

      //Change text
      namePharagraph.innerText = player.initials;
      scoreParagraph.innerText = player.score;
      clearBtn.innerText = 'Clear Scores';
    gameRule.innerText = 'Score results for coding quiz';

      //Append children
      highscoreCont.appendChild(highscoreDiv);
      highscoreDiv.appendChild(namePharagraph);
      highscoreDiv.appendChild(scoreParagraph);

      //Clear Players Score after press clear button
      clearBtn.addEventListener('click', function () {
        while (highscoreCont.firstChild) {
          highscoreCont.removeChild(highscoreCont.firstChild);
        }

        localStorage.clear();
      })
    });

    //Clear values and shows the first view
    againBtn.addEventListener('click', function () {
      //Clear parent result display
      while (highscoreCont.firstChild) {
        highscoreCont.removeChild(highscoreCont.firstChild);
      }

      while (highscoreBtns.firstChild) {
        highscoreBtns.removeChild(highscoreBtns.firstChild);
      }

      //Set the elements as the begging
      currentIndex = 0;
      secondsLeft = 60;

      //Set classes and id
      startBtn.className = 'focus:outline-none bg-transparent hover:bg-orange-600 text-orange-600 font-semibold hover:text-white py-2 px-4 border border-orange-400 hover:border-transparent rounded-full block mx-auto';
      startBtn.id = 'startBtn';
     gameRule.className = 'text-center mt-5'

      //Change text
      title.innerText = 'Java Script Quiz';
     gameRule.innerText = 'Try to answer the following code-related questions within the time. Keep in mind that incorrect answers will penalize your score time by ten seconds.';
      startBtn.innerText = 'Start Quiz';
    });
  });
}

//Save Players Score and initials after press submit btn
function saveData() {
  //Set variable
 var players;

  //Set object
 var player = {
    initials: initials,
    score: score,
  };

  //Creates new array and save the first player
  if (localStorage.getItem('players') === null) {
    players = [];
    players.push(player);
    localStorage.setItem('players', JSON.stringify(players));
  } else { //If the array exist just push the new player's object
    players = JSON.parse(localStorage.getItem('players'));
    players.push(player);
    localStorage.setItem('players', JSON.stringify(players));
  }
}