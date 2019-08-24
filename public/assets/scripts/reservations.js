$(document).ready(function(){
    initPersonalReservations();
});

function initPersonalReservations(){
    var url = new URL(location.href);
    var newRes = url.searchParams.get('new');
    var ae = url.searchParams.get('ae');

    if(newRes == 1){
        $('.reservation-added').removeClass('hidden');
        $('.reservation-added').parent().removeClass('hidden');
    }

    if(ae == 1){
        $('.already-reserved').removeClass('hidden');
        $('.already-reserved').parent().removeClass('hidden');
    }

    $.ajax({
        url: "/v1/booking/findByUser",
        method: "GET",
        success: function(json){
            if(json === undefined || json.length === 0){
                $('.no-reservations').removeClass('hidden');
                $('.no-reservations').parent().removeClass('hidden');
            }
            
            drawReservation(json);
        },
        error: function(){
            location.href = "/account/login";
        }
    });
}

function drawReservation(json){
    var toComeCount = 0;
    var passedCount = 0;

    for(var i = 0; i < json.length; i++){
        var reservation = $('.reservation').html();
        var date = new Date(json[i].date);

        reservation = reservation.replace('{date}', date.toDateString());
        reservation = reservation.replace('{event}', json[i].name);
        reservation = reservation.replace('{href}', "/events/event/" + json[i].id);

        if(date >= new Date()){
            $('.to-come-reservations').append(reservation);
            toComeCount++;
        } else {
            $('.passed-reservations').append(reservation);
            passedCount++;
        }
    }

    if(toComeCount === 0){
        $('.to-come-reservations').parent().addClass('hidden');
    }

    if(passedCount === 0){
        $('.passed-reservations').parent().addClass('hidden');
    }
}