$(document).ready(function() {
    initContactForm();
})

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
    $('.message.error').html(error);
    $('.message.error').parent().removeClass('hidden');
}

function initContactForm(){
    $(document).on('submit', '.contact-form', function(e){
        e.preventDefault();
        if(validateForm() === true){
            location.href = $(this).attr('action');
        }
    });
}