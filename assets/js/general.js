
//var homepage = document.querySelector("#homepagerheader");
//var hgihScores = document.querySelector("high-scores");
var question = document.querySelector("#question");
var scoreText = document.querySelector("#question-score");
var questionCountText = document.querySelector("#question-count");
var timerCountdown = document.querySelector("#timer-countdown");
var options = Array.from(document.getElementsByClassName("answer-text"));
console.log(options);

let currentQuestion = {};
let acceptingAnswer = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
{
        question: 'What is the correct syntax for using an external script file called "register.js"',
        option1: '<script type ="text/javascript>" name="register.js"></script>',
        option2: '<script type ="text/javascript>" href="register.js"></script>',
        option3: '<script type ="text/javascript>" src="register.js"></script>',
        option4: '<script type ="text/javascript>" rel="register.js"></script>',
        answer: 3

},

{
    question: 'Which one of the following html tags is a block level element by default?',
    option1: 'img',
    option2: 'h1',
    option3: 'section',
    option4: 'p',
    answer: 4

},

{
    question: 'Which is the correct CSS syntax?',
    option1: 'body { color: black; }',
    option2: '{body; color: black}',
    option3: '{body: color = black (body); }',
    option4: 'body: color = black;',
    answer: 1

},

{
    question: 'What tag is used to display a picture in an HTML page',
    option1: 'img',
    option2: 'link',
    option3: 'src',
    option4: 'image',
    answer: 1

},

{
    question: 'Which HTML tag produces the biggest heading?',
    option1: 'h4',
    option2: 'h3',
    option3: 'h2',
    option4: 'h1',
    answer: 4

},

{
    question: 'Which element do you use to associate an external style sheet with a Web page?',
    option1: '<a>',
    option2: '<href>',
    option3: '<rel>',
    option4: '<type>',
    answer: 2

},

{
    question: 'Inside which HTML element do we put the Javascript?',
    option1: '<script>',
    option2: '<head>',
    option3: '<meta>',
    option4: '<style>',
    answer: 1

},

{
    question: 'Which is the correct HTML element for making a form checkbox?',
    option1: '<input type="checkbox">',
    option2: '<input type="check">',
    option3: '<checkbox>',
    option4: '<check>',
    answer: 1

},

{
    question: 'To style a div section (<div class = "BIS"> </div>) which is the correct syntax to use?',
    option1: 'div.BIS {}',
    option2: '.BIS {}',
    option3: '#BIS {}',
    option4: 'both a and b',
    answer: 4

},

{
    question: 'The HTML tag <i> can be used to display the text in italic fasion, which CSS property has the same effect?',
    option1: 'font-weight: italic',
    option2: 'font-style: italic',
    option3: 'text-decoration: italic',
    option4: 'font-size: italic',
    answer: 2

},

{
    question: 'This property is used to add rounded borders to an element',
    option1: 'border-radius',
    option2: 'border',
    option3: 'border-style',
    option4: 'border-shape',
    answer: 1

},

{
    question: 'What does DOM stand for?',
    option1: 'Discrete object Model',
    option2: 'Data Object Model',
    option3: 'Document Object Model',
    option4: 'None of the above',
    answer: 3

},

{
    question: 'The CSS font-size property has a value in...',
    option1: 'pixels',
    option2: 'percentages',
    option3: 'em',
    option4: 'all of the above',
    answer: 4

},

{
    question: 'What does API stand for?',
    option1: 'Authentication Program Interface',
    option2: 'Application Programming Interface',
    option3: 'Application Protocol Interface',
    option4: 'Authorized Program Interface',
    answer: 2

},

{
    question: 'Why should you learn vanilla JavaScript?',
    option1: 'Web-performance',
    option2: 'User Experience',
    option3: 'It is easier to work with other frameworks',
    option4: 'All of the above',
    answer: 4

}

];

var correctPoints = 10;
var maxQuestions = 10;
var determinedResult;
var timer;
var timerPenalty = -20;
var timerCount = 240;

function startGame () {
// use [...] as spread operator to pull all available questions in the questions array that was created and create a new array
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    console.log(availableQuestions);
    getNewQuestion();
    startTimer();
};

getNewQuestion = () => {
    if(availableQuestions.length == 0 || questionCounter >= maxQuestions) {

        localStorage.setItem('mostRecentScore', score);
        return window.location.assign('./endscreen.html');
}
    questionCounter++;
    console.log(questionCounter);

    questionCountText.innerText = questionCounter


    var questionIndex = Math.floor(Math.random() * availableQuestions.length);
        currentQuestion = availableQuestions[questionIndex];
        question.innerText = currentQuestion.question

    options.forEach( option =>{
        var number = option.dataset['number'];
        option.innerText = currentQuestion['option' + number]
    });

    availableQuestions.splice(questionIndex, 1);

    acceptingAnswer = true;

};

// The setTimer function starts and stops the timer and triggers winGame() and loseGame()
function startTimer() {
    timer = setInterval( tic, 1000);
};

function tic (){
    timerCount--;
    timerCountdown.innerText = timerCount;
    if (timerCount <= 0 ) {
    clearTimer()
    }
};

function clearTimer () {
    clearInterval(timer)
};


options.forEach(option => {
    option.addEventListener("click", e => {
        if(!acceptingAnswer) return;
        acceptingAnswer = false;
        var selectedOption = e.target;
        var selectedAnswer = selectedOption.dataset['number'];
        console.log(selectedAnswer, currentQuestion.answer);
        console.log(selectedAnswer == currentQuestion.answer);

    determinedResult = 'incorrect';
        if (selectedAnswer == currentQuestion.answer)
        {
            determinedResult = 'correct';
        };
            console.log(determinedResult);
        if (determinedResult === 'correct') {
            incrementScore(correctPoints);
        
        } else {
            incrementTimer(timerPenalty);
        };


    selectedOption.parentElement.classList.add(determinedResult);
    
    setTimeout(() => {
        selectedOption.parentElement.classList.remove(determinedResult);
        getNewQuestion();
    }, 1000);

    });

});

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
    console.log(score);
};

incrementTimer = num => {
    timerCount += num;
    timerCountdown.innerText = timerCount;
    console.log (timerCount);
};


startGame();