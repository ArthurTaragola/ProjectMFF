const goToLoginPage = function ()
{
    window.location.href = "login.html";
}

const goToQuizPage = function ()
{
    localStorage.setItem("leerkrachtId", 25);
    window.location.href = "niveau.html";
}

const goToRegisterPage = function ()
{
    window.location.href = "registreren.html";
}

const popup = function()
{
    console.log("okioki")
    Swal.fire({
        title: '<strong>Information</strong>',
        icon: 'info',
        html:
          'bekijk de werking van get spel in volgende ' +
          '<a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">instructie video</a> ' +
          'vogels <b>icons</b> can be found <a href="https://www.flaticon.com/packs/bird-collection">here.</a><br>' + 
          '<b>Soundeffects</b> can be found <a href="https://freesound.org/home/">here</a>',
        showCloseButton: true,
        showCancelButton: false,
        focusConfirm: false,
        confirmButtonText:
          '<i class="fa fa-thumbs-up"></i> Geweldig!',
        cancelButtonText:
          '<i class="fa fa-thumbs-down"></i>',
        cancelButtonAriaLabel: 'Thumbs down'
      })
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
    info = document.querySelector('#js-info')
    info.addEventListener("click", popup);
}

document.addEventListener('DOMContentLoaded', init);