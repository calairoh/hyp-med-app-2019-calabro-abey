$(document).ready(function(){
    var url = location.href;

    if(url.includes("performer")){
        initPerformerPresentation()
    } else if(url.includes("seminar")){
        initSeminarPresentation();
    }  else if(url.includes("event")){
        //init events
    }
    
});

function initPerformerPresentation(){
    var url = location.href;
    var Id = url.split('/')[url.split('/').length - 1];
    
    var limit = $('.listing-result').data('limit');
    var page = $('.listing-result').data('page');           
    var performersUrl = $('.record').data('performer-url').replace('{Id}', Id);

    getPerformerEvents(Id, page, limit);

    $.ajax({
        url: performersUrl,
        method: 'GET',
        success: function(json){
            presentEvents(json, "performer");
        }
    });


}

function getPerformerEvents(Id, page, limit){
    var eventUrl = $('.record').data('event-url');
    var offset = page * limit;

    $.ajax({
        url: eventUrl,
        method: 'GET',
        data:{
            performer: Id,
        },
        success: function(json){
            presentSeminar(json, "performer", offset, limit);
            setUpPaging(json.length, limit);
            initChangeListingPage();
        }
    });
}

function setUpPaging(total, limit){
    var page = $('.listing-result').data('page');
    var pages = Math.ceil(Number(total / limit));

    $('.pagination').html(' ');

    for(var i = 0; i < pages; i++){
        var html = $('.generic-page-number').html();

        html = html.replace('{value}', i);
        html = html.replace('{page}', i + 1);
        html = html.replace('{active}', (i == page) ? 'active' : '');

        $('.pagination').append(html);
    }
}

function initChangeListingPage(){
    $(document).on('click', '.js-listing-page', function(){
        var page = $(this).data('value');
        var limit = $('.listing-result').data('limit')
        $('.listing-result').data('page', page);
        
        var url = location.href;
        var Id = url.split('/')[url.split('/').length - 1];

        getPerformerEvents(Id, page, limit);
    });
}

function initSeminarPresentation(){

    var url = location.href;
    var id = url.split('/')[url.split('/').length - 1];

    var seminarUrl = $('.record').data('seminar-url').replace('{id}', id);    
    var eventUrl = $('.record').data('events-url');

    $.ajax({
        url: seminarUrl,
        method: 'GET',
        success: function(json){
            if(json.length > 0)
                presentSeminar(json[0], "seminar");
            else
            {
                //present error
            }
        }
    });

    $.ajax({
        url: eventUrl,
        method: 'GET',
        data:{
            id: id
        },
        success: function(json){
            presentEvents(json, "seminar");
        }
    });
}

function presentEvents(json, type){
    if(type == "performer" || type == "seminar"){
        for(var i = 0; i < json.length; i++){
            var presentation = $('.generic-event').html();

            presentation = presentation.replace('{imageSrc}', json[i].image);
            presentation = presentation.replace('{name}', json[i].name + ' ' + json[i].surname);
            presentation = presentation.replace('{alt}', json[i].name + ' ' + json[i].surname);
            presentation = presentation.replace('{href}', "/events/event/" + json[i].id);

            $('.events .card-container').append(presentation);
        }
    } else if(type == "event"){
        var presentation = $('.generic-record').html();

        presentation = presentation.replace('{Title}', json[i].name + ' ' + json[i].surname);
        presentation = presentation.replace('{image}', json.image);
        presentation = presentation.replace('{alt}', json[i].name + ' ' + json[i].surname);
        presentation = presentation.replace('{Description}', json.bio);

        $('.event-presentation').append(presentation);
    }
}

function presentSeminar(json, type, offset, limit){
    if(type == "seminar"){
        var presentation = $('.generic-record').html();

        presentation = presentation.replace('{Title}', json.name);
        presentation = presentation.replace('{image}', json.image);
        presentation = presentation.replace('{description}', json.description);
        presentation = presentation.replace('{location}', json.location);
        presentation = presentation.replace('{start}', json.start);
        presentation = presentation.replace('{end}', json.end);

        $('.event-presentation').append(presentation);
    } else if(type == "performer"){
        $('.performer-events .card-container .listing-result').html(' ');

        for(var i = offset; i < offset + limit; i++){
            var presentation = $('.generic-event').html();
            
            presentation = presentation.replace('{name}', json[i].name);
            presentation = presentation.replace('{alt}', json[i].name);
            presentation = presentation.replace('{imageSrc}', json[i].image);
            presentation = presentation.replace('{href}', "/events/event/" + json[i].id);

            $('.performer-events .card-container .listing-result').append(presentation);
        }
    }
}