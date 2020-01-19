function DoSubmit()
{
    let xhr = new XMLHttpRequest();

    let firstName = document.getElementById("voornaam").value;
    let name = document.getElementById("naam").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("ww").value;

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
            console.log("the account has succesfully been made");
            response = xhr.responseText; 
            console.log(response); //expect leerkrachtId
            //go to new page
        }
    }
}

const init = function()
{
    console.log("DOM loaded");
};

document.addEventListener('DOMContentLoaded', init);