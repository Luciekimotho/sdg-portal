/*
TODO:
- Check data labels after drilling. Label rank? New positions?
*/

// Function to load specific country data on map click start
function loadCountryData(countryId) {
    var countryDataURL = '../assets/data/countryProfile.json';
    var countryData = null;
    countryDemographicsChart(countryId);
    countryBarometerGraph(countryId,1);
    $.getJSON(countryDataURL, function (data) {
        for (var key in data) {
            var newKey = parseInt(key, 10);
            if ((newKey--) == countryId) {
                countryData = {
                    "name": data[newKey].name,
                    "capital": data[newKey].capital,
                    "region": data[newKey].region,
                    "flagURL": data[newKey].flagURL,
                    "size": data[newKey].size,
                    "capitalPopulation": data[newKey].capitalPopulation,
                    "totalPopulation": data[newKey].totalPopulation
                };
                var profile = '<div class="person-list-item">' +
                    '<h3 id="countryName"><i class="fa fa-info"></i> Name:' + countryData.name + '</h3>' +
                    '<h4 class="white" id="region"><i class="fa fa-globe"></i> Region:' + countryData.region + '</h4>' +
                    '<h4 class="white" id="capitalCity"><i class="fa fa-map-marker"></i> Capital:' + countryData.capital + '</h4>' +
                    '</div>';
                var flagURL = '<img src="'+'../' + countryData.flagURL + '" class="img-fluid" style="max-width:50%;max-height:50%;float: right;">';
                var countryStatistics = '<div class="col-md-4 user-pad text-center">' +
                    '<h3>SIZE(sq.km)</h3>' +
                    '<h4>' + countryData.size + '</h4>' +
                    '</div>' +
                    '<div class="col-md-4 user-pad text-center">' +
                    '<h3>TOTAL POPULATION</h3>' +
                    '<h4>' + countryData.totalPopulation + '</h4>' +
                    '</div>' +
                    '<div class="col-md-4 user-pad text-center">' +
                    '<h3>CAPITAL POPULATION</h3>' +
                    '<h4>' + countryData.capitalPopulation + '</h4>' +
                    '</div>';
                $('#countryProfile').empty().append(profile);
                $('#flagURL').empty().append(flagURL);
                $('#countryStatistics').empty().append(countryStatistics);
                $('#myModal').modal('show');
            }
        }
    });
}

// Function to load specific country data on map click end
var dataSourceURL = null;

function updateAfricaMap(n) {
    if (n == 411) {
        $('#myModal').modal('hide');
        dataSourceURL = '../assets/data/trial.json';
        loadMap(1);

    }
    else if (412) {
        $('#myModal').modal('hide');
        dataSourceURL = '../assets/data/trial.json';
        loadMap(1);
    }
}

$(document).ready(function () {
    dataSourceURL = '../assets/data/trial.json';
    loadMap(1);
});

function loadMap(n) {
    if (n == 1) {
        var data = $.getJSON(dataSourceURL, function (data) {

            Highcharts.mapChart('container', {
                chart: {
                    map: 'custom/africa',
                    backgroundColor: 'transparent',
                    width: 1000,
                    height: 650
                },

                title: {
                    text: ''
                },
                legend: {
                    enabled: false
                },
                exporting: {
                    enabled: false
                },
                plotOptions: {
                    series: {
                        point: {
                            events: {
                                click: function () {
                                    loadCountryData(this.value);
                                }
                            }
                        }
                    }
                },

                mapNavigation: {},

                colorAxis: {
                    min: 0,
                    minColor: '#00BFFF',
                    maxColor: '#00BFFF'
                },

                series: [{
                    data: data,
                    mapData: Highcharts.maps['custom/africa'],
                    joinBy: ['iso-a2', 'code'],
                    name: 'Country Profile',
                    cursor: 'pointer',
                    borderColor: 'black', //changes color of the country borders
                    borderWidth: 0.5,
                    states: {
                        hover: {
                            color: '#B22222'
                        }
                    },
                    dataLabels: {
                        // enabled: true,
                        // format: '{point.name}'
                    }
                }]
            });
        });
    }
}