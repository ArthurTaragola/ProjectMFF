let emailValid = false;
let passwordValid = false;

const enableListeners = function()
{
    email.addEventListener('input', checkEmailAddress);
    password.addEventListener('input', checkValue);
}
const isEmpty = function(fieldValue)
{
	return !fieldValue || !fieldValue.length;
}
const checkValue = function()
{
    if (isEmpty(password.value))
    {
        console.log('leeg');
        passwordValid = false;
        grayButton('js-validInputs');
        console.log("you can't post now");
    }
    else
    {
        if (!passwordValid)
        {
            console.log('niet leeg');
            passwordValid = true;
            if (passwordValid && emailValid)
            {
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
    if (isValidEmailAddress(email.value))
    {
        if (!emailValid)
        {
            console.log("valid email");
            emailValid = true;
            if (passwordValid && emailValid)
            {
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
            grayButton('js-validInputs');
            console.log('Invalid emailaddress');
        }
	}
}

const grayButton = function ()
{
    document.getElementById("js-loginButton").style.backgroundColor = '#D9D9D9';
    document.getElementById("js-loginButton").style.borderColor = '#A8A8A8';
    document.getElementById("js-loginButton").style.color = '#6E6E6E';
    document.getElementById("js-loginButton").onmouseover = function()
    {
        this.style.backgroundColor = '#D9D9D9';
        this.style.borderColor = '#A8A8A8';
    }
    document.getElementById("js-loginButton").onmouseout = function()
    {
        this.style.backgroundColor = '#D9D9D9';
        this.style.borderColor = '#A8A8A8';
    }
}

const yellowButton = function ()
{
    document.getElementById("js-loginButton").style.backgroundColor = '#F8F067';
    document.getElementById("js-loginButton").style.borderColor = '#D4CB2F';
    document.getElementById("js-loginButton").style.color = '#08518B';
    document.getElementById("js-loginButton").onmouseover = function()
    {
        this.style.backgroundColor = '#FFFAA3';
        this.style.borderColor = '#F8F067';
    }
    document.getElementById("js-loginButton").onmouseout = function()
    {
        this.style.backgroundColor = '#F8F067';
        this.style.borderColor = '#D4CB2F';
    }
}

const DoSubmit = function()
{
    if (passwordValid && emailValid)
    {
        grayButton();

        let xhr = new XMLHttpRequest();

        var response;

        let email = document.getElementById("email").value.toLowerCase();
        console.log(email)
        let password = document.getElementById("ww").value;

        xhr.open("POST", "https://moveforfortunefunction.azurewebsites.net/api/v1/login");
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(
            {
            "Email": email,
            "wachtwoord": password
            }));
        xhr.onreadystatechange = function ()
        {
            if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200)
            {
                yellowButton();
                response = xhr.responseText; 
                console.log(response);
                if (response == parseInt(response, 10))
                {
                    console.log("succesfull login");
                    localStorage.setItem("leerkrachtId", response);
                    window.location.href = "quiz.html";
                }
                else
                {
                    alert(response)
                }
            }
        }
    }
}

const init = function()
{
    console.log("DOM loaded");
    email = document.querySelector('.js-email');
    password = document.querySelector('.js-password');
    enableListeners();
    grayButton();
};

document.addEventListener('DOMContentLoaded', init);