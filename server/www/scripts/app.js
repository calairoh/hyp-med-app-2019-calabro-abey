
$(document).ready(function(){
    signIn();
    signUp();
    getBooks();
    getLatestElements();
    initBookListing();
    initFilterCheckbox();
});

function getBooks(){
    $('.listing').ready(function(){
        //GET LIBRI E STAMPALI
    });
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

function initFilterCheckbox(){
    $(document).on('change', '.filter-checkbox', function(){
        var $filters = $('.filter-content-card');

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
                    if(isEquivalent(json1[0][i], json2[0][j])){
                        booksToAdd.push(json1[0][i]);
                    }
                }
            }

            drawBooks(booksToAdd);
        });
    });
}

function drawBooks(books){
    $('.listing-result').html(' ');

    for(var i = 0; i < books.length; i++){
        var html = $('.generic-card').html();

        html = html.replace('{imageSrc}', books[i].Image);
        html = html.replace('{alt}', books[i].Title);
        html = html.replace('{id}', books[i].Id);
        html = html.replace('{type}', 'book');
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


function signIn(){
    $('.form-signin').on('submit', function(e){
        e.preventDefault();
        var url = $(this).data('action');
        var formSerialize = $(this).serializeArray();
        var username = formSerialize[0].value;
        var password = formSerialize[1].value;

        $.ajax({
            url: url,
            method: 'GET',
            data: {
                username: username,
                password: password
            },
            success: function(result){
                if(result.code === 200)
                    location.href = "/index.html";
                else
                    alert("login failure");
            }
        });
    });
}

function signUp(){
    $('.form-signup').on('submit', function(e){
        e.preventDefault();
        var url = $(this).data('action');
        var formSerialize = $(this).serializeArray();

        $.ajax({
            url: url,
            method: 'POST',
            dataType: 'json',
            data: {                
                username: formSerialize[0].value,
                email: formSerialize[1].value,
                password: formSerialize[2].value,
                firstName: formSerialize[4].value,
                lastName: formSerialize[5].value,
                address: formSerialize[6].value,
                city: formSerialize[7].value,
                postalCode: formSerialize[8].value,
                country: formSerialize[9].value
            },
            success: function(result){
                if(result.code === 200){
                    alert("Registrazione OK");
                    location.href = "/account/login.html";
                }
                else {
                    alert(result.msg);
                }
            }
        });
    });
}

function validator(){
    $('form').on('submit', function(e){
        e.preventDefault();

        alert("Ok");
    });
}

function isEquivalent(a, b) {
    // Create arrays of property names
    var aProps = Object.getOwnPropertyNames(a);
    var bProps = Object.getOwnPropertyNames(b);

    // If number of properties is different,
    // objects are not equivalent
    if (aProps.length != bProps.length) {
        return false;
    }

    for (var i = 0; i < aProps.length; i++) {
        var propName = aProps[i];

        if(propName == 'Genres' || propName == 'Themes'){
            continue;
        }

        // If values of same property are not equal,
        // objects are not equivalent
        if (a[propName] !== b[propName]) {
            return false;
        }
    }

    // If we made it this far, objects
    // are considered equivalent
    return true;
}