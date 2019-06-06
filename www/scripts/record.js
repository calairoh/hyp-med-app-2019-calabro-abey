$(document).ready(function(){
    initBookPresentation();
});

function initBookPresentation(){
    var url = location.href;
    var ISBN = url.split('/')[url.split('/').length - 1]
    var url = $('.record').data('url');

    $.ajax({
        url: url,
        method: 'GET',
        data:{
            ISBN: ISBN
        },
        success: function(json){
            presentBook(json.book);
            presentAuthors(json.authors);
            presentReviews(json);
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

    presentation = presentation.replace('{Title}', json.title);
    presentation = presentation.replace('{Description}', json.synopsis);
    presentation = presentation.replace('{PageNumber}', json.pageNumber);
    presentation = presentation.replace('{ePrice}', json.ePrice);
    presentation = presentation.replace('{Price}', json.price);
    presentation = presentation.replace('{Editor}', json.editor);
    presentation = presentation.replace('{ISBN}', json.ISBN);
    presentation = presentation.replace('{ReleaseDate}', json.releaseDate);
    presentation = presentation.replace('{Genres}', json.genres);
    presentation = presentation.replace('{Themes}', json.themes);
    presentation = presentation.replace('{Language}', json.language);

    $('.record').append(presentation);
}

function presentReviews(json){
    var review = $('.generic-review').html();

    review = review.replace('{username}', json.user.username);
    review = review.replace('{rate}', json.rate);
    review = review.replace('{review}', json.content);
    review = review.replace('{date}', review.date);

    $('.record > .reviews').append(review);
}