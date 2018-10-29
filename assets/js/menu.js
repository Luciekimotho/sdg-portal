$(document).ready(function () {
    var pageURL = window.location.href.substr(window.location.href
        .lastIndexOf("/") + 1).replace('.html', '');
    setTimeout(function () {
        $("#" + pageURL).addClass("current");
        if (pageURL.match(/sdg[0-9]+/)){
            $("#sdgs").addClass("current");
            console.log(pageURL+"hey");
        }
        if (pageURL.match(/asp[1-7]/)){
            $("#asps").addClass("current");
            console.log(pageURL);
        }
    });
});