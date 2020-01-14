let customHeaders = new Headers();
customHeaders.append('Accept', 'application/json');

let team1answered;
let team2answered;

let answerteam1;
let answerteam2;

let shuffledAnswers;
let correctAnswer;

let fastestTeam;


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
    shuffledAnswers = [];
    try
    {
        const data = await fetchData('https://moveforfortunefunction.azurewebsites.net/api/v1/vragen/4');
        //console.log(data);
        getData(data);
    }
    catch(error)
    {
        console.error('An error occured', error);
    }
}

const getData = function(data)
{
    let answers = [];
    let randomQuestion = Math.floor(Math.random()*data.length);
    let vraag = data[randomQuestion].vraagstelling;
    let htmlQuestion = `<div class="question">${vraag}</div>`;
    document.getElementById("js-question").innerHTML = htmlQuestion;
    answers.push(data[randomQuestion].juistAntwoord);
    answers.push(data[randomQuestion].foutAntwoord1);
    answers.push(data[randomQuestion].foutAntwoord2);
    console.log(vraag);
    shuffle(answers);
    //console.log(answers);
    for (let i = 0; i < 3; i++)
    {
        console.log(shuffledAnswers[i]);
    }
    let htmlAnswer = `<button class= "c-button-antwoord" id="A">A) ${shuffledAnswers[0]}</button>`;
    document.getElementById("js-A").innerHTML = htmlAnswer;
    htmlAnswer = `<button class= "c-button-antwoord" id="B">B) ${shuffledAnswers[1]}</button>`;
    document.getElementById("js-B").innerHTML = htmlAnswer;
    htmlAnswer = `<button class= "c-button-antwoord" id="C">C) ${shuffledAnswers[2]}</button>`;
    document.getElementById("js-C").innerHTML = htmlAnswer;
    //console.log(shuffledAnswers);
    correctAnswer = shuffledAnswers.indexOf(answers[0]);
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
    if(!team1answered || !team2answered || e.key == 'Enter')
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
            case 'Enter':
                console.clear();
                getAPI();
                break;
            default:
                console.log("not a valid answer");
                break;
        }
    }
}
const assignAnswer = function(team, answer)
{
    if (team == 1)
    {
        if (!team1answered)
        {
            answerteam1 = shuffledAnswers[answer];
            console.log("team " + team + ", answered " + answerteam1);
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
            answerteam2 = shuffledAnswers[answer];
            console.log("team "+ team +", answered "+ answerteam2);
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
    //go to next page (show right answer)
    console.log("team 1: " + answerteam1);
    console.log("team 2: " + answerteam2);
    setTimeout(() => {document.getElementById(`${possibleAnswers[correctAnswer]}`).style.backgroundColor = '#75C461';}, 2000);
    setTimeout(() => {document.getElementById(`${possibleAnswers[correctAnswer]}`).style.borderColor = '#63AC70';}, 2000);
    if (fastestTeam == 1)
    {
        if (answerteam1 == correctAnswer)
        {
            console.log("team 1 is victorious");
        }
        else if (answerteam2 == correctAnswer)
        {
            console.log("team 2 is victorious (team 1 is dumb)");
        }
        else
        {
            console.log("they both stupid");
        }
    }
    else
    {
        if (answerteam2 == correctAnswer)
        {
            console.log("team 2 is victorious");
        }
        else if (answerteam1 == correctAnswer)
        {
            console.log("team 1 is victorious (team 2 is dumb)");
        }
        else
        {
            console.log("they both stupid");
        }
    }
}

const init = function()
{
    console.log("DOM Loaded");
    loadbar();
    getAPI();
    setTimeout(() => {document.addEventListener("keydown", keyPressed, false);}, 10000);
}

document.addEventListener('DOMContentLoaded', init);