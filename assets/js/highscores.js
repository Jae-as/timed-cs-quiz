var highScoresList = document.querySelector("#high-scores-list");
var highScores = JSON.parse(localStorage.getItem("high-scores")) || [];

console.log(highScores);


highScores.map( score => {
    return '<li class="high-score-list"> ${score.initials} - ${score.score} </li>';
});