var max_time = 120;
var timer = 120; //in seconds
var timer_interval = null;
var timer_resolution = 1; //in seconds

var answer_buttons = null;
var score = 0;
var question_num = 0;
var num_correct = 0;
var total_attempts = 0;
var question_attempts = 0;

var questions;
var game_glmol;
var pdb_string;
var available_games;

var question_stats = [];
var stat_begin_score = 0;
var stat_begin_time = 120;
var curr_tile_page = 0;
var tile_page_count = 0;

var comm_manager = new Communication_Manager();

var session_info;
var demo_glmol;

/*
Game Screen
*/

function exit_game(){
	questions = null;
	$("#game_wrapper #start_ui #layout #loading_bar_wrapper").css( { "display" : "block" } );
	$("#game_wrapper #start_ui #layout #start_button").css( { "display" : "none" } );
	$("#start_ui").css("display","block");
	$("#game_ui").css("display","none");
	$("#end_ui").css("display","none");
	
	$("#game_ui #answers_frame").html("");
	$("#game_ui #molecule_frame").html("");
	
	score = 0;
	question_num = 0;
	num_correct = 0;
	total_attempts = 0;
	
	update_score();
	
	gotoMain();
}

function gotoMain(){
	$("#tile_wrapper").animate( { left: "0px"} );
	$("#game_wrapper").animate( { left: "1100px"} );
}

function start_game(game_id){
	stat_begin_time = timer;
	stat_begin_score = 0;
	question_stats = Array();

	$("#start_ui").css("display","none");
	$("#game_ui").css("display","block");
	$("#end_ui").css("display","none");

	answer_buttons = new Answer_Buttons();

	game_glmol = new GLmol("molecule_frame",true);
	
	game_glmol.spin = glmol_spin;
	game_glmol.defineRepresentation = glmol_ball_and_stick_rep;
	game_glmol.x = 1;
	game_glmol.y = 1;
	//glmol.rebuildScene();
	
	load_next_question();
	
	game_glmol.spin();
	
	time_string = time_to_string(timer);		
	$("#time_val").html(time_string);
	timer_start();	
	
}

function reload_GLmol_instance(glmol,pdb_string){
	glmol.loadMoleculeStr(false, pdb_string);
	
	glmol.x = 1;
	glmol.y = 1;
		
	glmol.rebuildScene();
}

function load_next_question(){

	if(questions.current_question < questions.num_q){
		//console.log(questions.q_array[questions.current_question]);
	
		answer_buttons.update(questions.q_array[questions.current_question]);	
		
		$("#progress #q_num").text(questions.current_question+1);
		$("#progress #q_total").text(questions.num_q);
		
		//console.log(questions.q_array[questions.current_question]);
		
		reload_GLmol_instance(game_glmol, questions.q_array[questions.current_question].pdb_string);
		
		questions.current_question++;
		
		question_attempts = 0;
	}
	else{
		end_game();
	}	
}

function glmol_spin(){
	dx = this.x;
	dy = this.y;
	
	//Modify stored X value
	this.x = parseFloat(dx) + .002;
	this.y = parseFloat(dy) + .002;
	
	var r = Math.sqrt(dx * dx + dy * dy);
	var rs = Math.sin(r * Math.PI) / r;
	this.dq.x = Math.cos(r * Math.PI);
	this.dq.y = 0;
	this.dq.z =  rs * dx;
	this.dq.w =  rs * dy;
	this.rotationGroup.quaternion = new THREE.Quaternion(1, 0, 0, 0);
	this.rotationGroup.quaternion.multiplySelf(this.dq);
	this.rotationGroup.quaternion.multiplySelf(this.cq);
	this.show();
	//window.requestAnimationFrame($.proxy(game_glmol.spin, game_glmol));
	window.requestAnimationFrame($.proxy(this.spin, this));
}

function glmol_ball_and_stick_rep(){
	var all = this.getAllAtoms();
	var hetatm = this.removeSolvents(this.getHetatms(all));
	this.colorByAtom(all, {});
	this.colorByChain(all);
	
	this.drawBondsAsStick(this.modelGroup, hetatm, this.cylinderRadius / 2.0, this.cylinderRadius, true, true, 0.3); 
	this.drawMainchainCurve(this.modelGroup, all, this.curveWidth, 'P');
	this.drawCartoon(this.modelGroup, all, this.curveWidth);
}

function timer_update(){
	if( timer > 0 ){
		timer = timer-timer_resolution;
	}
	else{
		end_game();
	}

	time_string = time_to_string(timer);		
	$("#time_val").html(time_string);
}

function timer_start(){
	timer_interval = setInterval(timer_update,timer_resolution*1000);
}

function timer_stop(){
	window.clearInterval(timer_interval);
	timer_interval = null;
}

function timer_add_time(){
	
}

function Answer_Buttons(){

	this.buttons = Array();
	
	for(i=0;i<5;i++){
		new_button = document.createElement('button');
		$(new_button).addClass("answer_button");
		$(new_button).text("Answer");
		$("#answers_frame").append(new_button);	
		new_button.ID = i;
		$(new_button).click(Answer_Buttons_On_Click);
		$(new_button).attr("ID","answer_button_"+i);
		this.buttons.push(new_button);
	}	
	
	this.update  = Answer_Buttons_Update;
	this.correct_ans = null; 
}

function Answer_Buttons_On_Click(){
	button_id = (this.id).split("_")[2];
	
	if(button_id == null){
		console.log("error");
		return;
	}
	
	var button_element = $("#"+this.id);
	var score_element = $("#augment_score");
	
	var response = submit_answer(questions.current_question,button_id);
	
	console.log(response);
	
	if( response.correct == "true" ){ //Answer_Buttons_is_correct_answer(questions.current_question,button_id) ){
		button_element.addClass("correct");
		
		score_element.stop(true,true);
		score_element.removeClass("incorrect");
		score_element.addClass("correct");
		score_element.css("opacity","1");
		score_element.animate({"opacity":"0"},1000,"swing",load_next_question);
		$("#augment_score #val").text("+"+num_to_string(1000));
		
		num_correct++;
		score += 1000;
		store_question_stats();
	}
	else{
		button_element.addClass("incorrect");
		
		score_element.stop(true,true);
		score_element.removeClass("correct");
		score_element.addClass("incorrect");
		score_element.css("opacity","1");
		
		score_element.animate({"opacity":"0"});
		
		$("#augment_score #val").text("-"+num_to_string(350));
		score -= 350;
	}
	
	total_attempts++;
	question_attempts++;
	update_score();
}

function store_question_stats(){
	var new_stat_entry = new Object();
	new_stat_entry.q_num = questions.current_question;
	new_stat_entry.attempts = question_attempts;
	new_stat_entry.score_change = score-stat_begin_score;
	new_stat_entry.time = timer-stat_begin_time;

	question_stats.push( new_stat_entry );
	
	stat_begin_time = timer;
	stat_begin_score = score;
}

function submit_answer(question_id,answer){
	var request_object = new Object();
	request_object.request_type = "submit_flashcard_answer";
	request_object.game_session_id = questions.session_id;
	request_object.authenticator = session_info.authenticator;
	request_object.question_id = question_id;
	request_object.answer = answer;
	request_object.game_time = (max_time-timer)*1000;
	
	var response = comm_manager.send_request(request_object);
	
	return response;
}

function Answer_Buttons_is_correct_answer(question_num,answer){

	return questions.question_id[question_num-1]==(parseInt(answer,10)+1);
}

function Answer_Buttons_Update(question){
	
	letters = Array("A","B","C","D","E");
	
	for(var i in question.answers){
		var button_element = $("#answer_button_"+i);
		
		button_element.css({opacity:1});
		button_element.removeClass("correct");
		button_element.removeClass("incorrect");
		button_element.text(letters[i] + ". "+ question.answers[i].text); 
	}
	
	for(var j=parseInt(i,10)+1;j<5;j++){
		var button_element = $("#answer_button_"+j);
		button_element.css({opacity:0});
	}	
}

function update_score(){
	$("#score #val").text(num_to_string(score));
}

function num_to_string(num){
	if(num > 1000000){
		return Math.floor(num/1000000)+ "," + String("000" + num%1000000).slice(-3)+ "," + String("000" + num%1000).slice(-3);	
	}
	else if (num < 1000 && num > -1000){
		return num;
	}
	else{
		return Math.floor(num/1000) + "," + String("000" + num%1000).slice(-3);
	}
}

function time_to_string(time){
	sec = time % 60;
	min = Math.floor(time/60);
	
	if( min > 0)
		time_string = ("00" + min).slice(-2) + ":" + ("00" + sec).slice(-2);
	else
		time_string = ("0" + min).slice(-1) + ":" + ("00" + sec).slice(-2);
	return time_string;
}

function end_game(){

	populate_stat_table("question_stats");

	console.log(question_stats);

	timer_stop();
	
	var end_game_info = end_game_request();

	$("#final_score #base #val").text(num_to_string(score));
	$("#final_score #time_left #val").text(time_to_string(timer));
	$("#final_score #bonus #val").text(num_to_string(timer*5));
	$("#final_score #final #val").text(num_to_string(timer*5+score));
	
	$("#final_score #rank #val").text(num_to_string(end_game_info.rank));
	
	max_score = 1000*questions.q_array.length;
	percent_correct = Math.round((score/max_score)*1000)/10;
	
	$("#percent_correct #val").text(percent_correct + "%");
	
	if(percent_correct>99){
		percent_color = "green";
		message = "Awesome!";
	}else if(percent_correct>89){
		percent_color = "green";
		message = "Good Job!";
	}else if(percent_correct>79){
		percent_color = "yellow";
		message = "Nice!";
	}else if(percent_correct>64){
		percent_color = "orange";
		message = "OK!";
	}else{
		percent_color = "red";
		message = "Better Luck Next Time!";
	}
	
	$("#percent_correct #message").text(message);
	$("#percent_correct #val").text(percent_correct + "%");
	$("#percent_correct #val").css("color",percent_color);

	$("#start_ui").css("display","none");
	$("#game_ui").css("display","none");
	$("#end_ui").css("display","block");

}

function end_game_request(){
	var request_object = new Object();
	request_object.request_type = "end_flashcard_game";
	request_object.game_time = (max_time-timer)*1000;
	request_object.authenticator = session_info.authenticator;
	request_object.game_session_id = questions.session_id;
	
	var response_obj = comm_manager.send_request(request_object);
	
	return response_obj;
}

function populate_stat_table(table_id){
	var table_selector = $("#" + table_id);
	
	table_selector.html("<tr><th>Question</th><th>Time</th><th>Tries</th><th>Score</th></tr>");

	for(i in question_stats){
		if(question_stats[i].score_change > 0 ){
			var color = "green";
		}
		else{
			var color = "red";
		}
	
		var row_html = "<tr>";
		row_html += "<td style=\"text-align:center\">"+question_stats[i].q_num+"</td>";
		row_html += "<td style=\"text-align:center\">"+time_to_string(-1*question_stats[i].time)+"</td>";
		row_html += "<td style=\"text-align:center\">"+(question_stats[i].attempts+1)+"</td>";
		row_html += "<td style=\"color:"+color+"; text-align:center\">"+(question_stats[i].score_change)+"</td>";
		row_html += "</tr>";
		
		table_selector.append(row_html);
	}
}

function login(){
	var email = $("#login_area #email").val();
	var pass = $("#login_area #password").val();

	if(email=="" || pass==""){
	    $("#login_error").text("Both a username and password are required.");
	    $("#login_error").css({opacity:1});
	    return false;
	}

	var response = comm_manager.login_request(email, pass);

	//if there is an error with logging in print it to the user
	if(!response.success || response.success=="false" || response.success==null){
	    $("#login_error").text(response.error);
	    $("#login_error").css({opacity:1});
	    return false;
	}

	//Otherwise we need to do some stuff with the authenticator and the username.
	//Set session cookie
	set_cookie("username", response.username, 1, "/");
	set_cookie("authenticator", response.auth, 1, "/");

	handle_login(response.username, response.auth);
	$("#login_wrapper").animate({top: "-100%"});
	$("#tile_wrapper").animate({top: "-100%"});
	return false;
}

function register(){
	var email = $("#reg_area #email").val();
	var pass_1 = $("#reg_area #password_1").val();
	var pass_2 = $("#reg_area #password_2").val();
	var username = $("#reg_area #username").val();
	
	if(!pass_1 || !pass_1 || !pass_1 || !pass_1){
		$("#reg_error").text("Please complete the form.");
	    $("#reg_error").css({opacity:1});
	    return false;
	}
	
	if(pass_1==pass_2){
		var request_object = new Object();
		request_object.request_type = "register";
		request_object.email = email;
		request_object.password = pass_1;
		request_object.username = username;
	
		console.log(request_object);
	
		var response = comm_manager.send_request(request_object);
	
		console.log(response);
	
		if(response.success =="true"){
			//Set session cookie
			set_cookie("username", response.username, 1, "/");
			set_cookie("authenticator", response.auth, 1, "/");
		
			handle_login(response.username, response.authenticator);
			$("#login_wrapper").animate({top: "-100%"});
			$("#tile_wrapper").animate({top: "-100%"});
			$("#reg_frame").animate({opacity:0});	
		}
		else{
			$("#reg_error").text(response.error);
		    $("#reg_error").css({opacity:1});
		}		
	}
	else{
	    $("#reg_error").text("Passwords don't match.");
	    $("#reg_error").css({opacity:1});
		
	}
    return false;	
}

//Also used when a session cookie is found
function handle_login(username, authenticator){
	$("#user_info").html('Welcome, <a href="/account">' + username + '</a>!<button>Logout</button>');
	$("#user_info button").click(logout);
	$("#login_error").css({opacity:0});
	
	session_info = new Object();
	session_info.username = username;
	session_info.authenticator = authenticator;
	
	available_games = get_available_games();

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
	
	    add_tile(rowSelector, available_games[i]);

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

function go_to_tile_screen(page_num){
	if(tile_page_count>1){
		if(page_num == 0){
			//hide previous button
			$("#tile_prev_page").hide(400);
		}
		else{
			$("#tile_prev_page").show(400);
		}
		
		if(page_num == (tile_page_count-1) ){
			$("#tile_next_page").hide(400);
		}
		else{
			$("#tile_next_page").show(400);
		}
	}
	
	$("#tile_pages").animate({left: -1080*(page_num)});
	curr_tile_page = page_num;	
}

function logout(){
	delete_cookie("authenticator","/");
	delete_cookie("username","/");
	location.reload();
}

function display_reg_area(){
	$('#login_frame').animate({height: '0%'}, 400, 'linear', function(){
		$('#login_area').css({display: 'none'});
		$('#reg_area').css({display: 'block'});
		$('#login_frame').animate({'margin-top': '6%'},100);
		$('#login_frame').animate({height: '55%'}, 400, 'linear');	
	});
	
}

function display_login_area(){
	$('#login_frame').animate({height: '0%'}, 400, 'linear', function(){
		$('#login_area').css({display: 'block'});
		$('#reg_area').css({display: 'none'});
		$('#login_frame').animate({'margin-top': '8%'},100);
		$('#login_frame').animate({height: '40%'}, 400, 'linear');	
	});
}
