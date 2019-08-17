$(document).ready(function(){
    var url = new URL(location.href);    
    var m = url.searchParams.get("m");
    

    if(m === null){
        initMonthName();
    } else {
        initMonthEvents(m);
    }
});

function initMonthName(){
    var d = new Date();
    var currentMonth = d.getMonth();
    var currentYear = d.getFullYear();

    $('month').html(currentMonth.toLocaleString());

    var previousMonth = currentMonth === 1 ? 12 : currentMonth - 1;
    var nextMonth = currentMonth === 12 ? 1 : currentMonth - 1;
    var previousMonthYear = currentMonth === 1 ? currentYear - 1 : currentYear;
    var nextMonthYear = currentMonth === 12 ? currentYear + 1 : currentYear;

    $('previous-month').prop("href", "/calendar?m=" + previousMonth.toString().padStart(2, '0') + previousMonthYear);
    $('next-month').prop("href", "/calendar?m=" + nextMonth.toString().padStart(2, '0') + nextMonthYear);

    initMonthEvents(currentMonth.toString().padStart(2, '0') + currentYear);
    
}

function initMonthEvents(m){
    var month = m.substring(0, 2);
    var year = m.substring(2, 6);
    var day = getDaysFromMonth(month, year);
    
    var initDate = "01-" + month + "-" + year;
    var endDate = day + "-" + month + "-" + year;

    $.ajax({
        url: '/v1/events/findByDate',
        method: "GET",
        data: {
            start: initDate,
            end: endDate
        },
        success: function(json){
            drawEvents(json);
        }
    });
}

function drawEvents(json){

}

function getDaysFromMonth(m, y){
    m = new Number(m);

    switch(m){
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
        case 12:
            return 31;
        case 4:
        case 6:
        case 9:
        case 11:
            return 30;
        default:
            return checkBissextile(y) ? 29 : 28;
    }
}

function checkBissextile(y){
    if((y % 4) !== 0)
        return false;
    if((y % 100) === 0)
        return true;
    if((y % 400) === 0)
        return true;
    return false;
}