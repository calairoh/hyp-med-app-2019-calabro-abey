
$(document).ready(function(){
    getLatestElements();
});

function getLatestElements(){
    $('.js-latest-elements').each(function(){
        var $content = $(this);
        var url = $content.data('href');
        var limit = parseInt($content.data('limit'));
        var type = $content.data('type');

        if(type === "event"){
            var date = new Date();
            $.ajax({
                url: url,
                method: 'GET',
                data: {
                    offset: 0,
                    lenght: limit,
                    start: dateToDbFormat(date),
                    end: dateToDbFormat(date)
                },
                success: function(response){
                    createEventsCard($content, response);
                },
                error: function(){
                    initNoEvents();
                }       
            });
        } else {
            $.ajax({
                url: url,
                method: 'GET',
                data: {
                    offset: 0,
                    lenght: limit
                },
                success: function(response){
                    createPerformersCard($content, response);             
                }
            });
        }
        
    });
    
}

function createPerformersCard($content, json){
    for(var i = 0; i < json.length; i++){
        var html = $('.generic-card').html();

        html = html.replace('{Title}', json[i].name + ' '+ json[i].surname);
        html = html.replace('{Description}', json[i].bio);
        html = html.replace('{type}', 'performer');
        html = html.replace('{id}', json[i].id);
        html = html.replace('{imageSrc}', json[i].photo);
        html = html.replace('{alt}', json[i].name + ' '+ json[i].surname);
        html = html.replace('{href}', '/performers/performer/' + json[i].id);
        $(html).insertBefore($content.find('.arrow-col'));
    }
}

function createEventsCard($content, json){    
    if(json === undefined || json.length === 0){
        initNoEvents();
    }

    for(var i = 0; i < json.length; i++){
        var html = $('.generic-card').html();

        html = html.replace('{Title}', json[i].name);
        html = html.replace('{Description}', json[i].description);
        html = html.replace('{type}', 'event');
        html = html.replace('{id}', json[i].id);
        html = html.replace('{imageSrc}', json[i].image);
        html = html.replace('{alt}', json[i].name);
        html = html.replace('{href}', '/events/event/' + json[i].id);
        $(html).insertBefore($content.find('.arrow-col'));
    }
}

function initNoEvents(){
    $('.no-events-today').removeClass('hidden');
    $('.no-events-today').parent().removeClass('hidden');
    $('.js-today-elements .arrow-col').addClass('hidden');
}