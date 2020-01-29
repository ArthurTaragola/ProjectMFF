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
          'Bekijk de werking van het spel in volgende ' +
          '<a target="_blank" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">instructie video.</a> ' +
          'Vogel <b>icons</b> kan je hier vinden <a target="_blank" href="https://www.flaticon.com/packs/bird-collection">hier.</a><br>' + 
          '<b>Soundeffects</b> vind je <a target="_blank" href="https://freesound.org/home/">hier</a>',
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