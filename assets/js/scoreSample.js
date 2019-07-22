function loadRegion(n) {

    if (n == 2) {
        $(".SAF").hide();
        $(".NAF").hide();
        $(".WAF").hide();
        $(".EAF").hide();
        $(".CAF").show();
    }
    else if (n == 3) {
        $(".SAF").hide();
        $(".NAF").hide();
        $(".WAF").hide();
        $(".EAF").show();
        $(".CAF").hide();
    }
    else if (n == 4) {
        $(".SAF").hide();
        $(".NAF").show();
        $(".WAF").hide();
        $(".EAF").hide();
        $(".CAF").hide();
    }
    else if (n == 5) {
        $(".SAF").show();
        $(".NAF").hide();
        $(".WAF").hide();
        $(".EAF").hide();
        $(".CAF").hide();
    }
    else if (n == 6) {
        $(".SAF").hide();
        $(".NAF").hide();
        $(".WAF").show();
        $(".EAF").hide();
        $(".CAF").hide();
    }
    else if (n == 1) {
        $(".SAF").show();
        $(".NAF").show();
        $(".WAF").show();
        $(".EAF").show();
        $(".CAF").show();
    }
    else {
        $(".SAF").show();
        $(".NAF").show();
        $(".WAF").show();
        $(".EAF").show();
        $(".CAF").show();
    }
}

var dataSourceUrl = "../assets/data/scorecardData.json";
$.getJSON(dataSourceUrl, function (data) {
    $.each(data, function (i, item) {
        $('<tr>').addClass(item.region).append(
            $('<td>').css({
                "height": "28px",
                "color": "black",
                "font-weight": "bold",
                "text-transform": "capitalize",
                "font-size": "9px",
                "font-family": "Roboto, Helvetica, Arial, sans-serif"
            }).text(item.country),
            $('<td>').css({'height':'28px','background-color': (item.sdg1 >= 1 && item.sdg1 <= 33 ? 'red' : (item.sdg1 >= 34 && item.sdg1 <= 66 ? 'orange' : (item.sdg1 >= 67 && item.sdg1 <= 100 ? 'green' : 'grey')))}),
            $('<td>').css({'background-color': (item.sdg2 >= 1 && item.sdg2 <= 33 ? 'red' : (item.sdg2 >= 34 && item.sdg2 <= 66 ? 'orange' : (item.sdg2 >= 67 && item.sdg2 <= 100 ? 'green' : 'grey')))}),
            $('<td>').css('background-color', (item.sdg3 >= 1 && item.sdg3 <= 33 ? 'red' : (item.sdg3 >= 34 && item.sdg3 <= 66 ? 'orange' : (item.sdg3 >= 67 && item.sdg3 <= 100 ? 'green' : 'grey')))),
            $('<td>').css('background-color', (item.sdg4 >= 1 && item.sdg4 <= 33 ? 'red' : (item.sdg4 >= 34 && item.sdg4 <= 66 ? 'orange' : (item.sdg4 >= 67 && item.sdg4 <= 100 ? 'green' : 'grey')))),
            $('<td>').css('background-color', (item.sdg5 >= 1 && item.sdg5 <= 33 ? 'red' : (item.sdg5 >= 34 && item.sdg5 <= 66 ? 'orange' : (item.sdg5 >= 67 && item.sdg5 <= 100 ? 'green' : 'grey')))),
            $('<td>').css('background-color', (item.sdg6 >= 1 && item.sdg6 <= 33 ? 'red' : (item.sdg6 >= 34 && item.sdg6 <= 66 ? 'orange' : (item.sdg6 >= 67 && item.sdg6 <= 100 ? 'green' : 'grey')))),
            $('<td>').css('background-color', (item.sdg7 >= 1 && item.sdg7 <= 33 ? 'red' : (item.sdg7 >= 34 && item.sdg7 <= 66 ? 'orange' : (item.sdg7 >= 67 && item.sdg7 <= 100 ? 'green' : 'grey')))),
            $('<td>').css('background-color', (item.sdg8 >= 1 && item.sdg8 <= 33 ? 'red' : (item.sdg8 >= 34 && item.sdg8 <= 66 ? 'orange' : (item.sdg8 >= 67 && item.sdg8 <= 100 ? 'green' : 'grey')))),
            $('<td>').css('background-color', (item.sdg9 >= 1 && item.sdg9 <= 33 ? 'red' : (item.sdg9 >= 34 && item.sdg9 <= 66 ? 'orange' : (item.sdg9 >= 67 && item.sdg9 <= 100 ? 'green' : 'grey')))),
            $('<td>').css('background-color', (item.sdg10 >= 1 && item.sdg10 <= 33 ? 'red' : (item.sdg10 >= 34 && item.sdg10 <= 66 ? 'orange' : (item.sdg10 >= 67 && item.sdg10 <= 100 ? 'green' : 'grey')))),
            $('<td>').css('background-color', (item.sdg11 >= 1 && item.sdg11 <= 33 ? 'red' : (item.sdg11 >= 34 && item.sdg11 <= 66 ? 'orange' : (item.sdg11 >= 67 && item.sdg11 <= 100 ? 'green' : 'grey')))),
            $('<td>').css('background-color', (item.sdg12 >= 1 && item.sdg12 <= 33 ? 'red' : (item.sdg12 >= 34 && item.sdg12 <= 66 ? 'orange' : (item.sdg12 >= 67 && item.sdg12 <= 100 ? 'green' : 'grey')))),
            $('<td>').css('background-color', (item.sdg13 >= 1 && item.sdg13 <= 33 ? 'red' : (item.sdg13 >= 34 && item.sdg13 <= 66 ? 'orange' : (item.sdg13 >= 67 && item.sdg13 <= 100 ? 'green' : 'grey')))),
            $('<td>').css('background-color', (item.sdg14 >= 1 && item.sdg14 <= 33 ? 'red' : (item.sdg14 >= 34 && item.sdg14 <= 66 ? 'orange' : (item.sdg14 >= 67 && item.sdg14 <= 100 ? 'green' : 'grey')))),
            $('<td>').css('background-color', (item.sdg15 >= 1 && item.sdg15 <= 33 ? 'red' : (item.sdg15 >= 34 && item.sdg15 <= 66 ? 'orange' : (item.sdg15 >= 67 && item.sdg15 <= 100 ? 'green' : 'grey')))),
            $('<td>').css('background-color', (item.sdg16 >= 1 && item.sdg16 <= 33 ? 'red' : (item.sdg16 >= 34 && item.sdg16 <= 66 ? 'orange' : (item.sdg16 >= 67 && item.sdg16 <= 100 ? 'green' : 'grey')))),
            $('<td>').css('background-color', (item.sdg17 >= 1 && item.sdg17 <= 33 ? 'red' : (item.sdg17 >= 34 && item.sdg17 <= 66 ? 'orange' : (item.sdg17 >= 67 && item.sdg17 <= 100 ? 'green' : 'grey')))),
        ).appendTo('#records_table');
    });
});
