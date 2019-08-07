$(document).ready(function(){
    initListing();
    initChangeListingPage();
});

function initListing(){
    var listingType = checkListingType();

    switch(listingType){
        case "events":{
            getElements('/v1/events', 'event');
            break;            
        }
        case "seminars":{
            getElements('/v1/seminars', 'seminar');
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
    } else if(url.includes('events')){
        return "events";
    } else {
        return undefined;
    }
}

function getElements(url, type){
    var page = $('.listing-result').data('page');
    var limit = $('.listing-result').data('limit');

    $.ajax({
        url: url,
        method: 'GET',
        data: {
            page: page,
            limit: limit
        },
        success: function(json){
            draw(json, type);
        },
        error: function(){
            console.log('Error when request events');
        }
    });
}

function initEventsListing(){
    $('.filter-content-card').each(function(){
        var $container = $(this);
        var url = "v1/events/getTypes";

        if(url === ""){
            alert("Error loading filters");
        }
        
        $.ajax({
            url: url,
            method: 'GET',
            success: function(json){
                insertFilters(json, type, $container);
            }
        });

        $(this).parents('.filter-box').eq(0).removeClass('hidden');
    });
}

function insertFilters(json, type, $container){

    for(var i = 0; i < json.length; i++){
        var html = $('.generic-check-filter').html();

        html = html.replace('{type}', type);
        html = html.replace('{name}', json[i].name);
        html = html.replace('{name}', json[i].name);
        html = html.replace('{name}', json[i].name);
        html = html.replace('{name}', json[i].name);

        $container.append(html);
    }
}

function getseminars(){
    var $filters = $('.filter-content-card');
    var page = $('.listing-result').data('page');
    var limit = $('.listing-result').data('limit');

    filters = [];
    for(var i = 0; i < $filters.length; i++){
        filters.push({
            url: $filters.eq(i).data('url'),
            filters: getApiRequestFromFilters($filters.eq(i).find(".filter-checkbox:checked"))
        });            
    }

    $.when(doBookApiRequest(filters[0].url, 'GET', { genres: filters[0].filters }),
            doBookApiRequest(filters[1].url, 'GET', { themes: filters[1].filters }))
    .done(function(json1, json2){
        var seminarsToAdd = [];

        for(var i = 0; i < json1[0].length; i++){
            for(var j = 0; j < json2[0].length; j++){
                if(isBookEquivalent(json1[0][i], json2[0][j])){
                    seminarsToAdd.push(json1[0][i]);
                }
            }
        }

        setUpPaging(seminarsToAdd.length, limit);

        draw(seminarsToAdd.slice(page * limit, (page * limit) + limit), 'book');
    });
}

function initFilterCheckbox(){
    $(document).on('change', '.filter-checkbox', function(){
        $('.listing-result').data('page', 0);
        getseminars();
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