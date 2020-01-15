
const goToNewPage = function(niveau)
{
    localStorage.setItem("niveauLevel", niveau);
    window.location.href = "thema's.html";
}

const init = function()
{
    console.log("DOM Loaded");
    buttonNiveau1 = document.querySelector('.js-niveau1');
    buttonNiveau1.addEventListener('click', function() {goToNewPage(1)});
    buttonNiveau2 = document.querySelector('.js-niveau2');
    buttonNiveau2.addEventListener('click', function() {goToNewPage(2)});
    buttonNiveau3 = document.querySelector('.js-niveau3');
    buttonNiveau3.addEventListener('click', function() {goToNewPage(3)});
}

document.addEventListener('DOMContentLoaded', init);