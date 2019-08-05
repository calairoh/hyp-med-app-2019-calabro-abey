
$(document).ready(function(){
    getLatestElements();
});

function getLatestElements(){
    $('.js-latest-elements').each(function(){
        var $content = $(this);
        var url = $content.data('href');
        var limit = parseInt($content.data('limit'));
        var type = $content.data('type');

        $.ajax({
            url: url,
            method: 'GET',
            data: {
                offset: 0,
                lenght: limit
            },
            success: function(response){
                switch(type){
                    case "event":
                        createEventsCard($content, response);
                        break;
                    case "performer":
                        createPerformersCard($content, response);
                        break;
                    default:
                        break;
                }                
            }
        });
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
        $(html).insertBefore($content.find('.arrow-col'));
    }
}

function createEventsCard($content, json){
    for(var i = 0; i < json.length; i++){
        var html = $('.generic-card').html();

        html = html.replace('{Title}', json[i].name);
        html = html.replace('{Description}', json[i].description);
        html = html.replace('{type}', 'event');
        html = html.replace('{id}', json[i].id);
        html = html.replace('{imageSrc}', json[i].image);
        html = html.replace('{alt}', json[i].name);
        $(html).insertBefore($content.find('.arrow-col'));
    }
}