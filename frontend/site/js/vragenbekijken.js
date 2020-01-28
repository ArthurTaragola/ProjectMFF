let customHeaders = new Headers();
customHeaders.append('Accept', 'application/json');

let questionList;
let thema = 1;
let niveau = 1;

let themaList = [];

let statuspopup = false;
let previousid;

let deleteQuerySelector;


let questionValue;
let correctAnswerValue;
let wrongAnswer1Value;
let wrongAnswer2Value;

let themas;
let themaIndexes;

let noNewThemes = true;

let eventListeners = [];
let eventListenersValid = [false, false, false, false];
let alleventListenersValid = false;

let validThemeInput = false;

let newQuestion = true; //boolean to see if the pop-up is for a new question or to edit a question
let questionData;

let leerkrachtId = localStorage.getItem("leerkrachtId");



const DropDown3 = async function ()
{
    //await getThemas();
    var x, i, j, selElmnt, a, b, c;
    var option = document.getElementById("thema");
    /*look for any elements with the class "custom-select11":*/
    x = document.getElementsByClassName("custom-select3");
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
                //getAPI(thema,niveau);
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

const DropDown2 = async function()
{
  var x, i, j, selElmnt, a, b, c;
  /*look for any elements with the class "custom-select":*/
  x = document.getElementsByClassName("custom-select2");
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
              niveau = i;
              console.log(niveau);
              //getAPI(thema,niveau);
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

const DropDown1 = async function()
{
  //await getThemas();
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
  try
  {
      themaList = [];
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
      console.log(thema);
      console.log(themaList);
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
      let htmlThema = `<select id='js-themas'>`;
      htmlThema += `<option value="${data[0].themaId}">${data[0].naam}</option>`;
      let htmlThema1 = `<select id='thema'>`;
      htmlThema1 += `<option value="${data[0].themaId}">${data[0].naam}</option>`;

      for (let i = 0; i < data.length; i++)
      {
          htmlThema += `<option value="${data[i].themaId}">${data[i].naam}</option>`;
          htmlThema1 += `<option value="${data[i].themaId}">${data[i].naam}</option>`;
      }
      htmlThema += `<option value="all">alle themas</option>`;
      htmlThema += `</select>`
      htmlThema1 += `</select>`
      document.getElementById("js-themaSelect").innerHTML = htmlThema;
      document.getElementById("js-themaSelect1").innerHTML = htmlThema1;
    }
    else
    {
      let htmlThema = `<select id='js-themas'><option value=0>Geen themas</option></select>`;
      document.getElementById("js-themaSelect").innerHTML = htmlThema;
      document.getElementById("js-themaSelect1").innerHTML = htmlThema;
    }
    DropDown3();
    DropDown1();
    //getAPI(thema, niveau);
}

const getAPI = async function(thema, niveau)
{
  questionList = [];
  console.log(thema, niveau);
  if (thema != "all")
  {
    try
    {
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
  else
  {
    for (let j = 0; j < themaList.length; j++)
    {
      const data = await fetchData(`https://moveforfortunefunction.azurewebsites.net/api/v1/vragen/${niveau}/${themaList[j].themaId}`);
      questionList.push(data);
    }
    console.log(questionList);
    fillInAllQuestions();
  }
}


const FillInData = function()
{
    if (questionList.length != 0)
    {
      console.log(questionList);
      statuspopup = false;
      
      let htmlQuestion =`<table class="c-table">
      <tr id="js-question" class="c-table-color">
          <td>1.</td>
          <td>${questionList[0].vraagstelling}</td>
          <td>A.</td> <td>${questionList[0].juistAntwoord}</td>
          <td>B.</td> <td>${questionList[0].foutAntwoord1}</td>
          <td>C.</td> <td>${questionList[0].foutAntwoord2}</td>
          <td>
              <div class="popup" id = "PopUp${questionList[0].vraagId}" onclick="myFunction(${questionList[0].vraagId}, 0)"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#08518B" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>
                  <span class="popuptext" id="myPopup${questionList[0].vraagId}">
                      <table class="c-center">
                            <button class="c-button__popup" id="js-update0" >
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

            htmlQuestion +=`<tr id="js-question" class="c-table-color">
            <td>${i+1}.</td>
            <td>${vraag}</td>
            <td>A.</td> <td>${A}</td>
            <td>B.</td> <td>${B}</td>
            <td>C.</td> <td>${C}</td>
            <td>
                <div class="popup" id = "PopUp${id}" onclick="myFunction(${id}, ${i})"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#08518B" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>
                    <span class="popuptext" id="myPopup${id}">
                        <table class="c-center">                                    
                              <button class="c-button__popup" id="js-update${i}" >
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
      htmlQuestion += `</table>`;
      document.getElementById("js-question").innerHTML = htmlQuestion;
    //   for (let i = 0; i < questionList.length; i++)
    //     {
    //         updateQuerySelector = document.querySelector(`#js-update${i}`);
    //         updateQuerySelector.addEventListener('click', function() {updateQuestion(i)});
    //     }
    }
    else
    {
      let htmlQuestion =`<table class="c-table"><tr id="js-question" class="c-table-color"></tr>
        <td>Er zijn geen vragen</td> </table>`;
      document.getElementById("js-question").innerHTML = htmlQuestion;
    }
}

const fillInAllQuestions = function ()
{
  statuspopup = false;
  
  let htmlQuestion = ``;

  for (let i = 0; i < themaList.length; i++) //!!!!!!!!!!!!!!!!!!!!!! style="text-align: left" IN CSS (lijn 377 (4 lijnen hieronder)) !!!!!!!!!!!!!!!!
  {
    htmlQuestion += `<table class="c-title-table">
    <tr>
        <th colspan="8" style="text-align: left; background-color: #F5E559">
          ${themaList[i].naam}
        </th>
        <td style="text-align: right; background-color: #F5E559"">
            <div class="js-deleteThema${themaList[i].themaId}">
                <svg style="margin-bottom: -4px; margin-right:8px;" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#08518B" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z"/><path fill="none" d="M0 0h24v24H0z"/></svg>
            </div>
        </td>
    </tr>
    </table>
    <table class="c-table">`;
    if (questionList[i].length == 0)
    {
      htmlQuestion += `<tr id="js-question" class="c-table-color">
      <td></td>
      <td>Er zijn geen vragen</td></tr>`;
    }
    for (let k = 0; k < questionList[i].length; k++)
    {
      htmlQuestion += `<tr id="js-question" class="c-table-color">
      <td>${k+1}.</td>
      <td>${questionList[i][k].vraagstelling}</td>
      <td>A.</td> <td>${questionList[i][k].juistAntwoord}</td>
      <td>B.</td> <td>${questionList[i][k].foutAntwoord1}</td>
      <td>C.</td> <td>${questionList[i][k].foutAntwoord2}</td>
      <td>
          <div class="popup" id = "PopUp${questionList[i][k].vraagId}" onclick="myFunction(${questionList[i][k].vraagId}, ${i}, ${k})"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#08518B" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>
              <span class="popuptext" id="myPopup${questionList[i][k].vraagId}">
                  <table class="c-center">                                    
                        <button class="c-button__popup" id="js-update${i}${k}" >
                            <svg style="margin-bottom: -4px; margin-right:8px;" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#08518B" viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
                            Aanpassen  
                        </button>
                        <button class="c-button__popup js-delete${questionList[i][k].vraagId}">
                            <svg style="margin-bottom: -4px; margin-right:8px;" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#08518B" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z"/><path fill="none" d="M0 0h24v24H0z"/></svg>
                            Verwijderen 
                        </button>
                  </table>
              </span>
            </div>
        </td> 
      </tr>`;
    }
    htmlQuestion += `</table>`
  }
  htmlQuestion += `</table>`
  document.getElementById("js-question").innerHTML = htmlQuestion;
  for (let i = 0; i < themaList.length; i++)
  {
    deleteThemaListener = document.querySelector(`.js-deleteThema${themaList[i].themaId}`)
    deleteThemaListener.addEventListener('click', function() {confirmation(themaList[i])});
  }
}

const confirmation = function (thema)
{
    Swal.fire({
        title: 'Weet je het zeker?',
        text: `Ben je zeker dat je thema "${thema.naam}" en alle bijhorende vragen wilt verwijderen?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Annuleren',
        confirmButtonText: 'Ja, ik ben zeker!'
      }).then((result) => {
        if (result.value) {
            deleteThema(thema.themaId)
        }
      })
}

const deleteThema = async function (themaId)
{
    //confirmation verwijder elke vraag van dit thema, ook met andere niveaus
    console.log(themaId);
    for(let i = 1; i < 4; i++)
    {
        const data = await fetchData(`https://moveforfortunefunction.azurewebsites.net/api/v1/vragen/${i}/${themaId}`);
        if (data.length != 0)
        {
            for(let k = 0; k < data.length; k++)
            {
                await deleteQuestion(data[k].vraagId, false);
            }
        }
    }

    fetch('https://moveforfortunefunction.azurewebsites.net/api/v1/thema/' + themaId, {
        method: 'DELETE',
    })

    setTimeout(() => {
        getAPI(themaList[0].themaId, 1);
        Swal.fire(
            'Verwijderd!',
            'Het thema en de bijhorende vragen zijn verwijderd.',
            'success'
        )
        getThemas();
    }, 500);
}


function myFunction(id, item1, item2 = "")
{
  if (statuspopup == false)
  {
    console.log("show");
    console.log(`.js-delete${id}`);
    console.log(`#js-update${item1}`);
    console.log(`${item2}`);
    deleteQuerySelector = document.querySelector(`.js-delete${id}`);
    deleteQuerySelector.addEventListener('click', function() {deleteQuestion(id, true)});
    editQuestion(`js-update${item1}${item2}`, item1, item2);
    // updateQuerySelector = document.querySelector(`#js-update${item1}${item2}`);
    // updateQuerySelector.addEventListener('click', function() {updateQuestion(item1, item2)});
    var popup = document.getElementById(`myPopup${id}`);
    popup.classList.toggle("show");
    statuspopup = true;
    previousid = id;
  }
  else
  {
    console.log("hide");
    var popup = document.getElementById(`myPopup${previousid}`);
    popup.classList.toggle("show");
    statuspopup = false;
    if (previousid != id)
    {
      myFunction(id, item1, item2);
    }
  }
}

const deleteQuestion = function (id, getQuestions)
{
  console.log(id);
  fetch('https://moveforfortunefunction.azurewebsites.net/api/v1/vragen/' + id, {
    method: 'DELETE',
  })
  console.log(`question with id #${id} has been deleted`);
  if (getQuestions)
  {
    setTimeout(() => {getAPI(thema, niveau)}, 500);
  }
}

/*
const updateQuestion = function (item1, item2 = '')
{
  if (item2 === '')
  {
    console.log(questionList[item1]);
    editQuestion(`js-update${item1}`);
  }
  else
  {
    console.log(questionList[item1][item2]);
    editQuestion(`js-update${item1}${item2}`);
  }
}
*/

const addQuestion = function ()
{
    console.log("vraag toevoegen")
    // Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// Get the final button that closes the modal
var finish = document.getElementById("js-buttonQuestionAddedSuccessfully");

// When the user clicks the button, open the modal
btn.addEventListener("click", function() {
  newQuestion = true;
  modal.style.display = "block";
  document.getElementById('js-newQuestion').style.display = 'block';
  document.getElementById('js-title').style.display = 'block';
  document.getElementById("js-title").innerHTML = `<h1 class="c-title">Nieuwe vraag:</h1>`;
  document.getElementById('js-selectTheme').style.display = 'none';
  document.getElementById('js-addThema').style.display = 'none';
  document.getElementById('js-addThema').style.display = 'none';
  document.getElementById('js-themeAddedSuccessfully').style.display = 'none';
  document.getElementById('js-questionAddedSuccessfully').style.display = 'none';
  finish.style.display = 'none';

  document.getElementById("vraag").value = '';
  document.getElementById("jantw").value = '';
  document.getElementById("vantw1").value = '';
  document.getElementById("vantw2").value = '';

  eventListenersValid = [false, false, false, false];
  alleventListenersValid = false;
  grayButton('js-validInputs');
});

// When the user clicks on <span> (x), close the modal
span.addEventListener("click",function() {
  modal.style.display = "none";
});

// When the user clicks anywhere outside of the modal, close it
window.addEventListener("click",function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
});

// When the user clicks on the finish button, close the modal
finish.addEventListener("click",function() {
    modal.style.display = "none";
  });

}; //end add question


const editQuestion = function (buttonId, item1, item2)
{
    // Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById(buttonId);

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// Get the final button that closes the modal
var finish = document.getElementById("js-buttonQuestionAddedSuccessfully");

// When the user clicks the button, open the modal
btn.addEventListener("click", function() {
  newQuestion = false;
  modal.style.display = "block";
  document.getElementById('js-newQuestion').style.display = 'block';
  document.getElementById('js-title').style.display = 'block';
  document.getElementById("js-title").innerHTML = `<h1 class="c-title">Vraag aanpassen:</h1>`;
  document.getElementById('js-selectTheme').style.display = 'none';
  document.getElementById('js-addThema').style.display = 'none';
  document.getElementById('js-addThema').style.display = 'none';
  document.getElementById('js-themeAddedSuccessfully').style.display = 'none';
  document.getElementById('js-questionAddedSuccessfully').style.display = 'none';
  finish.style.display = 'none';
  
  if (item2 === '')
  {
    questionData = questionList[item1];
  }
  else
  {
      console.log(item1, item2)
    questionData = questionList[item1][item2];
  }
  console.log();
  document.getElementById("vraag").value = questionData.vraagstelling;
  document.getElementById("jantw").value = questionData.juistAntwoord;
  document.getElementById("vantw1").value = questionData.foutAntwoord1;
  document.getElementById("vantw2").value = questionData.foutAntwoord2;

  eventListenersValid = [true, true, true, true];
  alleventListenersValid = true;
  yellowButton('js-validInputs');
});

// When the user clicks on <span> (x), close the modal
span.addEventListener("click",function() {
  modal.style.display = "none";
});

// When the user clicks anywhere outside of the modal, close it
window.addEventListener("click",function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
});

// When the user clicks on the finish button, close the modal
finish.addEventListener("click",function() {
    modal.style.display = "none";
  });

}; //end edit question





const enableListeners = function()
{
    question.addEventListener('input', function() {checkValue(0)});
    correctAnswer.addEventListener('input', function() {checkValue(1)});
    wrongAnswer1.addEventListener('input', function() {checkValue(2)});
    wrongAnswer2.addEventListener('input', function() {checkValue(3)});
    
    eventListeners.push(question, correctAnswer, wrongAnswer1, wrongAnswer2);

    newThemeInput.addEventListener('input', function() {checkValueTheme(newThemeInput)});
}
const isEmpty = function(fieldValue)
{
	return !fieldValue || !fieldValue.length;
}
const checkValue = function(input)
{
    if (isEmpty(eventListeners[input].value))
    {
        eventListenersValid[input] = false;
        if (!eventListenersValid[0] || !eventListenersValid[1] || !eventListenersValid[2] || !eventListenersValid[3])
        {
            alleventListenersValid = false;
            grayButton('js-validInputs');
        }
    }
    else
    {
        if (eventListenersValid[input] == false)
        {
            eventListenersValid[input] = true;
            if (eventListenersValid[0] && eventListenersValid[1] && eventListenersValid[2] && eventListenersValid[3])
            {
                alleventListenersValid = true;
                yellowButton('js-validInputs');
            }
        }
    }
}

const checkValueTheme = function (input)
{
    if (isEmpty(input.value))
    {
        validThemeInput = false;
        grayButton('js-validThemeInput');
    }
    else
    {
        if (validThemeInput == false)
        {
            validThemeInput = true;
            yellowButton('js-validThemeInput');
        }
    }
}

const grayButton = function (buttonId)
{
    document.getElementById(buttonId).style.backgroundColor = '#D9D9D9';
    document.getElementById(buttonId).style.color = '#6E6E6E';
    document.getElementById(buttonId).onmouseover = function()
    {
        this.style.backgroundColor = '#D9D9D9';
    }
    document.getElementById(buttonId).onmouseout = function()
    {
        this.style.backgroundColor = '#D9D9D9';
    }
}

const yellowButton = function (buttonId)
{
    document.getElementById(buttonId).style.backgroundColor = '#F8F067';
    document.getElementById(buttonId).style.color = '#08518B';
    document.getElementById(buttonId).onmouseover = function()
    {
        this.style.backgroundColor = '#FFFAA3';
    }
    document.getElementById(buttonId).onmouseout = function()
    {
        this.style.backgroundColor = '#F8F067';
    }
}


const submitQuestion = async function ()
{
    if (alleventListenersValid)
    {
        questionValue = document.getElementById("vraag").value;
        correctAnswerValue = document.getElementById("jantw").value;
        wrongAnswer1Value = document.getElementById("vantw1").value;
        wrongAnswer2Value = document.getElementById("vantw2").value;
        document.getElementById('js-newQuestion').style.display = 'none';
        document.getElementById('js-selectTheme').style.display = 'block';

        document.getElementById("js-themaSelect1").innerHTML = ``;
        let htmlNiveau = `<select id="niveau">
            <option value="1">Niveau 1</option>
            <option value="1">Niveau 1</option>
            <option value="2">Niveau 2</option>
            <option value="3">Niveau 3</option>
            </select>`;
        document.getElementById("js-niveauSelect1").innerHTML = htmlNiveau;
        document.getElementById("js-niveauSelect").innerHTML = htmlNiveau;
        DropDown();
        DropDown2();
        
        await getThemas();
        if (themaList[0] != null)
        {
            getAPI(themaList[0].themaId, 1);
        }
        if (newQuestion)
        {
            document.getElementById('js-validThemeSelect').style.display = 'block';
            document.getElementById('js-validThemeSelectEditQuestion').style.display = 'none';
        }
        else
        {
            document.getElementById('js-validThemeSelect').style.display = 'none';
            document.getElementById('js-validThemeSelectEditQuestion').style.display = 'block';
            yellowButton('js-validThemeSelectEditQuestion');
        }
        if (themas.length == 0)
        {
            grayButton("js-validThemeSelect");
        }
        else
        {
            yellowButton("js-validThemeSelect");
        }
        getThemes();
    }
}

const submitTheme = function ()
{
    //let niveauId = document.getElementById("niveau").value;
    //let themaId = document.getElementById("thema").value;
    console.log(niveau)
    console.log(thema)

    if (thema != 0)
    {
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "https://moveforfortunefunction.azurewebsites.net/api/v2/vragen");
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify({
            "Vraagstelling": questionValue,
            "JuistAntwoord": correctAnswerValue,
            "FoutAntwoord1": wrongAnswer1Value,
            "FoutAntwoord2": wrongAnswer2Value,
            "Niveau": niveau,
            "ThemaId": thema
        }));
        xhr.onreadystatechange = function ()
        {
            if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200)
            {
                console.log("the question has succesfully been added");
                //document.getElementById('js-newQuestion').style.display = 'block';
                document.getElementById('js-selectTheme').style.display = 'none';
                document.getElementById('js-title').style.display = 'none';
                document.getElementById('js-questionAddedSuccessfully').style.display = 'block';
                document.getElementById("js-questionAddedSuccessfully").innerHTML = `<h1 class="c-title">Nieuwe vraag is succesvol toegevoegd!</h1>`;
                document.getElementById("js-buttonQuestionAddedSuccessfully").style.display = 'block';
                console.log(thema)
                niveau = 1;
                thema = themaList[0].themaId;
                getAPI(thema, niveau);
            }
            else if (xhr.readyState == XMLHttpRequest.DONE)
            {
                console.log("something went wrong, please try again later");
            }
        }
    }
}

const submitNewTheme = function ()
{
    if (validThemeInput)
    {
        let themaNaam = document.getElementById("newth").value;
        
        let xhr = new XMLHttpRequest();
        xhr.open("POST", `https://moveforfortunefunction.azurewebsites.net/api/v2/themas/${leerkrachtId}`);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify({
            "naam": themaNaam
        }));
        xhr.onreadystatechange = function ()
        {
            if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200)
            {
                console.log("the theme has succesfully been added");
                yellowButton("js-buttonThemeAddedSuccessfully");
                document.getElementById('js-addThema').style.display = 'none';
                document.getElementById('js-themeAddedSuccessfully').style.display = 'block';
                document.getElementById('js-title').style.display = 'none';
                noNewThemes = false;
                //document.getElementById('js-selectTheme').style.display = 'block';

                document.getElementById("js-themaSelect").innerHTML = ``;
                getThemas();
                getAPI(thema, niveau);
                document.getElementById("newth").value = '';
                grayButton('js-validThemeInput');
                validThemeInput = false
            }
            else if (xhr.readyState == XMLHttpRequest.DONE)
            {
                console.log("something went wrong, please try again later");
            }
        }
    }
}

const updateQuestion = function ()
{
    console.log("got so far")

    let niveauId = document.getElementById("niveau").value;
    let themaId = document.getElementById("thema").value;

    let xhr = new XMLHttpRequest();
    xhr.open("PUT", `https://moveforfortunefunction.azurewebsites.net/api/v1/vragen/${questionData.vraagId}`);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        "Vraagstelling": questionValue,
        "JuistAntwoord": correctAnswerValue,
        "FoutAntwoord1": wrongAnswer1Value,
        "FoutAntwoord2": wrongAnswer2Value,
        "Niveau": niveauId,
        "ThemaId": themaId
    }));
    xhr.onreadystatechange = function ()
    {
        if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200)
        {
            console.log("the question has succesfully been added");
            //document.getElementById('js-newQuestion').style.display = 'block';
            document.getElementById('js-selectTheme').style.display = 'none';
            document.getElementById('js-title').style.display = 'none';
            document.getElementById('js-questionAddedSuccessfully').style.display = 'block';
            document.getElementById("js-questionAddedSuccessfully").innerHTML = `<h1 class="c-title">Vraag is succesvol aangepast!</h1>`;
            document.getElementById("js-buttonQuestionAddedSuccessfully").style.display = 'block';
            if (themaId == thema && niveauId == niveau)
            {
                getAPI(thema, niveau);
            }
            console.log("get themes");
        }
        else if (xhr.readyState == XMLHttpRequest.DONE)
        {
            console.log("something went wrong, please try again later");
        }
    }


}

const getThemes = async function ()
{
    themas = [];
    themaIndexes = [];
    try
    {
        const data = await fetchData(`https://moveforfortunefunction.azurewebsites.net/api/v1/themas/${leerkrachtId}`);
        for (let i = 0; i < data.length; i++)
        {
            themas.push(data[i].naam);
            themaIndexes.push(data[i].themaId)
        }
    }
    catch(error)
    {
        console.error('An error occured', error);
    }
    showThemes()
}

const showThemes = function ()
{
    if (themas.length != 0)
    {
        let htmlTheme = `<option value=${themaIndexes[0]}>${themas[0]}</option>`;

        for (let i = 0; i < themas.length; i++)
        {
            htmlTheme += `<option value=${themaIndexes[i]}>${themas[i]}</option>`;
        }

        let selectThema = document.getElementById("thema");
        selectThema.innerHTML = htmlTheme;
        if (!noNewThemes)
        {
            selectThema.selectedIndex = themas.length-1;
            console.log("selected thema: "+(themas.length-1).toString())
        }
        else
        {
            if (thema == 'all')
            {
                thema = themaIndexes[0];
            }
            if (newQuestion)
            {
                selectThema.selectedIndex = themaIndexes.indexOf(parseInt(thema,10));
            }
            else
            {
                selectThema.selectedIndex = themaIndexes.indexOf(parseInt(questionData.themaId,10));
            }
        }

        let selectNiveau = document.getElementById("niveau");
        if (newQuestion)
        {
            selectNiveau.selectedIndex = niveau-1;
        }
        else
        {
            selectNiveau.selectedIndex = questionData.niveau-1;
        }
    }
    else
    {
        //let htmlTheme = `<option value=0>Geen themas</option>`;
        //document.getElementById("thema").innerHTML = htmlTheme;
    }
}


const newTheme = function ()
{
    document.getElementById('js-selectTheme').style.display = 'none';
    document.getElementById('js-addThema').style.display = 'block';

    let htmlTitle = `<h1 class="c-title">Nieuw thema:</h1>`;
    document.getElementById("js-title").innerHTML = htmlTitle;
}

const goBackToThemaSelect = function ()
{
    document.getElementById('js-themeAddedSuccessfully').style.display = 'none';
    document.getElementById('js-title').style.display = 'block';
    document.getElementById('myBtn').style.display = 'block';
    document.getElementById('js-selectTheme').style.display = 'block';

    let htmlTitle = `<h1 class="c-title c-title-toevoegen">Nieuwe vraag:</h1>`;
    document.getElementById("js-title").innerHTML = htmlTitle;

    yellowButton("js-validThemeSelect");
    getThemes();
}

const init = async function()
{
    console.log("DOM loaded");
    DropDown();
    await getThemas();
    getAPI(thema, niveau);
    //await DropDown1();
    //getAPI(thema,niveau);

    getThemes();
    console.log(themas);

    //AddQuestionButton = document.querySelector('.js-addQuestion');
    //AddQuestionButton.addEventListener('click', addQuestion);
    addQuestion();

    buttonNewTheme = document.querySelector('.js-newTheme');
    buttonNewTheme.addEventListener('click', newTheme);

    //buttonThemeAdded = document.querySelector('.js-goBackToPreviousPage');
    //buttonThemeAdded.addEventListener('click', goBackToSelectTheme);

    buttonGoBackToThemaSelect = document.querySelector('.js-goBackToThemaSelect');
    buttonGoBackToThemaSelect.addEventListener('click', goBackToThemaSelect);

    question = document.querySelector('#vraag');
    correctAnswer = document.querySelector('#jantw');
    wrongAnswer1 = document.querySelector('#vantw1');
    wrongAnswer2 = document.querySelector('#vantw2');

    newThemeInput = document.querySelector('#newth');

    document.getElementById('js-selectTheme').style.display = 'none';
    document.getElementById('js-addThema').style.display = 'none';
    document.getElementById('js-questionAddedSuccessfully').style.display = 'none';
    document.getElementById('js-themeAddedSuccessfully').style.display = 'none';

    enableListeners();
    grayButton('js-validInputs');
    grayButton('js-validThemeInput');
    yellowButton('js-buttonQuestionAddedSuccessfully');
};

document.addEventListener('DOMContentLoaded', init);