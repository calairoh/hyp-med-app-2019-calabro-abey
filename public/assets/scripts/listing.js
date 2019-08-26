$(document).ready(function(){
    initListing();
    initChangeListingPage();
});

function initListing(){
    var listingType = checkListingType();

    switch(listingType){
        case "today":{
            var date = new Date();
            var strDate = dateToDbFormat(date);
            getElements('/v1/event/findBydate', 'event', strDate);
            break;
        }
        case "events":{
            initEventsListing();
            initFilterCheckbox();
            $('.filter-checkbox').change();
            break;            
        }
        case "seminars":{
            getElements('/v1/seminars', 'seminar');
            break;
        }
        case "types":{
            getElements('/v1/event/getTypes', 'type');
            break;
        }
        case "performers":{
            getElements('/v1/performers', 'performer');
            break;
        }
        default:
            break;
    }

    setUpNavbar(listingType);
}

function setUpNavbar(listingType){
    $('.navbar-nav li.' + listingType + '-nav').addClass('active');
}

function checkListingType(){
    var url = location.href.toLocaleLowerCase();

    if(url.includes('seminars')){
        return "seminars";
    } else if(url.includes('performers')){
        return "performers";
    } else if(url.includes('today')){
        return "today";
    }  else if(url.includes('types')){
        return "types";
    } else if(url.includes('events')){
        return "events";
    } else {
        return undefined;
    }
}

function getElements(url, type, param){
    var page = $('.listing-result').data('page');
    var limit = $('.listing-result').data('limit');

    var data = { };

    if(param != undefined){
        data.start = param;
        data.end = param;
    }

    data.offset = page;
    data.limit = 2000;

    $.ajax({
        url: url,
        method: 'GET',
        data: data,
        success: function(json){
            setUpPaging(json.length, limit);    
            draw(json.slice(page * limit, (page * limit) + limit), type);
        },
        error: function(){
            console.log('Error when request events');
        }
    });
}

function initEventsListing(){
    $('.filter-content-card').each(function(){
        var $container = $(this);
        var url = $container.data('url');

        if(url === ""){
            alert("Error loading filters");
        }
        
        $.ajax({
            url: url,
            method: 'GET',
            success: function(json){
                insertFilters(json, $container);
            }
        });

        $(this).parents('.filter-box').eq(0).removeClass('hidden');
    });
}

function insertFilters(json, $container){

    for(var i = 0; i < json.length; i++){
        var html = $('.generic-check-filter').html();

        html = html.replace('{name}', json[i].type);
        html = html.replace('{name}', json[i].type);
        html = html.replace('{name}', json[i].type);
        html = html.replace('{name}', json[i].type);

        $container.append(html);
    }

    var url = new URL(location.href);
    var type = url.searchParams.get("type");
    $('#' + type).prop( "checked", true);
}

function getEvents(){
    var page = $('.listing-result').data('page');
    var limit = $('.listing-result').data('limit');
    var url = $('.listing-result').data('url');

    var events = [];
    var $filters = $('.filter-checkbox:checked');

    if($filters === undefined || $filters.length === 0){
        $.ajax({
            url: '/v1/events',
            method: 'GET',
            success: function(json){
                drawEvents(json, page, limit);
            }
        });
    } else {
        for(var i = 0; i < $filters.length; i++){
           $.ajax({
                url: url,
                method: 'GET',
                data: {
                    type: $filters.eq(i).val()
                },
                success: function(json){
                    events = events.concat(json);

                    if(i === $filters.length)
                        drawEvents(events, page, limit);
                }
            });
        }
    }    
}

function drawEvents(events, page, limit){
    setUpPaging(events.length, limit);
    
    draw(events.slice(page * limit, (page * limit) + limit), 'event');
}

function initFilterCheckbox(){
    $(document).on('change', '.filter-checkbox', function(){
        $('.listing-result').data('page', 0);
        getEvents();
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
        $('.listing-result').data('page', page);
        getperformersseminars();
    });
}

function draw(array, type){
    $('.listing-result').html(' ');

    if(array === undefined || array.length === 0){
        $('.messages').removeClass('hidden');
    }

    for(var i = 0; i < array.length; i++){
        var html = $('.generic-card').html();

        switch(type){
            case 'seminar': {
                html = html.replace('{imageSrc}', array[i].image);
                html = html.replace('{alt}', array[i].name);
                html = html.replace('{href}', '/seminars/seminar/' + array[i].id)
                html = html.replace('{Title}', array[i].name);
                html = html.replace('{Description}', array[i].description);
                break;
            }
            case 'event':{
                html = html.replace('{imageSrc}', array[i].image);
                html = html.replace('{alt}', array[i].name);
                html = html.replace('{href}', '/events/event/' + array[i].id)
                html = html.replace('{Title}', array[i].name);
                html = html.replace('{Description}', array[i].description);
                break;
            }
            case 'performer':{
                html = html.replace('{imageSrc}', array[i].photo);
                html = html.replace('{alt}', array[i].name + ' ' + array[i].surname);
                html = html.replace('{href}', '/performers/performer/' + array[i].id)
                html = html.replace('{Title}', array[i].name + ' ' + array[i].surname);
                html = html.replace('{Description}', array[i].bio);
                break;
            }
            case 'type':{
                html = $('.generic-card-event-type').html();
                html = html.replace('{Title}', array[i].type);
                html = html.replace('{href}', '/events?type=' + array[i].type);
                break;
            }
            default:{
                console.log('Type unknown');
                break;
            }
        }

        $('.listing-result').append(html);
    }
}

function doBookApiRequest(url, method, data){
    return $.ajax({
        url: url,
        method: method,
        data: data,
        success: function(result){
            return result;
        }
    });
}

function getApiRequestFromFilters($filters){
    return $filters
            .map(function(){
                return $(this).attr('id');
            })
            .get()
            .join();
}