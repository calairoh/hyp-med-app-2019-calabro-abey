$(document).ready(function(){
    initReservationPage();
    initReservationConfirm();
});

function initReservationPage(){
    var url = "/v1/user/logged";

    $.ajax({
        url: url,
        method: "GET",
        success: function(json){
            if(json.msg !== 'no user logged in'){
                initReservationPageStrings();
                checkUserReservations();
            } else {
                location.href = "/account/login";
            }
        }
    });
}

function checkUserReservations(){
    var url = location.href.split('/');
    var eventId = url[url.length - 1];

    $.ajax({
        url: "/v1/booking/findByUser",
        method: 'GET',
        success: function(json){
            for(var i = 0; i < json.length; i++){
                if(json[i].id == eventId){
                    location.href = "/account/reservations?ae=1";
                }
            }
        }
    });
}

function initReservationPageStrings(){
    var url = location.href.split('/');
    var eventId = url[url.length - 1];

    $('.btn-reservation-cancel').prop('href', '/events/event/' + eventId);

    $.ajax({
        url: "/v1/event/" + eventId,
        method: 'GET',
        success: function(json){
            if(json !== undefined && json.length > 0){
                initReservationPageEvent(json[0]);
            } else {
                location.href = "/notfound?type=event";
            }
        }
    });
}

function initReservationPageEvent(json){
    var date = new Date(json.date);
    $('.summary-event-date').html(date.toDateString());
    $('.summary-event-name').html(json.name);
    $('.summary-event-type').html(json.type);
    $('.summary-event-seminar').html(json.seminarName);

    $('breadcrumb-item.hidden > a').prop('href', '/events/event/' + json.id);
    $('breadcrumb-item.hidden').removeClass('hidden');

    $.ajax({
        url: "/v1/performer/findByEvent",
        method: 'GET',
        data: {
            id: json.id
        },
        success: function(json){
            initReservationPagePerformers(json);
        }
    });
}

function initReservationPagePerformers(json){
    for(var i = 0; i < json.length; i++){
        $('.summary-event-performer').append(json[i].name + ' ' + json[i].surname);

        if(i < json.length - 2)
        $('.summary-event-performer').append(', ');
    }
}

function initReservationConfirm(){
    $(document).on('click', '.btn-reservation-confirm', function(){
        var currentUrl = location.href.split('/');
        var eventId = currentUrl[currentUrl.length - 1];
        if(eventId !== undefined && eventId !== null){
            var url = "/v1/booking/add/" + eventId;        

            $.ajax({
                url: url,
                method: 'POST',
                success: function(){
                    location.href = "/account/reservations?new=1";
                },
                error: function(){
                    //show error
                }
            });
        }        
    });
}