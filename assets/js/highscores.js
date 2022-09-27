var highScoresList = document.querySelector("#high-scores-list");
var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
var clearScores = document.querySelector("#clear-high-scores");

highScoresList.innerHTML = highScores.map(score => {
    return `<li class="high-score-list">${score.initials}   ${score.score}</li>`;
}).join(" ");

clearScores.addEventListener('click', 
    function clearStorage() {
        localStorage.clear();
        window.location.reload();
    });
