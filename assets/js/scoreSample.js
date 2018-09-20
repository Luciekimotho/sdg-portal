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

var dataSourceUrl = "assets/data/scorecardData.json";
$.getJSON(dataSourceUrl, function (data) {
    $.each(data, function (i, item) {
        $('<tr>').addClass(item.region).append(
            $('<td>').css({
                "height": "30px",
                "color": "black",
                "font-weight": "bold",
                "text-transform": "capitalize",
                "font-size": "7.5px",
                "font-family": "Roboto, Helvetica, Arial, sans-serif"
            }).text(item.country),
            $('<td>').css('background-color', (item.sdg1 >= 1 && item.sdg1 <= 33 ? '#e8153b' : (item.sdg1 >= 34 && item.sdg1 <= 66 ? '#f67e37' : (item.sdg1 >= 67 && item.sdg1 <= 100 ? '#2daf58' : 'grey')))),
            $('<td>').css('background-color', (item.sdg2 >= 1 && item.sdg2 <= 33 ? '#e8153b' : (item.sdg2 >= 34 && item.sdg2 <= 66 ? '#f67e37' : (item.sdg2 >= 67 && item.sdg2 <= 100 ? '#2daf58' : 'grey')))),
            $('<td>').css('background-color', (item.sdg3 >= 1 && item.sdg3 <= 33 ? '#e8153b' : (item.sdg3 >= 34 && item.sdg3 <= 66 ? '#f67e37' : (item.sdg3 >= 67 && item.sdg3 <= 100 ? '#2daf58' : 'grey')))),
            $('<td>').css('background-color', (item.sdg4 >= 1 && item.sdg4 <= 33 ? '#e8153b' : (item.sdg4 >= 34 && item.sdg4 <= 66 ? '#f67e37' : (item.sdg4 >= 67 && item.sdg4 <= 100 ? '#2daf58' : 'grey')))),
            $('<td>').css('background-color', (item.sdg5 >= 1 && item.sdg5 <= 33 ? '#e8153b' : (item.sdg5 >= 34 && item.sdg5 <= 66 ? '#f67e37' : (item.sdg5 >= 67 && item.sdg5 <= 100 ? '#2daf58' : 'grey')))),
            $('<td>').css('background-color', (item.sdg6 >= 1 && item.sdg6 <= 33 ? '#e8153b' : (item.sdg6 >= 34 && item.sdg6 <= 66 ? '#f67e37' : (item.sdg6 >= 67 && item.sdg6 <= 100 ? '#2daf58' : 'grey')))),
            $('<td>').css('background-color', (item.sdg7 >= 1 && item.sdg7 <= 33 ? '#e8153b' : (item.sdg7 >= 34 && item.sdg7 <= 66 ? '#f67e37' : (item.sdg7 >= 67 && item.sdg7 <= 100 ? '#2daf58' : 'grey')))),
            $('<td>').css('background-color', (item.sdg8 >= 1 && item.sdg8 <= 33 ? '#e8153b' : (item.sdg8 >= 34 && item.sdg8 <= 66 ? '#f67e37' : (item.sdg8 >= 67 && item.sdg8 <= 100 ? '#2daf58' : 'grey')))),
            $('<td>').css('background-color', (item.sdg9 >= 1 && item.sdg9 <= 33 ? '#e8153b' : (item.sdg9 >= 34 && item.sdg9 <= 66 ? '#f67e37' : (item.sdg9 >= 67 && item.sdg9 <= 100 ? '#2daf58' : 'grey')))),
            $('<td>').css('background-color', (item.sdg10 >= 1 && item.sdg10 <= 33 ? '#e8153b' : (item.sdg10 >= 34 && item.sdg10 <= 66 ? '#f67e37' : (item.sdg10 >= 67 && item.sdg10 <= 100 ? '#2daf58' : 'grey')))),
            $('<td>').css('background-color', (item.sdg11 >= 1 && item.sdg11 <= 33 ? '#e8153b' : (item.sdg11 >= 34 && item.sdg11 <= 66 ? '#f67e37' : (item.sdg11 >= 67 && item.sdg11 <= 100 ? '#2daf58' : 'grey')))),
            $('<td>').css('background-color', (item.sdg12 >= 1 && item.sdg12 <= 33 ? '#e8153b' : (item.sdg12 >= 34 && item.sdg12 <= 66 ? '#f67e37' : (item.sdg12 >= 67 && item.sdg12 <= 100 ? '#2daf58' : 'grey')))),
            $('<td>').css('background-color', (item.sdg13 >= 1 && item.sdg13 <= 33 ? '#e8153b' : (item.sdg13 >= 34 && item.sdg13 <= 66 ? '#f67e37' : (item.sdg13 >= 67 && item.sdg13 <= 100 ? '#2daf58' : 'grey')))),
            $('<td>').css('background-color', (item.sdg14 >= 1 && item.sdg14 <= 33 ? '#e8153b' : (item.sdg14 >= 34 && item.sdg14 <= 66 ? '#f67e37' : (item.sdg14 >= 67 && item.sdg14 <= 100 ? '#2daf58' : 'grey')))),
            $('<td>').css('background-color', (item.sdg15 >= 1 && item.sdg15 <= 33 ? '#e8153b' : (item.sdg15 >= 34 && item.sdg15 <= 66 ? '#f67e37' : (item.sdg15 >= 67 && item.sdg15 <= 100 ? '#2daf58' : 'grey')))),
            $('<td>').css('background-color', (item.sdg16 >= 1 && item.sdg16 <= 33 ? '#e8153b' : (item.sdg16 >= 34 && item.sdg16 <= 66 ? '#f67e37' : (item.sdg16 >= 67 && item.sdg16 <= 100 ? '#2daf58' : 'grey')))),
            $('<td>').css('background-color', (item.sdg17 >= 1 && item.sdg17 <= 33 ? '#e8153b' : (item.sdg17 >= 34 && item.sdg17 <= 66 ? '#f67e37' : (item.sdg17 >= 67 && item.sdg17 <= 100 ? '#2daf58' : 'grey')))),
        ).appendTo('#records_table');
    });
});
