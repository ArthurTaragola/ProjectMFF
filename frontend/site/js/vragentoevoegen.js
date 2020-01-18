/*  grey button
    document.getElementById('js-validInputs').style.backgroundColor = '#D9D9D9';
    document.getElementById('js-validInputs').style.borderColor = '#A8A8A8';
    document.getElementById('js-validInputs').style.color = '#6E6E6E';
*/

/*  yellow button
    document.getElementById('js-start_button').style.backgroundColor = '#F8F067';
    document.getElementById('js-start_button').style.borderColor = '#D4CB2F';
    document.getElementById('js-start_button').style.color = '#08518B';
*/


let customHeaders = new Headers();
customHeaders.append('Accept', 'application/json');
let questionValue;
let correctAnswerValue;
let wrongAnswer1Value;
let wrongAnswer2Value;

let themas;
let themaIndexes;

let noNewThemes = true;

let eventListeners = [];
let eventListenersValid = [false, false, false, false];
let alleventListenersValid = false;

const enableListeners = function()
{
    question.addEventListener('input', function() {checkValue(0)});
    correctAnswer.addEventListener('input', function() {checkValue(1)});
    wrongAnswer1.addEventListener('input', function() {checkValue(2)});
    wrongAnswer2.addEventListener('input', function() {checkValue(3)});
    
    eventListeners.push(question, correctAnswer, wrongAnswer1, wrongAnswer2);
}
const isEmpty = function(fieldValue)
{
	return !fieldValue || !fieldValue.length;
}
const checkValue = function(input)
{
    if (isEmpty(eventListeners[input].value))
    {
        eventListenersValid[input] = false;
        if (eventListenersValid[0] || eventListenersValid[1] || eventListenersValid[2] || eventListenersValid[3])
        {
            alleventListenersValid = false;
            document.getElementById('js-validInputs').style.backgroundColor = '#D9D9D9';
            document.getElementById('js-validInputs').style.borderColor = '#A8A8A8';
            document.getElementById('js-validInputs').style.color = '#6E6E6E';
            document.getElementById("js-validInputs").onmouseover = function()
            {
                this.style.backgroundColor = '#D9D9D9';
                this.style.borderColor = '#A8A8A8';
            }
            document.getElementById("js-validInputs").onmouseout = function()
            {
                this.style.backgroundColor = '#D9D9D9';
                this.style.borderColor = '#A8A8A8';
            }
        }
    }
    else
    {
        if (eventListenersValid[input] == false)
        {
            eventListenersValid[input] = true;
            if (eventListenersValid[0] && eventListenersValid[1] && eventListenersValid[2] && eventListenersValid[3])
            {
                alleventListenersValid = true;
                document.getElementById('js-validInputs').style.backgroundColor = '#F8F067';
                document.getElementById('js-validInputs').style.borderColor = '#D4CB2F';
                document.getElementById('js-validInputs').style.color = '#08518B';
                document.getElementById("js-validInputs").onmouseover = function()
                {
                    this.style.backgroundColor = '#FFFAA3';
                    this.style.borderColor = '#F8F067';
                }
                document.getElementById("js-validInputs").onmouseout = function()
                {
                    this.style.backgroundColor = '#F8F067';
                    this.style.borderColor = '#D4CB2F';
                }
            }
        }
    }
}


const submitQuestion = function ()
{
    questionValue = document.getElementById("vraag").value;
    correctAnswerValue = document.getElementById("juistantwoord").value;
    wrongAnswer1Value = document.getElementById("verkeerdantwoord1").value;
    wrongAnswer2Value = document.getElementById("verkeerdantwoord2").value;
    if (alleventListenersValid)
    {
        document.getElementById('js-newQuestion').style.display = 'none';
        document.getElementById('js-selectTheme').style.display = 'block';
    }
}

const submitTheme = function ()
{
    let niveau = document.getElementById("niveau").value;
    let thema = document.getElementById("thema").value;

    let xhr = new XMLHttpRequest();
    xhr.open("POST", "https://moveforfortunefunction.azurewebsites.net/api/v2/vragen");
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        "Vraagstelling": questionValue,
        "JuistAntwoord": correctAnswerValue,
        "FoutAntwoord1": wrongAnswer1Value,
        "FoutAntwoord2": wrongAnswer2Value,
        "Niveau": niveau,
        "ThemaId": thema
    }));
    xhr.onreadystatechange = function ()
    {
        if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200)
        {
            console.log("the question has succesfully been added");
            document.getElementById('js-newQuestion').style.display = 'block';
            document.getElementById('js-addQuestion').style.display = 'none';
            document.getElementById('js-questionSuccessfullAdded').style.display = 'block';
        }
        else if (xhr.readyState == XMLHttpRequest.DONE)
        {
            console.log("something went wrong, please try again later");
        }
    }
}

const submitNewTheme = function ()
{
    let thema = document.getElementById("nieuwthema").value;
    
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "https://moveforfortunefunction.azurewebsites.net/api/v2/themas/28");
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        "naam": thema
    }));
    xhr.onreadystatechange = function ()
    {
        if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200)
        {
            console.log("the theme has succesfully been added");
            document.getElementById('js-addThema').style.display = 'none';
            document.getElementById('js-addQuestion').style.display = 'none';
            document.getElementById('js-themaSuccessfullAdded').style.display = 'block';
            noNewThemes = false;
            //document.getElementById('js-selectTheme').style.display = 'block';
            getThemes(); //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!select new theme
        }
        else if (xhr.readyState == XMLHttpRequest.DONE)
        {
            console.log("something went wrong, please try again later");
        }
    }
}

const fetchData = function(url)
{
    return fetch(url, {headers: customHeaders})
        .then(r => r.json()) // idem aan: function(r){return r.json()}
        .then(data => data);
}
const getThemes = async function ()
{
    themas = [];
    themaIndexes = [];
    try
    {
        const data = await fetchData(`https://moveforfortunefunction.azurewebsites.net/api/v1/themas/28`);
        for (let i = 0; i < data.length; i++)
        {
            themas.push(data[i].naam);
            themaIndexes.push(data[i].themaId)
        }
    }
    catch(error)
    {
        console.error('An error occured', error);
    }
    showThemes()
}

const showThemes = function ()
{
    let htmlTheme = `<option value=${themaIndexes[0]}>${themas[0]}</option>`;

    for (let i = 1; i < themas.length; i++)
    {
        htmlTheme += `<option value=${themaIndexes[i]}>${themas[i]}</option>`;
    }
    let selectThema = document.getElementById("thema");
    selectThema.innerHTML = htmlTheme;
    if (!noNewThemes)
    {
        selectThema.selectedIndex = themas.length-1;
    }
}


const newTheme = function ()
{
    document.getElementById('js-selectTheme').style.display = 'none';
    document.getElementById('js-addThema').style.display = 'block';

    let htmlTitle = `<h1 class="card-title">Nieuw thema:</h1>`;
    document.getElementById("js-title").innerHTML = htmlTitle;
}

const goBackToSelectTheme = function ()
{
    document.getElementById('js-themaSuccessfullAdded').style.display = 'none';
    document.getElementById('js-addQuestion').style.display = 'block';
    document.getElementById('js-selectTheme').style.display = 'block';

    let htmlTitle = `<h1 class="card-title">Nieuwe vraag:</h1>`;
    document.getElementById("js-title").innerHTML = htmlTitle;
}

const goBackToList = function ()
{
    window.location.href = "vragenbekijken.html";
}

const init = function()
{
    console.log('begin');
    getThemes();

    buttonNewTheme = document.querySelector('.js-newTheme');
    buttonNewTheme.addEventListener('click', newTheme);

    buttonThemeAdded = document.querySelector('.js-goBackToPreviousPage');
    buttonThemeAdded.addEventListener('click', goBackToSelectTheme);

    buttonThemeAdded = document.querySelector('.js-goBackToList');
    buttonThemeAdded.addEventListener('click', goBackToList);

    question = document.querySelector('#vraag');
    correctAnswer = document.querySelector('#juistantwoord');
    wrongAnswer1 = document.querySelector('#verkeerdantwoord1');
    wrongAnswer2 = document.querySelector('#verkeerdantwoord2');

    enableListeners();
}

document.addEventListener('DOMContentLoaded', init);

// ALLE BUTTONS GEEL, BEHALVE EERSTE BUTTON (bij vraag en antwoorden) EN BUTTON BIJ NIEUW THEMA TOEVOEGEN !!!nog controle bij schrijven