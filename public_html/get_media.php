<?php
	/*
	 * get_media.php?gsi=1&qid=2&mt=1
	 * gsi - game_session_id
	 * qid - question_id
	 * mt - media_type
	 */
    require_once("./src/php/config.inc");
	require_once("./src/php/database.inc");
	
	if( isset($_GET["gsi"]) && isset($_GET["mt"]) && isset($_GET["qid"]) ){
		$game_session_id = $_GET["gsi"];
		$question_id = $_GET["qid"];
		$media_type = $_GET["mt"];
		
		if($media_type == 0){
			$mt_str = "sdfFile";
		}
		else{
			$mt_str = "imgFile";
		}
		
		$game_session_id = $mysqli_gamedb->real_escape_string($game_session_id);
		$question_id = $mysqli_gamedb->real_escape_string($question_id);
		$mt_str = $mysqli_gamedb->real_escape_string($mt_str);
		
		//$query = "SELECT ".$mt_str." FROM questions WHERE game_id=(SELECT game_id FROM game_sessions WHERE session_id=\"".$game_session_id."\") AND question_id=(SELECT `original_q_id` FROM  `question_id_map` WHERE  `session_id` =  \"".$game_session_id."\" AND  `mapped_q_id` =".$question_id.")";
		$query = "SELECT " . $mt_str . " FROM molecules WHERE id = (
		            SELECT molID FROM questions WHERE question_id=(
		                SELECT `original_q_id` FROM  `question_id_map` WHERE  `session_id` =  \"".$game_session_id."\" AND  `mapped_q_id` =".$question_id."
		            ) AND game_id = (
		                SELECT `game_id` FROM  `game_sessions` WHERE  `session_id` =  \"".$game_session_id."\"
		            )
		          )";
		
		$result = $mysqli_gamedb->query($query);
		
		if( !$result ){
    		echo $mysqli_gamedb->error;
		}
		
		$row = $result->fetch_array();
		if($row){
			$filename = $row[0];
		}
		else{
			exit;
		}

		$filename = str_replace('/var/www/ExSciTecH/public_html/', '', $filename);

		$file = fopen($filename, 'rb');
		
		// send the right headers
		if($media_type == 0){
			header("Content-Type: application/vnd.palm");
		}
		else{
			header("Content-Type: image/png");
		}
		
		header("Content-Length: " . filesize($filename));
		
		// dump the file and stop the script
		fpassthru($file);
		
		//http_response_code(200);
		exit;
		
	}
?>