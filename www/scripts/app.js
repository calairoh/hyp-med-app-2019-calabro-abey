
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
                    case "book":
                        createBooksCard($content, response);
                        break;
                    default:
                        break;
                }                
            }
        });
    });
    
}

function createBooksCard($content, json){
    for(var i = 0; i < json.length; i++){
        var html = $('.generic-card').html();

        html = html.replace('{Title}', json[i].Title);
        html = html.replace('{Description}', json[i].Description);
        html = html.replace('{type}', 'book');
        html = html.replace('{id}', json[i].Id);
        html = html.replace('{imageSrc}', json[i].Image);
        html = html.replace('{alt}', json[i].Title);
        $(html).insertBefore($content.find('.arrow-col'));
    }
}

function createEventsCard($content, json){
    for(var i = 0; i < json.length; i++){
        var html = $('.generic-card').html();

        html = html.replace('{Title}', json[i].Name);
        html = html.replace('{Description}', json[i].Description);
        html = html.replace('{type}', 'event');
        html = html.replace('{id}', json[i].Id);
        html = html.replace('{imageSrc}', json[i].Image);
        html = html.replace('{alt}', json[i].Title);
        $(html).insertBefore($content.find('.arrow-col'));
    }
}