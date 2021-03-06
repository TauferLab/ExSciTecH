<?php
	//request_structure
	$request_structures["end_flashcard_game"] = array();
	$request_structures["end_flashcard_game"]["request_type"] = "";
	$request_structures["end_flashcard_game"]["authenticator"] = "";
	$request_structures["end_flashcard_game"]["game_session_id"] = "";
	$request_structures["end_flashcard_game"]["game_time"] = "";
	
	function handle_end_flashcard_game_request($request_object){
		$mysqli_gamedb = connectToMysql();
		$response_object = array();
		
		$user = get_user($request_object["authenticator"]);
		
		$game_session_id = $mysqli_gamedb->real_escape_string($request_object["game_session_id"]);
		$max_time = get_time_limit($game_session_id);
		
		$remaining_time = $max_time - $mysqli_gamedb->real_escape_string($request_object["game_time"]);
		
		//calculate base score
		$base_score = calculate_score($game_session_id);

		//give the client an extra minute to load the molecule models before
		//their game begins
		if(are_all_questions_answered($game_session_id) || $remaining_time > -60000){
			$response_object["success"] = true;

			//ensure score is not negative even if time is negative
			if($remaining_time < 0) {
				$remaining_time = 0;
			}

			$final_score = round($base_score + $remaining_time / 200);
		
			//return score rank
			$response_object["rank"] = get_rank($final_score, $game_session_id);
			
			$response_object["final_score"] = $final_score;

			//store score
			if( isset($user->name) && !scoreStoredPreviously($game_session_id) ){
    			store_score($user, $game_session_id, $final_score);
            }
			
		}
		//else purge the game session from the database
		else{
			$response_object["success"] = false;
		}
		
		
		$mysqli_gamedb->close();
		return $response_object;
	}
	
	function scoreStoredPreviously($game_session_id){
		$mysqli_gamedb = connectToMysql();
		
		$query = "SELECT COUNT(*) FROM `scores` WHERE `game_session_id` = '".$game_session_id."'";
		
		$result = $mysqli_gamedb->query($query);
		
		if($row = $result->fetch_array()){
    		$mysqli_gamedb->close();
		    if($row[0] == 1)
		        return true;
            else
                return false;
		
		    
		}
		else{
		    $mysqli_gamedb->close();
			return true;
		}
	}
	
	function are_all_questions_answered($game_session_id){
		$mysqli_gamedb = connectToMysql();
		
		$query = "SELECT COUNT(*)  FROM `answers` WHERE `game_session_id` = '".$game_session_id."' AND `correct`= 1";
                
        $result = $mysqli_gamedb->query($query);
        
        // Ugly code used to grab the first index of the last row
        while($row = $result->fetch_array()){
                $answered = $row[0];
        }
        
        $query = "SELECT COUNT(*) FROM `questions` WHERE game_id=(SELECT game_id  FROM `answers` WHERE `game_session_id` = '".$game_session_id."' LIMIT 1)";
        
        $result = $mysqli_gamedb->query($query);
        
        while($row = $result->fetch_array()){
                $total = $row[0];
        }
        
        $mysqli_gamedb->close();
        return ( $answered == $total );
	}
	
	function store_score($user, $game_session_id,$final_score){
		$mysqli_gamedb = connectToMysql();
		
		$query = "INSERT INTO `scores` (
                                        `score`,
                                        `game_id`,
                                        `user_id`,
                                        `username`,
                                        `time`,
                                        `game_session_id`)
                                VALUES (
                                        '".$final_score."',
                                        (SELECT game_id  FROM `game_sessions` WHERE `session_id` = '".$game_session_id."'),
                                        '".$user->id."',
                                        '".$user->name."',
                                        NOW(),
                                        '".$game_session_id."');";
                                        
        $result = $mysqli_gamedb->query($query);
		
		$mysqli_gamedb->close();
	}
	
	function get_rank($score, $game_session_id){
		$mysqli_gamedb = connectToMysql();
		$query = "SELECT COUNT(*) FROM `scores` WHERE `score` >= '".$score."' AND `game_id`=(SELECT game_id  FROM `game_sessions` WHERE `session_id` = '".$game_session_id."' LIMIT 1)";
		$result = $mysqli_gamedb->query($query);

		if($row = $result->fetch_array()){
			$rank = $row[0] + 1;
		}
		else{
			$rank = 1;
		}
		
		$mysqli_gamedb->close();
		return $rank;
	}
	
	function get_time_limit($game_session_id){
		$mysqli_gamedb = connectToMysql();
		$query = "SELECT time_limit FROM `questionSet` WHERE `id` = (SELECT game_id  FROM `game_sessions` WHERE `session_id` = '".$game_session_id."' LIMIT 1)";
		
		$result = $mysqli_gamedb->query($query);
		
		if($row = $result->fetch_array()){
		    $mysqli_gamedb->close();
			return $row[0];
		}
		else{
		    $mysqli_gamedb->close();
			return 0;
		}
	}
	
?>