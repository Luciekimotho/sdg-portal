var completeDataPath = '';
let chartData='';
let countriesData='';
let chart='';
let chartNew='';
let period = 2019;
let year = 2018;
let globalDataSourceURL = '../assets/data/SDGs/sdgTarget_';

let title = ''
let goal = ''
let description = ''

//Loads after the page is ready
$(document).ready(function () {
    $("[id^='filter']").hide();
    $("[id^='chartTypes']").hide(); 
    $(".card-footer").hide();

    loadSDG();

});

function loadSDG(){
    var pageUrl = window.location.href
    var postfix = pageUrl.slice(-7)
    var goalStr = postfix.slice(0, 2)
    var goalNo = Number(goalStr)
    var index
    var sdgAPIUrl = 'https://unstats.un.org/SDGAPI/v1/sdg/Goal/List'

    fetch(sdgAPIUrl)
    .then((resp) => resp.json())
    .then(function(data){
        index = goalNo-1
            title = data[index].title
            description = data[index].description

            var values = getShortHandDescriptionColor(goalNo)
            document.title = "SDG " + goalNo + " " + "|" + values[0];
            document.getElementById("title").innerHTML = title;
            document.getElementById("description").innerHTML = values[1];
            document.getElementById("sdgTitle").innerHTML = "SDG " + goalNo + " targets";
            document.getElementById("sdgIcon").src = "../assets/img/sdg_icons/E_SDG_Icons-" + goalStr + ".jpg";
            document.getElementById("sdgBg").style.backgroundColor = values[2];
            getTargets(goalNo)
    })   
}

function getTargets(goalNo){
    var baseUrl = 'https://unstats.un.org/SDGAPI/v1/sdg/Goal/'
    var targetAPIUrl = baseUrl + goalNo + '/Target/List?includechildren=true'
    var code, title 
    var firstBtnID, firstTarget

    fetch(targetAPIUrl)
    .then((resp)=>resp.json())
    .then(function(data){

        var targets = data[0].targets
        firstBtnID = targets[0].code.replace(".", "");
        firstTarget = targets[0].code.replace(".", "");

        for ( var i=0; i<targets.length; i++ ) {
            //Dynamically create target butons and append to div
            code = targets[i].code
            title = targets[i].title

            var id = code.replace(".", ""); 
            var id2 = id

            if(isNaN(code)){
                var revCode = code.split("").reverse().join("");
                id2 = revCode.replace(".", ""); 
               // id2 = "'" + id2 + "'"
            }
            var containerId = i+1;

            var  buttons =  ' <a data-toggle="tab" id="btn'+ id +'" href="#target'+ id + '" onclick="loadTarget(' + containerId + ','+  id2 + ')" class="btn btn-danger sdg' + goalNo + '-btn">' 
                + "Target " + code + '</a>'
        
            $('.targetButtons').append(buttons);
           
            //Create the tab contents
            var navContent =  ' <div class="col-md-10 card tab-pane fade" id="target'+ id +'" style="border-radius: 0;background-color: white">' + 
                              ' <p style="text-align: center;color: black;"><i> ' + 'Target '+ code + ': ' + title + '</i></p> '  + 
                              ' <div class=" row text-center"> ' + 
                                    ' <div class="col-md-6"> ' +
                                        ' <button id="gbd'+ containerId + ' " class="btn btn-primary btn-data" onclick="loadGlobalData(1,11)">Global Database</button> ' +
                                        ' <button id="mrs'+ containerId + '" class="btn btn-primary btn-data" onclick="loadPanAfricanData(1,11)">PanAfrican MRS</button> ' +
                                    ' </div> ' + 
                              ' <div class="col-md-3"></div> ' +
                              ' <div class="col-md-2"> ' +
                                  ' <select id="selectPeriod'+id2+'" class="btn btn-primary" onchange="choosePeriod('+ containerId+','+id2+');">' + 
                                      ' <option value="default"> Select a Period</option>' + 
                                      ' <option value="2019">2019</option>' + 
                                      ' <option value="2018">2018</option>' + 
                                      ' <option value="2017">2017</option>' + 
                                      ' <option value="2016">2016</option>' +
                                  ' </select>' +
                              ' </div>' +
                          ' </div>' + 
                          ' <div> ' + 
                            '<div> ' + 
                                '<div id="filter'+containerId+'" style="text-align: center;margin-top: 1%;">' +
                                    '<select class="selectpicker" multiple data-live-search="true" id="african_countries' + containerId + '" onchange="applyFilters('+containerId+')">' +

                                    '</select>'+
                                '</div>'+
                                '<div id="chartTypes'+containerId+'" style="text-align: right;">'+
                                    '<button id="column" style="margin-left: 2em" class="btn btn-primary">'+
                                        '<i class="far fa-chart-bar"></i>'+
                                    '</button>'+
                                    '<button id="line" class="btn btn-primary">'+
                                        '<i class="fas fa-chart-line"></i>'+   
                                    '</button>'+
                                '</div>'+
                            '</div>'+
                            '<div class="row card-body" id="container'+ containerId +'">'+
                            '</div>'+
                            '<hr>'+
                            '<div class="card">'+
                                    '<div class="card-body">'+
                                        '<div class="row slider-div">'+
                                                '<div class="col-md-2"></div>'+
                                            '<div class="col-md-1">'+
                                                '<button id="play" class="btn btn-primary btn-just-icon">'+
                                                    '<i class="nc-icon nc-button-play"></i>'+
                                                '</button>'+
                                            '</div>'+
                                            '<div class="col-md-4" style="padding-right: 0px;padding-left: 0px;">'+
                                                    '<input id="yearslider" class="range blue" type="range" min="2010" value="2010" max="2019" step="1" list="ticks" >'+
                                                    '<datalist id="ticks">'+
                                                        '<option>2010</option>'+
                                                        '<option>2011</option>'+
                                                        '<option>2012</option>'+
                                                        '<option>2013</option>'+
                                                        '<option>2014</option>'+
                                                        '<option>2015</option>'+
                                                        '<option>2016</option>'+
                                                        '<option>2017</option>'+
                                                        '<option>2018</option>'+
                                                        '<option>2019</option>'+
                                                    '</datalist>'+
                                            '</div>'+
                                            '<div class="col-md-1 output-div">'+
                                                    '<output id="rangevalue" class="output-year">2010</output>'+
                                            '</div>'+
                                            '<div class="col-md-4">'+
                                                '<button class="btn btn-primary" onclick="changeVisualization(1,'+containerId+');"><span class="fa fa-globe"></span>Map</button>'+
                                                ' <button class="btn btn-primary" onclick="changeVisualization(2,'+containerId+');"><span class="fa fa-bar-chart"></span>Chart'+
                                            ' </button>'+
                                            '</div>'+
                                        '</div>'+
                                    '</div>'+
                          ' </div>'+
                        '</div>'
            $('.tab-content').append(navContent);
        }

        $("#btn"+firstBtnID).click();

        $("[id^='filter']").hide();
        $('#chartTypes').hide();  
    
        timeRangeSlider();
    })
    
}

function getShortHandDescriptionColor(goalNo){
    var shortHand, description, color
    switch(goalNo){
        case 1:
            shortHand = ' No Poverty'
            description = 'UN definition: "Extreme poverty rates have fallen by more than half since 1990. While this is a remarkable achievement, one-in-five people in developing regions still live on less than $1.90 a day. Millions more make little more than this daily amount and are at risk of slipping back into extreme poverty."'
            color = '#e5243b';
            break
        case 2:
            shortHand = ' Zero Hunger'
            description = 'UN definition: "It is time to rethink how we grow, share and consume our food.If done right, agriculture, forestry and fisheries can provide nutritious food for all and generate decent incomes, while supporting people-centred rural development and protecting the environment." '
            color = '#dda73a'
            break
        case 3:
            shortHand = ' Good Health and Well Being'
            description = 'UN definition: "Significant strides have been made in increasing life expectancy and reducing some of the common killers responsible for child and maternal mortality." '
            color = '#4C9F38'
            break
        case 4:
            shortHand = ' Quality Education'
            description = 'UN definition: "Obtaining a quality education underpins a range of fundamental development drivers. Major progress has been made towards increasing access to education at all levels, particularly for women and girls. Basic literacy skills across the world have improved tremendously, yet bolder efforts are needed to achieve universal education goals for all. For example, the world has achieved equality in primary education between girls and boys, but few countries have achieved that target at all levels of education."'
            color = '#C5192D'
            break
        case 5:
            shortHand = ' Gender Equality'
            description = ' UN definition: "Gender equality is not only a fundamental human right, but a necessary foundation for a peaceful, prosperous and sustainable world. Providing women and girls with equal access to education, health care, decent work, and representation in political and economic decision-making processes will fuel sustainable economies and benefit societies and humanity at large."  '
            color = '#FF3A21'
            break
        case 6:
            shortHand = ' Clean Water & Sanitation '
            description = 'UN definition: "Clean water is a basic human need, and one that should be easily accessible to all. There is sufficient fresh water on the planet to achieve this. However, due to poor infrastructure, investment and planning, every year millions of people — most of them children — die from diseases associated with inadequate water supply, sanitation and hygiene."'
            color = '#26BDE2'
            break
        case 7:
            shortHand = ' Affordable And Clean Energy'
            description = 'UN definition: "Energy is central to nearly every major challenge and opportunity the world faces today. Be it for jobs, security, climate change, food production or increasing incomes, access to energy for all is essential. Transitioning the global economy towards clean and sustainable sources of energy is one of our greatest challenges in the coming decades. Sustainable energy is an opportunity – it transforms lives, economies and the planet." '
            color = '#FCC30B'
            break
        case 8:
            shortHand = ' Decent Work And Economic Growth'
            description = 'UN definition: "Roughly half the world’s population still lives on the equivalent of about US$2 a day. And in too many places, having a job doesn’t guarantee the ability to escape from poverty. This slow and uneven progress requires us to rethink and retool our economic and social policies aimed at eradicating poverty." '
            color = '#A21942'
            break
        case 9:
            shortHand = ' Industry, Innovation And Infrastructure'
            description = '  UN definition: "Investments in infrastructure – transport, irrigation, energy and information and communication technology – are crucial to achieving sustainable development and empowering communities in many countries. It has long been recognized that growth in productivity and incomes, and improvements in health and education outcomes require investment in infrastructure." '
            color = '#FD6925'
            break
        case 10:
            shortHand = ' Reduced Inequalities'
            description = 'UN definition: "The international community has made significant strides towards lifting people out of poverty. The most vulnerable nations – the least developed countries, the landlocked developing countries and the small island developing states – continue to make inroads into poverty reduction. However, inequality still persists and large disparities remain in access to health and education services and other assets." '
            color = '#DD1367'
            break
        case 11:
            shortHand = ' Sustainable Cities And Communities'
            description = 'UN definition: "The challenges cities face can be overcome in ways that allow them to continue to thrive and grow, while improving resource use and reducing pollution and poverty. The future we want includes cities of opportunities for all, with access to basic services, energy, housing, transportation and more." '
            color = '#FD9D24'
            break
        case 12:
            shortHand = ' Responsible Consumption and Production'
            description = 'UN definition: "Sustainable consumption and production is about promoting resource and energy efficiency, sustainable infrastructure, and providing access to basic services, green and decent jobs and a better quality of life for all. Its implementation helps to achieve overall development plans, reduce future economic, environmental and social costs, strengthen economic competitiveness and reduce poverty." '
            color = '#BF8B2E'
            break
        case 13:
            shortHand = ' Climate Action'
            description = 'UN definition: "Affordable, scalable solutions are now available to enable countries to leapfrog to cleaner, more resilient economies. The pace of change is quickening as more people are turning to renewable energy and a range of other measures that will reduce emissions and increase adaptation efforts." '
            color = '#3F7E44'
            break
        case 14:
            shortHand = ' Life Below Water'
            description = 'UN definition: "Our oceans — their temperature, circulation, chemistry, and ecosystems — play a fundamental role in making Earth habitable. Our rainwater, drinking water, weather, climate, coastlines, much of our food, and even the oxygen in the air we breathe, are all ultimately provided and regulated by the sea. Throughout history, oceans and seas have been vital conduits for trade and transportation. Careful management of this essential global resource is a key feature of a sustainable future." '
            color = '#0A97D9'
            break
        case 15:
            shortHand = ' Life On Land'
            description = 'UN definition: "Forests cover 30 per cent of the Earth’s surface and in addition to providing food security and shelter, forests are key to combating climate change, protecting biodiversity and the homes of the indigenous population. Thirteen million hectares of forests are being lost every year while the persistent degradation of drylands has led to the desertification of 3.6 billion hectares." '
            color = '#56C02B'
            break
        case 16:
            shortHand = ' Peace, Justice And Strong Institutions'
            description = 'UN definition: "Goal 16 of the Sustainable Development Goals is dedicated to the promotion of peaceful and inclusive societies for sustainable development, the provision of access to justice for all, and building effective, accountable institutions at all levels." '
            color = '#00689D'
            break
        case 17:
            shortHand = ' Partnership For The Goals'
            description = 'UN definition: "A successful sustainable development agenda requires partnerships between governments, the private sector and civil society. These inclusive partnerships built upon principles and values, a shared vision, and shared goals that place people and the planet at the centre, are needed at the global, regional, national and local level." '
            color = '#19486A'
            break
    }
    return [shortHand, description, color]
}

//Called when a target is clicked
function loadTarget(containerID, targetNo) {
    $("button[id^='gbd']").show();
    $("button[id^='mrs']").show();
    
    if(globalDataSourceURL.match(/^.*csv/)){
        var prefix = globalDataSourceURL.slice(0, 30);
        var postfix = globalDataSourceURL.slice(32);
        
        globalDataSourceURL = prefix + targetNo + postfix;
       // loadMap(1, containerID, globalDataSourceURL);
    }
    
    if(globalDataSourceURL.charAt(30) === '' || globalDataSourceURL.charAt(33)=== ''){
        var prefix = globalDataSourceURL.slice(0, 30);
        globalDataSourceURL = prefix + targetNo + '_';
    }

    loadGlobalData(containerID, targetNo);
    $("select[id^='selectPeriod']").val("2019");
    choosePeriod(containerID,targetNo);
}

//Choose data source toggle buttons
function loadGlobalData(containerIDNo, targetNo){
    var source = "gdb";
    $("button[id^='gbd']").addClass('active');
    $("button[id^='mrs']").removeClass('active');

    if(globalDataSourceURL.match(/^.*csv$/)){
        var prefix = globalDataSourceURL.slice(0, 33);
        var postfix = globalDataSourceURL.slice(36);
        globalDataSourceURL = prefix + source + postfix;
        loadMap(1, containerIDNo, globalDataSourceURL);  
        
    }

    if(globalDataSourceURL.charAt(34)=== '' || globalDataSourceURL.charAt(37) ===''){
        var prefix = globalDataSourceURL.slice(0, 33);
        globalDataSourceURL = prefix + source;
        $("select[id^='selectPeriod']").show();
    } 
}

function loadPanAfricanData(containerIDNo, targetNo){
    var source= "mrs";
    if(globalDataSourceURL.match(/^.*csv/)){
        var prefix = globalDataSourceURL.slice(0, 33);
        var postfix = globalDataSourceURL.slice(36);
        globalDataSourceURL = prefix + source + postfix;
        loadMap(1, containerIDNo, globalDataSourceURL);
    }

    if(globalDataSourceURL.charAt(34)=== '' || globalDataSourceURL.charAt(37) ===''){
        var prefix = globalDataSourceURL.slice(0, 33);
        globalDataSourceURL = prefix + source;
        $("select[id^='selectPeriod']").show();
    } 
    $("button[id^='mrs']").addClass('active');
    $("button[id^='gbd']").removeClass('active');
}

//ChoosePeriod function
function choosePeriod(containerIDNo, targetNo){
    var selectorID=$("#selectPeriod" + targetNo );
    period = selectorID.val();
    
    if(globalDataSourceURL.match(/^.*csv/)){
        var prefix = globalDataSourceURL.slice(0, 36);
        globalDataSourceURL = prefix + '.csv';
        loadMap(1,containerIDNo,globalDataSourceURL);
        //completeDataPath = globalDataSourceURL;
    }
    if(globalDataSourceURL.charAt(35) === '' || globalDataSourceURL.charAt(40) === ''){
        var prefix = globalDataSourceURL.slice(0, 36);
        globalDataSourceURL = prefix + '.csv';
        completeDataPath = globalDataSourceURL;

        loadMap(1,containerIDNo,globalDataSourceURL);
    }
    //console.log(period)
    //console.log(globalDataSourceURL);
}

function changeVisualization(n, containerIDNo) {
    if (n === 1) {
        //console.log(dataSourceURL);
        $("[id^='filter']").hide();
        $("[id^='chartTypes']").hide();
        loadMap(1,containerIDNo,completeDataPath);
    }
    if (n === 2) {
        //console.log(dataSourceURL);
        $("[id^='filter']").show();
        $("[id^='chartTypes']").show();
        loadMap(2,containerIDNo,completeDataPath);
        // $('.slider-div').hide();
    }

}

//Function to load map

function loadMap(n, containerID, dataSourceURL) {
    if (n == 1) {
        $("[id^='filter']").hide(); 
        $("[id^='chartTypes']").hide();
        dataSourceURL = completeDataPath
        $("#container" + containerID).css({"width": "100%", "height": "400px"});
        $.get(dataSourceURL, function (data){
           // countriesData = data;
            
            var lines = data.split('\n');
            var result = [];
            var headers = lines[0].split(",");

            //console.log(headers);

            for(var i=1; i < lines.length; i++){
                var dataObj ={};
                var currLine = lines[i].split(",");

                for(var j=0; j<headers.length; j++){
                    dataObj[headers[j]] = currLine[j];
                }
                result.push(dataObj);
            }
            //console.log('Map result' + result);
            
            countriesData = result;
            
            var geoj = Highcharts.maps["custom/africa"] = {
                "title": "Africa",
                "version": "1.1.2",
                "type": "FeatureCollection",
                "copyright": "Copyright (c) 2019 Africa SDG Watch",
                "copyrightShort": "Africa SDG Watch",
                "copyrightUrl": "https://sdgcafrica.org/",
                "crs": {"type": "name", "properties": {"name": "urn:ogc:def:crs:EPSG:102024"}},
                "hc-transform": {
                    "default": {
                        "crs": "+proj=lcc +lat_1=20 +lat_2=-23 +lat_0=0 +lon_0=25 +x_0=0 +y_0=0 +datum=WGS84 +units=m +no_defs",
                        "scale": 8.12423194296e-05,
                        "jsonres": 15.5,
                        "jsonmarginX": -999,
                        "jsonmarginY": 9851.0,
                        "xoffset": -5257539.5112,
                        "yoffset": 4185728.66873
                    }
                },
                "features": [{
                    "type": "Feature",
                    "id": "UG",
                    "properties": {
                        "hc-group": "admin0",
                        "hc-middle-x": 0.59,
                        "hc-middle-y": 0.45,
                        "hc-key": "ug",
                        "hc-a2": "UG",
                        "name": "Uganda",
                        "labelrank": "3",
                        "country-abbrev": "Uga.",
                        "subregion": "Eastern Africa",
                        "region-wb": "Sub-Saharan Africa",
                        "iso-a3": "UGA",
                        "iso-a2": "UG",
                        "woe-id": "23424974",
                        "continent": "Africa"
                    },
                    "geometry": {
                        "type": "MultiPolygon",
                        "coordinates": [[[[6582, 4531], [6568, 4527], [6555, 4538], [6573, 4540], [6582, 4531]]], [[[6690, 4597], [6697, 4617], [6714, 4617], [6709, 4588], [6690, 4597]]], [[[6512, 4449], [6512, 4451], [6514, 4449], [6512, 4449]]], [[[6227, 4517], [6261, 4561], [6234, 4567], [6267, 4644], [6265, 4681], [6337, 4740], [6350, 4712], [6398, 4776], [6457, 4821], [6441, 4861], [6367, 4899], [6387, 4955], [6373, 4973], [6385, 5032], [6425, 5071], [6472, 5054], [6508, 5074], [6560, 5036], [6586, 5063], [6670, 5082], [6737, 5068], [6796, 5126], [6820, 5067], [6856, 5054], [6848, 5017], [6873, 4960], [6918, 4899], [6925, 4794], [6901, 4737], [6863, 4720], [6796, 4610], [6740, 4602], [6701, 4628], [6667, 4593], [6613, 4597], [6525, 4561], [6538, 4539], [6496, 4475], [6507, 4449], [6382, 4449], [6335, 4441], [6260, 4389], [6219, 4399], [6216, 4460], [6227, 4517]]]]
                    }
                }, {
                    "type": "Feature",
                    "id": "NG",
                    "properties": {
                        "hc-group": "admin0",
                        "hc-middle-x": 0.50,
                        "hc-middle-y": 0.45,
                        "hc-key": "ng",
                        "hc-a2": "NG",
                        "name": "Nigeria",
                        "labelrank": "2",
                        "country-abbrev": "Nigeria",
                        "subregion": "Western Africa",
                        "region-wb": "Sub-Saharan Africa",
                        "iso-a3": "NGA",
                        "iso-a2": "NG",
                        "woe-id": "23424908",
                        "continent": "Africa"
                    },
                    "geometry": {
                        "type": "MultiPolygon",
                        "coordinates": [[[[3312, 5152], [3342, 5150], [3285, 5142], [3296, 5156], [3312, 5152]]], [[[2703, 5394], [2703, 5394], [2711, 5480], [2696, 5593], [2708, 5747], [2750, 5756], [2754, 5796], [2804, 5852], [2811, 5910], [2846, 5952], [2830, 6020], [2798, 6057], [2812, 6097], [2818, 6209], [2875, 6272], [2880, 6336], [2929, 6366], [3030, 6375], [3067, 6391], [3174, 6359], [3245, 6277], [3309, 6291], [3357, 6320], [3399, 6318], [3478, 6267], [3605, 6255], [3642, 6298], [3740, 6330], [3840, 6329], [3922, 6296], [3976, 6289], [3988, 6313], [4092, 6377], [4125, 6376], [4185, 6292], [4201, 6200], [4265, 6171], [4256, 6082], [4200, 6047], [4176, 6052], [4122, 5972], [4105, 5903], [4080, 5893], [4074, 5822], [4030, 5800], [4023, 5728], [3948, 5669], [3944, 5614], [3884, 5521], [3904, 5500], [3862, 5470], [3831, 5412], [3736, 5493], [3722, 5469], [3673, 5484], [3509, 5333], [3502, 5243], [3475, 5198], [3475, 5198], [3428, 5213], [3434, 5162], [3362, 5157], [3308, 5169], [3270, 5142], [3161, 5125], [3083, 5171], [3049, 5263], [2989, 5349], [2925, 5395], [2855, 5403], [2703, 5394]]]]
                    }
                }, {
                    "type": "Feature",
                    "id": "ST",
                    "properties": {
                        "hc-group": "admin0",
                        "hc-middle-x": 0.55,
                        "hc-middle-y": 0.50,
                        "hc-key": "st",
                        "hc-a2": "ST",
                        "name": "Sao Tome and Principe",
                        "labelrank": "6",
                        "country-abbrev": "S.T.P.",
                        "subregion": "Middle Africa",
                        "region-wb": "Sub-Saharan Africa",
                        "iso-a3": "STP",
                        "iso-a2": "ST",
                        "woe-id": "23424966",
                        "continent": "Africa"
                    },
                    "geometry": {
                        "type": "Polygon",
                        "coordinates": [[[3222, 4580], [3202, 4598], [3225, 4623], [3241, 4607], [3222, 4580]]]
                    }
                }, {
                    "type": "Feature",
                    "id": "TZ",
                    "properties": {
                        "hc-group": "admin0",
                        "hc-middle-x": 0.47,
                        "hc-middle-y": 0.49,
                        "hc-key": "tz",
                        "hc-a2": "TZ",
                        "name": "United Republic of Tanzania",
                        "labelrank": "3",
                        "country-abbrev": "Tanz.",
                        "subregion": "Eastern Africa",
                        "region-wb": "Sub-Saharan Africa",
                        "iso-a3": "TZA",
                        "iso-a2": "TZ",
                        "woe-id": "23424973",
                        "continent": "Africa"
                    },
                    "geometry": {
                        "type": "MultiPolygon",
                        "coordinates": [[[[7539, 3535], [7523, 3543], [7535, 3559], [7559, 3567], [7539, 3535]]], [[[7473, 3814], [7485, 3832], [7510, 3735], [7467, 3775], [7473, 3814]]], [[[7529, 3867], [7534, 3939], [7551, 3929], [7556, 3892], [7529, 3867]]], [[[6657, 4327], [6679, 4323], [6687, 4297], [6645, 4314], [6657, 4327]]], [[[6915, 3070], [6915, 3080], [6909, 3091], [6907, 3093], [6906, 3094], [6894, 3102], [6886, 3110], [6885, 3112], [6884, 3115], [6854, 3284], [6828, 3315], [6816, 3329], [6816, 3329], [6812, 3331], [6803, 3340], [6802, 3341], [6801, 3341], [6784, 3336], [6780, 3314], [6714, 3329], [6651, 3355], [6581, 3392], [6529, 3400], [6472, 3448], [6423, 3463], [6348, 3605], [6346, 3676], [6288, 3742], [6235, 3769], [6265, 3812], [6239, 3875], [6250, 3915], [6220, 3944], [6228, 4002], [6273, 4025], [6334, 4124], [6377, 4155], [6381, 4193], [6328, 4210], [6346, 4268], [6382, 4275], [6382, 4372], [6335, 4441], [6382, 4449], [6507, 4449], [6506, 4442], [6512, 4449], [6514, 4449], [6518, 4430], [6484, 4314], [6524, 4265], [6512, 4229], [6564, 4287], [6583, 4263], [6693, 4252], [6774, 4290], [6740, 4320], [6750, 4386], [6805, 4441], [7270, 4180], [7263, 4120], [7470, 3967], [7463, 3912], [7415, 3792], [7424, 3751], [7504, 3684], [7514, 3650], [7478, 3588], [7501, 3534], [7478, 3495], [7488, 3442], [7525, 3379], [7545, 3293], [7533, 3280], [7628, 3227], [7627, 3210], [7571, 3167], [7477, 3122], [7426, 3121], [7373, 3089], [7343, 3107], [7293, 3102], [7281, 3070], [7235, 3049], [7156, 3069], [7123, 3048], [7075, 3052], [7027, 3091], [6995, 3066], [6915, 3070]]]]
                    }
                }, {
                    "type": "Feature",
                    "id": "SL",
                    "properties": {
                        "hc-group": "admin0",
                        "hc-middle-x": 0.33,
                        "hc-middle-y": 0.62,
                        "hc-key": "sl",
                        "hc-a2": "SL",
                        "name": "Sierra Leone",
                        "labelrank": "4",
                        "country-abbrev": "S.L.",
                        "subregion": "Western Africa",
                        "region-wb": "Sub-Saharan Africa",
                        "iso-a3": "SLE",
                        "iso-a2": "SL",
                        "woe-id": "23424946",
                        "continent": "Africa"
                    },
                    "geometry": {
                        "type": "MultiPolygon",
                        "coordinates": [[[[697, 5528], [707, 5501], [696, 5511], [650, 5522], [697, 5528]]], [[[998, 5648], [988, 5604], [955, 5585], [956, 5553], [858, 5469], [845, 5440], [797, 5469], [709, 5499], [722, 5520], [649, 5567], [646, 5612], [622, 5601], [601, 5715], [637, 5723], [679, 5766], [703, 5825], [781, 5844], [865, 5845], [945, 5756], [972, 5673], [940, 5626], [998, 5648]]]]
                    }
                }, {
                    "type": "Feature",
                    "id": "GW",
                    "properties": {
                        "hc-group": "admin0",
                        "hc-middle-x": 0.55,
                        "hc-middle-y": 0.50,
                        "hc-key": "gw",
                        "hc-a2": "GW",
                        "name": "Guinea Bissau",
                        "labelrank": "6",
                        "country-abbrev": "GnB.",
                        "subregion": "Western Africa",
                        "region-wb": "Sub-Saharan Africa",
                        "iso-a3": "GNB",
                        "iso-a2": "GW",
                        "woe-id": "23424929",
                        "continent": "Africa"
                    },
                    "geometry": {
                        "type": "MultiPolygon",
                        "coordinates": [[[[219, 5996], [252, 5992], [258, 5977], [214, 5974], [219, 5996]]], [[[371, 5965], [319, 5994], [310, 6034], [363, 6049], [342, 6070], [286, 6035], [324, 6097], [246, 6065], [143, 6143], [208, 6160], [281, 6160], [344, 6193], [536, 6196], [540, 6142], [506, 6126], [539, 6106], [539, 6067], [467, 6060], [414, 6038], [371, 5965]]]]
                    }
                }, {
                    "type": "Feature",
                    "id": "CV",
                    "properties": {
                        "hc-group": "admin0",
                        "hc-middle-x": 0.64,
                        "hc-middle-y": 0.89,
                        "hc-key": "cv",
                        "hc-a2": "CV",
                        "name": "Cape Verde",
                        "labelrank": "4",
                        "country-abbrev": "C.Vd.",
                        "subregion": "Western Africa",
                        "region-wb": "Sub-Saharan Africa",
                        "iso-a3": "CPV",
                        "iso-a2": "CV",
                        "woe-id": "23424794",
                        "continent": "Africa"
                    },
                    "geometry": {
                        "type": "MultiPolygon",
                        "coordinates": [[[[-863, 6457], [-888, 6469], [-872, 6485], [-858, 6471], [-863, 6457]]], [[[-786, 6525], [-746, 6484], [-752, 6471], [-789, 6487], [-786, 6525]]], [[[-712, 6527], [-703, 6507], [-712, 6499], [-722, 6507], [-712, 6527]]], [[[-672, 6648], [-650, 6643], [-665, 6618], [-684, 6622], [-672, 6648]]], [[[-863, 6703], [-855, 6698], [-867, 6681], [-880, 6705], [-863, 6703]]], [[[-970, 6776], [-954, 6764], [-996, 6738], [-999, 6763], [-970, 6776]]]]
                    }
                }, {
                    "type": "Feature",
                    "id": "SC",
                    "properties": {
                        "hc-group": "admin0",
                        "hc-middle-x": 0.63,
                        "hc-middle-y": 0.45,
                        "hc-key": "sc",
                        "hc-a2": "SC",
                        "name": "Seychelles",
                        "labelrank": "6",
                        "country-abbrev": "Syc.",
                        "subregion": "Eastern Africa",
                        "region-wb": "Sub-Saharan Africa",
                        "iso-a3": "SYC",
                        "iso-a2": "SC",
                        "woe-id": "23424941",
                        "continent": "Seven seas (open ocean)"
                    },
                    "geometry": {
                        "type": "Polygon",
                        "coordinates": [[[9589, 3952], [9598, 3945], [9594, 3930], [9587, 3945], [9589, 3952]]]
                    }
                }, {
                    "type": "Feature",
                    "id": "TN",
                    "properties": {
                        "hc-group": "admin0",
                        "hc-middle-x": 0.50,
                        "hc-middle-y": 0.59,
                        "hc-key": "tn",
                        "hc-a2": "TN",
                        "name": "Tunisia",
                        "labelrank": "3",
                        "country-abbrev": "Tun.",
                        "subregion": "Northern Africa",
                        "region-wb": "Middle East & North Africa",
                        "iso-a3": "TUN",
                        "iso-a2": "TN",
                        "woe-id": "23424967",
                        "continent": "Africa"
                    },
                    "geometry": {
                        "type": "MultiPolygon",
                        "coordinates": [[[[3754, 9293], [3771, 9278], [3749, 9255], [3728, 9291], [3754, 9293]]], [[[3831, 9180], [3824, 9095], [3840, 9068], [3748, 9016], [3648, 8903], [3670, 8827], [3617, 8740], [3571, 8721], [3506, 9004], [3409, 9080], [3378, 9164], [3333, 9181], [3296, 9290], [3342, 9373], [3395, 9411], [3406, 9573], [3395, 9602], [3416, 9736], [3441, 9785], [3522, 9835], [3608, 9851], [3663, 9826], [3650, 9809], [3685, 9752], [3767, 9811], [3778, 9776], [3734, 9707], [3697, 9688], [3709, 9609], [3769, 9570], [3783, 9509], [3709, 9397], [3647, 9361], [3637, 9306], [3675, 9262], [3726, 9263], [3726, 9228], [3761, 9253], [3788, 9185], [3831, 9180], [3831, 9180], [3831, 9180]]]]
                    }
                }, {
                    "type": "Feature",
                    "id": "MG",
                    "properties": {
                        "hc-group": "admin0",
                        "hc-middle-x": 0.43,
                        "hc-middle-y": 0.51,
                        "hc-key": "mg",
                        "hc-a2": "MG",
                        "name": "Madagascar",
                        "labelrank": "3",
                        "country-abbrev": "Mad.",
                        "subregion": "Eastern Africa",
                        "region-wb": "Sub-Saharan Africa",
                        "iso-a3": "MDG",
                        "iso-a2": "MG",
                        "woe-id": "23424883",
                        "continent": "Africa"
                    },
                    "geometry": {
                        "type": "MultiPolygon",
                        "coordinates": [[[[8647, 2835], [8647, 2813], [8632, 2818], [8631, 2835], [8647, 2835]]], [[[8264, 1155], [8218, 1154], [8179, 1189], [8119, 1202], [8076, 1239], [8035, 1323], [8027, 1430], [8043, 1456], [7992, 1544], [7975, 1627], [8013, 1754], [8052, 1766], [8064, 1813], [8140, 1945], [8141, 1998], [8109, 2062], [8113, 2096], [8087, 2148], [8074, 2279], [8138, 2380], [8141, 2449], [8193, 2443], [8247, 2483], [8292, 2475], [8303, 2502], [8371, 2511], [8469, 2578], [8466, 2534], [8502, 2546], [8480, 2576], [8533, 2649], [8535, 2593], [8571, 2657], [8566, 2688], [8610, 2725], [8588, 2765], [8600, 2800], [8647, 2765], [8660, 2799], [8702, 2813], [8730, 2892], [8721, 2925], [8771, 3006], [8809, 2917], [8857, 2861], [8882, 2762], [8892, 2635], [8924, 2540], [8890, 2470], [8866, 2485], [8848, 2544], [8814, 2528], [8840, 2393], [8785, 2295], [8793, 2244], [8774, 2141], [8736, 2054], [8667, 1849], [8619, 1681], [8573, 1550], [8534, 1396], [8475, 1244], [8414, 1209], [8360, 1208], [8264, 1155]]]]
                    }
                }, {
                    "type": "Feature",
                    "id": "KE",
                    "properties": {
                        "hc-group": "admin0",
                        "hc-middle-x": 0.47,
                        "hc-middle-y": 0.43,
                        "hc-key": "ke",
                        "hc-a2": "KE",
                        "name": "Kenya",
                        "labelrank": "2",
                        "country-abbrev": "Ken.",
                        "subregion": "Eastern Africa",
                        "region-wb": "Sub-Saharan Africa",
                        "iso-a3": "KEN",
                        "iso-a2": "KE",
                        "woe-id": "23424863",
                        "continent": "Africa"
                    },
                    "geometry": {
                        "type": "Polygon",
                        "coordinates": [[[6805, 4441], [6818, 4530], [6906, 4537], [6892, 4566], [6829, 4543], [6796, 4572], [6796, 4610], [6863, 4720], [6901, 4737], [6925, 4794], [6918, 4899], [6873, 4960], [6848, 5017], [6856, 5054], [6820, 5067], [6796, 5126], [6849, 5178], [6984, 5231], [7010, 5177], [7050, 5177], [7066, 5154], [7171, 5152], [7335, 5044], [7386, 5045], [7522, 5016], [7563, 5076], [7683, 5129], [7729, 5087], [7830, 5088], [7758, 4987], [7710, 4941], [7707, 4459], [7777, 4368], [7778, 4352], [7745, 4317], [7693, 4311], [7698, 4285], [7658, 4242], [7600, 4215], [7606, 4185], [7573, 4136], [7548, 4066], [7498, 3975], [7470, 3967], [7263, 4120], [7270, 4180], [6805, 4441]]]
                    }
                }, {
                    "type": "Feature",
                    "id": "CD",
                    "properties": {
                        "hc-group": "admin0",
                        "hc-middle-x": 0.67,
                        "hc-middle-y": 0.67,
                        "hc-key": "cd",
                        "hc-a2": "CD",
                        "name": "Democratic Republic of the Congo",
                        "labelrank": "2",
                        "country-abbrev": "D.R.C.",
                        "subregion": "Middle Africa",
                        "region-wb": "Sub-Saharan Africa",
                        "iso-a3": "COD",
                        "iso-a2": "CD",
                        "woe-id": "23424780",
                        "continent": "Africa"
                    },
                    "geometry": {
                        "type": "MultiPolygon",
                        "coordinates": [[[[6154, 4330], [6155, 4292], [6145, 4287], [6145, 4301], [6154, 4330]]], [[[6441, 4861], [6339, 4773], [6337, 4740], [6265, 4681], [6267, 4644], [6234, 4567], [6184, 4515], [6192, 4490], [6227, 4517], [6216, 4460], [6219, 4399], [6190, 4384], [6172, 4362], [6151, 4374], [6125, 4302], [6127, 4258], [6129, 4236], [6145, 4227], [6174, 4185], [6170, 4147], [6154, 4056], [6169, 3994], [6155, 3922], [6191, 3852], [6166, 3812], [6207, 3710], [6296, 3623], [6306, 3563], [6346, 3511], [6131, 3479], [6128, 3478], [6056, 3400], [6054, 3341], [6079, 3361], [6099, 3305], [6094, 3211], [6057, 3089], [6077, 3033], [6145, 2967], [6206, 2957], [6202, 2984], [6245, 2995], [6244, 2828], [6215, 2854], [6162, 2827], [6055, 2957], [5964, 2978], [5905, 3074], [5842, 3015], [5751, 3029], [5667, 3064], [5658, 3122], [5529, 3098], [5541, 3133], [5487, 3165], [5470, 3145], [5426, 3153], [5364, 3135], [5302, 3144], [5263, 3116], [5253, 3168], [5273, 3231], [5253, 3289], [5213, 3330], [5223, 3487], [5200, 3539], [5203, 3634], [5039, 3634], [5051, 3682], [5009, 3671], [4909, 3671], [4908, 3608], [4887, 3596], [4888, 3540], [4734, 3540], [4652, 3529], [4550, 3708], [4528, 3809], [4491, 3818], [4281, 3814], [4083, 3816], [3988, 3790], [3957, 3828], [3995, 3833], [3987, 3920], [4068, 3975], [4105, 3954], [4151, 3969], [4237, 4022], [4241, 3943], [4297, 3953], [4345, 4015], [4393, 4054], [4434, 4066], [4478, 4151], [4471, 4204], [4478, 4302], [4516, 4337], [4557, 4414], [4617, 4446], [4675, 4511], [4671, 4553], [4701, 4640], [4690, 4710], [4717, 4780], [4716, 4859], [4787, 4985], [4788, 5030], [4791, 5096], [4776, 5138], [4800, 5148], [4848, 5217], [4890, 5246], [4931, 5247], [5012, 5200], [5046, 5152], [5082, 5158], [5126, 5137], [5193, 5138], [5285, 5117], [5347, 5207], [5411, 5176], [5554, 5243], [5594, 5220], [5662, 5234], [5669, 5270], [5730, 5255], [5769, 5264], [5813, 5238], [5866, 5235], [5899, 5256], [5941, 5239], [5984, 5177], [6067, 5135], [6113, 5171], [6167, 5144], [6204, 5185], [6302, 5092], [6344, 5081], [6346, 5048], [6385, 5032], [6373, 4973], [6387, 4955], [6367, 4899], [6441, 4861]]]]
                    }
                }, {
                    "type": "Feature",
                    "id": "FR",
                    "properties": {
                        "hc-group": "admin0",
                        "hc-middle-x": 0.97,
                        "hc-middle-y": 0.98,
                        "hc-key": "fr",
                        "hc-a2": "FR",
                        "name": "France",
                        "labelrank": "2",
                        "country-abbrev": "Fr.",
                        "subregion": "Western Europe",
                        "region-wb": "Europe & Central Asia",
                        "iso-a3": "FRA",
                        "iso-a2": "FR",
                        "woe-id": "-90",
                        "continent": "Europe"
                    },
                    "geometry": {
                        "type": "MultiPolygon",
                        "coordinates": [[[[9563, 1797], [9609, 1757], [9604, 1734], [9544, 1742], [9527, 1773], [9563, 1797]]], [[[8253, 2906], [8241, 2897], [8238, 2880], [8222, 2913], [8253, 2906]]]]
                    }
                }, {
                    "type": "Feature",
                    "id": "MR",
                    "properties": {
                        "hc-group": "admin0",
                        "hc-middle-x": 0.51,
                        "hc-middle-y": 0.56,
                        "hc-key": "mr",
                        "hc-a2": "MR",
                        "name": "Mauritania",
                        "labelrank": "3",
                        "country-abbrev": "Mrt.",
                        "subregion": "Western Africa",
                        "region-wb": "Sub-Saharan Africa",
                        "iso-a3": "MRT",
                        "iso-a2": "MR",
                        "woe-id": "23424896",
                        "continent": "Africa"
                    },
                    "geometry": {
                        "type": "MultiPolygon",
                        "coordinates": [[[[1167, 8251], [1589, 7984], [1682, 7923], [1682, 7923], [1448, 7919], [1544, 7141], [1593, 6733], [1629, 6704], [1610, 6593], [1105, 6586], [1042, 6568], [923, 6573], [900, 6529], [834, 6596], [793, 6587], [782, 6500], [724, 6482], [655, 6531], [630, 6579], [594, 6594], [560, 6666], [517, 6661], [446, 6729], [369, 6729], [271, 6705], [185, 6702], [159, 6611], [168, 6725], [204, 6810], [221, 6907], [195, 7047], [152, 7104], [192, 7219], [147, 7291], [130, 7281], [95, 7349], [78, 7293], [89, 7373], [609, 7383], [596, 7547], [586, 7583], [605, 7622], [656, 7659], [735, 7692], [729, 8054], [1166, 8061], [1167, 8251]]], [[[1682, 7923], [1682, 7923], [1682, 7923], [1682, 7923]]], [[[1682, 7923], [1682, 7923], [1682, 7923], [1682, 7923], [1682, 7923], [1682, 7923], [1682, 7923]]]]
                    }
                }, {
                    "type": "Feature",
                    "id": "DZ",
                    "properties": {
                        "hc-group": "admin0",
                        "hc-middle-x": 0.60,
                        "hc-middle-y": 0.50,
                        "hc-key": "dz",
                        "hc-a2": "DZ",
                        "name": "Algeria",
                        "labelrank": "3",
                        "country-abbrev": "Alg.",
                        "subregion": "Northern Africa",
                        "region-wb": "Middle East & North Africa",
                        "iso-a3": "DZA",
                        "iso-a2": "DZ",
                        "woe-id": "23424740",
                        "continent": "Africa"
                    },
                    "geometry": {
                        "type": "Polygon",
                        "coordinates": [[[1589, 7984], [1167, 8251], [1166, 8307], [1163, 8457], [1302, 8568], [1365, 8587], [1549, 8605], [1578, 8592], [1612, 8648], [1730, 8744], [1826, 8777], [1837, 8814], [1802, 8870], [1822, 8921], [1932, 8945], [1917, 8984], [1973, 8998], [2141, 8992], [2167, 9061], [2116, 9095], [2082, 9173], [2080, 9311], [2053, 9389], [2067, 9412], [2006, 9468], [2067, 9475], [2132, 9518], [2142, 9547], [2253, 9604], [2283, 9584], [2316, 9628], [2437, 9701], [2648, 9723], [2688, 9757], [2758, 9752], [2806, 9775], [2934, 9773], [2994, 9734], [3121, 9776], [3140, 9804], [3216, 9776], [3279, 9808], [3349, 9769], [3441, 9785], [3416, 9736], [3395, 9602], [3406, 9573], [3395, 9411], [3342, 9373], [3296, 9290], [3333, 9181], [3378, 9164], [3409, 9080], [3506, 9004], [3571, 8721], [3540, 8703], [3591, 8627], [3613, 8554], [3607, 8425], [3629, 8365], [3601, 8280], [3626, 8214], [3617, 8164], [3570, 8141], [3560, 8106], [3636, 8002], [3644, 7923], [3692, 7869], [3736, 7880], [3848, 7840], [3901, 7732], [3312, 7353], [3097, 7157], [2886, 7108], [2765, 7085], [2737, 7108], [2757, 7138], [2751, 7198], [2643, 7233], [2614, 7264], [2576, 7257], [2543, 7297], [2480, 7326], [2477, 7378], [1682, 7923], [1682, 7923], [1682, 7923], [1682, 7923], [1682, 7923], [1682, 7923], [1682, 7923], [1682, 7923], [1589, 7984]]]
                    }
                }, {
                    "type": "Feature",
                    "id": "ER",
                    "properties": {
                        "hc-group": "admin0",
                        "hc-middle-x": 0.32,
                        "hc-middle-y": 0.39,
                        "hc-key": "er",
                        "hc-a2": "ER",
                        "name": "Eritrea",
                        "labelrank": "4",
                        "country-abbrev": "Erit.",
                        "subregion": "Eastern Africa",
                        "region-wb": "Sub-Saharan Africa",
                        "iso-a3": "ERI",
                        "iso-a2": "ER",
                        "woe-id": "23424806",
                        "continent": "Africa"
                    },
                    "geometry": {
                        "type": "MultiPolygon",
                        "coordinates": [[[[7598, 6668], [7646, 6625], [7610, 6631], [7585, 6648], [7598, 6668]]], [[[8001, 6236], [7943, 6190], [7903, 6205], [7847, 6260], [7817, 6310], [7749, 6360], [7702, 6426], [7607, 6476], [7529, 6490], [7489, 6473], [7472, 6500], [7386, 6471], [7316, 6533], [7273, 6431], [7237, 6477], [7208, 6454], [7136, 6451], [7123, 6566], [7193, 6720], [7184, 6758], [7201, 6832], [7254, 6826], [7268, 6866], [7360, 6893], [7412, 6959], [7455, 6875], [7485, 6770], [7494, 6699], [7523, 6619], [7557, 6584], [7577, 6616], [7631, 6536], [7663, 6547], [7694, 6506], [7745, 6498], [7813, 6403], [7893, 6354], [7956, 6258], [8001, 6236]]]]
                    }
                }, {
                    "type": "Feature",
                    "id": "GQ",
                    "properties": {
                        "hc-group": "admin0",
                        "hc-middle-x": 0.42,
                        "hc-middle-y": 0.75,
                        "hc-key": "gq",
                        "hc-a2": "GQ",
                        "name": "Equatorial Guinea",
                        "labelrank": "4",
                        "country-abbrev": "Eq. G.",
                        "subregion": "Middle Africa",
                        "region-wb": "Sub-Saharan Africa",
                        "iso-a3": "GNQ",
                        "iso-a2": "GQ",
                        "woe-id": "23424804",
                        "continent": "Africa"
                    },
                    "geometry": {
                        "type": "MultiPolygon",
                        "coordinates": [[[[3499, 5059], [3524, 5045], [3489, 4987], [3461, 4995], [3499, 5059]]], [[[3834, 4855], [3837, 4704], [3637, 4703], [3577, 4726], [3636, 4820], [3635, 4877], [3660, 4854], [3834, 4855]]]]
                    }
                }, {
                    "type": "Feature",
                    "id": "MU",
                    "properties": {
                        "hc-group": "admin0",
                        "hc-middle-x": 0.61,
                        "hc-middle-y": 0.58,
                        "hc-key": "mu",
                        "hc-a2": "MU",
                        "name": "Mauritius",
                        "labelrank": "5",
                        "country-abbrev": "Mus.",
                        "subregion": "Eastern Africa",
                        "region-wb": "Sub-Saharan Africa",
                        "iso-a3": "MUS",
                        "iso-a2": "MU",
                        "woe-id": "23424894",
                        "continent": "Seven seas (open ocean)"
                    },
                    "geometry": {
                        "type": "Polygon",
                        "coordinates": [[[9851, 1899], [9845, 1846], [9807, 1843], [9828, 1909], [9851, 1899]]]
                    }
                }, {
                    "type": "Feature",
                    "id": "SN",
                    "properties": {
                        "hc-group": "admin0",
                        "hc-middle-x": 0.45,
                        "hc-middle-y": 0.41,
                        "hc-key": "sn",
                        "hc-a2": "SN",
                        "name": "Senegal",
                        "labelrank": "3",
                        "country-abbrev": "Sen.",
                        "subregion": "Western Africa",
                        "region-wb": "Sub-Saharan Africa",
                        "iso-a3": "SEN",
                        "iso-a2": "SN",
                        "woe-id": "23424943",
                        "continent": "Africa"
                    },
                    "geometry": {
                        "type": "Polygon",
                        "coordinates": [[[162, 6311], [110, 6414], [78, 6453], [31, 6466], [83, 6490], [159, 6611], [185, 6702], [271, 6705], [369, 6729], [446, 6729], [517, 6661], [560, 6666], [594, 6594], [630, 6579], [655, 6531], [724, 6482], [730, 6430], [765, 6366], [748, 6338], [813, 6293], [844, 6236], [844, 6165], [754, 6164], [717, 6150], [622, 6176], [622, 6192], [536, 6196], [344, 6193], [281, 6160], [208, 6160], [143, 6143], [137, 6176], [138, 6241], [149, 6254], [259, 6255], [260, 6277], [338, 6293], [349, 6315], [448, 6270], [519, 6284], [500, 6317], [453, 6299], [421, 6326], [354, 6346], [299, 6313], [162, 6311]]]
                    }
                }, {
                    "type": "Feature",
                    "id": "KM",
                    "properties": {
                        "hc-group": "admin0",
                        "hc-middle-x": 0.06,
                        "hc-middle-y": 0.28,
                        "hc-key": "km",
                        "hc-a2": "KM",
                        "name": "Comoros",
                        "labelrank": "6",
                        "country-abbrev": "Com.",
                        "subregion": "Eastern Africa",
                        "region-wb": "Sub-Saharan Africa",
                        "iso-a3": "COM",
                        "iso-a2": "KM",
                        "woe-id": "23424786",
                        "continent": "Africa"
                    },
                    "geometry": {
                        "type": "MultiPolygon",
                        "coordinates": [[[[8150, 2994], [8154, 2955], [8114, 2985], [8136, 2982], [8150, 2994]]], [[[8018, 3016], [7992, 3031], [7995, 3089], [8010, 3083], [8018, 3016]]]]
                    }
                }, {
                    "type": "Feature",
                    "id": "ET",
                    "properties": {
                        "hc-group": "admin0",
                        "hc-middle-x": 0.46,
                        "hc-middle-y": 0.60,
                        "hc-key": "et",
                        "hc-a2": "ET",
                        "name": "Ethiopia",
                        "labelrank": "2",
                        "country-abbrev": "Eth.",
                        "subregion": "Eastern Africa",
                        "region-wb": "Sub-Saharan Africa",
                        "iso-a3": "ETH",
                        "iso-a2": "ET",
                        "woe-id": "23424808",
                        "continent": "Africa"
                    },
                    "geometry": {
                        "type": "Polygon",
                        "coordinates": [[[7824, 6048], [7810, 6035], [7824, 6022], [7846, 6002], [7933, 6021], [7973, 6009], [7937, 5961], [7961, 5904], [8036, 5798], [8115, 5741], [8501, 5607], [8632, 5606], [8427, 5411], [8230, 5206], [8103, 5213], [7992, 5174], [7948, 5127], [7863, 5117], [7830, 5088], [7729, 5087], [7683, 5129], [7563, 5076], [7522, 5016], [7386, 5045], [7335, 5044], [7171, 5152], [7066, 5154], [7050, 5177], [7032, 5196], [7036, 5267], [6972, 5272], [6928, 5337], [6896, 5441], [6839, 5485], [6763, 5575], [6676, 5595], [6693, 5674], [6797, 5679], [6816, 5703], [6811, 5812], [6845, 5919], [6839, 5959], [6879, 6000], [6927, 5999], [6940, 6118], [6962, 6135], [7016, 6225], [7079, 6241], [7097, 6330], [7117, 6358], [7136, 6451], [7208, 6454], [7237, 6477], [7273, 6431], [7316, 6533], [7386, 6471], [7472, 6500], [7489, 6473], [7529, 6490], [7607, 6476], [7702, 6426], [7749, 6360], [7817, 6310], [7847, 6260], [7903, 6205], [7820, 6082], [7824, 6048]]]
                    }
                }, {
                    "type": "Feature",
                    "id": "CI",
                    "properties": {
                        "hc-group": "admin0",
                        "hc-middle-x": 0.50,
                        "hc-middle-y": 0.52,
                        "hc-key": "ci",
                        "hc-a2": "CI",
                        "name": "Ivory Coast",
                        "labelrank": "3",
                        "country-abbrev": "I.C.",
                        "subregion": "Western Africa",
                        "region-wb": "Sub-Saharan Africa",
                        "iso-a3": "CIV",
                        "iso-a2": "CI",
                        "woe-id": "23424854",
                        "continent": "Africa"
                    },
                    "geometry": {
                        "type": "MultiPolygon",
                        "coordinates": [[[[1942, 5218], [1924, 5220], [1943, 5220], [1943, 5220], [1942, 5218]]], [[[1359, 5205], [1384, 5272], [1375, 5308], [1328, 5324], [1313, 5363], [1220, 5390], [1255, 5425], [1260, 5475], [1235, 5530], [1269, 5529], [1295, 5605], [1265, 5648], [1337, 5670], [1302, 5692], [1313, 5775], [1286, 5773], [1271, 5845], [1295, 5874], [1337, 5912], [1430, 5880], [1464, 5901], [1467, 5942], [1500, 5930], [1523, 5952], [1524, 5895], [1554, 5882], [1581, 5912], [1618, 5914], [1658, 5901], [1692, 5846], [1730, 5817], [1863, 5854], [1923, 5850], [1982, 5782], [1991, 5795], [1981, 5738], [2001, 5721], [2017, 5627], [1974, 5575], [1949, 5477], [1921, 5417], [1961, 5287], [1986, 5282], [1979, 5226], [1917, 5221], [1828, 5234], [1585, 5205], [1447, 5154], [1366, 5113], [1359, 5205]]]]
                    }
                }, {
                    "type": "Feature",
                    "id": "GH",
                    "properties": {
                        "hc-group": "admin0",
                        "hc-middle-x": 0.44,
                        "hc-middle-y": 0.38,
                        "hc-key": "gh",
                        "hc-a2": "GH",
                        "name": "Ghana",
                        "labelrank": "3",
                        "country-abbrev": "Ghana",
                        "subregion": "Western Africa",
                        "region-wb": "Sub-Saharan Africa",
                        "iso-a3": "GHA",
                        "iso-a2": "GH",
                        "woe-id": "23424824",
                        "continent": "Africa"
                    },
                    "geometry": {
                        "type": "Polygon",
                        "coordinates": [[[1942, 5218], [1943, 5220], [1943, 5220], [1959, 5220], [1979, 5226], [1986, 5282], [1961, 5287], [1921, 5417], [1949, 5477], [1974, 5575], [2017, 5627], [2001, 5721], [1981, 5738], [1991, 5795], [1959, 5958], [1981, 5993], [2250, 5998], [2320, 6017], [2344, 6008], [2331, 5951], [2395, 5905], [2374, 5812], [2414, 5789], [2394, 5699], [2438, 5642], [2421, 5631], [2432, 5516], [2416, 5451], [2449, 5397], [2504, 5356], [2480, 5322], [2392, 5313], [2301, 5275], [2246, 5238], [2145, 5211], [2078, 5173], [2043, 5197], [1942, 5218]]]
                    }
                }, {
                    "type": "Feature",
                    "id": "ZM",
                    "properties": {
                        "hc-group": "admin0",
                        "hc-middle-x": 0.36,
                        "hc-middle-y": 0.65,
                        "hc-key": "zm",
                        "hc-a2": "ZM",
                        "name": "Zambia",
                        "labelrank": "3",
                        "country-abbrev": "Zambia",
                        "subregion": "Eastern Africa",
                        "region-wb": "Sub-Saharan Africa",
                        "iso-a3": "ZMB",
                        "iso-a2": "ZM",
                        "woe-id": "23425003",
                        "continent": "Africa"
                    },
                    "geometry": {
                        "type": "Polygon",
                        "coordinates": [[[6109, 2414], [6067, 2412], [6011, 2371], [5981, 2372], [5922, 2294], [5883, 2222], [5843, 2207], [5777, 2232], [5748, 2217], [5710, 2242], [5655, 2244], [5616, 2277], [5521, 2287], [5412, 2265], [5331, 2330], [5247, 2412], [5231, 2463], [5230, 2884], [5492, 2885], [5474, 2913], [5496, 2966], [5487, 3067], [5500, 3097], [5487, 3165], [5541, 3133], [5529, 3098], [5658, 3122], [5667, 3064], [5751, 3029], [5842, 3015], [5905, 3074], [5964, 2978], [6055, 2957], [6162, 2827], [6215, 2854], [6244, 2828], [6245, 2995], [6202, 2984], [6206, 2957], [6145, 2967], [6077, 3033], [6057, 3089], [6094, 3211], [6099, 3305], [6079, 3361], [6143, 3412], [6161, 3453], [6128, 3478], [6131, 3479], [6346, 3511], [6333, 3474], [6375, 3467], [6405, 3436], [6423, 3463], [6472, 3448], [6529, 3400], [6581, 3392], [6651, 3355], [6709, 3291], [6748, 3202], [6702, 3170], [6711, 3125], [6690, 3092], [6693, 2996], [6708, 2946], [6654, 2919], [6659, 2858], [6634, 2790], [6659, 2744], [6685, 2748], [6297, 2621], [6321, 2533], [6248, 2536], [6193, 2523], [6122, 2479], [6109, 2414]]]
                    }
                }, {
                    "type": "Feature",
                    "id": "NA",
                    "properties": {
                        "hc-group": "admin0",
                        "hc-middle-x": 0.43,
                        "hc-middle-y": 0.40,
                        "hc-key": "na",
                        "hc-a2": "NA",
                        "name": "Namibia",
                        "labelrank": "3",
                        "country-abbrev": "Nam.",
                        "subregion": "Southern Africa",
                        "region-wb": "Sub-Saharan Africa",
                        "iso-a3": "NAM",
                        "iso-a2": "NA",
                        "woe-id": "23424987",
                        "continent": "Africa"
                    },
                    "geometry": {
                        "type": "Polygon",
                        "coordinates": [[[5412, 2265], [5521, 2287], [5616, 2277], [5655, 2244], [5616, 2245], [5558, 2208], [5516, 2212], [5439, 2152], [5403, 2215], [5360, 2214], [5166, 2176], [5101, 2173], [5103, 1674], [4973, 1668], [4974, 1284], [4976, 762], [4922, 741], [4860, 679], [4817, 696], [4742, 687], [4644, 715], [4636, 785], [4578, 806], [4566, 764], [4526, 734], [4508, 736], [4422, 824], [4371, 915], [4328, 1056], [4312, 1138], [4303, 1274], [4263, 1365], [4270, 1547], [4251, 1627], [4194, 1695], [4179, 1741], [4121, 1828], [4090, 1919], [3977, 2117], [3920, 2192], [3902, 2272], [3908, 2312], [3942, 2326], [4010, 2315], [4089, 2354], [4190, 2293], [4224, 2296], [4773, 2298], [4814, 2249], [4979, 2230], [5018, 2235], [5079, 2212], [5156, 2215], [5412, 2265]]]
                    }
                }, {
                    "type": "Feature",
                    "id": "RW",
                    "properties": {
                        "hc-group": "admin0",
                        "hc-middle-x": 0.83,
                        "hc-middle-y": 0.39,
                        "hc-key": "rw",
                        "hc-a2": "RW",
                        "name": "Rwanda",
                        "labelrank": "3",
                        "country-abbrev": "Rwa.",
                        "subregion": "Eastern Africa",
                        "region-wb": "Sub-Saharan Africa",
                        "iso-a3": "RWA",
                        "iso-a2": "RW",
                        "woe-id": "23424937",
                        "continent": "Africa"
                    },
                    "geometry": {
                        "type": "Polygon",
                        "coordinates": [[[6335, 4441], [6382, 4372], [6382, 4275], [6346, 4268], [6265, 4279], [6261, 4236], [6234, 4215], [6145, 4227], [6129, 4236], [6127, 4259], [6191, 4316], [6172, 4362], [6190, 4384], [6219, 4399], [6260, 4389], [6335, 4441]]]
                    }
                }, {
                    "type": "Feature",
                    "id": "SX",
                    "properties": {
                        "hc-group": "admin0",
                        "hc-middle-x": 0.72,
                        "hc-middle-y": 0.52,
                        "hc-key": "sx",
                        "hc-a2": "SX",
                        "name": "Somaliland",
                        "labelrank": "5",
                        "country-abbrev": "Solnd.",
                        "subregion": "Eastern Africa",
                        "region-wb": "Sub-Saharan Africa",
                        "iso-a3": "-99",
                        "iso-a2": "SX",
                        "woe-id": "-99",
                        "continent": "Africa"
                    },
                    "geometry": {
                        "type": "Polygon",
                        "coordinates": [[[8763, 6034], [8760, 5796], [8632, 5606], [8501, 5607], [8115, 5741], [8036, 5798], [7961, 5904], [7937, 5961], [7973, 6009], [8015, 6074], [8092, 5982], [8150, 5936], [8240, 5929], [8351, 5989], [8435, 5964], [8556, 6027], [8661, 6022], [8726, 6046], [8763, 6034]]]
                    }
                }, {
                    "type": "Feature",
                    "id": "SO",
                    "properties": {
                        "hc-group": "admin0",
                        "hc-middle-x": 0.29,
                        "hc-middle-y": 0.64,
                        "hc-key": "so",
                        "hc-a2": "SO",
                        "name": "Somalia",
                        "labelrank": "6",
                        "country-abbrev": "Som.",
                        "subregion": "Eastern Africa",
                        "region-wb": "Sub-Saharan Africa",
                        "iso-a3": "SOM",
                        "iso-a2": "SO",
                        "woe-id": "-90",
                        "continent": "Africa"
                    },
                    "geometry": {
                        "type": "Polygon",
                        "coordinates": [[[8632, 5606], [8760, 5796], [8763, 6034], [8847, 6062], [8938, 6078], [9008, 6130], [9073, 6109], [9044, 6023], [9055, 5940], [9084, 5928], [9022, 5909], [9009, 5794], [8954, 5716], [8936, 5667], [8876, 5599], [8873, 5570], [8813, 5477], [8768, 5362], [8716, 5275], [8623, 5143], [8448, 4958], [8369, 4883], [8175, 4771], [8033, 4650], [7850, 4459], [7778, 4352], [7777, 4368], [7707, 4459], [7710, 4941], [7758, 4987], [7830, 5088], [7863, 5117], [7948, 5127], [7992, 5174], [8103, 5213], [8230, 5206], [8427, 5411], [8632, 5606]]]
                    }
                }, {
                    "type": "Feature",
                    "id": "CM",
                    "properties": {
                        "hc-group": "admin0",
                        "hc-middle-x": 0.51,
                        "hc-middle-y": 0.76,
                        "hc-key": "cm",
                        "hc-a2": "CM",
                        "name": "Cameroon",
                        "labelrank": "3",
                        "country-abbrev": "Cam.",
                        "subregion": "Middle Africa",
                        "region-wb": "Sub-Saharan Africa",
                        "iso-a3": "CMR",
                        "iso-a2": "CM",
                        "woe-id": "23424785",
                        "continent": "Africa"
                    },
                    "geometry": {
                        "type": "MultiPolygon",
                        "coordinates": [[[[4218, 6293], [4212, 6267], [4243, 6279], [4285, 6234], [4296, 6168], [4315, 6160], [4327, 6087], [4312, 6040], [4318, 5988], [4350, 5925], [4400, 5883], [4275, 5873], [4203, 5880], [4172, 5835], [4225, 5773], [4335, 5683], [4375, 5557], [4341, 5521], [4276, 5391], [4234, 5360], [4258, 5347], [4276, 5177], [4314, 5149], [4336, 5065], [4457, 4949], [4471, 4868], [4467, 4803], [4346, 4841], [4301, 4837], [4258, 4863], [4219, 4856], [4092, 4856], [4085, 4871], [3838, 4873], [3834, 4855], [3660, 4854], [3635, 4877], [3655, 4973], [3614, 5032], [3610, 5087], [3570, 5083], [3525, 5105], [3520, 5164], [3465, 5160], [3475, 5198], [3475, 5198], [3502, 5243], [3509, 5333], [3673, 5484], [3722, 5469], [3736, 5493], [3831, 5412], [3862, 5470], [3904, 5500], [3884, 5521], [3944, 5614], [3948, 5669], [4023, 5728], [4030, 5800], [4074, 5822], [4080, 5893], [4105, 5903], [4122, 5972], [4176, 6052], [4200, 6047], [4256, 6082], [4265, 6171], [4201, 6200], [4185, 6292], [4218, 6293]]], [[[4226, 6293], [4227, 6291], [4223, 6293], [4226, 6293]]]]
                    }
                }, {
                    "type": "Feature",
                    "id": "CG",
                    "properties": {
                        "hc-group": "admin0",
                        "hc-middle-x": 0.64,
                        "hc-middle-y": 0.37,
                        "hc-key": "cg",
                        "hc-a2": "CG",
                        "name": "Republic of Congo",
                        "labelrank": "4",
                        "country-abbrev": "Rep. Congo",
                        "subregion": "Middle Africa",
                        "region-wb": "Sub-Saharan Africa",
                        "iso-a3": "COG",
                        "iso-a2": "CG",
                        "woe-id": "23424779",
                        "continent": "Africa"
                    },
                    "geometry": {
                        "type": "Polygon",
                        "coordinates": [[[4092, 4856], [4219, 4856], [4258, 4863], [4301, 4837], [4346, 4841], [4467, 4803], [4471, 4868], [4508, 4946], [4519, 5028], [4636, 5060], [4686, 5038], [4768, 5050], [4788, 5030], [4787, 4985], [4716, 4859], [4717, 4780], [4690, 4710], [4701, 4640], [4671, 4553], [4675, 4511], [4617, 4446], [4557, 4414], [4516, 4337], [4478, 4302], [4471, 4204], [4478, 4151], [4434, 4066], [4393, 4054], [4345, 4015], [4297, 3953], [4241, 3943], [4237, 4022], [4151, 3969], [4105, 3954], [4068, 3975], [4039, 4005], [3979, 3978], [3930, 3924], [3905, 3976], [3812, 4064], [3860, 4120], [3882, 4098], [3920, 4147], [3886, 4164], [3869, 4270], [3935, 4262], [3986, 4273], [3981, 4329], [4031, 4327], [4053, 4269], [4118, 4260], [4154, 4304], [4198, 4252], [4247, 4376], [4238, 4444], [4251, 4495], [4202, 4537], [4164, 4550], [4169, 4602], [4246, 4695], [4209, 4756], [4158, 4762], [4087, 4734], [4073, 4785], [4092, 4856]]]
                    }
                }, {
                    "type": "Feature",
                    "id": "EH",
                    "properties": {
                        "hc-group": "admin0",
                        "hc-middle-x": 0.80,
                        "hc-middle-y": 0.22,
                        "hc-key": "eh",
                        "hc-a2": "EH",
                        "name": "Western Sahara",
                        "labelrank": "7",
                        "country-abbrev": "W. Sah.",
                        "subregion": "Northern Africa",
                        "region-wb": "Middle East & North Africa",
                        "iso-a3": "ESH",
                        "iso-a2": "EH",
                        "woe-id": "23424990",
                        "continent": "Africa"
                    },
                    "geometry": {
                        "type": "Polygon",
                        "coordinates": [[[78, 7293], [72, 7303], [82, 7385], [248, 7398], [368, 7395], [395, 7453], [448, 7518], [471, 7675], [503, 7730], [563, 7759], [595, 7820], [677, 7883], [727, 8059], [768, 8070], [817, 8149], [809, 8185], [871, 8205], [960, 8185], [1029, 8186], [1071, 8220], [1152, 8226], [1148, 8306], [1166, 8307], [1167, 8251], [1166, 8061], [729, 8054], [735, 7692], [656, 7659], [605, 7622], [586, 7583], [596, 7547], [609, 7383], [89, 7373], [78, 7293]]]
                    }
                }, {
                    "type": "Feature",
                    "id": "BJ",
                    "properties": {
                        "hc-group": "admin0",
                        "hc-middle-x": 0.48,
                        "hc-middle-y": 0.27,
                        "hc-key": "bj",
                        "hc-a2": "BJ",
                        "name": "Benin",
                        "labelrank": "5",
                        "country-abbrev": "Benin",
                        "subregion": "Western Africa",
                        "region-wb": "Sub-Saharan Africa",
                        "iso-a3": "BEN",
                        "iso-a2": "BJ",
                        "woe-id": "23424764",
                        "continent": "Africa"
                    },
                    "geometry": {
                        "type": "Polygon",
                        "coordinates": [[[2703, 5394], [2596, 5380], [2561, 5372], [2582, 5380], [2553, 5432], [2561, 5474], [2554, 5744], [2531, 5775], [2518, 5869], [2443, 5917], [2460, 6000], [2488, 6008], [2530, 6065], [2605, 6059], [2654, 6123], [2650, 6165], [2713, 6190], [2812, 6097], [2798, 6057], [2830, 6020], [2846, 5952], [2811, 5910], [2804, 5852], [2754, 5796], [2750, 5756], [2708, 5747], [2696, 5593], [2711, 5480], [2703, 5394]]]
                    }
                }, {
                    "type": "Feature",
                    "id": "BF",
                    "properties": {
                        "hc-group": "admin0",
                        "hc-middle-x": 0.54,
                        "hc-middle-y": 0.41,
                        "hc-key": "bf",
                        "hc-a2": "BF",
                        "name": "Burkina Faso",
                        "labelrank": "3",
                        "country-abbrev": "B.F.",
                        "subregion": "Western Africa",
                        "region-wb": "Sub-Saharan Africa",
                        "iso-a3": "BFA",
                        "iso-a2": "BF",
                        "woe-id": "23424978",
                        "continent": "Africa"
                    },
                    "geometry": {
                        "type": "Polygon",
                        "coordinates": [[[2654, 6123], [2605, 6059], [2530, 6065], [2488, 6008], [2460, 6000], [2405, 6001], [2320, 6017], [2250, 5998], [1981, 5993], [1959, 5958], [1991, 5795], [1982, 5782], [1923, 5850], [1863, 5854], [1730, 5817], [1692, 5846], [1658, 5901], [1618, 5914], [1619, 5998], [1656, 6047], [1647, 6102], [1741, 6145], [1763, 6196], [1750, 6221], [1786, 6235], [1767, 6275], [1816, 6323], [1884, 6283], [1911, 6300], [1908, 6357], [1957, 6349], [1964, 6402], [2013, 6435], [2071, 6424], [2078, 6463], [2113, 6465], [2198, 6509], [2236, 6544], [2304, 6544], [2364, 6524], [2356, 6475], [2419, 6359], [2462, 6346], [2466, 6277], [2541, 6222], [2616, 6230], [2634, 6193], [2611, 6177], [2654, 6123]]]
                    }
                }, {
                    "type": "Feature",
                    "id": "TG",
                    "properties": {
                        "hc-group": "admin0",
                        "hc-middle-x": 0.75,
                        "hc-middle-y": 0.91,
                        "hc-key": "tg",
                        "hc-a2": "TG",
                        "name": "Togo",
                        "labelrank": "6",
                        "country-abbrev": "Togo",
                        "subregion": "Western Africa",
                        "region-wb": "Sub-Saharan Africa",
                        "iso-a3": "TGO",
                        "iso-a2": "TG",
                        "woe-id": "23424965",
                        "continent": "Africa"
                    },
                    "geometry": {
                        "type": "Polygon",
                        "coordinates": [[[2561, 5372], [2536, 5367], [2504, 5356], [2449, 5397], [2416, 5451], [2432, 5516], [2421, 5631], [2438, 5642], [2394, 5699], [2414, 5789], [2374, 5812], [2395, 5905], [2331, 5951], [2344, 6008], [2320, 6017], [2405, 6001], [2460, 6000], [2443, 5917], [2518, 5869], [2531, 5775], [2554, 5744], [2561, 5474], [2553, 5432], [2582, 5380], [2561, 5372]]]
                    }
                }, {
                    "type": "Feature",
                    "id": "NE",
                    "properties": {
                        "hc-group": "admin0",
                        "hc-middle-x": 0.63,
                        "hc-middle-y": 0.47,
                        "hc-key": "ne",
                        "hc-a2": "NE",
                        "name": "Niger",
                        "labelrank": "3",
                        "country-abbrev": "Niger",
                        "subregion": "Western Africa",
                        "region-wb": "Sub-Saharan Africa",
                        "iso-a3": "NER",
                        "iso-a2": "NE",
                        "woe-id": "23424906",
                        "continent": "Africa"
                    },
                    "geometry": {
                        "type": "Polygon",
                        "coordinates": [[[2812, 6097], [2713, 6190], [2650, 6165], [2654, 6123], [2611, 6177], [2634, 6193], [2616, 6230], [2541, 6222], [2466, 6277], [2462, 6346], [2419, 6359], [2356, 6475], [2364, 6524], [2463, 6536], [2510, 6576], [2796, 6589], [2843, 6638], [2883, 6734], [2889, 6813], [2886, 7108], [3097, 7157], [3312, 7353], [3901, 7732], [4101, 7685], [4201, 7606], [4299, 7660], [4325, 7518], [4327, 7449], [4384, 7371], [4375, 7350], [4429, 7291], [4401, 7225], [4368, 6813], [4224, 6653], [4154, 6554], [4145, 6513], [4104, 6467], [4125, 6376], [4092, 6377], [3988, 6313], [3976, 6289], [3922, 6296], [3840, 6329], [3740, 6330], [3642, 6298], [3605, 6255], [3478, 6267], [3399, 6318], [3357, 6320], [3309, 6291], [3245, 6277], [3174, 6359], [3067, 6391], [3030, 6375], [2929, 6366], [2880, 6336], [2875, 6272], [2818, 6209], [2812, 6097]]]
                    }
                }, {
                    "type": "Feature",
                    "id": "LY",
                    "properties": {
                        "hc-group": "admin0",
                        "hc-middle-x": 0.51,
                        "hc-middle-y": 0.47,
                        "hc-key": "ly",
                        "hc-a2": "LY",
                        "name": "Libya",
                        "labelrank": "3",
                        "country-abbrev": "Libya",
                        "subregion": "Northern Africa",
                        "region-wb": "Middle East & North Africa",
                        "iso-a3": "LBY",
                        "iso-a2": "LY",
                        "woe-id": "23424882",
                        "continent": "Africa"
                    },
                    "geometry": {
                        "type": "Polygon",
                        "coordinates": [[[4299, 7660], [4201, 7606], [4101, 7685], [3901, 7732], [3848, 7840], [3736, 7880], [3692, 7869], [3644, 7923], [3636, 8002], [3560, 8106], [3570, 8141], [3617, 8164], [3626, 8214], [3601, 8280], [3629, 8365], [3607, 8425], [3613, 8554], [3591, 8627], [3540, 8703], [3571, 8721], [3617, 8740], [3670, 8827], [3648, 8903], [3748, 9016], [3840, 9068], [3824, 9095], [3831, 9180], [3831, 9180], [3831, 9180], [3943, 9126], [3994, 9121], [4076, 9138], [4186, 9110], [4225, 9079], [4321, 9059], [4361, 8946], [4435, 8886], [4525, 8879], [4610, 8858], [4717, 8812], [4822, 8735], [4872, 8738], [4926, 8770], [4964, 8818], [4978, 8879], [4948, 8956], [4968, 9028], [5033, 9088], [5172, 9146], [5243, 9149], [5368, 9102], [5369, 9051], [5501, 9002], [5619, 8996], [5642, 8948], [5603, 8905], [5621, 8813], [5580, 8715], [5619, 8569], [5619, 7521], [5619, 7241], [5487, 7240], [5487, 7171], [4432, 7725], [4299, 7660]]]
                    }
                }, {
                    "type": "Feature",
                    "id": "LR",
                    "properties": {
                        "hc-group": "admin0",
                        "hc-middle-x": 0.37,
                        "hc-middle-y": 0.54,
                        "hc-key": "lr",
                        "hc-a2": "LR",
                        "name": "Liberia",
                        "labelrank": "4",
                        "country-abbrev": "Liberia",
                        "subregion": "Western Africa",
                        "region-wb": "Sub-Saharan Africa",
                        "iso-a3": "LBR",
                        "iso-a2": "LR",
                        "woe-id": "23424876",
                        "continent": "Africa"
                    },
                    "geometry": {
                        "type": "Polygon",
                        "coordinates": [[[1235, 5530], [1260, 5475], [1255, 5425], [1220, 5390], [1313, 5363], [1328, 5324], [1375, 5308], [1384, 5272], [1359, 5205], [1366, 5113], [1271, 5141], [1137, 5213], [988, 5345], [862, 5412], [845, 5440], [858, 5469], [956, 5553], [955, 5585], [988, 5604], [998, 5648], [1060, 5652], [1101, 5631], [1122, 5537], [1107, 5512], [1152, 5481], [1187, 5492], [1209, 5548], [1235, 5530]]]
                    }
                }, {
                    "type": "Feature",
                    "id": "MW",
                    "properties": {
                        "hc-group": "admin0",
                        "hc-middle-x": 0.23,
                        "hc-middle-y": 0.33,
                        "hc-key": "mw",
                        "hc-a2": "MW",
                        "name": "Malawi",
                        "labelrank": "6",
                        "country-abbrev": "Mal.",
                        "subregion": "Eastern Africa",
                        "region-wb": "Sub-Saharan Africa",
                        "iso-a3": "MWI",
                        "iso-a2": "MW",
                        "woe-id": "23424889",
                        "continent": "Africa"
                    },
                    "geometry": {
                        "type": "MultiPolygon",
                        "coordinates": [[[[6909, 3091], [6907, 3093], [6906, 3094], [6907, 3093], [6909, 3091]]], [[[6886, 3110], [6885, 3112], [6884, 3115], [6885, 3112], [6886, 3110]]], [[[6828, 3315], [6816, 3329], [6816, 3329], [6828, 3315]]], [[[6803, 3340], [6801, 3341], [6802, 3341], [6803, 3340]]], [[[6651, 3355], [6714, 3329], [6780, 3314], [6786, 3277], [6826, 3219], [6818, 3195], [6831, 3055], [6794, 2990], [6833, 2881], [6831, 2830], [6871, 2789], [6857, 2752], [6880, 2713], [6901, 2749], [6950, 2696], [6926, 2785], [6900, 2814], [6929, 2789], [7028, 2660], [7019, 2590], [7020, 2481], [6966, 2463], [6934, 2410], [6953, 2388], [6954, 2331], [6927, 2332], [6917, 2373], [6837, 2458], [6818, 2498], [6862, 2580], [6853, 2673], [6833, 2698], [6752, 2685], [6742, 2670], [6685, 2748], [6659, 2744], [6634, 2790], [6659, 2858], [6654, 2919], [6708, 2946], [6693, 2996], [6690, 3092], [6711, 3125], [6702, 3170], [6748, 3202], [6709, 3291], [6651, 3355]]]]
                    }
                }, {
                    "type": "Feature",
                    "id": "GM",
                    "properties": {
                        "hc-group": "admin0",
                        "hc-middle-x": 0.26,
                        "hc-middle-y": 0.53,
                        "hc-key": "gm",
                        "hc-a2": "GM",
                        "name": "Gambia",
                        "labelrank": "6",
                        "country-abbrev": "Gambia",
                        "subregion": "Western Africa",
                        "region-wb": "Sub-Saharan Africa",
                        "iso-a3": "GMB",
                        "iso-a2": "GM",
                        "woe-id": "23424821",
                        "continent": "Africa"
                    },
                    "geometry": {
                        "type": "Polygon",
                        "coordinates": [[[138, 6241], [128, 6277], [162, 6311], [162, 6311], [299, 6313], [354, 6346], [421, 6326], [453, 6299], [500, 6317], [519, 6284], [448, 6270], [349, 6315], [338, 6293], [260, 6277], [259, 6255], [149, 6254], [138, 6241]]]
                    }
                }, {
                    "type": "Feature",
                    "id": "TD",
                    "properties": {
                        "hc-group": "admin0",
                        "hc-middle-x": 0.50,
                        "hc-middle-y": 0.50,
                        "hc-key": "td",
                        "hc-a2": "TD",
                        "name": "Chad",
                        "labelrank": "3",
                        "country-abbrev": "Chad",
                        "subregion": "Middle Africa",
                        "region-wb": "Sub-Saharan Africa",
                        "iso-a3": "TCD",
                        "iso-a2": "TD",
                        "woe-id": "23424777",
                        "continent": "Africa"
                    },
                    "geometry": {
                        "type": "Polygon",
                        "coordinates": [[[4243, 6279], [4278, 6292], [4247, 6316], [4226, 6293], [4223, 6293], [4213, 6300], [4218, 6293], [4185, 6292], [4125, 6376], [4104, 6467], [4145, 6513], [4154, 6554], [4224, 6653], [4368, 6813], [4401, 7225], [4429, 7291], [4375, 7350], [4384, 7371], [4327, 7449], [4325, 7518], [4299, 7660], [4432, 7725], [5487, 7171], [5488, 6653], [5371, 6650], [5349, 6631], [5354, 6585], [5315, 6512], [5275, 6493], [5297, 6436], [5237, 6389], [5263, 6330], [5219, 6293], [5219, 6237], [5255, 6251], [5308, 6162], [5298, 6109], [5348, 6071], [5341, 6008], [5288, 6019], [5192, 5970], [5195, 5941], [5099, 5852], [5074, 5809], [5023, 5772], [4848, 5755], [4818, 5735], [4851, 5710], [4782, 5628], [4663, 5619], [4543, 5562], [4514, 5603], [4491, 5577], [4416, 5549], [4375, 5557], [4335, 5683], [4225, 5773], [4172, 5835], [4203, 5880], [4275, 5873], [4400, 5883], [4350, 5925], [4318, 5988], [4312, 6040], [4327, 6087], [4315, 6160], [4296, 6168], [4285, 6234], [4243, 6279]]]
                    }
                }, {
                    "type": "Feature",
                    "id": "GA",
                    "properties": {
                        "hc-group": "admin0",
                        "hc-middle-x": 0.57,
                        "hc-middle-y": 0.47,
                        "hc-key": "ga",
                        "hc-a2": "GA",
                        "name": "Gabon",
                        "labelrank": "4",
                        "country-abbrev": "Gabon",
                        "subregion": "Middle Africa",
                        "region-wb": "Sub-Saharan Africa",
                        "iso-a3": "GAB",
                        "iso-a2": "GA",
                        "woe-id": "23424822",
                        "continent": "Africa"
                    },
                    "geometry": {
                        "type": "Polygon",
                        "coordinates": [[[3637, 4703], [3837, 4704], [3834, 4855], [3838, 4873], [4085, 4871], [4092, 4856], [4073, 4785], [4087, 4734], [4158, 4762], [4209, 4756], [4246, 4695], [4169, 4602], [4164, 4550], [4202, 4537], [4251, 4495], [4238, 4444], [4247, 4376], [4198, 4252], [4154, 4304], [4118, 4260], [4053, 4269], [4031, 4327], [3981, 4329], [3986, 4273], [3935, 4262], [3869, 4270], [3886, 4164], [3920, 4147], [3882, 4098], [3860, 4120], [3812, 4064], [3751, 4126], [3749, 4144], [3653, 4223], [3570, 4329], [3581, 4398], [3538, 4404], [3494, 4496], [3539, 4480], [3568, 4519], [3573, 4614], [3598, 4587], [3640, 4588], [3598, 4610], [3574, 4654], [3616, 4651], [3606, 4698], [3637, 4703]]]
                    }
                }, {
                    "type": "Feature",
                    "id": "DJ",
                    "properties": {
                        "hc-group": "admin0",
                        "hc-middle-x": 0.80,
                        "hc-middle-y": 0.21,
                        "hc-key": "dj",
                        "hc-a2": "DJ",
                        "name": "Djibouti",
                        "labelrank": "5",
                        "country-abbrev": "Dji.",
                        "subregion": "Eastern Africa",
                        "region-wb": "Middle East & North Africa",
                        "iso-a3": "DJI",
                        "iso-a2": "DJ",
                        "woe-id": "23424797",
                        "continent": "Africa"
                    },
                    "geometry": {
                        "type": "Polygon",
                        "coordinates": [[[7973, 6009], [7933, 6021], [7846, 6002], [7824, 6022], [7836, 6033], [7824, 6048], [7820, 6082], [7903, 6205], [7943, 6190], [8001, 6236], [8028, 6207], [8034, 6142], [7952, 6103], [7950, 6084], [8015, 6074], [7973, 6009]]]
                    }
                }, {
                    "type": "Feature",
                    "id": "BI",
                    "properties": {
                        "hc-group": "admin0",
                        "hc-middle-x": 0.20,
                        "hc-middle-y": 0.59,
                        "hc-key": "bi",
                        "hc-a2": "BI",
                        "name": "Burundi",
                        "labelrank": "6",
                        "country-abbrev": "Bur.",
                        "subregion": "Eastern Africa",
                        "region-wb": "Sub-Saharan Africa",
                        "iso-a3": "BDI",
                        "iso-a2": "BI",
                        "woe-id": "23424774",
                        "continent": "Africa"
                    },
                    "geometry": {
                        "type": "Polygon",
                        "coordinates": [[[6228, 4002], [6187, 4092], [6170, 4147], [6174, 4185], [6145, 4227], [6234, 4215], [6261, 4236], [6265, 4279], [6346, 4268], [6328, 4210], [6381, 4193], [6377, 4155], [6334, 4124], [6273, 4025], [6228, 4002]]]
                    }
                }, {
                    "type": "Feature",
                    "id": "AO",
                    "properties": {
                        "hc-group": "admin0",
                        "hc-middle-x": 0.50,
                        "hc-middle-y": 0.63,
                        "hc-key": "ao",
                        "hc-a2": "AO",
                        "name": "Angola",
                        "labelrank": "3",
                        "country-abbrev": "Ang.",
                        "subregion": "Middle Africa",
                        "region-wb": "Sub-Saharan Africa",
                        "iso-a3": "AGO",
                        "iso-a2": "AO",
                        "woe-id": "23424745",
                        "continent": "Africa"
                    },
                    "geometry": {
                        "type": "MultiPolygon",
                        "coordinates": [[[[3957, 3828], [3959, 3864], [3930, 3924], [3979, 3978], [4039, 4005], [4068, 3975], [3987, 3920], [3995, 3833], [3957, 3828]]], [[[4550, 3708], [4592, 3625], [4652, 3529], [4734, 3540], [4888, 3540], [4887, 3596], [4908, 3608], [4909, 3671], [5009, 3671], [5051, 3682], [5039, 3634], [5203, 3634], [5200, 3539], [5223, 3487], [5213, 3330], [5253, 3289], [5273, 3231], [5253, 3168], [5263, 3116], [5302, 3144], [5364, 3135], [5426, 3153], [5470, 3145], [5487, 3165], [5500, 3097], [5487, 3067], [5496, 2966], [5474, 2913], [5492, 2885], [5230, 2884], [5231, 2463], [5247, 2412], [5331, 2330], [5412, 2265], [5156, 2215], [5079, 2212], [5018, 2235], [4979, 2230], [4814, 2249], [4773, 2298], [4224, 2296], [4190, 2293], [4089, 2354], [4010, 2315], [3942, 2326], [3908, 2312], [3915, 2416], [3905, 2507], [3936, 2532], [3972, 2648], [3979, 2735], [4001, 2767], [4002, 2822], [4058, 2883], [4057, 2905], [4112, 2935], [4147, 2980], [4167, 3043], [4173, 3130], [4161, 3191], [4088, 3314], [4061, 3394], [4111, 3439], [4109, 3495], [4041, 3633], [4038, 3680], [4011, 3702], [3965, 3782], [4026, 3791], [4083, 3816], [4281, 3814], [4491, 3818], [4528, 3809], [4550, 3708]]]]
                    }
                }, {
                    "type": "Feature",
                    "id": "GN",
                    "properties": {
                        "hc-group": "admin0",
                        "hc-middle-x": 0.38,
                        "hc-middle-y": 0.28,
                        "hc-key": "gn",
                        "hc-a2": "GN",
                        "name": "Guinea",
                        "labelrank": "3",
                        "country-abbrev": "Gin.",
                        "subregion": "Western Africa",
                        "region-wb": "Sub-Saharan Africa",
                        "iso-a3": "GIN",
                        "iso-a2": "GN",
                        "woe-id": "23424835",
                        "continent": "Africa"
                    },
                    "geometry": {
                        "type": "Polygon",
                        "coordinates": [[[601, 5715], [561, 5811], [446, 5868], [425, 5930], [371, 5965], [414, 6038], [467, 6060], [539, 6067], [539, 6106], [506, 6126], [540, 6142], [536, 6196], [622, 6192], [622, 6176], [717, 6150], [754, 6164], [844, 6165], [829, 6137], [871, 6114], [908, 6139], [934, 6098], [992, 6143], [1064, 6118], [1117, 6162], [1159, 6168], [1186, 6105], [1179, 6071], [1242, 6034], [1211, 6002], [1251, 5985], [1254, 5924], [1295, 5874], [1271, 5845], [1286, 5773], [1313, 5775], [1302, 5692], [1337, 5670], [1265, 5648], [1295, 5605], [1269, 5529], [1235, 5530], [1209, 5548], [1187, 5492], [1152, 5481], [1107, 5512], [1122, 5537], [1101, 5631], [1060, 5652], [998, 5648], [940, 5626], [972, 5673], [945, 5756], [865, 5845], [781, 5844], [703, 5825], [679, 5766], [637, 5723], [601, 5715]]]
                    }
                }, {
                    "type": "Feature",
                    "id": "ZW",
                    "properties": {
                        "hc-group": "admin0",
                        "hc-middle-x": 0.63,
                        "hc-middle-y": 0.52,
                        "hc-key": "zw",
                        "hc-a2": "ZW",
                        "name": "Zimbabwe",
                        "labelrank": "3",
                        "country-abbrev": "Zimb.",
                        "subregion": "Eastern Africa",
                        "region-wb": "Sub-Saharan Africa",
                        "iso-a3": "ZWE",
                        "iso-a2": "ZW",
                        "woe-id": "23425004",
                        "continent": "Africa"
                    },
                    "geometry": {
                        "type": "Polygon",
                        "coordinates": [[[5655, 2244], [5710, 2242], [5748, 2217], [5777, 2232], [5843, 2207], [5883, 2222], [5970, 2324], [6016, 2340], [6025, 2372], [6103, 2377], [6140, 2403], [6109, 2414], [6122, 2479], [6193, 2523], [6248, 2536], [6321, 2533], [6321, 2485], [6433, 2481], [6517, 2427], [6566, 2423], [6654, 2392], [6635, 2358], [6660, 2301], [6649, 2231], [6661, 2169], [6642, 2108], [6617, 2102], [6639, 2063], [6626, 2016], [6660, 1972], [6657, 1938], [6610, 1866], [6593, 1865], [6579, 1766], [6434, 1613], [6376, 1629], [6306, 1622], [6236, 1650], [6183, 1643], [6147, 1662], [6143, 1697], [6013, 1727], [5967, 1795], [5970, 1875], [5915, 1876], [5908, 1929], [5845, 1953], [5768, 2013], [5743, 2092], [5651, 2226], [5655, 2244]]]
                    }
                }, {
                    "type": "Feature",
                    "id": "ZA",
                    "properties": {
                        "hc-group": "admin0",
                        "hc-middle-x": 0.44,
                        "hc-middle-y": 0.59,
                        "hc-key": "za",
                        "hc-a2": "ZA",
                        "name": "South Africa",
                        "labelrank": "2",
                        "country-abbrev": "S.Af.",
                        "subregion": "Southern Africa",
                        "region-wb": "Sub-Saharan Africa",
                        "iso-a3": "ZAF",
                        "iso-a2": "ZA",
                        "woe-id": "23424942",
                        "continent": "Africa"
                    },
                    "geometry": {
                        "type": "Polygon",
                        "coordinates": [[[6538, 985], [6569, 982], [6639, 984], [6593, 790], [6572, 737], [6491, 677], [6418, 590], [6315, 400], [6266, 334], [6186, 267], [6119, 184], [5994, 70], [5897, 3], [5816, -39], [5744, -32], [5709, -45], [5712, -80], [5616, -74], [5603, -105], [5446, -74], [5417, -94], [5309, -76], [5198, -137], [5097, -133], [5047, -147], [4974, -203], [4934, -197], [4887, -140], [4827, -134], [4833, -101], [4764, -102], [4786, -57], [4703, 103], [4758, 129], [4767, 188], [4744, 277], [4708, 325], [4629, 473], [4567, 660], [4526, 734], [4566, 764], [4578, 806], [4636, 785], [4644, 715], [4742, 687], [4817, 696], [4860, 679], [4922, 741], [4976, 762], [4974, 1284], [5024, 1244], [5056, 1188], [5086, 1088], [5057, 1046], [5066, 979], [5195, 984], [5328, 1109], [5344, 1181], [5365, 1205], [5423, 1209], [5483, 1160], [5596, 1132], [5697, 1161], [5734, 1285], [5803, 1301], [5860, 1355], [5880, 1440], [5977, 1499], [6053, 1588], [6127, 1606], [6144, 1638], [6183, 1643], [6236, 1650], [6306, 1622], [6376, 1629], [6434, 1613], [6465, 1507], [6463, 1471], [6506, 1396], [6523, 1329], [6517, 1112], [6450, 1143], [6410, 1119], [6367, 1039], [6369, 990], [6415, 933], [6519, 917], [6522, 990], [6538, 985]], [[6035, 487], [6156, 539], [6157, 575], [6192, 623], [6089, 736], [6057, 728], [5975, 687], [5933, 615], [5881, 582], [5919, 507], [5974, 438], [6017, 429], [6035, 487]]]
                    }
                }, {
                    "type": "Feature",
                    "id": "MZ",
                    "properties": {
                        "hc-group": "admin0",
                        "hc-middle-x": 0.73,
                        "hc-middle-y": 0.24,
                        "hc-key": "mz",
                        "hc-a2": "MZ",
                        "name": "Mozambique",
                        "labelrank": "3",
                        "country-abbrev": "Moz.",
                        "subregion": "Eastern Africa",
                        "region-wb": "Sub-Saharan Africa",
                        "iso-a3": "MOZ",
                        "iso-a2": "MZ",
                        "woe-id": "23424902",
                        "continent": "Africa"
                    },
                    "geometry": {
                        "type": "Polygon",
                        "coordinates": [[[6639, 984], [6569, 982], [6538, 985], [6529, 1065], [6517, 1112], [6523, 1329], [6506, 1396], [6463, 1471], [6465, 1507], [6434, 1613], [6579, 1766], [6593, 1865], [6610, 1866], [6657, 1938], [6660, 1972], [6626, 2016], [6639, 2063], [6617, 2102], [6642, 2108], [6661, 2169], [6649, 2231], [6660, 2301], [6635, 2358], [6654, 2392], [6566, 2423], [6517, 2427], [6433, 2481], [6321, 2485], [6321, 2533], [6297, 2621], [6685, 2748], [6742, 2670], [6752, 2685], [6833, 2698], [6853, 2673], [6862, 2580], [6818, 2498], [6837, 2458], [6917, 2373], [6927, 2332], [6954, 2331], [6953, 2388], [6934, 2410], [6966, 2463], [7020, 2481], [7019, 2590], [7028, 2660], [6929, 2789], [6900, 2814], [6887, 2890], [6896, 2920], [6880, 2989], [6903, 3008], [6915, 3070], [6995, 3066], [7027, 3091], [7075, 3052], [7123, 3048], [7156, 3069], [7235, 3049], [7281, 3070], [7293, 3102], [7343, 3107], [7373, 3089], [7426, 3121], [7477, 3122], [7571, 3167], [7627, 3210], [7650, 3162], [7625, 3057], [7644, 2883], [7637, 2793], [7675, 2683], [7674, 2638], [7645, 2590], [7642, 2548], [7586, 2490], [7552, 2424], [7451, 2363], [7293, 2298], [7186, 2230], [7107, 2134], [7001, 2059], [6931, 1982], [6881, 1957], [6871, 1883], [6913, 1841], [6917, 1793], [6948, 1715], [6953, 1609], [6975, 1653], [6980, 1540], [6963, 1409], [6976, 1371], [6925, 1303], [6866, 1273], [6747, 1232], [6637, 1170], [6591, 1113], [6632, 1064], [6651, 1110], [6639, 984]]]
                    }
                }, {
                    "type": "Feature",
                    "id": "SZ",
                    "properties": {
                        "hc-group": "admin0",
                        "hc-middle-x": 0.52,
                        "hc-middle-y": 0.48,
                        "hc-key": "sz",
                        "hc-a2": "SZ",
                        "name": "Swaziland",
                        "labelrank": "4",
                        "country-abbrev": "Swz.",
                        "subregion": "Southern Africa",
                        "region-wb": "Sub-Saharan Africa",
                        "iso-a3": "SWZ",
                        "iso-a2": "SZ",
                        "woe-id": "23424993",
                        "continent": "Africa"
                    },
                    "geometry": {
                        "type": "Polygon",
                        "coordinates": [[[6517, 1112], [6529, 1065], [6538, 985], [6522, 990], [6519, 917], [6415, 933], [6369, 990], [6367, 1039], [6410, 1119], [6450, 1143], [6517, 1112]]]
                    }
                }, {
                    "type": "Feature",
                    "id": "ML",
                    "properties": {
                        "hc-group": "admin0",
                        "hc-middle-x": 0.60,
                        "hc-middle-y": 0.42,
                        "hc-key": "ml",
                        "hc-a2": "ML",
                        "name": "Mali",
                        "labelrank": "3",
                        "country-abbrev": "Mali",
                        "subregion": "Western Africa",
                        "region-wb": "Sub-Saharan Africa",
                        "iso-a3": "MLI",
                        "iso-a2": "ML",
                        "woe-id": "23424891",
                        "continent": "Africa"
                    },
                    "geometry": {
                        "type": "Polygon",
                        "coordinates": [[[1682, 7923], [1682, 7923], [1682, 7923], [1682, 7923], [1682, 7923], [1682, 7923], [1682, 7923], [2477, 7378], [2480, 7326], [2543, 7297], [2576, 7257], [2614, 7264], [2643, 7233], [2751, 7198], [2757, 7138], [2737, 7108], [2765, 7085], [2886, 7108], [2889, 6813], [2883, 6734], [2843, 6638], [2796, 6589], [2510, 6576], [2463, 6536], [2364, 6524], [2304, 6544], [2236, 6544], [2198, 6509], [2113, 6465], [2078, 6463], [2071, 6424], [2013, 6435], [1964, 6402], [1957, 6349], [1908, 6357], [1911, 6300], [1884, 6283], [1816, 6323], [1767, 6275], [1786, 6235], [1750, 6221], [1763, 6196], [1741, 6145], [1647, 6102], [1656, 6047], [1619, 5998], [1618, 5914], [1581, 5912], [1554, 5882], [1524, 5895], [1523, 5952], [1500, 5930], [1467, 5942], [1464, 5901], [1430, 5880], [1337, 5912], [1295, 5874], [1254, 5924], [1251, 5985], [1211, 6002], [1242, 6034], [1179, 6071], [1186, 6105], [1159, 6168], [1117, 6162], [1064, 6118], [992, 6143], [934, 6098], [908, 6139], [871, 6114], [829, 6137], [844, 6165], [844, 6236], [813, 6293], [748, 6338], [765, 6366], [730, 6430], [724, 6482], [782, 6500], [793, 6587], [834, 6596], [900, 6529], [923, 6573], [1042, 6568], [1105, 6586], [1610, 6593], [1629, 6704], [1593, 6733], [1544, 7141], [1448, 7919], [1682, 7923], [1682, 7923], [1682, 7923], [1682, 7923], [1682, 7923]]]
                    }
                }, {
                    "type": "Feature",
                    "id": "BW",
                    "properties": {
                        "hc-group": "admin0",
                        "hc-middle-x": 0.45,
                        "hc-middle-y": 0.50,
                        "hc-key": "bw",
                        "hc-a2": "BW",
                        "name": "Botswana",
                        "labelrank": "4",
                        "country-abbrev": "Bwa.",
                        "subregion": "Southern Africa",
                        "region-wb": "Sub-Saharan Africa",
                        "iso-a3": "BWA",
                        "iso-a2": "BW",
                        "woe-id": "23424755",
                        "continent": "Africa"
                    },
                    "geometry": {
                        "type": "Polygon",
                        "coordinates": [[[4974, 1284], [4973, 1668], [5103, 1674], [5101, 2173], [5166, 2176], [5360, 2214], [5403, 2215], [5439, 2152], [5516, 2212], [5558, 2208], [5616, 2245], [5655, 2244], [5651, 2226], [5743, 2092], [5768, 2013], [5845, 1953], [5908, 1929], [5915, 1876], [5970, 1875], [5967, 1795], [6013, 1727], [6143, 1697], [6147, 1662], [6183, 1643], [6144, 1638], [6127, 1606], [6053, 1588], [5977, 1499], [5880, 1440], [5860, 1355], [5803, 1301], [5734, 1285], [5697, 1161], [5596, 1132], [5483, 1160], [5423, 1209], [5365, 1205], [5344, 1181], [5328, 1109], [5195, 984], [5066, 979], [5057, 1046], [5086, 1088], [5056, 1188], [5024, 1244], [4974, 1284]]]
                    }
                }, {
                    "type": "Feature",
                    "id": "SD",
                    "properties": {
                        "hc-group": "admin0",
                        "hc-middle-x": 0.48,
                        "hc-middle-y": 0.45,
                        "hc-key": "sd",
                        "hc-a2": "SD",
                        "name": "Sudan",
                        "labelrank": "3",
                        "country-abbrev": "Sudan",
                        "subregion": "Northern Africa",
                        "region-wb": "Sub-Saharan Africa",
                        "iso-a3": "SDN",
                        "iso-a2": "SD",
                        "woe-id": "-90",
                        "continent": "Africa"
                    },
                    "geometry": {
                        "type": "Polygon",
                        "coordinates": [[[7189, 7517], [7189, 7468], [7219, 7415], [7233, 7315], [7226, 7285], [7246, 7119], [7274, 7057], [7291, 7061], [7343, 7007], [7412, 6959], [7360, 6893], [7268, 6866], [7254, 6826], [7201, 6832], [7184, 6758], [7193, 6720], [7123, 6566], [7136, 6451], [7117, 6358], [7097, 6330], [7079, 6241], [7016, 6225], [6962, 6135], [6940, 6118], [6927, 5999], [6879, 6000], [6839, 5959], [6845, 5919], [6811, 5812], [6789, 5812], [6789, 5909], [6695, 5996], [6682, 6095], [6699, 6178], [6637, 6179], [6638, 6151], [6551, 6150], [6586, 6112], [6594, 6024], [6532, 5972], [6496, 5913], [6439, 5858], [6375, 5850], [6279, 5921], [6227, 5893], [6209, 5854], [6147, 5833], [6126, 5797], [6021, 5798], [6001, 5833], [5894, 5834], [5826, 5823], [5740, 5912], [5732, 5942], [5633, 5925], [5594, 5860], [5564, 5739], [5513, 5713], [5423, 5726], [5422, 5777], [5442, 5791], [5441, 5874], [5397, 5945], [5341, 6008], [5348, 6071], [5298, 6109], [5308, 6162], [5255, 6251], [5219, 6237], [5219, 6293], [5263, 6330], [5237, 6389], [5297, 6436], [5275, 6493], [5315, 6512], [5354, 6585], [5349, 6631], [5371, 6650], [5488, 6653], [5487, 7171], [5487, 7240], [5619, 7241], [5619, 7521], [6446, 7520], [7189, 7517]]]
                    }
                }, {
                    "type": "Feature",
                    "id": "MA",
                    "properties": {
                        "hc-group": "admin0",
                        "hc-middle-x": 0.73,
                        "hc-middle-y": 0.27,
                        "hc-key": "ma",
                        "hc-a2": "MA",
                        "name": "Morocco",
                        "labelrank": "3",
                        "country-abbrev": "Mor.",
                        "subregion": "Northern Africa",
                        "region-wb": "Middle East & North Africa",
                        "iso-a3": "MAR",
                        "iso-a2": "MA",
                        "woe-id": "23424893",
                        "continent": "Africa"
                    },
                    "geometry": {
                        "type": "Polygon",
                        "coordinates": [[[82, 7385], [87, 7436], [120, 7507], [144, 7513], [173, 7597], [240, 7735], [351, 7856], [365, 7967], [412, 8087], [515, 8152], [572, 8300], [598, 8335], [718, 8363], [793, 8399], [850, 8466], [912, 8501], [968, 8568], [1031, 8675], [1036, 8718], [999, 8760], [1002, 8871], [1065, 8968], [1077, 9055], [1173, 9165], [1309, 9227], [1397, 9291], [1466, 9427], [1515, 9576], [1582, 9598], [1603, 9543], [1667, 9488], [1720, 9474], [1813, 9497], [1847, 9483], [1906, 9503], [1918, 9476], [2006, 9468], [2067, 9412], [2053, 9389], [2080, 9311], [2082, 9173], [2116, 9095], [2167, 9061], [2141, 8992], [1973, 8998], [1917, 8984], [1932, 8945], [1822, 8921], [1802, 8870], [1837, 8814], [1826, 8777], [1730, 8744], [1612, 8648], [1578, 8592], [1549, 8605], [1365, 8587], [1302, 8568], [1163, 8457], [1166, 8307], [1148, 8306], [1152, 8226], [1071, 8220], [1029, 8186], [960, 8185], [871, 8205], [809, 8185], [817, 8149], [768, 8070], [727, 8059], [677, 7883], [595, 7820], [563, 7759], [503, 7730], [471, 7675], [448, 7518], [395, 7453], [368, 7395], [248, 7398], [82, 7385]]]
                    }
                }, {
                    "type": "Feature",
                    "id": "EG",
                    "properties": {
                        "hc-group": "admin0",
                        "hc-middle-x": 0.38,
                        "hc-middle-y": 0.57,
                        "hc-key": "eg",
                        "hc-a2": "EG",
                        "name": "Egypt",
                        "labelrank": "2",
                        "country-abbrev": "Egypt",
                        "subregion": "Northern Africa",
                        "region-wb": "Middle East & North Africa",
                        "iso-a3": "EGY",
                        "iso-a2": "EG",
                        "woe-id": "23424802",
                        "continent": "Africa"
                    },
                    "geometry": {
                        "type": "Polygon",
                        "coordinates": [[[7189, 7517], [6446, 7520], [5619, 7521], [5619, 8569], [5580, 8715], [5621, 8813], [5603, 8905], [5642, 8948], [5675, 8924], [5731, 8941], [5932, 8903], [6006, 8864], [6073, 8859], [6155, 8819], [6218, 8839], [6332, 8924], [6356, 8906], [6446, 8935], [6486, 8914], [6539, 8926], [6519, 8891], [6561, 8857], [6593, 8886], [6629, 8854], [6696, 8881], [6768, 8862], [6841, 8892], [6923, 8651], [6897, 8505], [6866, 8435], [6869, 8387], [6823, 8360], [6712, 8475], [6699, 8545], [6644, 8611], [6624, 8685], [6593, 8631], [6627, 8593], [6631, 8536], [6663, 8477], [6748, 8384], [6746, 8337], [6812, 8219], [6813, 8184], [6883, 8054], [6973, 7861], [7037, 7802], [7010, 7800], [7006, 7731], [7033, 7651], [7099, 7610], [7189, 7517]]]
                    }
                }, {
                    "type": "Feature",
                    "id": "LS",
                    "properties": {
                        "hc-group": "admin0",
                        "hc-middle-x": 0.50,
                        "hc-middle-y": 0.48,
                        "hc-key": "ls",
                        "hc-a2": "LS",
                        "name": "Lesotho",
                        "labelrank": "6",
                        "country-abbrev": "Les.",
                        "subregion": "Southern Africa",
                        "region-wb": "Sub-Saharan Africa",
                        "iso-a3": "LSO",
                        "iso-a2": "LS",
                        "woe-id": "23424880",
                        "continent": "Africa"
                    },
                    "geometry": {
                        "type": "Polygon",
                        "coordinates": [[[6035, 487], [6017, 429], [5974, 438], [5919, 507], [5881, 582], [5933, 615], [5975, 687], [6057, 728], [6089, 736], [6192, 623], [6157, 575], [6156, 539], [6035, 487]]]
                    }
                }, {
                    "type": "Feature",
                    "id": "SS",
                    "properties": {
                        "hc-group": "admin0",
                        "hc-middle-x": 0.51,
                        "hc-middle-y": 0.49,
                        "hc-key": "ss",
                        "hc-a2": "SS",
                        "name": "South Sudan",
                        "labelrank": "3",
                        "country-abbrev": "S. Sud.",
                        "subregion": "Eastern Africa",
                        "region-wb": "Sub-Saharan Africa",
                        "iso-a3": "SSD",
                        "iso-a2": "SS",
                        "woe-id": "-99",
                        "continent": "Africa"
                    },
                    "geometry": {
                        "type": "Polygon",
                        "coordinates": [[[6796, 5126], [6737, 5068], [6670, 5082], [6586, 5063], [6560, 5036], [6508, 5074], [6472, 5054], [6425, 5071], [6385, 5032], [6346, 5048], [6344, 5081], [6302, 5092], [6204, 5185], [6167, 5144], [6113, 5171], [6067, 5135], [5984, 5177], [5941, 5239], [5900, 5330], [5815, 5374], [5790, 5411], [5802, 5446], [5756, 5491], [5669, 5535], [5658, 5578], [5600, 5645], [5508, 5668], [5513, 5713], [5564, 5739], [5594, 5860], [5633, 5925], [5732, 5942], [5740, 5912], [5826, 5823], [5894, 5834], [6001, 5833], [6021, 5798], [6126, 5797], [6147, 5833], [6209, 5854], [6227, 5893], [6279, 5921], [6375, 5850], [6439, 5858], [6496, 5913], [6532, 5972], [6594, 6024], [6586, 6112], [6551, 6150], [6638, 6151], [6637, 6179], [6699, 6178], [6682, 6095], [6695, 5996], [6789, 5909], [6789, 5812], [6811, 5812], [6816, 5703], [6797, 5679], [6693, 5674], [6676, 5595], [6763, 5575], [6839, 5485], [6896, 5441], [6928, 5337], [6972, 5272], [7036, 5267], [7032, 5196], [7050, 5177], [7010, 5177], [6984, 5231], [6849, 5178], [6796, 5126]]]
                    }
                }, {
                    "type": "Feature",
                    "id": "CF",
                    "properties": {
                        "hc-group": "admin0",
                        "hc-middle-x": 0.51,
                        "hc-middle-y": 0.45,
                        "hc-key": "cf",
                        "hc-a2": "CF",
                        "name": "Central African Republic",
                        "labelrank": "4",
                        "country-abbrev": "C.A.R.",
                        "subregion": "Middle Africa",
                        "region-wb": "Sub-Saharan Africa",
                        "iso-a3": "CAF",
                        "iso-a2": "CF",
                        "woe-id": "23424792",
                        "continent": "Africa"
                    },
                    "geometry": {
                        "type": "Polygon",
                        "coordinates": [[[5513, 5713], [5508, 5668], [5600, 5645], [5658, 5578], [5669, 5535], [5756, 5491], [5802, 5446], [5790, 5411], [5815, 5374], [5900, 5330], [5941, 5239], [5899, 5256], [5866, 5235], [5813, 5238], [5769, 5264], [5730, 5255], [5669, 5270], [5662, 5234], [5594, 5220], [5554, 5243], [5411, 5176], [5347, 5207], [5285, 5117], [5193, 5138], [5126, 5137], [5082, 5158], [5046, 5152], [5012, 5200], [4931, 5247], [4890, 5246], [4848, 5217], [4800, 5148], [4776, 5138], [4791, 5096], [4788, 5030], [4768, 5050], [4686, 5038], [4636, 5060], [4519, 5028], [4508, 4946], [4471, 4868], [4457, 4949], [4336, 5065], [4314, 5149], [4276, 5177], [4258, 5347], [4234, 5360], [4276, 5391], [4341, 5521], [4375, 5557], [4416, 5549], [4491, 5577], [4514, 5603], [4543, 5562], [4663, 5619], [4782, 5628], [4851, 5710], [4818, 5735], [4848, 5755], [5023, 5772], [5074, 5809], [5099, 5852], [5195, 5941], [5192, 5970], [5288, 6019], [5341, 6008], [5397, 5945], [5441, 5874], [5442, 5791], [5422, 5777], [5423, 5726], [5513, 5713]]]
                    }
                }]
            }

            $('#container' + containerID).highcharts('Map', {
                chart: {
                   
                    height: 400,
                    events: {
                        drilldown: function (e) {
                            var chart = this,
                                mapKey = e.point.drilldown,
                                chartName = e.point.name;
                            $.getScript('https://code.highcharts.com/mapdata/' + mapKey + '.js', function () {
                                var data = [],
                                    drillPath,
                                    regionMap = Highcharts.maps[mapKey],
                                    regionMapGeoJson = Highcharts.geojson(regionMap);

                                    
                                $.each(regionMapGeoJson, function (indxx, elem) {
                                    drillPath = 'countries/' + elem.properties['hc-key'].slice(0, 2) + '/' + elem.properties['hc-key'] + '-all';
                                    data.push({
                                        code: elem.properties['hc-key'],
                                        value: countriesData.value,
                                        
                                        // drilldown: drillPath
                                    })
                                    
                                    console.log(countriesData.code);
                                });
                                // Hide loading and add series
                                chart.addSingleSeriesAsDrilldown(e.point, {
                                    name: e.point.name,
                                    data: data,
                                    mapData: regionMap,
                                    joinBy: ['hc-key', 'code'],
                                });

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
                    },
                    map: 'custom/africa'
                },
                credits: {
                    enabled: false
                },
                title: {
                    text: ''
                },
                subtitle: {
                    text: 'Africa',
                    floating: true,
                    align: 'right',
                    y: 50,
                    style: {
                        fontSize: '16px'
                    }
                },
                legend: {
                    title: {
                        text: 'LEGEND',
                        style: {
                            color: ( // theme
                                Highcharts.defaultOptions &&
                                Highcharts.defaultOptions.legend &&
                                Highcharts.defaultOptions.legend.title &&
                                Highcharts.defaultOptions.legend.title.style &&
                                Highcharts.defaultOptions.legend.title.style.color
                            ) || 'black'
                        }
                    },
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle'
                },
                colors: [ '#cecdcd', '#ff0000', '#ffa500', '#f1cd00', '#008d00'],

                colorAxis: {
                    dataClasses: [{
                        from: -100,
                        to: 0,
                        name: 'Information unavailable.',
                        color: '#cecdcd'
                    }, {
                        from: 1,
                        to: 10,
                        name: 'Off Track',
                        color: '#ff0000'
                    }, {
                        from: 10,
                        to: 20,
                        name: 'Significant challenges remain',
                        color: '#ffa500'
                    },{
                        from: 20,
                        to: 30,
                        name: 'Challenges remain',
                        color: '#f1cd00'
                    },{
                        from: 30,
                        name: 'SDG Achieved',
                        color: '#008d00'
                    }]
                    
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
                    name: 'Africa',
                    data: getMapData(),
                    mapData: geoj,
                    joinBy: ['hc-key', 'code'],
                    dataLabels: {
                        enabled: false,
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
                },
                exporting: {
                    buttons: {
                        contextButton: {
                            menuItems: ['downloadCSV', 'downloadPDF', 'downloadPNG']
                        }
                    }
                }
            });
            //window.scrollTo(0, document.body.scrollHeight);
        }).fail(function () {
            var noData = '<i class="fa fa-warning" style="font-size:40px;color:red;margin-left: 50%;margin-top: 12%;"></i><br><br><p style="margin-top: 15%;text-align: center;margin-left: -4%;font-weight: bolder;">No Data Available</p>';
            $("#container" + containerID).empty().append(noData);
            console.log("No Data Available");
        });
    }
    if (n == 2) {
        countriesDropdown();
        var result = [];
        $.get(completeDataPath, function (data){

            var lines = data.split('\n');
            var countryData = [];
            var yearData = [];
            var headers = lines[0].split(",");

            var years = [];
            for(var i=0; i<headers.length; i++){
                if(!isNaN(headers[i])){
                    years.push(parseFloat(headers[i]));
                }
            }
            
            $.each(lines, function(lineNo, lineContent){
                if(lineNo > 0){
                yearData[lineNo-1] = lineContent.split(',')[1];
                countryData[lineNo-1] = lineContent.split(',')[0];
            }
            });

            for(var i=1; i < lines.length; i++){
                var dataObj ={};
                var currLine = lines[i].split(",");

                for(var j=0; j<headers.length; j++){
                    dataObj[headers[j]] = currLine[j];
                }
                result.push(dataObj);
            }

            chartData = result;

            //console.log("Random Filtered result"); 
            console.log(getFilteredData());

            chartNew = Highcharts.chart("container" + containerID, {
                chart: {
                    styledMode: true,
                    events: {
                        redraw: function () {
                            var label = this.renderer.label('', 100, 120)
                                .attr({
                                    fill: Highcharts.getOptions().colors[0],
                                    padding: 10,
                                    r: 5,
                                    zIndex: 8
                                })
                                .css({
                                    color: 'black'
                                })
                                .add();
        
                            setTimeout(function () {
                                label.fadeOut();
                            }, 1000);
                        }
                    }
                },
               
                title: {
                    text: 'Agenda 2063 values over time'
                },
                subtitle: {
                    text: 'Source: sdg.org'
                },
                xAxis: {
                    // tickInterval: 10,
                    categories: years,
                    align: "left",
                    startOnTick: false,
                    endOnTick: false,
                    minPadding: 0,
                    maxPadding: 0,
                },
                yAxis: {
                    title: {
                        text: 'Values per country'
                    }
                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle'
                },
                plotOptions: {
                    series: {
                        label: {
                            connectorAllowed: false
                        },
                        // pointStart: 1900,
                        animation: {
                            duration: 10000
                        }
                    }
                },
                series : getFilteredData(),

                responsive: {
                    rules: [{
                        condition: {
                            maxWidth: 500
                        },
                        chartOptions: {
                            legend: {
                                layout: 'horizontal',
                                align: 'center',
                                verticalAlign: 'bottom'
                            }
                        }
                    }]
                }
            
            });
        });
    }
    timeRangeSlider();
}

function getClosest(arr, val) {
    return arr.reduce(function (prev, curr) {
    return (Math.abs(curr - val) < Math.abs(prev - val) ? curr : prev);
  });
}
let years = [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019];

function timeRangeSlider(){
    onSliderChange();
    onClickPlayButton();
}

function onSliderChange(){
    var sel = document.getElementById('selectPeriod11');
    document.querySelector("#yearslider").addEventListener("change", function() {
        let closest = getClosest(years, this.value);
        this.value = document.querySelector("#rangevalue").value = closest;
        period = this.value;
        //console.log(period.toString());
        $("#selectPeriod11").val(period.toString()); 

        if ("createEvent" in document) {
            var evt = document.createEvent("HTMLEvents");
            evt.initEvent("change", false, true);
            sel.dispatchEvent(evt);
        }
        else {
            sel.fireEvent("onchange");
        }
    });  
}

function onClickPlayButton(){
    var sel = document.getElementById('selectPeriod11');
    document.querySelector("#play").addEventListener("click", function (){
        let yearslider = document.querySelector("#yearslider");
        let output = document.querySelector("#rangevalue");
        years.forEach(function(item, index, array) {
            // set a timeout so each second one button gets clicked
            setTimeout( (function( index ) {
                return function() {
                    yearslider.value = output.value = array[index]; 
                    period = yearslider.value;
                    $("#selectPeriod11").val(period.toString());

                    if ("createEvent" in document) {
                        var evt = document.createEvent("HTMLEvents");
                        evt.initEvent("change", false, true);
                        sel.dispatchEvent(evt);
                    }
                    else {
                        sel.fireEvent("onchange");
                    }
                };
            }( index )), (1000 * index) );
        });
        
    });   
}

function lowercase(string) {
    return string.toLocaleLowerCase();
}

function contains(string, value) {
    return string.indexOf(value) !== -1;
}

/**
 * Function that checks which data is selected and generates a new data set
 */

function getMapData() {    
    var newCountryData = [];
    // cycle through source data and filter out required data points
    for (var i = 0; i < countriesData.length; i++) {
        var dataPoint = countriesData[i];

        newCountryData.push({
                "code": dataPoint.code,
                "drilldown": dataPoint.drilldown,
                "value": dataPoint[period],
                "country":dataPoint.country
            });
            //console.log("");   
    }
    //console.log(countriesData)
    return newCountryData;
}

function countriesDropdown(){
    $('.selectpicker').selectpicker('refresh');
    var items = getMapData();
    console.log(items)
    for(var j=1; j<=7; j++){
        $.each(items, function (i, item) {
            var option = document.createElement("option");
            option.className = "filter-position";
            option.text = item["country"];
            option.value = item["code"];
            //console.log("j", j);
            var select = document.getElementById("african_countries" + j);
            select.appendChild(option);
        });
        $('.selectpicker').selectpicker('refresh');
        $('.selectpicker').selectpicker('val', [items[0].code, items[1].code, items[2].code, items[3].code]);
        $('.selectpicker').selectpicker('refresh');
        }
}

function getFilteredData() {
    var filters = {};

    // get all filter checkboxes
    var fields = document.getElementsByClassName("filter-position");
    for (var i = 0; i < fields.length; i++) {
        if (fields[i].selected) {
            filters[fields[i].value] = true;
        }
    }

    // init new data set
    var newData = [];
    var valuesData = []; 
    var parsedData = [];     

    // cycle through source data and filter out required data points
    for (var i = 0; i < chartData.length; i++) {
        var dataPoint = chartData[i];

        if(filters[dataPoint.code] && 
            contains(lowercase(dataPoint.code), name)){
                valuesData = Object.values(dataPoint);
                var parsedData = []; 

                for(var j=0; j<valuesData.length;j++){
                    //console.log(valuesData[j]);
                    if(!isNaN(valuesData[j])){
                        parseFloat(valuesData[j]);
                        parsedData.push(parseFloat(valuesData[j]));
                    }
                }
                    newData.push({
                        "name": dataPoint.country,
                        "data": parsedData
                    });
            }      
    }
    return newData;
}

/**
 * Function which applies current filters when invoked
 */
function applyFilters(containerID) {
     var data2 = getFilteredData();

    //update chart data
    var chart2 = $('#container'+containerID).highcharts();
    var seriesLength = chart2.series.length;

    for(var i = seriesLength -1; i > -1; i--) {
        chart2.series[i].remove();
    }

    for(var i = 0; i < data2.length; i++) {
        chart2.addSeries(data2[i])
    }
}

// Set type
$.each(['line', 'column'], function (i, type) {
    $('#' + type).click(function () {
        var chart2 = $('#container1').highcharts();
        chart2.series[0].update({
            type: type
        });
    });
});