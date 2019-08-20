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
            if(json.msg !== undefined){
                initReservationPageStrings();
            } else {
                location.href = "/account/login";
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
    $('.summary-event-date').html(json.date);
    $('.summary-event-name').html(json.name);
    $('.summary-event-type').html(json.type);
    $('.summary-event-seminar').html(json.seminarName);

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
    }
}

function initReservationConfirm(){
    $(document).on('click', '.btn-reservation-confirm', function(){
        var eventId = location.href.searchParams.get('id');
        if(eventId !== undefined && eventId !== null){
            var url = "/booking/add/" + eventId;        

            $.ajax({
                url: url,
                method: 'GET',
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