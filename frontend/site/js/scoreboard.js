
const loadGraph = function (){
    var ctx = document.getElementById('myChart').getContext("2d");
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Team 1', 'Team 2'],
            datasets: [{
                label: 'Teams',
                data: [2, 5],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            "hover": {
              "animationDuration": 0
            },
            "animation": {
              "duration": 1,
              "onComplete": function() {
                var chartInstance = this.chart,
                  ctx = chartInstance.ctx;
        
                ctx.font = Chart.helpers.fontString(16, 'normal', 'Sniglet');
                ctx.textAlign = 'center';
                ctx.textBaseline = 'bottom';
                ctx.fillStyle  = "#035266";
        
                this.data.datasets.forEach(function(dataset, i) {
                  var meta = chartInstance.controller.getDatasetMeta(i);
                  meta.data.forEach(function(bar, index) {
                    var data = dataset.data[index];
                    ctx.fillText(data, bar._model.x, bar._model.y - 5);
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
                    gridLines: {
                        color: "rgba(0, 0, 0, 0)",
                    },
                    ticks: {
                        fontColor: "#035266", // this here
                        defaultFontFamily: 'Sniglet',
                        fontsize: 24
                        
                      },
                }],
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        display: false,
                    },
                    gridLines: {
                        color: "rgba(0, 0, 0, 0)",
                        zeroLineColor: '#035266'
                    },
                    
                }]
            }
        }
    });
}


const init = function()
{
    console.log("DOM Loaded");
    loadGraph();
}

document.addEventListener('DOMContentLoaded', init);