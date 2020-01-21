let customHeaders = new Headers();
customHeaders.append('Accept', 'application/json');

let team1answered;
let team2answered;

let answerteam1;
let answerteam1Index;
let answerteam2;
let answerteam2Index;

let shuffledAnswers;
let correctAnswerIndex;

let fastestTeam;

let themaList = [];
let questionList = [];

let pointsTeam1;
let pointsTeam2;

let audioTeam1 = new Audio('sounds/Yeet.mp3');
let audioTeam2 = new Audio('sounds/Quack.mp3')

let niveauLevel = localStorage.getItem("niveauLevel");


const loadbar = function()
{
    $('.progress-bar-fill').delay(1000).queue(function () {$(this).css('width', '100%')});
    setTimeout(function() {$('#progress-bar').fadeOut('fast');}, 10000);
    $(document).ready(function ()
    {
          // Hide the div
          $("#answer").hide();
          // Show the div after 5s
          $("#answer").delay(10100).fadeIn('fast');  
    });
}

const fetchData = function(url)
{
    return fetch(url, {headers: customHeaders})
        .then(r => r.json()) // idem aan: function(r){return r.json()}
        .then(data => data);
}

const getAPI = async function()
{
    team1answered = false;
    team2answered = false;
    console.log(themaList.length)
    for (let i = 0; i < themaList.length; i++)
    {
        try
        {
            const data = await fetchData(`https://moveforfortunefunction.azurewebsites.net/api/v1/vragen/${niveauLevel}/${themaList[i]}`);
            for (let k = 0; k < data.length; k++)
            {
                questionList.push(data[k]);
            }
        }
        catch(error)
        {
            console.error('An error occured', error);
        }
    }
    console.log(questionList);
    getData();
}

const getData = function()
{
    shuffledAnswers = [];
    console.log(questionList);
    let answers = [];
    let randomQuestion = Math.floor(Math.random()*questionList.length);
    let vraag = questionList[randomQuestion].vraagstelling;
    let htmlQuestion = `<div class="question">${vraag}</div>`;
    document.getElementById("js-question").innerHTML = htmlQuestion;
    answers.push(questionList[randomQuestion].juistAntwoord);
    answers.push(questionList[randomQuestion].foutAntwoord1);
    answers.push(questionList[randomQuestion].foutAntwoord2);
    console.log(vraag);
    shuffle(answers);
    //console.log(answers);
    for (let i = 0; i < 3; i++)
    {
        console.log(shuffledAnswers[i]);
    }
    let htmlAnswer = `<button class="c-button c-button-vragen" id="A">A) ${shuffledAnswers[0]}</button>`;
    document.getElementById("js-A").innerHTML = htmlAnswer;
    htmlAnswer = `<button class="c-button c-button-vragen" id="B">B) ${shuffledAnswers[1]}</button>`;
    document.getElementById("js-B").innerHTML = htmlAnswer;
    htmlAnswer = `<button class="c-button c-button-vragen" id="C">C) ${shuffledAnswers[2]}</button>`;
    document.getElementById("js-C").innerHTML = htmlAnswer;
    //console.log(shuffledAnswers);
    correctAnswerIndex = shuffledAnswers.indexOf(answers[0]);

    questionList.splice(randomQuestion, 1); //verwijder 1 vraag uit de lijst
}

const shuffle = function(list)
{
    let answerA = Math.floor(Math.random()*3);
    while (answerA == 3)
    {
        answerA = Math.floor(Math.random()*3);
    }
    let answerB = Math.floor(Math.random()*3);
    while (answerB == answerA || answerB == 3)
    {
        answerB = Math.round(Math.random()*3);
    }
    let answerC = 3-answerA-answerB;
    shuffledAnswers.push(list[answerA], list[answerB], list[answerC]);
}

const keyPressed = function(e)
{
    if(!team1answered || !team2answered)
    {
        switch(e.key)
        {
            case 'z':
                assignAnswer(1, 0);
                break;
            case 'q':
                assignAnswer(1, 1);
                break;
            case 's':
                assignAnswer(1, 2);
                break;
            case 'd':
                assignAnswer(2, 0);
                break;
            case 'f':
                assignAnswer(2, 1);
                break;
            case 'g':
                assignAnswer(2, 2);
                break;
            default:
                console.log("not a valid answer");
                break;
        }
    }
    else if (e.code == 'Space' || e.key == 'Enter')
    {
        goToNewPage();
    }
}

const assignAnswer = function(team, answer)
{
    if (team == 1)
    {
        if (!team1answered)
        {
            answerteam1Index = answer;
            answerteam1 = shuffledAnswers[answer];
            console.log("team " + team + ", answered " + answerteam1);
            audioTeam1.play();
            team1answered = true;
            if (team2answered)
            {
                fastestTeam = 2;
                bothTeamsAnswered();
            }
        }
    }
    else
    {
        if (!team2answered)
        {
            answerteam2Index = answer;
            answerteam2 = shuffledAnswers[answer];
            console.log("team "+ team +", answered "+ answerteam2);
            audioTeam2.play();
            team2answered = true;
            if (team1answered)
            {
                fastestTeam = 1;
                bothTeamsAnswered();
            }
        }
    }
}
const bothTeamsAnswered = function()
{
    let possibleAnswers = ["A", "B", "C"];
    let correctAnswer = shuffledAnswers[correctAnswerIndex];
    //go to next page (show right answer)
    console.log("team 1: " + answerteam1);
    console.log("team 2: " + answerteam2);
    setTimeout(() => {document.getElementById(`${possibleAnswers[correctAnswerIndex]}`).style.backgroundColor = '#75C461';}, 2000);
    setTimeout(() => {document.getElementById(`${possibleAnswers[correctAnswerIndex]}`).style.borderColor = '#63AC70';}, 2000);
    if (answerteam1 != correctAnswer)
    {
        setTimeout(() => {document.getElementById(`${possibleAnswers[answerteam1Index]}`).style.backgroundColor = '#E98B5D';}, 2000);
        setTimeout(() => {document.getElementById(`${possibleAnswers[answerteam1Index]}`).style.borderColor = '#E96220';}, 2000);
    }
    if (answerteam2 != correctAnswer)
    {
        setTimeout(() => {document.getElementById(`${possibleAnswers[answerteam2Index]}`).style.backgroundColor = '#E98B5D';}, 2000);
        setTimeout(() => {document.getElementById(`${possibleAnswers[answerteam2Index]}`).style.borderColor = '#E96220';}, 2000);
    }
    if (fastestTeam == 1)
    {
        if (answerteam1 == correctAnswer)
        {
            console.log("team 1 krijgt 150 punten");
            pointsTeam1 += 150;
        }
        else
        {
            console.log("team 1 krijgt 0 punten");
        }
        if (answerteam2 == correctAnswer)
        {
            console.log("team 2 krijgt 100 punten");
            pointsTeam2 += 100;
        }
        else
        {
            console.log("team 2 krijgt 0 punten");
        }
    }
    else
    {
        if (answerteam2 == correctAnswer)
        {
            console.log("team 2 krijgt 150 punten");
            pointsTeam2 += 150;
        }
        else
        {
            console.log("team 2 krijgt 0 punten");
        }
        if (answerteam1 == correctAnswer)
        {
            console.log("team 1 krijgt 100 punten");
            pointsTeam1 += 100;
        }
        else
        {
            console.log("team 1 krijgt 0 punten");
        }
    }
}

const goToNewPage = function ()
{
    console.log(questionList);
    localStorage.setItem("pointsTeam1", JSON.stringify(pointsTeam1));
    localStorage.setItem("pointsTeam2", JSON.stringify(pointsTeam2));
    localStorage.setItem("questions", JSON.stringify(questionList));
    localStorage.setItem("firstQuestion", JSON.stringify(false));
    //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!laat onderaan de tekst "(druk op spatie of enter om door te gaan)" tevoorschijn komen
    window.location.href = "Scoreboard.html";
}

const init = function()
{
    console.log("DOM Loaded");
    let firstQuestion = JSON.parse(localStorage.getItem("firstQuestion"));
    console.log(firstQuestion);
    if (firstQuestion)
    {
        themaList =  JSON.parse(localStorage.getItem("thema's"));
        pointsTeam1 = 0;
        pointsTeam2 = 0;
        getAPI();
    }
    else
    {
        questionList = JSON.parse(localStorage.getItem("questions"));
        pointsTeam1 = JSON.parse(localStorage.getItem("pointsTeam1"));
        pointsTeam2 = JSON.parse(localStorage.getItem("pointsTeam2"));
        getData();
    }
    loadbar();
    setTimeout(() => {document.addEventListener("keydown", keyPressed, false);}, 10000);
}

document.addEventListener('DOMContentLoaded', init);