$(document).ready(function(){
    initBookPresentation();
});

function initBookPresentation(){
    var url = location.href;
    var ISBN = url.split('/')[url.split('/').length - 1]
    var bookUrl = $('.record').data('book-url').replace('{ISBN}', ISBN);
    var reviewsUrl = $('.record').data('review-url');
    var authorsUrl = $('.record').data('authors-url');
    url = url.replace('{ISBN}', ISBN);

    $.ajax({
        url: bookUrl,
        method: 'GET',
        success: function(json){
            presentBook(json);
        }
    });

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

        author = author.replace('{imageSrc}', json[i].photo);
        author = author.replace('{Name}', json[i].NameSu)
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
    presentation = presentation.replace('{ReleaseDate}', json.ReleaseDate);
    presentation = presentation.replace('{Genres}', json.Genres.map(e => e.name).join(','));
    presentation = presentation.replace('{Themes}', json.Themes.map(e => e.name).join(','));
    presentation = presentation.replace('{Language}', json.Language);

    $('.book-presentation').append(presentation);
}

function presentReviews(json){
    var review = $('.generic-review').html();

    for(var i = 0; i < json.length; i++) {
        review = review.replace('{username}', json[i].user.username);
        review = review.replace('{rate}', json[i].rate);
        review = review.replace('{review}', json[i].content);
        review = review.replace('{date}', review[i].date);

        $('.record > .reviews').append(review);
    }
}