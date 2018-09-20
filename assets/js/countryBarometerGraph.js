function sdgGoal(sdgID) {
    console.log(sdgID);
    var countryID=localStorage.getItem("countryID");
    countryBarometerGraph(countryID,sdgID);
}
function countryBarometerGraph(countryID,sdgID) {
    var countryBarometerDataURL = 'assets/data/' + countryID + 'BarometerChartData.json';
    $.getJSON(countryBarometerDataURL, function (data) {
        for (var key in data){
            var newKey = parseInt(key, 10);
            if ((newKey--) === sdgID) {
                var score=data[newKey].score;
                var gaugeChart = AmCharts.makeChart("chartdiv2", {
                    "creditsPosition":"bottom-right",
                    "theme": "light",
                    "type": "gauge",
                    "axes": [{
                        "topTextFontSize": 20,
                        "topTextYOffset": 70,
                        "axisColor": "#31d6ea",
                        "axisThickness": 1,
                        "endValue": 100,
                        "gridInside": true,
                        "inside": true,
                        "radius": "50%",
                        "valueInterval": 10,
                        "tickColor": "#67b7dc",
                        "startAngle": -90,
                        "endAngle": 90,
                        "unit": "%",
                        "bandOutlineAlpha": 0,
                        "bands": [
                            {
                                "color": "#84b761",
                                "endValue": 100,
                                "innerRadius": "105%",
                                "radius": "170%",
                                "startValue": 71
                            },
                            {
                                "color": "#fdd400",
                                "endValue": 70,
                                "innerRadius": "105%",
                                "radius": "190%",
                                "startValue": 41
                            }, {
                                "color": "#cc4748",
                                "endValue": 40,
                                "innerRadius": "105%",
                                "radius": "170%",
                                "startValue": 0
                            }
                        ]
                    }],
                    "arrows": [{
                        "alpha": 1,
                        "innerRadius": "35%",
                        "nailRadius": 0,
                        "radius": "170%"
                    }]
                });
                randomValue(score);
                setInterval(function () {
                    randomValue(score);
                }, 10000);

                function randomValue(goalValue) {
                    gaugeChart.arrows[0].setValue(goalValue);
                    gaugeChart.axes[0].setTopText(goalValue + " %");
                    setTimeout(function () {
                        gaugeChart.arrows[0].setValue(0);
                        gaugeChart.axes[0].setTopText(0 + " %");
                    }, 5000);

                }
            }
        }

    }).fail(function () {
        var noData = '<div  class="row""><div class="col-md-2"></div>' +
            '<div class="col-md-8"><p style="text-align: center;vertical-align: center;margin-top: 30%;font-weight: bold;">' +
            '<i class="fa fa-warning" style="font-size:40px;color:red"></i><br>No Data Available</p></div>' +
            '<div class="col-md-2"></div></div>';
        $('#chartdiv2').empty().append(noData);
    });
}