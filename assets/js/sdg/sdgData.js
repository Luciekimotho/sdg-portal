$(document).ready(function () {
    var mapData = [];

    //getTargets(1)
    indicators(1)

    d3.csv("../assets/data/SDGs/sdgDataCompiled.csv").then(function(data){
    var countriesData = d3.nest()
        .key(function(d){ return d.Entity; })
        .entries(data);

        $.each(countriesData, function (i, countryData) {
            var values = countryData.values
            var country = countryData.key
            var indicatorsJson = []

            $.each(values, function (j, value) {
                years = value.Year
                indicators = value["1.1 Poverty headcount ratio at national poverty lines (% of population)"]
                indicatorsJson.push({
                    "indicator": indicators,
                    "year": years
                })   
            })

            mapData.push({ 
                "country":country,
                "values":indicatorsJson
            });
        })
    });
})


function getTargets(goalNo){
    var baseUrl = 'https://unstats.un.org/SDGAPI/v1/sdg/Goal/'
    var targetAPIUrl = baseUrl + goalNo + '/Target/List?includechildren=true'
    var code, title 
    var targetsArr = []

    fetch(targetAPIUrl)
    .then((resp)=>resp.json())
    .then(function(data){

        var targets = data[0].targets
        firstBtnID = targets[0].code.replace(".", "");
        firstTarget = targets[0].code.replace(".", "");

        for ( var i=0; i<targets.length; i++ ) {
            code = targets[i].code
            title = targets[i].title

            targetsArr.push(code)            
        }
        console.log(targetsArr)
    })
}


function indicators(goalNo){
    var indicators = []
    var baseUrl = 'https://unstats.un.org/SDGAPI/v1/sdg/Goal/'
    var targetAPIUrl = baseUrl + goalNo + '/Target/List?includechildren=true'
    var code, title 
    var targetsArr = []

    $.get("../assets/data/SDGs/sdgDataCompiled.csv", function (data){
        var lines = data.split('\n');
        var headers = lines[0].split(",");
        for(var i=3; i < headers.length; i++){
            var indicator = headers[i]
            indicators.push(indicator)
        }

        //console.log(indicators)

       })

    fetch(targetAPIUrl)
    .then((resp)=>resp.json())
    .then(function(data){

        var targets = data[0].targets
        firstBtnID = targets[0].code.replace(".", "");
        firstTarget = targets[0].code.replace(".", "");

        for ( var i=0; i<targets.length; i++ ) {
            code = targets[i].code
            title = targets[i].title
            targetsArr.push(code) 
                       
        }
        var m = indicators.length / targetsArr.length
        var n = targetsArr.length / indicators.length

        // for(var i=0;i<indicators.length;i++){
        //     for(var j=0; j<targetsArr.length; j++){
        //         if(indicators[i].startsWith(targetsArr[j])){
        //             //console.log(indicators[i])
        //         }

        //     }
        // }

        //console.log(targetsArr)
    })

    
}