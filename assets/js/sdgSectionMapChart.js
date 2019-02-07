/*
TODO:
- Check data labels after drilling. Label rank? New positions?
*/
$(document).ready(function () {
    loadMap(1);
});

function loadTarget(containerID) {
    loadMap(1, containerID);//TODO function called 1
}

//Function to load map
function loadMap(n, containerID) {
    if (n == 1) {
        $("#container" + containerID).css({"width": "100%", "height": "500px"});
        var dataSourceURL = '../assets/data/sdgTarget11.json';
        var countriesData = null;
        $.getJSON(dataSourceURL, function (data) {
            countriesData = data;
        });
        var geoj = Highcharts.maps['custom/world-continents'] = {
                "title": "World continents",
                "version": "1.1.2",
                "type": "FeatureCollection",
                "copyright": "Copyright (c) 2015 Highsoft AS, Based on data from Natural Earth",
                "copyrightShort": "Natural Earth",
                "copyrightUrl": "http://www.naturalearthdata.com",
                "crs": {"type": "name", "properties": {"name": "urn:ogc:def:crs:EPSG:54003"}},
                "hc-transform": {
                    "default": {
                        "crs": "+proj=mill +lat_0=0 +lon_0=0 +x_0=0 +y_0=0 +R_A +datum=WGS84 +units=m +no_defs",
                        "scale": 1.70655279715e-05,
                        "jsonres": 15.5,
                        "jsonmarginX": -999,
                        "jsonmarginY": 9851.0,
                        "xoffset": -19863092.8548,
                        "yoffset": 12635908.1982
                    }
                },
                "features": [
                    {
                        "type": "Feature",
                        "id": "AF",
                        "properties": {
                            "hc-group": "admin0",
                            "hc-middle-x": 0.66,
                            "hc-middle-y": 0.54,
                            "hc-key": "af",
                            "hc-a2": "AF",
                            "abbrev-a3": "AFR",
                            "iso-a2": "AF",
                            "name": "Africa"
                        },
                        "geometry": {
                            "type": "MultiPolygon",
                            "coordinates": [[[[3731, 7363], [3734, 7372], [3752, 7352], [3758, 7360], [3781, 7367], [3802, 7353], [3797, 7341], [3790, 7349], [3772, 7354], [3749, 7350], [3731, 7363]]], [[[4096, 7606], [4096, 7606], [4096, 7606], [4115, 7584], [4129, 7581], [4129, 7581], [4129, 7581], [4168, 7587], [4180, 7579], [4203, 7580], [4220, 7594], [4286, 7625], [4333, 7629], [4341, 7636], [4396, 7639], [4409, 7631], [4437, 7639], [4458, 7639], [4472, 7645], [4488, 7637], [4514, 7642], [4545, 7654], [4562, 7633], [4580, 7645], [4583, 7638], [4564, 7620], [4567, 7604], [4580, 7596], [4583, 7584], [4567, 7561], [4553, 7553], [4559, 7533], [4580, 7536], [4584, 7517], [4618, 7504], [4648, 7507], [4702, 7490], [4711, 7466], [4727, 7454], [4766, 7448], [4790, 7438], [4813, 7422], [4824, 7422], [4844, 7439], [4848, 7452], [4841, 7468], [4845, 7483], [4860, 7495], [4891, 7507], [4907, 7508], [4934, 7498], [4934, 7488], [4964, 7477], [4990, 7476], [4996, 7462], [5015, 7465], [5059, 7457], [5109, 7439], [5123, 7443], [5148, 7461], [5194, 7462], [5199, 7447], [5206, 7454], [5230, 7446], [5261, 7455], [5261, 7455], [5261, 7455], [5269, 7434], [5279, 7404], [5281, 7396], [5250, 7321], [5256, 7305], [5300, 7223], [5305, 7191], [5340, 7164], [5340, 7151], [5352, 7126], [5349, 7112], [5353, 7075], [5363, 7063], [5389, 7044], [5400, 7022], [5409, 6983], [5423, 6958], [5435, 6980], [5432, 6957], [5440, 6948], [5466, 6939], [5481, 6919], [5499, 6908], [5513, 6886], [5530, 6875], [5531, 6861], [5513, 6852], [5534, 6842], [5544, 6825], [5557, 6815], [5578, 6814], [5602, 6828], [5621, 6822], [5648, 6836], [5695, 6839], [5734, 6849], [5749, 6861], [5764, 6856], [5758, 6837], [5760, 6818], [5753, 6811], [5750, 6786], [5734, 6757], [5721, 6742], [5697, 6688], [5665, 6639], [5609, 6580], [5565, 6554], [5534, 6527], [5493, 6483], [5480, 6463], [5438, 6421], [5406, 6359], [5396, 6332], [5403, 6319], [5411, 6341], [5419, 6321], [5410, 6312], [5418, 6300], [5411, 6280], [5428, 6282], [5410, 6265], [5421, 6239], [5423, 6217], [5445, 6205], [5450, 6191], [5444, 6167], [5449, 6128], [5447, 6108], [5456, 6083], [5449, 6053], [5429, 6025], [5406, 6011], [5370, 5996], [5346, 5981], [5328, 5960], [5277, 5920], [5275, 5903], [5284, 5894], [5289, 5872], [5298, 5862], [5300, 5843], [5296, 5798], [5299, 5790], [5288, 5775], [5247, 5759], [5222, 5746], [5223, 5705], [5207, 5651], [5189, 5638], [5172, 5619], [5149, 5577], [5104, 5531], [5076, 5506], [5035, 5483], [5010, 5481], [5011, 5474], [4989, 5475], [4986, 5468], [4950, 5475], [4944, 5471], [4919, 5475], [4893, 5462], [4870, 5463], [4842, 5448], [4810, 5470], [4794, 5469], [4799, 5479], [4780, 5514], [4793, 5519], [4790, 5551], [4763, 5593], [4749, 5634], [4716, 5670], [4705, 5690], [4692, 5739], [4690, 5769], [4681, 5789], [4683, 5829], [4678, 5847], [4665, 5862], [4649, 5891], [4642, 5912], [4616, 5956], [4604, 5973], [4600, 5991], [4603, 6023], [4601, 6043], [4608, 6049], [4616, 6074], [4623, 6113], [4656, 6149], [4662, 6183], [4660, 6196], [4643, 6224], [4637, 6242], [4649, 6252], [4648, 6265], [4633, 6296], [4632, 6307], [4616, 6330], [4612, 6357], [4603, 6374], [4546, 6430], [4528, 6454], [4530, 6469], [4521, 6471], [4516, 6485], [4528, 6497], [4530, 6543], [4543, 6564], [4548, 6599], [4538, 6624], [4519, 6615], [4518, 6642], [4430, 6635], [4420, 6644], [4412, 6665], [4399, 6684], [4385, 6695], [4369, 6697], [4311, 6692], [4290, 6687], [4284, 6679], [4265, 6678], [4232, 6661], [4194, 6647], [4186, 6652], [4138, 6662], [4083, 6656], [4036, 6636], [4012, 6643], [3982, 6659], [3949, 6689], [3921, 6705], [3907, 6718], [3874, 6730], [3885, 6731], [3874, 6750], [3868, 6748], [3863, 6782], [3855, 6795], [3830, 6808], [3820, 6830], [3802, 6837], [3800, 6846], [3783, 6836], [3780, 6846], [3792, 6845], [3803, 6860], [3780, 6855], [3763, 6871], [3760, 6901], [3768, 6908], [3750, 6940], [3769, 6974], [3771, 6999], [3784, 7039], [3778, 7070], [3769, 7083], [3779, 7107], [3758, 7136], [3756, 7155], [3769, 7172], [3791, 7219], [3817, 7245], [3820, 7269], [3831, 7294], [3854, 7308], [3874, 7346], [3917, 7359], [3944, 7380], [3971, 7417], [3964, 7435], [3965, 7458], [3980, 7478], [3983, 7496], [4004, 7519], [4035, 7531], [4054, 7544], [4070, 7572], [4081, 7602], [4096, 7606]]], [[[5707, 5964], [5699, 5945], [5673, 5861], [5665, 5845], [5654, 5798], [5641, 5765], [5615, 5756], [5593, 5745], [5583, 5744], [5550, 5763], [5541, 5781], [5542, 5810], [5530, 5830], [5526, 5848], [5535, 5876], [5546, 5889], [5563, 5919], [5563, 5931], [5551, 5964], [5548, 5993], [5562, 6016], [5563, 6032], [5574, 6030], [5587, 6039], [5615, 6046], [5637, 6061], [5668, 6094], [5663, 6103], [5673, 6115], [5689, 6114], [5693, 6140], [5704, 6158], [5713, 6138], [5724, 6126], [5730, 6103], [5733, 6075], [5740, 6054], [5733, 6038], [5723, 6054], [5715, 6051], [5721, 6021], [5709, 5999], [5707, 5964]]]]
                        }
                    }]
            },
            // cities = [
            //     {
            //         name: 'Johannesburg',
            //         continent: ['Africa', 'South Africa'],
            //         lat: -26.2041,
            //         lon: 28.0473
            //     },
            //     {
            //         name: 'Morocco',
            //         continent: ['Africa', 'Algeria'],
            //         lat: 31.7917,
            //         lon: 7.0926
            //     }
            // ],
            data = [
                {
                    code: 'af',
                    drilldown: 'custom/africa',
                    value: 2
                }
            ]

        $('#container' + containerID).highcharts('Map', {
            chart: {
                events: {
                    drilldown: function (e) {
                        var chart = this,
                            mapKey = e.point.drilldown,
                            chartName = e.point.name;
                        console.log(e.point.drilldown);
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
        $("#container" + containerID).css({"width": "100%", "height": "500px"});
        var chart = AmCharts.makeChart("container" + containerID, {
            "creditsPosition": "bottom-right",
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
