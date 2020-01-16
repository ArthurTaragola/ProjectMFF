let objectList = [];
let themaList = []; //haal uit api
let addedThemaList = [];
let amountOfThemes = 6; //verander

let oneThemeSelected;

const toggleStatus = function(thema)
{
    let added = !addedThemaList[thema];
    addedThemaList[thema] = added;
    if (added)
    {
        console.log("added thema "+thema);
        document.getElementById(`js-addbutton_thema${thema+1}`).style.display = 'none';
        document.getElementById(`js-checkbutton_thema${thema+1}`).style.display = 'inline';
        themaList.push(thema+1);
        if (themaList.length == 1) //kleur moet enkel weizigen als er 1 of meer items in komen
        {
            oneThemeSelected = true;
            document.getElementById('js-start_button').style.backgroundColor = '#F8F067';
            document.getElementById('js-start_button').style.borderColor = '#D4CB2F';
            document.getElementById('js-start_button').style.color = '#08518B';
            document.getElementById("js-start_button").onmouseover = function()
            {
                this.style.backgroundColor = '#FFFAA3';
                this.style.borderColor = '#F8F067';
            }
            document.getElementById("js-start_button").onmouseout = function()
            {
                this.style.backgroundColor = '#F8F067';
                this.style.borderColor = '#D4CB2F';
            }
        }
    }
    else
    {
        document.getElementById(`js-addbutton_thema${thema+1}`).style.display = 'inline';
        document.getElementById(`js-checkbutton_thema${thema+1}`).style.display = 'none';
        let index = themaList.indexOf(thema+1);
        if (index > -1) {
            themaList.splice(index, 1);
        }
        if (themaList.length == 0)
        {
            oneThemeSelected = false;
            console.log("leeg");
            document.getElementById('js-start_button').style.backgroundColor = '#D9D9D9';
            document.getElementById('js-start_button').style.borderColor = '#A8A8A8';
            document.getElementById('js-start_button').style.color = '#6E6E6E';
            document.getElementById("js-start_button").onmouseover = function()
            {
                this.style.backgroundColor = '#D9D9D9';
                this.style.borderColor = '#A8A8A8';
            }
            document.getElementById("js-start_button").onmouseout = function()
            {
                this.style.backgroundColor = '#D9D9D9';
                this.style.borderColor = '#A8A8A8';
            }
        }
    }
    console.log(themaList);

}

const goToNewPage = function ()
{
    if (oneThemeSelected)
    {
        localStorage.setItem("thema's",  JSON.stringify(themaList));
        localStorage.setItem("firstQuestion",  JSON.stringify(true));
        window.location.href = "vragenquiz.html";
    }
    else
    {
        console.log("selecteer minstens 1 thema");
    }
}

const init = function()
{
    console.log("DOM Loaded");
    console.log(localStorage.getItem("niveauLevel")); //get api with this
    for (let i = 0; i < amountOfThemes; i++)
    {
        temp = document.querySelector(`.js-thema${i+1}`);
        temp.addEventListener('click', function(){toggleStatus(i)});
        objectList.push(temp);
        addedThemaList.push(false);
    }
    startButton = document.querySelector('#js-start_button');
    startButton.addEventListener('click', goToNewPage);
}

document.addEventListener('DOMContentLoaded', init);