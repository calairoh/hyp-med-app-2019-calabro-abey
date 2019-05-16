$(document).ready(function(){
    test();
    signIn();
    getBooks();
});

function getBooks(){
    $('.listing').ready(function(){
        //GET LIBRI E STAMPALI
    });
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
            method: 'POST',
            data: {
                user: {
                    username: username,
                    password: password
                }
            },
            success: function(result){
                if(result === true)
                    alert("login OK");
                else
                    alert("login failure");
            }
        });
    })
}
function test(){
    alert("ciao");
}
function validator(){
    $('form').on('submit', function(e){
        e.preventDefault();

        alert("Ok");
    });
}