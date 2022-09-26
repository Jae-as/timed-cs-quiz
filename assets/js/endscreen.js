var saveScore = document.querySelector("#save-score");
var initials = document.querySelector("#initials");
var finalScore = document.querySelector("#final-score");
var mostRecentScore = localStorage.getItem('mostRecentScore');

// get high scores logged or create array for high scores to be added to
var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
console.log(highScores);

var maxHighScores = 10;
finalScore.innerText = mostRecentScore

initials.addEventListener('click', () => {
    console.log(initials.value);
    saveScore.disabled = !initials.value;

}); 


saveScore = (e) => {
    console.log("clicked the save button");
    e.preventDefault();

var score = {
    score: mostRecentScore,
    initials: initials.value
};

highScores.push(score);
highScores.sort( (a,b) => {
    return b.score - a.score;
    });
highScores.splice(10);

localStorage.setItem("highScores", JSON.stringify(highScores));
window.location.assign("timed-cs-quiz/homepage.html");

};