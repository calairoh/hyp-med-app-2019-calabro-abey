$(document).ready(function(){
    signIn();
    signUp();
});

function signIn(){
    $('.form-signin').on('submit', function(e){
        e.preventDefault();
        if(validateForm()){

            var url = $(this).data('action');
            var formSerialize = $(this).serializeArray();
            
            var loginObj = {
                username: formSerialize[0].value,
                password: formSerialize[1].value
            };

            $.ajax({
                url: url,
                method: 'POST',
                data: loginObj,
                success: function(result){
                    if(result.code === 200)
                        location.href = "/";
                    else
                        writeError("Login failure, please check username and password and retry");
                }, 
                error: function(){
                    writeError("Login failure, please check username and password and retry");
                }
            });
        }
    });
}

function signUp(){
    $('.form-signup').on('submit', function(e){
        e.preventDefault();

        if(validateForm()){
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
                        writeError(result.msg);
                    }
                }
            });
        }
    });
}

function validateForm(){
    var result = true;

    $('input.required').each(function(){
        var $input = $(this);

        if($input.val() === undefined || $input.val() === null || $input.val() === ""){
            var name = $input.data('name');

            writeError("The " + name + " field is required");
            result = false;
            return;
        }
    });

    $('input.mail').each(function(){
        if(!$(this).val().includes('@')){
            writeError("The mail value is not valid");
            result = false;
            return;
        }
    });

    $('input.password').each(function(){
        if($(this).val().length < 8){
            writeError("The must be at least 8 character long");
            result = false;
            return;
        }
    });

    var $equals = $('.equals');
    if($equals.length > 0){
        var referrer = $equals.eq(0).val();
        for(var i = 1; i < $equals.length; i++){
            if($equals.eq(i).val() !== referrer){
                writeError("The passwords must be equals");
                result = false;
                return;
            }
        }
    }

    return result;
}

function writeError(error){
    $('.message').html(error);
    $('.message').parent().removeClass('hidden');
}