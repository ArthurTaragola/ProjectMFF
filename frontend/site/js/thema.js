let objectList = [];
let themaList = []; //haal uit api
let addedThemaList = [];
let amountOfThemes = 6; //verander

const toggleStatus = function(thema)
{
    let added = !addedThemaList[thema];
    addedThemaList[thema] = added;
    if (added)
    {
        console.log("added thema "+thema);
        document.getElementById(`js-addbutton_thema${thema+1}`).style.display = 'none';
        document.getElementById(`js-checkbutton_thema${thema+1}`).style.display = 'inline';
    }
    else
    {
        console.log("removed thema "+thema);
        document.getElementById(`js-addbutton_thema${thema+1}`).style.display = 'inline';
        document.getElementById(`js-checkbutton_thema${thema+1}`).style.display = 'none';
    }

}

const init = function()
{
    console.log("DOM Loaded");
    console.log(localStorage.getItem("niveauLevel"));
    for (let i = 0; i < amountOfThemes; i++)
    {
        temp = document.querySelector(`.js-thema${i+1}`);
        temp.addEventListener('click', function(){toggleStatus(i)});
        objectList.push(temp);
        addedThemaList.push(false);
    }
}

document.addEventListener('DOMContentLoaded', init);