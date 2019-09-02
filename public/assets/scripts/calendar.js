$(document).ready(function(){
    var url = new URL(location.href);    
    var m = url.searchParams.get("m");
    

    if(m === null){
        initMonthName();
    } else {
        var month = m.substring(0, 2);
        var year = m.substring(2, 6);
        initMonthLabels(month, year);
    }
});

function initMonthName(){
    var d = new Date();
    var currentMonth = d.getMonth() + 1;
    var currentYear = d.getFullYear();

    initMonthLabels(currentMonth, currentYear);
}

function initMonthLabels(m, y){    
    m = new Number(m);
    y = new Number(y);

    $('.month').html(getMonthName(m) + " " + y);

    var previousMonth = m == 1 ? 12 : m - 1;
    var nextMonth = m == 12 ? 1 : m + 1;
    var previousMonthYear = m == 1 ? y - 1 : y;
    var nextMonthYear = m == 12 ? y + 1 : y;

    $('.previous-month').prop("href", "/calendar?m=" + previousMonth.toString().padStart(2, '0') + previousMonthYear);
    $('.next-month').prop("href", "/calendar?m=" + nextMonth.toString().padStart(2, '0') + nextMonthYear);

    initMonthEvents(m.toString().padStart(2, '0'), y);    
}

function initMonthEvents(month, year){
    var day = getDaysFromMonth(month, year);
    
    var initDate = year + "-" + month + "-01";
    var endDate = year + "-" + month + "-" + day;

    $.ajax({
        url: '/v1/event/findByDate',
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
    if(json.length === 0){
        $('.no-records').removeClass('hidden');
        return;
    }

    for(var i = 0; i < json.length; i++){
        var calendarRecord = $('.calendar-record').html();
        var date = new Date(json[i].date);
        calendarRecord = calendarRecord.replace('{date}', date.toDateString());
        calendarRecord = calendarRecord.replace('{event}', json[i].name);
        calendarRecord = calendarRecord.replace('{title}', json[i].name);
        calendarRecord = calendarRecord.replace('{type}', json[i].type);
        calendarRecord = calendarRecord.replace('{eventHref}', "/events/event/" + json[i].id);
        calendarRecord = calendarRecord.replace('{typeHref}', "/events?type=" + json[i].type);

        $('.calendar-records').append(calendarRecord);
    }    
}

function getMonthName(m){
    switch(m.toPrecision()){
        case "1":
            return "January";
        case "2":
            return "February";
        case "3":
            return "March";
        case "4":
            return "April";
        case "5":
            return "May";
        case "6":
            return "June";
        case "7":
            return "July";
        case "8":
            return "August";
        case "9":
            return "September";
        case "10":
            return "October";
        case "11":
            return "November";
        case "12":
            return "December";
        default:
            return "Unknown";
    }
}

function getDaysFromMonth(m, y){
    var m = new Number(m);

    switch(m.toPrecision()){
        case "1":
        case "3":
        case "5":
        case "7":
        case "8":
        case "10":
        case "12":
            return 31;
        case "4":
        case "6":
        case "9":
        case "11":
            return 30;
        default:
            return checkBissextile(y) ? 29 : 28;
    }
}

function checkBissextile(y){
    if((y % 4) === 0)
        return true;
    if((y % 400) === 0)
        return true;
    if((y % 100) === 0)
        return false;
    return false;
}