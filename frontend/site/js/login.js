const DoSubmit = function()
{
    let xhr = new XMLHttpRequest();

    let email = document.getElementById("email").value;
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
            var response = xhr.responseText; 
            console.log(response);
        }
    }
    console.log(email)
    console.log(password)
}

const init = function()
{
    console.log("DOM loaded");
};

document.addEventListener('DOMContentLoaded', init);