let customHeaders = new Headers();
customHeaders.append('Accept', 'application/json');
let objectList = [];
let themaList = [];
let addedThemaList = [];
let themas = [];

let oneThemeSelected;

let leerkrachtId = localStorage.getItem("leerkrachtId");

const toggleStatus = function(item, thema)
{
    let added = !addedThemaList[item];
    addedThemaList[item] = added;
    if (added)
    {
        console.log("added thema "+thema);
        document.getElementById(`js-addbutton_thema${thema+1}`).style.display = 'none';
        document.getElementById(`js-checkbutton_thema${thema+1}`).style.display = 'inline';
        themaList.push(thema);
        if (themaList.length == 1) //kleur moet enkel weizigen als er 1 of meer items in komen
        {
            oneThemeSelected = true;
            yellowButton();
        }
    }
    else
    {
        document.getElementById(`js-addbutton_thema${thema+1}`).style.display = 'inline';
        document.getElementById(`js-checkbutton_thema${thema+1}`).style.display = 'none';
        let index = themaList.indexOf(thema);
        if (index > -1) {
            themaList.splice(index, 1);
        }
        if (themaList.length == 0)
        {
            oneThemeSelected = false;
            //console.log("leeg");
            grayButton();
        }
    }
    console.log(themaList);
}

const grayButton = function ()
{
    document.getElementById("js-start_button").style.backgroundColor = '#D9D9D9';
    document.getElementById("js-start_button").style.borderColor = '#D9D9D9';
    document.getElementById("js-start_button").style.color = '#6E6E6E';
    document.getElementById("js-start_button").onmouseover = function()
    {
        this.style.backgroundColor = '#D9D9D9';
        this.style.borderColor = '#D9D9D9';
    }
    document.getElementById("js-start_button").onmouseout = function()
    {
        this.style.backgroundColor = '#D9D9D9';
        this.style.borderColor = '#D9D9D9';
    }
}

const yellowButton = function ()
{
    document.getElementById("js-start_button").style.backgroundColor = '#F7E11B';
    document.getElementById("js-start_button").style.borderColor = '#F7E11B';
    document.getElementById("js-start_button").style.color = '#08518B';
    document.getElementById("js-start_button").onmouseover = function()
    {
        this.style.backgroundColor = '#FFFAA3';
        this.style.borderColor = '#FFFAA3';
    }
    document.getElementById("js-start_button").onmouseout = function()
    {
        this.style.backgroundColor = '#F7E11B';
        this.style.borderColor = '#F7E11B';
    }
}

const checkIfSuperUser = function ()
{
    if (leerkrachtId == 25)
    {
        let html = ``;
        document.getElementById("js-logout").innerHTML = html;
        document.getElementById("js-home").href = "index.html";
    }
}

const goToNewPage = function ()
{
    if (oneThemeSelected)
    {
        localStorage.setItem("thema's",  JSON.stringify(themaList));
        localStorage.setItem("firstQuestion",  JSON.stringify(true));
        localStorage.setItem("currentQuestion", JSON.stringify(1));
        window.location.href = "vragenquiz.html";
    }
    else
    {
        console.log("selecteer minstens 1 thema");
    }
}

const fetchData = function(url)
{
    return fetch(url, {headers: customHeaders})
        .then(r => r.json()) // idem aan: function(r){return r.json()}
        .then(data => data);
}

const getAPI = async function ()
{
    try
    {
        const data = await fetchData(`https://moveforfortunefunction.azurewebsites.net/api/v1/themas/${leerkrachtId}`);
        for (let i = 0; i < data.length; i++)
        {
            themas.push(data[i]);
        }
    }
    catch(error)
    {
        console.error('An error occured', error);
    }
    console.log(themas);
    showThemes();
}

const showThemes = function ()
{
    let htmlTheme = `<input type="checkbox" value="${themas[0].naam}" class="hidden js-thema${themas[0].themaId}" name="cb" id="cb1"> 
    <label class="svg-thema"for="cb1">
        <svg xmlns="http://www.w3.org/2000/svg" class="addbutton svg-button" id="js-addbutton_thema${themas[0].themaId+1}" fill= "#6E6E6E" width="32" height="32" viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
        <svg xmlns="http://www.w3.org/2000/svg" class="checkbutton svg-button" id="js-checkbutton_thema${themas[0].themaId+1}" fill = "#08518B" width="32" height="32" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill= "none"/><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
        <div class="thema">${themas[0].naam}</div>
    </label>`;

    for (let i = 1; i < themas.length; i++)
    {
        htmlTheme += `<input type="checkbox" value="${themas[i].naam}" class="hidden js-thema${themas[i].themaId}" name="cb" id="cb${i+1}"> 
        <label class="svg-thema" for="cb${i+1}">
            <svg xmlns="http://www.w3.org/2000/svg" class="addbutton svg-button" id="js-addbutton_thema${themas[i].themaId+1}" fill= "#6E6E6E" width="32" height="32" viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
            <svg xmlns="http://www.w3.org/2000/svg" class="checkbutton svg-button" id="js-checkbutton_thema${themas[i].themaId+1}" fill = "#08518B" width="32" height="32" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill= "none"/><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
            <div class="thema">${themas[i].naam}</div>
        </label>`;
    }
    document.getElementById("js-themas").innerHTML = htmlTheme;
    listenToThemes();
}

const listenToThemes = function ()
{
    for (let i = 0; i < themas.length; i++)
    {
        temp = document.querySelector(`.js-thema${themas[i].themaId}`);
        temp.addEventListener('click', function(){toggleStatus(i, themas[i].themaId)});
        objectList.push(temp);
        addedThemaList.push(false);
    }
}

const init = function()
{
    console.log("DOM Loaded");
    //console.log(leerkrachtId);
    grayButton();
    checkIfSuperUser();
    getAPI();
    startButton = document.querySelector('#js-start_button');
    startButton.addEventListener('click', goToNewPage);
}

document.addEventListener('DOMContentLoaded', init);