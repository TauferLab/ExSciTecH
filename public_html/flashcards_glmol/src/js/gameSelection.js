var session_info;
var comm_manager = new Communication_Manager();

function init(){
	
	var username = get_cookie('username');
	var authenticator = get_cookie('auth');

	if( (username != null) && (authenticator != null) ){
		handleLogin(username, authenticator);
	}
}

function handleLogin(username, authenticator){
	
	session_info = new Object();
	session_info.username = username;
	session_info.authenticator = authenticator;
	
	available_games = getAvailableGames();

	var parent_element = "tile_pages";
	var image_url = "./media/images/flashcard_games/vitamins.jpg";
	var title = "Vitamins";
	
	demo_glmol = null;
	
	var rowSelector = null;
    var rowCount = 0;

	for(i in available_games){
	
	    if( i % 4 == 0 ){
	        var rowHTML = '<div class="row tileRow" id=gr_' + rowCount + '></div>';
	        $("#tileList").append(rowHTML);
    	    rowSelector = '#gr_' + rowCount++;
	    }
	
		addTile(rowSelector,available_games[i]);

	}

	$(".module-game-tile").hover(
						//In Handler
						function(){
							var j_this = $(this);
							j_this.find(".game-image-overlay").css({ display: "block" });
							j_this.find(".play-btn-wrapper").clearQueue();
							j_this.find(".play-btn-wrapper").animate( {opacity: 1,top: '-180'} );
						},
						//Out Handler
						function(){
							var j_this = $(this);
							j_this.find(".game-image-overlay").css({ display: "none" });
							j_this.find(".play-btn-wrapper").clearQueue();
							j_this.find(".play-btn-wrapper").animate( {opacity: 0,top: '0'} );
						});
}

function getAvailableGames(){
	var request_object = new Object();
	request_object.request_type = "get_avail_flashcard_games";
	request_object.authenticator = session_info.authenticator;
	
	var response_obj = comm_manager.send_request(request_object);
	
	return response_obj.available_games;
}

function addTile(parentSelector,game){

        var gameID = game.id;
        var imageURL = game.image;
        var gameTitle = game.name;

		var new_tile = '<div class="col-md-3">'+
		'<div id="t_'+ gameID +'" class="module-game-tile">\n'+
			'<div class="game-image-wrapper">\n'+
				'<a onClick="location.href=\'play.php?ID='+ gameID +'\'" class="game-image-link">\n'+
					'<img src="'+ imageURL +'" class="game-image">\n'+
				'</a>\n'+
				'<a class="game-image-overlay" onClick="location.href=\'play.php?ID='+ gameID +'\'"></a>\n'+
			'</div>\n'+
			'<div class="text-wrapper">\n'+
				'<div class="text">\n'+
					'<h3 class="overflow"><a onClick="location.href=\'play.php?ID='+ gameID +'\'">'+ gameTitle +'</a></h3>\n'+
				'</div>\n'+
			'</div>\n'+
			'<div class="play-btn-wrapper">\n'+
				'<button class="play_button" onClick="location.href=\'play.php?ID='+ gameID +'\'">Play!</button>\n'+
			'</div>\n'+
		'</div></div>';
		
		$(parentSelector).append(new_tile);
}