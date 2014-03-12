init = function(){
    window.commManager = new Communication_Manager();

    $( window ).resize( handleWinResize );
    handleWinResize();
    
    var username = get_cookie('username');
	var auth = get_cookie('auth');

	if( true /*(username != null) && (auth != null)*/ ){
	    
	    window.sessionInfo = new Object(null);
	    window.sessionInfo.username = username;
	    window.sessionInfo.auth = auth;
        window.loadingScreen = new LoadingScreen( getURLParameter('ID') );
	}
	else{
	    var ID = getURLParameter('ID');
	    
        if( !(ID == "null") ){
            //window.location = '/login/#flashcards_glmol%2Fplay.php%3FID%3D'+ID;
        }
	    else{
	        //window.location = "./";
	    }
	}   
};

getURLParameter = function(name) {
    return decodeURI(
        (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1]
    );
}

handleWinResize = function(){
    if( window.innerWidth < 992){
        $("#qTextInfoWin").insertBefore( "#answerBtns" );
        $("#scoreInfoWinWrapper").insertBefore( "#GLMolFrame" );
    }
    else{
        $("#qTextInfoWin").appendTo( $("#qTextInfoWinWrapper") );
        $("#scoreInfoWinWrapper").insertBefore( "#answerBtns" );
    }
}

commaSeparateNumber = function(val){
    while (/(\d+)(\d{3})/.test(val.toString())){
        val = val.toString().replace(/(\d+)(\d{3})/, '$1'+','+'$2');
    }
    return val;
}