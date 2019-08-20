$(document).ready(function(){
    var url = location.href;

    if(url.includes("performer")){
        initPerformerPresentation()
    } else if(url.includes("seminar")){
        initSeminarPresentation();
    }  else if(url.includes("event")){
        initEventPresentation();
    }
    
});

function initCurrentNotFounds(){

}

function initRelatedNotFounds(){
    $('.related-records').addClass('hidden');
}

function initEventPresentation(){
    var url = location.href;
    var id = url.split('/')[url.split('/').length - 1];

    $('.btn-add-reservation').prop('href', '/account/reservation/' + id);
    var currentUrl = $('.record').data('current-url').replace('{id}', id);    
    var relatedUrl = $('.record').data('related-url');
    var page = $('.listing-result').data('page');
    var limit = $('.listing-result').data('limit');

    $.ajax({
        url: currentUrl,
        method: 'GET',
        success: function(json){
            if(json != undefined)
                presentEvents(json[0], "event");
            else
                initCurrentNotFounds();
        }
    });

    $.ajax({
        url: relatedUrl,
        method: 'GET',
        data:{
            id: id
        },
        success: function(json){
            if(json.length > 0){
                presentPerformers(json, 'event', page, limit);
                setUpPaging(json.length, limit);
                initChangeListingPage();
            }
            else {
                initRelatedNotFounds();
            }
        }
    });
}

function initPerformerPresentation(){
    var url = location.href;
    var Id = url.split('/')[url.split('/').length - 1];
    
    var limit = $('.listing-result').data('limit');
    var page = $('.listing-result').data('page');           
    var performersUrl = $('.record').data('current-url').replace('{Id}', Id);
    var eventsUrl = $('.record').data('related-url');

    $.ajax({
        url: performersUrl,
        method: 'GET',
        success: function(json){
            if(json != undefined)
                presentPerformers(json, "performer");
            else
                initCurrentNotFounds();
        }
    });

    $.ajax({
        url: eventsUrl,
        method: 'GET',
        data:{
            id: Id,
        },
        success: function(json){
            if(json.length > 0){
                presentEvents(json, "performer", page, limit);
                setUpPaging(json.length, limit);
                initChangeListingPage();
            } else {
                initRelatedNotFounds();
            }
        }
    });
}

function initSeminarPresentation(){

    var url = location.href;
    var id = url.split('/')[url.split('/').length - 1];

    var seminarUrl = $('.record').data('current-url').replace('{id}', id);    
    var eventUrl = $('.record').data('related-url');
    var limit = $('.listing-result').data('limit');
    var page = $('.listing-result').data('page');

    $.ajax({
        url: seminarUrl,
        method: 'GET',
        success: function(json){
            if(json != undefined)
                presentSeminar(json[0], "seminar");
            else
                initCurrentNotFounds();
        }
    });

    $.ajax({
        url: eventUrl,
        method: 'GET',
        data:{
            id: id
        },
        success: function(json){
            if(json.length > 0){
                presentEvents(json, "seminar", page, limit);
                setUpPaging(json.length, limit);
                initChangeListingPage();
            } else {
                initRelatedNotFounds();
            }
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

function presentEvents(json, type){
    if(type == "performer" || type == "seminar"){
        for(var i = 0; i < json.length; i++){
            var presentation = $('.generic-event').html();

            presentation = presentation.replace('{imageSrc}', json[i].image);
            presentation = presentation.replace('{name}', json[i].name);
            presentation = presentation.replace('{alt}', json[i].name);
            presentation = presentation.replace('{href}', "/events/event/" + json[i].id);

            $('.related-records .card-container .listing-result').append(presentation);
        }
    } else if(type == "event"){
        var presentation = $('.generic-record').html();

        presentation = presentation.replace('{Title}', json.name);
        presentation = presentation.replace('{image}', json.image);
        presentation = presentation.replace('{alt}', json.name);
        presentation = presentation.replace('{description}', json.description);
        presentation = presentation.replace('{date}', json.date);
        presentation = presentation.replace('{location}', json.location);
        presentation = presentation.replace('{type}', json.type);
        presentation = presentation.replace('{seminar}', '<a href="/seminars/seminar/' + json.seminarId + '">' + json.seminarName + '</a>');

        $('.current-presentation').append(presentation);
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

        $('.current-presentation').append(presentation);
    } else if(type == "performer"){
        for(var i = offset; i < offset + limit; i++){
            var presentation = $('.generic-event').html();
            
            presentation = presentation.replace('{name}', json[i].name);
            presentation = presentation.replace('{alt}', json[i].name);
            presentation = presentation.replace('{imageSrc}', json[i].image);
            presentation = presentation.replace('{href}', "/seminars/seminar/" + json[i].id);

            $('.related-records .card-container .listing-result').append(presentation);
        }
    }
}

function presentPerformers(json, type, offset, limit){
    if(type == "performer"){
        var presentation = $('.generic-record').html();

        presentation = presentation.replace('{Title}', json.name + ' ' + json.surname);
        presentation = presentation.replace('{image}', json.photo);
        presentation = presentation.replace('{description}', json.bio);

        $('.current-presentation').append(presentation);
    } else if(type == "event"){
        for(var i = offset; i < offset + limit; i++){
            var presentation = $('.generic-event').html();
            
            presentation = presentation.replace('{name}', json[i].name + ' ' + json[i].surname);
            presentation = presentation.replace('{alt}', json[i].name + ' ' + json[i].surname);
            presentation = presentation.replace('{imageSrc}', json[i].photo);
            presentation = presentation.replace('{href}', "/performers/performer/" + json[i].id);

            $('.related-records .card-container .listing-result').append(presentation);
        }
    }
}