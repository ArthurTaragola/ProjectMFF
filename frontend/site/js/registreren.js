let eventListeners = [];
let emailValid = false;
let eventListenersValid = [false, false, false];
let alleventListenersValid = false;

const enableListeners = function()
{
    firstNameListener.addEventListener('input', function () {checkValue(0)});
    nameListener.addEventListener('input', function () {checkValue(1)});
    emailListener.addEventListener('input', checkEmailAddress);
    passwordListener.addEventListener('input', function () {checkValue(2)});
    
    eventListeners.push(firstNameListener, nameListener, passwordListener);
}
const isEmpty = function(fieldValue)
{
	return !fieldValue || !fieldValue.length;
}
const checkValue = function(index)
{
    if (isEmpty(eventListeners[index].value))
    {
        console.log('leeg');
        eventListenersValid[index] = false;
        if (alleventListenersValid)
        {
            alleventListenersValid = false;
            grayButton('js-validInputs');
            console.log("you can't post now");
        }
    }
    else
    {
        if (!eventListenersValid[index])
        {
            console.log('niet leeg');
            eventListenersValid[index] = true;
            if (eventListenersValid[0] && eventListenersValid[1] && eventListenersValid[2] && emailValid)
            {
                alleventListenersValid = true;
                yellowButton('js-validInputs');
                console.log("you can post now");
            }
        }
    }
}

const isValidEmailAddress = function(emailAddress) {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailAddress);
}
const checkEmailAddress = function()
{
    if (isValidEmailAddress(emailListener.value))
    {
        if (!emailValid)
        {
            console.log("valid email");
            emailValid = true;
            if (eventListenersValid[0] && eventListenersValid[1] && eventListenersValid[2] && emailValid)
            {
                alleventListenersValid = true;
                yellowButton('js-validInputs');
                console.log("you can post now");
            }
        }
    }
    else
    {
        if (emailValid)
        {
            emailValid = false;
            alleventListenersValid = false;
            grayButton('js-validInputs');
            console.log('Invalid emailaddress');
        }
	}
}

const grayButton = function ()
{
    document.getElementById("js-registerButton").style.backgroundColor = '#D9D9D9';
    document.getElementById("js-registerButton").style.borderColor = '#A8A8A8';
    document.getElementById("js-registerButton").style.color = '#6E6E6E';
    document.getElementById("js-registerButton").onmouseover = function()
    {
        this.style.backgroundColor = '#D9D9D9';
        this.style.borderColor = '#A8A8A8';
    }
    document.getElementById("js-registerButton").onmouseout = function()
    {
        this.style.backgroundColor = '#D9D9D9';
        this.style.borderColor = '#A8A8A8';
    }
}

const yellowButton = function ()
{
    document.getElementById("js-registerButton").style.backgroundColor = '#F8F067';
    document.getElementById("js-registerButton").style.borderColor = '#D4CB2F';
    document.getElementById("js-registerButton").style.color = '#08518B';
    document.getElementById("js-registerButton").onmouseover = function()
    {
        this.style.backgroundColor = '#FFFAA3';
        this.style.borderColor = '#F8F067';
    }
    document.getElementById("js-registerButton").onmouseout = function()
    {
        this.style.backgroundColor = '#F8F067';
        this.style.borderColor = '#D4CB2F';
    }
}


function DoSubmit()
{
    if (alleventListenersValid)
    {
        grayButton();

        let xhr = new XMLHttpRequest();

        let firstName = document.getElementById("voornaam").value;
        let name = document.getElementById("naam").value;
        let email = document.getElementById("email").value.toLowerCase();
        let password = document.getElementById("ww").value;
        let password2 = document.getElementById("ww2").value;

        if(password == password2){
            xhr.open("POST", "https://moveforfortunefunction.azurewebsites.net/api/v2/leerkrachten");
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(JSON.stringify({
                "Voornaam": firstName,
                "Naam": name,
                "Email": email,
                "wachtwoord": password
            }));
            xhr.onreadystatechange = function ()
            {
                if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200)
                {
                    yellowButton();
                    console.log("the account has succesfully been made");
                    //response = xhr.responseText; 
                    //console.log(response); //expect leerkrachtId
                    window.location.href = "login.html";
                }
            }
        }
        else{
            alert("Wachtwoorden niet gelijk")
        }
    }
}

const init = function()
{
    console.log("DOM loaded");
    firstNameListener = document.querySelector('#voornaam');
    nameListener = document.querySelector('#naam');
    passwordListener = document.querySelector('#ww');
    emailListener = document.querySelector('#email');
    enableListeners();
    grayButton();
};

document.addEventListener('DOMContentLoaded', init);