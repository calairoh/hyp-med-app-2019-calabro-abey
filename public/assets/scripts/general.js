$(document).ready(function(){
    initUser();
    logout();
});

function initUser(){
    var url = "/v1/user/logged";

    $.ajax({
        url: url,
        method: "GET",
        success: function(json){
            if(json.msg === undefined){
                initUserInfo(json[0]);
            } else {
                $('.nav-no-logged').removeClass('hidden');
            }
        }
    })
}

function initUserInfo(user){
    $('.nav-link-name').html(user.username);
    $('.nav-logged').removeClass('hidden');
}

function logout(){
    $(document).on('click', '.btn-logout', function(){
        var url = "/v1/user/logout";

        $.ajax({
            url: url,
            method: 'GET',
            success: function(){
                location.href = "/";
            }
        });
    }); 
}

function dateToDbFormat(d){
    var date = new Date(d);

    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
}