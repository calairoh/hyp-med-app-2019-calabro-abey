$(document).ready(function(){
    signIn();
    signUp();
});

function signIn(){
    $('.form-signin').on('submit', function(e){
        e.preventDefault();
        var url = $(this).data('action');
        var formSerialize = $(this).serializeArray();
        
        var loginObj = {
            username: formSerialize[0].value,
            password: formSerialize[1].value
        };

        $.ajax({
            url: url,
            method: 'POST',
            data: {
                loginObj: loginObj
            },
            success: function(result){
                if(result.code === 200)
                    location.href = "/";
                else
                    alert("login failure");
            }, 
            error: function(){
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
                    location.href = "/account/login";
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