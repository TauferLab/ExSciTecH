<?php
	//request_structure
	$request_structures["load_flashcard_game"] = array();
	$request_structures["load_flashcard_game"]["request_type"] = "";
	$request_structures["load_flashcard_game"]["authenticator"] = "";
	$request_structures["load_flashcard_game"]["game_id"] = "";
	
	function handle_load_flashcard_game_request($request_object){
		$mysqli_gamedb = connectToMysql();
		$response_object = array();

		//Create a new Session ID
		$response_object['game_session_id'] = uniqid();
		$response_object['questions'] = Array();

		$user = get_user($request_object["authenticator"]);
		$user_id = $user->id;
		
		//Store new session info in database
		store_game_session($user_id,$response_object['game_session_id'],$request_object['game_id']);
		
		$game_id = $mysqli_gamedb->real_escape_string($request_object["game_id"]);
		
		// Pull game questions from DB
		$result = $mysqli_gamedb->query("Select * from questions where game_id=".$game_id.";");
	
		$temp_array = array();
		
		while($row = $result->fetch_array()){
			array_push($temp_array,$row);
		}
	
		//Randomize question order
		shuffle($temp_array);
	
		$id=1;
		
		foreach($temp_array as $row){
			$answers = explode("|", $row["answers"]);
			array_push($response_object['questions'], build_question($id,$row["text"],$answers));
			store_mapping($response_object['game_session_id'],$row["question_id"],$id++);
		}

        $result = $mysqli_gamedb->query("SELECT * FROM questionSet WHERE id=".$game_id);
        if($row = $result->fetch_array()){
            $response_object['name'] = $row['name'];
            $response_object['time_limit'] = $row['time_limit'];
            $response_object['description'] = $row['description'];
            $response_object['imageURL'] = $row['image'];
            $response_object['highres_image'] = $row['image'];
        }
        
        $response_object['high_scores'] = get_high_scores( $game_id );

		$response_object['success'] = "true";
		
		$mysqli_gamedb->close();
		return $response_object;
	}
	
	function store_mapping($session_id,$original_id,$mapped_id){
		$mysqli_gamedb = connectToMysql();
		$query = "INSERT INTO `question_id_map` (`session_id`, `original_q_id`, `mapped_q_id`) VALUES ('".$session_id."', '".$original_id."', '".$mapped_id."');";
		
		if( ! $mysqli_gamedb->query($query)){
    		echo $mysqli_gamedb->error;
		}
		$mysqli_gamedb->close();
	}
	
	function build_question($id,$q_text,$answers){
		$ret = Array();
		
		$ret["id"] = $id;
		$ret["text"] = $q_text;
		$ret["answers"] = Array();
		
		$i = 0;
		foreach($answers as $ans){
			$ret["answers"][] = Array("id"=>$i++,"text"=>$ans);
		}
		
		return $ret;
	}
	
	function store_game_session($user_id,$session_id,$game_id){
		$mysqli_gamedb = connectToMysql();
		
		$session_id = $mysqli_gamedb->real_escape_string($session_id);
		$user_id = $mysqli_gamedb->real_escape_string($user_id);
		
		$query = "INSERT INTO `game_sessions` (`session_id`, `user_id`, `game_id`, `create_time`, `expire_time`) VALUES ('".$session_id."', '".$user_id."', '".$game_id."', NOW(), NOW()+3600);";
		$mysqli_gamedb->query($query);
		$mysqli_gamedb->close();
	}
?>