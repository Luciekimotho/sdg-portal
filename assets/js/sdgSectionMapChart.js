/*
TODO:
- Check data labels after drilling. Label rank? New positions?
*/
$(document).ready(function () {
    loadMap(1);
});

function loadTarget(containerID) {
    loadMap(1,containerID);
}

function loadMap(n,containerID) {
    if (n == 1) {
        $("#container"+containerID).css({"width":"100%", "height":"500px"});
        var dataSourceURL = '../assets/data/sdgTarget11.json';
        var countriesData = null;
        $.getJSON(dataSourceURL, function (data) {
            countriesData = data;
        });
        var geoj = Highcharts.maps['custom/world-continents'],
            cities = [
                {
                    name: 'Johannesburg',
                    continent: ['Africa', 'South Africa'],
                    lat: -26.2041,
                    lon: 28.0473
                },
                {
                    name: 'Morocco',
                    continent: ['Africa', 'Algeria'],
                    lat: 31.7917,
                    lon: 7.0926
                }
            ],
            data = [
                {
                    code: 'af',
                    drilldown: 'custom/africa',
                    value: 1
                }
            ]

        $('#container'+containerID).highcharts('Map', {
            chart: {
                events: {
                    drilldown: function (e) {
                            var chart = this,
                                mapKey = e.point.drilldown,
                                chartName = e.point.name;

                            $.getScript('https://code.highcharts.com/mapdata/' + mapKey + '.js', function () {
                                var data = [],
                                    // chosenCities = [],
                                    drillPath,
                                    // continentName = e.point.name,
                                    regionMap = Highcharts.maps[mapKey],
                                    regionMapGeoJson = Highcharts.geojson(regionMap);

                                $.each(regionMapGeoJson, function (indxx, elem) {
                                    drillPath = 'countries/' + elem.properties['hc-key'].slice(0, 2) + '/' + elem.properties['hc-key'] + '-all';
                                    data.push({
                                        code: elem.properties['hc-key'],
                                        value: indxx,
                                        drilldown: drillPath
                                    })
                                });
                                // document.write(JSON.stringify(data));
                                // Hide loading and add series
                                chart.addSingleSeriesAsDrilldown(e.point, {
                                    name: e.point.name,
                                    data: countriesData,
                                    mapData: regionMap,
                                    joinBy: ['hc-key', 'code'],
                                });

                                // cities.forEach(function (el, inx) {
                                //     if ($.inArray(continentName, el.continent) !== -1) {
                                //         chosenCities.push(el);
                                //     }
                                // });
                                chart.applyDrilldown();

                                chart.setTitle(null, {
                                    text: chartName
                                });
                            }).fail(function (jqxhr, settings, exception) {
                                console.log('Couldn\'t find JS file!');
                            });
                    },
                    drillup: function () {
                        this.setTitle(null, {
                            text: ''
                        });
                    }
                }
            },
            title: {
                text: ''
            },
            subtitle: {
                text: 'World',
                floating: true,
                align: 'right',
                y: 50,
                style: {
                    fontSize: '16px'
                }
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle'
            },
            colorAxis: {
                min: 0,
                maxColor: '#FF0000',
                minColor: '#008000'
            },
            mapNavigation: {
                enabled: true,
                buttonOptions: {
                    verticalAlign: 'bottom'
                }
            },
            plotOptions: {
                map: {
                    states: {
                        hover: {
                            color: '#EEDD66'
                        }
                    }
                }
            },
            series: [{
                name: 'World',
                data: data,
                mapData: geoj,
                joinBy: ['hc-key', 'code'],
                dataLabels: {
                    enabled: true,
                    allowOverlap: true,
                    formatter: function () {
                        return this.point.code.toUpperCase();
                    }
                }
            }
            ],
            drilldown: {
                activeDataLabelStyle: {
                    color: '#FFFFFF',
                    textDecoration: 'none',
                    textShadow: '0 0 3px #000000'
                },
                drillUpButton: {
                    relativeTo: 'spacingBox',
                    position: {
                        x: 0,
                        y: 60
                    }
                }
            }
        });
        window.scrollTo(0, document.body.scrollHeight);
    }
    if (n == 2) {
        $("#container"+containerID).css({"width":"100%", "height":"500px"});
        var chart = AmCharts.makeChart("container"+containerID, {
            "creditsPosition":"bottom-right",
            "theme": "light",
            "type": "serial",
            "startDuration": 2,
            "dataProvider": [{
                "country": "Algeria",
                "visits": 25,
                "color": "#FF0F00"
            }, {
                "country": "Angola",
                "visits": 35,
                "color": "#FF6600"
            }, {
                "country": "Benin",
                "visits": 15,
                "color": "#FF9E01"
            }, {
                "country": "Botswana",
                "visits": 56,
                "color": "#FCD202"
            }, {
                "country": "Burkina faso",
                "visits": 78,
                "color": "#F8FF01"
            }, {
                "country": "Burundi",
                "visits": 68,
                "color": "#B0DE09"
            }, {
                "country": "Cameroon",
                "visits": 43,
                "color": "#04D215"
            }, {
                "country": "Cabo Verde",
                "visits": 26,
                "color": "#0D8ECF"
            }, {
                "country": "Central African Republic",
                "visits": 60,
                "color": "#0D52D1"
            }, {
                "country": "Chad",
                "visits": 70,
                "color": "#2A0CD0"
            }, {
                "country": "Comoros",
                "visits": 32,
                "color": "#8A0CCF"
            }, {
                "country": "Congo",
                "visits": 67,
                "color": "#CD0D74"
            }, {
                "country": "Democratic Republic of the Congo",
                "visits": 78,
                "color": "#754DEB"
            }, {
                "country": "Cote d'Ivoire",
                "visits": 55,
                "color": "#DDDDDD"
            }, {
                "country": "Djibouti",
                "visits": 90,
                "color": "#999999"
            }, {
                "country": "Egypt",
                "visits": 50,
                "color": "#333333"
            }, {
                "country": "Equatorial Guinea",
                "visits": 11,
                "color": "#000000"
            }],
            "valueAxes": [{
                "position": "left",
                "title": "Percentage(%)"
            }],
            "graphs": [{
                "balloonText": "[[category]]: <b>[[value]]</b>",
                "fillColorsField": "color",
                "fillAlphas": 1,
                "lineAlpha": 0.1,
                "type": "column",
                "valueField": "visits"
            }],
            "depth3D": 20,
            "angle": 30,
            "chartCursor": {
                "categoryBalloonEnabled": false,
                "cursorAlpha": 0,
                "zoomable": false
            },
            "categoryField": "country",
            "categoryAxis": {
                "gridPosition": "start",
                "labelRotation": 90
            },
            "export": {
                "enabled": true
            }

        });

    }
}
