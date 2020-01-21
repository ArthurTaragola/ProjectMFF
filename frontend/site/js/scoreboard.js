let pointsTeam1;
let pointsTeam2;

let quizIsFinished = false;

let winningTeam;

let leerkrachtId = localStorage.getItem("leerkrachtId");

let audioVictory = new Audio('sounds/victory.mp3')

const loadGraph = function (){
    let team1 = true;
    let img = document.getElementById("bird1");
    let img2 = document.getElementById("bird2");
    let img3 = document.getElementById("crown");
    var ctx = document.getElementById('myChart').getContext("2d");
    if (pointsTeam1 == 0)
    {
        pointsTeam1 = "";
    }
    if (pointsTeam2 == 0)
    {
        pointsTeam2 = "";
    }
    var myChart = new Chart(ctx, {
        type: 'horizontalBar',
        data: {
            labels: ['Team 1', 'Team 2'],
            datasets: [{
                label: 'Teams',
                data: [pointsTeam1, pointsTeam2],
                backgroundColor: [
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 99, 132, 0.2)'
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 99, 132, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {

            layout: {
                padding: {
                    right: 80
                }
            },
            defaultFontFamily: Chart.defaults.global.defaultFontFamily = 'Sniglet',
            defaultFontSize: Chart.defaults.global.defaultFontSize = 24,
            "hover": {
              "animationDuration": 0
            },
            "animation": {
              "duration": 1,
              "onComplete": function() {
                var chartInstance = this.chart,
                  ctx = chartInstance.ctx;
        
                ctx.font = Chart.helpers.fontString(24, 'normal', 'Sniglet');
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.textAlign = 'right';
                ctx.fillStyle  = "#035266";

                this.data.datasets.forEach(function(dataset, i) {
                  var meta = chartInstance.controller.getDatasetMeta(i);
                  meta.data.forEach(function(bar, index) {
                    var data = dataset.data[index];
                    ctx.fillText(data, bar._model.x - 30, bar._model.y);
                    if (team1)
                    {
                        if (pointsTeam1 == null)
                        {
                            bar._model.x = 100;
                        }
                        ctx.drawImage(img, bar._model.x + 10, bar._model.y - 38);
                        if ((quizIsFinished && winningTeam == 1) || winningTeam == 3)
                        {
                            ctx.drawImage(img3, bar._model.x + 56, bar._model.y - 10);
                        }
                        team1 = false;
                    }
                    else
                    {
                        if (pointsTeam2 == null)
                        {
                            bar._model.x = 100;
                        }
                        ctx.drawImage(img2, bar._model.x + 10, bar._model.y - 38);
                        if ((quizIsFinished && winningTeam == 2) || winningTeam == 3)
                        {
                            ctx.drawImage(img3, bar._model.x + 56, bar._model.y - 10);
                        }
                        team1 = true;
                    }
                  });
                });
              }
            },
            legend: {
                "display": false
              },
              tooltips: {
                "enabled": false
              },
            scales: {
                xAxes: [{
                    ticks: {
                        beginAtZero: true,
                        display: false,
                    },
                    gridLines: {
                        color: "rgba(0, 0, 0, 0)",
                        zeroLineColor: '#035266'
                    },
                    
                }],
                yAxes: [{
                    gridLines: {
                        color: "rgba(0, 0, 0, 0)",
                    },
                    ticks: {
                        fontColor: "#035266", // this here
                        defaultFontFamily: 'Sniglet',
                        fontsize: 24
                      },
                }]
            }
        }
    });
}

const checkQuestions = function ()
{
    if (questionList.length == 0)
    {
        quizIsFinished = true;
        if (pointsTeam1 > pointsTeam2)
        {
            winningTeam = 1;
            console.log("Team 1 wins with a total of "+pointsTeam1);
        }
        else if (pointsTeam1 < pointsTeam2)
        {
            winningTeam = 2;
            console.log("Team 2 wins with a total of "+pointsTeam2);
        }
        else
        {
            winningTeam = 3;
            console.log("Both teams win with a total of "+pointsTeam1);
        }

        let html = `<h1 class="question">Eindstand!</h1></button>`;
        document.getElementById("js-title").innerHTML = html;

        html = `<button class= "c-button c-button-volgende js-stopButton">Stop quiz</button>`;
        document.getElementById("js-endButton").innerHTML = html;
    }
}

const goToNewPage = function ()
{
    if (!quizIsFinished)
    {
        window.location.href = "vragenquiz.html";
    }
    else
    {
        console.log("that's all kids");
        if (pointsTeam1 > pointsTeam2)
        {
            console.log("Team 1 wins with a total of "+pointsTeam1);
        }
        else
        {
            console.log("Team 2 wins with a total of "+pointsTeam2);
        }
    }
}

const goToHomePage = function ()
{
    if (leerkrachtId == 25) //superuser
    {
        window.location.href = "index.html";
    }
    else
    {
        window.location.href = "quiz.html";
    }
}

const keyPressed = function (e)
{
    if (e.code == 'Space' || e.key == 'Enter')
    {
        if (quizIsFinished)
        {
            goToHomePage();
        }
        goToNewPage();
    }
}

const init = function()
{
    console.log("DOM Loaded");
    pointsTeam1 = JSON.parse(localStorage.getItem("pointsTeam1"));
    pointsTeam2 = JSON.parse(localStorage.getItem("pointsTeam2"));
    questionList = JSON.parse(localStorage.getItem("questions"));
    checkQuestions();
    loadGraph();
    document.addEventListener("keydown", keyPressed, false);
    if (!quizIsFinished)
    {
        nextQuestion = document.querySelector('.js-nextButton');
        nextQuestion.addEventListener('click', goToNewPage);
    }
    else
    {
        audioVictory.play();
        stopQuiz = document.querySelector('.js-stopButton');
        stopQuiz.addEventListener('click', goToHomePage);
    }
}

document.addEventListener('DOMContentLoaded', init);