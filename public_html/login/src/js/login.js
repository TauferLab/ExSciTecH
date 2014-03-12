function displayRegArea(){
    $("#loginWrapper").animate(
        {height:0},
        400,
        'swing',
        function(){
            $("#loginWrapper").hide();    
            $("#regWrapper").show();
            $("#regWrapper").animate({height:303});  
        });
}

function displayLoginArea(){
    $("#regWrapper").animate(
        {height:0},
        400,
        'swing',
        function(){
            $("#regWrapper").hide();
            $("#loginWrapper").show();
            $("#loginWrapper").animate({height:225});
        });
}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function initPage(){

    var reg = getParameterByName("register");
    var verb = "log in";

    if(reg == 1 || !(typeof REGISTER === 'undefined')){
        $("#loginWrapper").hide();
        $("#loginWrapper").css({height:0});
        $("#regWrapper").css({height:303});  
        $("#regWrapper").show();
        verb = "register";
    }

    switch(location.hash){
        case "#flashcards_glmol":
            $("#redirectMsg").html("Please "+verb+" to access Molecule Flashcards.");
            break;
        default:
            $("#redirectMsg").html("Please "+verb+" to gain access.");
    }
    
}

initPage();