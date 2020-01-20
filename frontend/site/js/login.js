const DoSubmit = function()
{
    let xhr = new XMLHttpRequest();

    var response;

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
            response = xhr.responseText; 
            console.log(response);
            if (response == parseInt(response, 10))
            {
                console.log("succesfull login");
                localStorage.setItem("leerkrachtId", response);
                window.location.href = "quiz.html";
            }
        }
    }
    console.log(email)
    //console.log(password)
}

const init = function()
{
    console.log("DOM loaded");
};

document.addEventListener('DOMContentLoaded', init);