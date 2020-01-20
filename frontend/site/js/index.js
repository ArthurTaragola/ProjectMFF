const goToLoginPage = function ()
{
    window.location.href = "login.html";
}

const goToQuizPage = function ()
{
    localStorage.setItem("leerkrachtId", 25);
    window.location.href = "quiz.html";
}

const goToRegisterPage = function ()
{
    window.location.href = "registreren.html";
}

const init = function()
{
    console.log("DOM loaded");
    loginButton = document.querySelector('.js-loginButton');
    loginButton.addEventListener('click', goToLoginPage);
    defaultUserButton = document.querySelector('.js-defaultUserButton');
    defaultUserButton.addEventListener('click', goToQuizPage);
    registerButton = document.querySelector('.js-registerButton');
    registerButton.addEventListener('click', goToRegisterPage);
}

document.addEventListener('DOMContentLoaded', init);