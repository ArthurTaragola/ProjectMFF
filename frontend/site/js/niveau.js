let customHeaders = new Headers();
customHeaders.append('Accept', 'application/json');

let leerkrachtId = localStorage.getItem("leerkrachtId");

const checkIfSuperUser = function ()
{
    if (leerkrachtId == 25)
    {
        let html = ``;
        document.getElementById("js-logout").innerHTML = html;
        document.getElementById("js-home").href = "index.html";
    }
}

const goToNewPage = function(niveau)
{
    localStorage.setItem("niveauLevel", niveau);
    window.location.href = "thema's.html";
}

const fetchData = function(url)
{
    return fetch(url, {headers: customHeaders})
        .then(r => r.json()) // idem aan: function(r){return r.json()}
        .then(data => data);
}
const getThemas = async function ()
{
    try
    {
        const data = await fetchData(`https://moveforfortunefunction.azurewebsites.net/api/v1/themas/${leerkrachtId}`);
    }
    catch(error)
    {
        console.error('An error occured', error);
    }
}

const init = function()
{
    console.log("DOM Loaded");
    checkIfSuperUser();
    buttonNiveau1 = document.querySelector('.js-niveau1');
    buttonNiveau1.addEventListener('click', function() {goToNewPage(1)});
    buttonNiveau2 = document.querySelector('.js-niveau2');
    buttonNiveau2.addEventListener('click', function() {goToNewPage(2)});
    buttonNiveau3 = document.querySelector('.js-niveau3');
    buttonNiveau3.addEventListener('click', function() {goToNewPage(3)});
    getThemas();
}

document.addEventListener('DOMContentLoaded', init);