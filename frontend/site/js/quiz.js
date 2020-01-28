let leerkrachtData

let customHeaders = new Headers();
customHeaders.append('Accept', 'application/json');

const fetchData = function(url)
{
    return fetch(url, {headers: customHeaders})
        .then(r => r.json()) // idem aan: function(r){return r.json()}
        .then(data => data);
}

const getAPI = async function()
{
    let leerkrachtnaam
    let leerkrachtId = localStorage.getItem('leerkrachtId')
    try
    {
        const data = await fetchData(`https://moveforfortunefunction.azurewebsites.net/api/v1/leerkracht/${leerkrachtId}`);
        leerkrachtnaam = data[0].voornaam;
    }
    catch(error)
    {
        console.error('An error occured', error);
    }
    FillInData(leerkrachtnaam)
}

const FillInData = function(leerkrachtnaam)
{
    console.log(leerkrachtnaam)
    let htmlQuestion = `<h1 class="c-title" id="js-naam">Welkom ${leerkrachtnaam}!</h1>`;
    document.getElementById("js-naam").innerHTML = htmlQuestion;
}

const init = function()
{
    console.log("DOM loaded");
    getAPI();
};

document.addEventListener('DOMContentLoaded', init);