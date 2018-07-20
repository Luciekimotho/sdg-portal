
/*
TODO:
- Check data labels after drilling. Label rank? New positions?
*/
var dataSourceURL=null;
function updateAfricaMap(n){
    if (n==411) {
        $('#myModal').modal('hide');
        //get the data source and update var. This is the data that loads.
        dataSourceURL='assets/data/trial.json';
        loadMap(1);

    }
    else if (412) {
        $('#myModal').modal('hide');
        //get the data source and update var. This is the data that loads.
        dataSourceURL='assets/data/trial.json';
        loadMap(1);
    }
}
$( document ).ready(function() {
    dataSourceURL='assets/data/trial.json';
    loadMap(1);
});

function loadMap(n){
if(n==1){
    var data = $.getJSON(dataSourceURL,function(data){ 

// Create the chart
Highcharts.mapChart('container', {
    chart: {
        map: 'custom/africa',
        backgroundColor:'transparent'
    },

    title: {
        text: ''
    },
    legend:{
        enabled: false
    },
    exporting:{
        enabled:false
    },
    plotOptions: {
        series: {
            point: {
                events: {
                    click: function (event) {
                        $('#myModal').modal('show');
                        // alert("Hey");
                        // location.href = 'https://en.wikipedia.org/wiki/' + this.name;
                        // location.href = 'http://localhost/sdgportal/explore.html';
                    }
                }
            }
        }
    },

    // subtitle: {
    //     text: 'Source map: <a href="http://code.highcharts.com/mapdata/custom/africa.js">Africa</a>'
    // },

    mapNavigation: {
        // enabled: true,
        // buttonOptions: {
        //     verticalAlign: 'bottom'
        // }
    },

    colorAxis: {
        min: 0,
        minColor: '#f9db8e',
        maxColor: '#f9db8e'
    },

    series: [{
        data: data,
        mapData: Highcharts.maps['custom/africa'],
        joinBy: ['iso-a2', 'code'],
        name: 'Random data',
        cursor: 'pointer',
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
}}