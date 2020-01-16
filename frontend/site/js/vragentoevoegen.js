let question;
let correctAnswer;
let wrongAnswer1;
let wrongAnswer2;

const SubmitQuestion = function ()
{
    question = document.getElementById("vraag").value;
    correctAnswer = document.getElementById("juistantwoord").value;
    wrongAnswer1 = document.getElementById("verkeerdantwoord1").value;
    wrongAnswer2 = document.getElementById("verkeerdantwoord2").value;
    /*
    {
    "Vraagstelling" : "Is dit een testvraag?", 
    "JuistAntwoord" : "jazeker wel",
    "FoutAntwoord1" : "misschien",
    "FoutAntwoord2" : "neen",
    "Niveau" : 1,
    "ThemaId" : 7
    }
    */
}

const SubmitTheme = function ()
{
    let niveau = document.getElementById("niveau").value;
    let thema = document.getElementById("thema").value;

    let xhr = new XMLHttpRequest();
    xhr.open("POST", "https://moveforfortunefunction.azurewebsites.net/api/v2/vragen");
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        "Vraagstelling": question,
        "JuistAntwoord": correctAnswer,
        "FoutAntwoord1": wrongAnswer1,
        "FoutAntwoord2": wrongAnswer2,
        "Niveau": niveau,
        "ThemaId": thema
    }));
    xhr.onreadystatechange = function ()
    {
        if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200)
        {
            console.log("the question has succesfully been added");
            //go to new page
        }
    }
}

const questionAdded = function ()
{
    document.getElementById('js-newQuestion').style.display = 'none';
    document.getElementById('js-selectTheme').style.display = 'block';
}

const themeSelected = function ()
{
    document.getElementById('js-newQuestion').style.display = 'block';
    document.getElementById('js-addQuestion').style.display = 'none';
    document.getElementById('js-successfullAdded').style.display = 'block';
}

const init = function()
{
    buttonQuestionAdded = document.querySelector('.js-buttonQuestionAdded');
    buttonQuestionAdded.addEventListener('click', questionAdded);
    buttonQuestionAdded = document.querySelector('.js-buttonThemeAdded');
    buttonQuestionAdded.addEventListener('click', themeSelected);
    
}

document.addEventListener('DOMContentLoaded', init);