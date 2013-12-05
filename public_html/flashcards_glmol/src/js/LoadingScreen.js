LoadingScreen = function(ID){
    this.questionSession = new Object(null);
    this.gameInfo = this.getGameInfo(ID);
}

LoadingScreen.prototype.getGameInfo = function(gameID){
    var reqObj = new Object(null);
	reqObj.request_type = "load_flashcard_game";
	reqObj.authenticator = window.sessionInfo.auth;
	reqObj.game_id = gameID;
	
	question_obj = window.commManager.send_request(reqObj);

    var screen = this;
    
    $.ajax({
		    url: "/request_handler.php",
		    type: 'POST',
		    data: JSON.stringify(reqObj),
		    success: function(data){
		        data = JSON.parse(data);
    		    screen.populateLoadingScreen(data);
    		    screen.loadPDBs(data);
		    }
        });
}

LoadingScreen.prototype.loadPDBs = function(data){

    this.questionSession.sessionID = data.game_session_id;
    this.questionSession.questionSet = data.questions;
    this.questionSession.timeLimit = data.time_limit;
    
    this.pdbAJAXrequest(0,this.questionSession.questionSet.length,null);
}

LoadingScreen.prototype.pdbAJAXrequest = function(count,total,data){

	if(data != null){
		this.questionSession.questionSet[count-1].PDBtext = data;	
		this.updateLoadingBar(count,total);
	}

	if( count < total ){
	    var screen = this;
	    var URL = "/get_media.php?mt=0&gsi="+this.questionSession.sessionID+"&qid="+this.questionSession.questionSet[count].id;
	    	
		$.ajax({
			url: URL, 
			success: function(data){
				screen.pdbAJAXrequest(count+1,total,data);		
			}
		});	
	}
	
	if( count == total ){
	
	    window.gameScreen = new GameScreen( this.questionSession );
	    
	    //window.gameScreen.start();
	
    	$("#loadingContainer").html('<button class="btn btn-success btn-lg btn-block" onClick="window.gameScreen.start()" id="gameStartBtn">Start!</button>');
	}
}

LoadingScreen.prototype.populateLoadingScreen = function(data){
    console.log(data);
    
    $('#qSetTitle').html( data.name );
    $('#infoNum').html( commaSeparateNumber(data.questions.length) );
    $('#infoTime').html( Timer.beautifyTime(Math.round(data.time_limit) ) );
    $('#infoDesc').html( data.description );
    
    this.populateHighScores(data.high_scores);
}

LoadingScreen.prototype.populateHighScores = function(scores){

    for(var i =0; i<scores.length ;i++){
        
        $("#highScores").append( '<tr><td>'+scores[i].rank+'</td><td>'+scores[i].username+'</td><td>'+commaSeparateNumber(scores[i].score)+'</td></tr>' );    
    }
    
}

LoadingScreen.prototype.updateLoadingBar = function(count, total){
    var percent = Math.round((count/total)*100);

    $(".progress-bar").css({width: percent+'%'});
}