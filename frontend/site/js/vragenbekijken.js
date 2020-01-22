let customHeaders = new Headers();
customHeaders.append('Accept', 'application/json');

let questionList;
let thema = 1;
let niveau = 1;

let statuspopup = false;
let previousid;

let deleteQuerySelector;

const DropDown1 = async function()
{
  await getThemas();
    var x, i, j, selElmnt, a, b, c;
        var option = document.getElementById("js-themas");
        /*look for any elements with the class "custom-select11":*/
        x = document.getElementsByClassName("custom-select1");
        for (i = 0; i < x.length; i++) {
          selElmnt = x[i].getElementsByTagName("select")[0];
          /*for each element, create a new DIV that will act as the selected item:*/
          a = document.createElement("DIV");
          a.setAttribute("class", "select-selected");
          a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
          x[i].appendChild(a);
          /*for each element, create a new DIV that will contain the option list:*/
          b = document.createElement("DIV");
          b.setAttribute("class", "select-items select-hide");
          for (j = 1; j < selElmnt.length; j++) {
            /*for each option in the original select element,
            create a new DIV that will act as an option item:*/
            c = document.createElement("DIV");
            c.innerHTML = selElmnt.options[j].innerHTML;
            c.addEventListener("click", function(e) {
                /*when an item is clicked, update the original select box,
                and the selected item:*/
                var y, i, k, s, h;
                s = this.parentNode.parentNode.getElementsByTagName("select")[0];
                h = this.parentNode.previousSibling;
                for (i = 1; i < s.length; i++) {
                  if (s.options[i].innerHTML == this.innerHTML) {
                    s.selectedIndex = i;
                    thema = option.options[option.selectedIndex].value;
                    getAPI(thema,niveau);
                    console.log(thema);
                    h.innerHTML = this.innerHTML;
                    y = this.parentNode.getElementsByClassName("same-as-selected");
                    for (k = 0; k < y.length; k++) {
                      y[k].removeAttribute("class");
                    }
                    this.setAttribute("class", "same-as-selected");
                    break;
                  }
                }
                h.click();
            });
            b.appendChild(c);
          }
          x[i].appendChild(b);
          a.addEventListener("click", function(e) {
              /*when the select box is clicked, close any other select boxes,
              and open/close the current select box:*/
              e.stopPropagation();
              closeAllSelect(this);
              this.nextSibling.classList.toggle("select-hide");
              this.classList.toggle("select-arrow-active");
            });
        }
        function closeAllSelect(elmnt) {
          /*a function that will close all select boxes in the document,
          except the current select box:*/
          var x, y, i, arrNo = [];
          x = document.getElementsByClassName("select-items");
          y = document.getElementsByClassName("select-selected");
          for (i = 0; i < y.length; i++) {
            if (elmnt == y[i]) {
              arrNo.push(i)
            } else {
              y[i].classList.remove("select-arrow-active");
            }
          }
          for (i = 0; i < x.length; i++) {
            if (arrNo.indexOf(i)) {
              x[i].classList.add("select-hide");
            }
          }
        }
        /*if the user clicks anywhere outside the select box,
        then close all select boxes:*/
        document.addEventListener("click", closeAllSelect);
}

const DropDown = function()
{
    var x, i, j, selElmnt, a, b, c;
        /*look for any elements with the class "custom-select":*/
        x = document.getElementsByClassName("custom-select");
        for (i = 0; i < x.length; i++) {
          selElmnt = x[i].getElementsByTagName("select")[0];
          /*for each element, create a new DIV that will act as the selected item:*/
          a = document.createElement("DIV");
          a.setAttribute("class", "select-selected");
          a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
          x[i].appendChild(a);
          /*for each element, create a new DIV that will contain the option list:*/
          b = document.createElement("DIV");
          b.setAttribute("class", "select-items select-hide");
          for (j = 1; j < selElmnt.length; j++) {
            /*for each option in the original select element,
            create a new DIV that will act as an option item:*/
            c = document.createElement("DIV");
            c.innerHTML = selElmnt.options[j].innerHTML;
            c.addEventListener("click", function(e) {
                /*when an item is clicked, update the original select box,
                and the selected item:*/
                var y, i, k, s, h;
                s = this.parentNode.parentNode.getElementsByTagName("select")[0];
                h = this.parentNode.previousSibling;
                console.log("value: "+this.value);
                for (i = 1; i < s.length; i++) {
                  if (s.options[i].innerHTML == this.innerHTML) {
                    s.selectedIndex = i;
                    niveau = i;
                    console.log(niveau);
                    getAPI(thema,niveau);
                    h.innerHTML = this.innerHTML;
                    y = this.parentNode.getElementsByClassName("same-as-selected");
                    for (k = 0; k < y.length; k++) {
                      y[k].removeAttribute("class");
                    }
                    this.setAttribute("class", "same-as-selected");
                    break;
                  }
                }
                h.click();
            });
            b.appendChild(c);
          }
          x[i].appendChild(b);
          a.addEventListener("click", function(e) {
              /*when the select box is clicked, close any other select boxes,
              and open/close the current select box:*/
              e.stopPropagation();
              closeAllSelect(this);
              this.nextSibling.classList.toggle("select-hide");
              this.classList.toggle("select-arrow-active");
            });
        }
        function closeAllSelect(elmnt) {
          /*a function that will close all select boxes in the document,
          except the current select box:*/
          var x, y, i, arrNo = [];
          x = document.getElementsByClassName("select-items");
          y = document.getElementsByClassName("select-selected");
          for (i = 0; i < y.length; i++) {
            if (elmnt == y[i]) {
              arrNo.push(i)
            } else {
              y[i].classList.remove("select-arrow-active");
            }
          }
          for (i = 0; i < x.length; i++) {
            if (arrNo.indexOf(i)) {
              x[i].classList.add("select-hide");
            }
          }
        }
        /*if the user clicks anywhere outside the select box,
        then close all select boxes:*/
        document.addEventListener("click", closeAllSelect);
}

const fetchData = function(url)
{
    return fetch(url, {headers: customHeaders})
        .then(r => r.json()) // idem aan: function(r){return r.json()}
        .then(data => data);
}

const getThemas = async function()
{
  let themaList = [];
  let leerkrachtId = localStorage.getItem("leerkrachtId");
  try
  {
      const data = await fetchData(`https://moveforfortunefunction.azurewebsites.net/api/v1/themas/${leerkrachtId}`);
      for (let k = 0; k < data.length; k++)
      {
          themaList.push(data[k]);
      }
      if (data.length != 0)
      {
        thema = data[0].themaId;
      }
      else
      {
        thema = 0;
      }
  }
  catch(error)
  {
      console.error('An error occured', error);
  }
  fillInThemas(themaList);
}

const fillInThemas = function (data)
{
    if (data.length != 0)
    {
      let htmlThema = `<option value="${data[0].themaId}">${data[0].naam}</option>`;
      for (let i = 0; i < data.length; i++)
      {
          htmlThema += `<option value="${data[i].themaId}">${data[i].naam}</option>`;
      }
      document.getElementById("js-themas").innerHTML = htmlThema;
    }
    else
    {
      let htmlThema = `<option value=0>Geen themas</option>`;
      document.getElementById("js-themas").innerHTML = htmlThema;
    }
}

const getAPI = async function(thema, niveau)
{
  questionList = [];
    try
    {
      console.log(thema, niveau)
        const data = await fetchData(`https://moveforfortunefunction.azurewebsites.net/api/v1/vragen/${niveau}/${thema}`);
        for (let k = 0; k < data.length; k++)
        {
            questionList.push(data[k]);
        }
    }
    catch(error)
    {
        console.error('An error occured', error);
    }
    FillInData()
}


const FillInData = function()
{
    if (questionList.length != 0)
    {
      console.log(questionList);
      statuspopup = false;
      
      let htmlQuestion = 
      `<tr id="js-question" class="c-table-color"></tr>
          <td>${questionList[0].vraagstelling}</td>
          <td>A.</td> <td>${questionList[0].juistAntwoord}</td>
          <td>B.</td> <td>${questionList[0].foutAntwoord1}</td>
          <td>C.</td> <td>${questionList[0].foutAntwoord2}</td>
          <td>
              <div class="popup" id = "PopUp${questionList[0].vraagId}" onclick="myFunction(${questionList[0].vraagId})"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#08518B" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>
                  <span class="popuptext" id="myPopup${questionList[0].vraagId}">
                      <table class="c-center">
                            <button class="c-button__popup js-update${questionList[0].vraagId}" >
                                <svg style="margin-bottom: -4px; margin-right:8px;" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#08518B" viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
                                Aanpassen  
                            </button>
                            <button class="c-button__popup js-delete${questionList[0].vraagId}">
                                <svg style="margin-bottom: -4px; margin-right:8px;" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#08518B" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z"/><path fill="none" d="M0 0h24v24H0z"/></svg>
                                Verwijderen 
                            </button>
                      </table>
                  </span>
              </div>
          </td> 
      </tr>`;

        for (let i = 1; i < questionList.length; i++)
        {
            let vraag = questionList[i].vraagstelling;
            let A=  questionList[i].juistAntwoord;
            let B=  questionList[i].foutAntwoord1;
            let C=  questionList[i].foutAntwoord2;
            let id = questionList[i].vraagId;

            htmlQuestion +=
            `<tr id="js-question" class="c-table-color"></tr>
            <td>${vraag}</td>
            <td>A.</td> <td>${A}</td>
            <td>B.</td> <td>${B}</td>
            <td>C.</td> <td>${C}</td>
            <td>
                <div class="popup" id = "PopUp${id}" onclick="myFunction(${id})"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#08518B" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>
                    <span class="popuptext" id="myPopup${id}">
                        <table class="c-center">                                    
                              <button class="c-button__popup js-update${id}" >
                                  <svg style="margin-bottom: -4px; margin-right:8px;" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#08518B" viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
                                  Aanpassen  
                              </button>
                              <button class="c-button__popup js-delete${id}">
                                  <svg style="margin-bottom: -4px; margin-right:8px;" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#08518B" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z"/><path fill="none" d="M0 0h24v24H0z"/></svg>
                                  Verwijderen 
                              </button>
                        </table>
                    </span>
                  </div>
            </td> 
          </tr>`;

        }
      document.getElementById("js-question").innerHTML = htmlQuestion;
    }
    else
    {
      let htmlQuestion =`<tr id="js-question" class="c-table-color"></tr>
        <td>er zijn geen vragen</td>`;
      document.getElementById("js-question").innerHTML = htmlQuestion;
    }
}

function myFunction(id)
{
  if (statuspopup == false)
  {
    console.log("show");
    console.log(`.js-delete${id}`);
    deleteQuerySelector = document.querySelector(`.js-delete${id}`);
    deleteQuerySelector.addEventListener('click', function() {deleteQuestion(id)});
    var popup = document.getElementById(`myPopup${id}`);
    popup.classList.toggle("show");
    statuspopup = true;
    previousid = id
  }
  else
  {
    console.log("hide");
    var popup = document.getElementById(`myPopup${previousid}`);
    popup.classList.toggle("show");
    statuspopup = false;
    if (previousid != id)
    {
      myFunction(id);
    }
  }
}

const deleteQuestion = function (id)
{
  console.log(id);
  fetch('https://moveforfortunefunction.azurewebsites.net/api/v1/vragen/' + id, {
    method: 'DELETE',
  })
  console.log(`question with id #${id} has been deleted`);
  setTimeout(() => {getAPI(thema, niveau)}, 200);
}

const addQuestion = function ()
{
    window.location.href = "vragentoevoegen.html";
}

const init = async function()
{
    console.log("DOM loaded");
    AddQuestionButton = document.querySelector('.js-addQuestion');
    AddQuestionButton.addEventListener('click', addQuestion);
    //getThemas();
    DropDown();
    await DropDown1();
    getAPI(thema,niveau);
};

document.addEventListener('DOMContentLoaded', init);