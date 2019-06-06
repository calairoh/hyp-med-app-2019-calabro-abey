$(document).ready(function(){
    initBookPresentation();
});

function initBookPresentation(){
    var url = location.href;
    var ISBN = url.split('/')[url.split('/').length - 1]
    url = $('.record').data('url');
    url = url.replace('{ISBN}', ISBN);

    $.ajax({
        url: url,
        method: 'GET',
        data:{
            ISBN: ISBN
        },
        success: function(json){
            presentBook(json);
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