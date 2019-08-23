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
    var date = new Date(json.date);
    $('.summary-event-date').html(date.toDateString());
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