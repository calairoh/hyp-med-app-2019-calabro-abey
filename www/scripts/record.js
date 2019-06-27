$(document).ready(function(){
    initBookPresentation();
    initAddReview();
});

function initBookPresentation(){
    var url = location.href;
    var ISBN = url.split('/')[url.split('/').length - 1];

    var bookUrl = $('.record').data('book-url').replace('{ISBN}', ISBN);    
    var authorsUrl = $('.record').data('author-url');

    $.ajax({
        url: bookUrl,
        method: 'GET',
        success: function(json){
            presentBook(json);
        }
    });

    $.ajax({
        url: authorsUrl,
        method: 'GET',
        data:{
            ISBN: ISBN
        },
        success: function(json){
            presentAuthors(json);
        }
    });
}

function presentAuthors(json){
    for(var i = 0; i < json.length; i++){
        var author = $('.generic-author').html();

        author = author.replace('{imageSrc}', json[i].Photo);
        author = author.replace('{name}', json[i].NameSurname);
        author = author.replace('{alt}', json[i].NameSurname);
        author = author.replace('{href}', "/authors/author/" + json[i].Id);

        $('.authors .card-container').append(author);
    }
}

function presentBook(json){
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