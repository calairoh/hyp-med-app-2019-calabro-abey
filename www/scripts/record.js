$(document).ready(function(){
    var url = location.href;

    if(url.includes("author")){
        initAuthorPresentation()
    } else if(url.includes("book")){
        initBookPresentation();
        initAddReview();
    }  
    
});

function initAuthorPresentation(){
    var url = location.href;
    var Id = url.split('/')[url.split('/').length - 1];
    
    var limit = $('.listing-result').data('limit');
    var page = $('.listing-result').data('page');           
    var authorsUrl = $('.record').data('author-url').replace('{Id}', Id);

    getAuthorsBooks(Id, page, limit);

    $.ajax({
        url: authorsUrl,
        method: 'GET',
        success: function(json){
            presentAuthors(json, "author");
        }
    });


}

function getAuthorsBooks(Id, page, limit){
    var bookUrl = $('.record').data('book-url');
    var offset = page * limit;

    $.ajax({
        url: bookUrl,
        method: 'GET',
        data:{
            author: Id,
        },
        success: function(json){
            presentBook(json, "author", offset, limit);
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

        getAuthorsBooks(Id, page, limit);
    });
}

function initBookPresentation(){

    var url = location.href;
    var ISBN = url.split('/')[url.split('/').length - 1];

    var bookUrl = $('.record').data('book-url').replace('{ISBN}', ISBN);    
    var authorsUrl = $('.record').data('author-url');

    $.ajax({
        url: bookUrl,
        method: 'GET',
        success: function(json){
            presentBook(json, "book");
        }
    });

    $.ajax({
        url: authorsUrl,
        method: 'GET',
        data:{
            ISBN: ISBN
        },
        success: function(json){
            presentAuthors(json, "book");
        }
    });
}

function presentAuthors(json, type){
    if(type == "book"){
        for(var i = 0; i < json.length; i++){
            var presentation = $('.generic-author').html();

            presentation = presentation.replace('{imageSrc}', json[i].Photo);
            presentation = presentation.replace('{name}', json[i].NameSurname);
            presentation = presentation.replace('{alt}', json[i].NameSurname);
            presentation = presentation.replace('{href}', "/authors/author/" + json[i].Id);

            $('.authors .card-container').append(presentation);
        }
    } else if(type == "author"){
        var presentation = $('.generic-record').html();

        presentation = presentation.replace('{Title}', json.NameSurname);
        presentation = presentation.replace('{image}', json.Photo);
        presentation = presentation.replace('{alt}', json.NameSurname);
        presentation = presentation.replace('{Description}', json.Bio);

        $('.author-presentation').append(presentation);
    }
}

function presentBook(json, type, offset, limit){
    if(type == "book"){
        var presentation = $('.generic-record').html();

        presentation = presentation.replace('{Title}', json.Title);
        presentation = presentation.replace('{image}', json.Image);
        presentation = presentation.replace('{alt}', json.Title);
        presentation = presentation.replace('{Description}', json.Synopsis);
        presentation = presentation.replace('{PageNumber}', json.PageNumber);
        presentation = presentation.replace('{ePrice}', json.ePrice);
        presentation = presentation.replace('{Price}', json.Price);
        presentation = presentation.replace('{Editor}', json.Editor);
        presentation = presentation.replace('{ISBN}', json.ISBN);
        presentation = presentation.replace('{ISBN}', json.ISBN);
        presentation = presentation.replace('{ISBN}', json.ISBN);
        presentation = presentation.replace('{ReleaseDate}', json.ReleaseDate);
        presentation = presentation.replace('{Genres}', json.Genres.map(e => e.name).join(','));
        presentation = presentation.replace('{Themes}', json.Themes.map(e => e.name).join(','));
        presentation = presentation.replace('{Language}', json.Language);

        $('.book-presentation').append(presentation);
    } else if(type == "author"){
        $('.author-books .card-container .listing-result').html(' ');

        for(var i = offset; i < offset + limit; i++){
            var presentation = $('.generic-book').html();
            
            presentation = presentation.replace('{name}', json[i].Title);
            presentation = presentation.replace('{alt}', json[i].Title);
            presentation = presentation.replace('{imageSrc}', json[i].Image);
            presentation = presentation.replace('{href}', "/books/book/" + json[i].ISBN);

            $('.author-books .card-container .listing-result').append(presentation);
        }
    }
}

function presentReviews(json){
    for(var i = 0; i < json.length; i++) {
        var review = $('.generic-review').html();

        review = review.replace('{username}', json[i].user.username);
        review = review.replace('{rate}', json[i].rate);
        review = review.replace('{review}', json[i].content);
        review = review.replace('{date}', review[i].date);

        $('.record .reviews-container').append(review);
    }
}

function initAddReview(){
    $(document).on('click', '.submit-add-review', function(){
        var $form = $('.form-add-review');
        var url = $form.data('target');

        $.ajax({
            url: url,
            method: 'GET',
            data:{
                review: $form.find('#review-text').val(),
                rate: $form.find('#number-rate').val(),
                ISBN: $('.info-general-ISBN').data('isbn')
            },
            success: function(response) {
                restoreReview();
            },
            error: function(response) {
                alert(response.responseText);
            }
        });
    });
}

function askReviews(){
    var reviewsUrl = $('.record').data('review-url');
    var ISBN = location.href.split('/')[location.href.split('/').length - 1];

    $.ajax({
        url: reviewsUrl,
        method: 'GET',
        data:{
            ISBN: ISBN
        },
        success: function(json){
            presentReviews(json);
        }
    });
}

function restoreReview(){
    $('.record .reviews-container').html(' ');
    askReviews();
}