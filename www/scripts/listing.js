
$(document).ready(function(){
    initListing();
    initChangeListingPage();
});

function initListing(){
    var listingType = checkListingType();

    switch(listingType){
        case "books":{
            initBookListing();
            initFilterCheckbox();
            getBooks();
            break;            
        }
        case "events":{
            break;
        }
        case "authors":{
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

    if(url.includes('books')){
        return "books";
    } else if(url.includes('authors')){
        return "authors";
    } else if(url.includes('events')){
        return "events";
    } else {
        return undefined;
    }
}

function initBookListing(){
    $('.filter-content-card').each(function(){
        var $container = $(this);
        var type = $container.data('type');
        var url = "";

        switch(type){
            case "genre":
                url = "/v1/genres";
                break;
            case "theme":
                url = "/v1/themes";
                break;
            default:
                break;
        }

        if(url === ""){
            alert("Error loading filters");
        }
        
        $.ajax({
            url: url,
            method: 'GET',
            success: function(json){
                insertFilters(json, type, $container);
            }
        })
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

function getBooks(){
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
        var booksToAdd = [];

        for(var i = 0; i < json1[0].length; i++){
            for(var j = 0; j < json2[0].length; j++){
                if(isBookEquivalent(json1[0][i], json2[0][j])){
                    booksToAdd.push(json1[0][i]);
                }
            }
        }

        setUpPaging(booksToAdd.length, limit);

        drawBooks(booksToAdd.slice(page * limit, (page * limit) + limit));
    });
}

function initFilterCheckbox(){
    $(document).on('change', '.filter-checkbox', function(){
        $('.listing-result').data('page', 0);
        getBooks();
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
        getBooks();
    });
}

function drawBooks(books){
    $('.listing-result').html(' ');

    for(var i = 0; i < books.length; i++){
        var html = $('.generic-card').html();

        html = html.replace('{imageSrc}', books[i].Image);
        html = html.replace('{alt}', books[i].Title);
        html = html.replace('{href}', '/books/book/' + books[i].ISBN)
        html = html.replace('{Title}', books[i].Title);
        html = html.replace('{Description}', books[i].Descr);

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