<?php

	//request_structure
	$request_structures["get_avail_flashcard_games"] = array();
	$request_structures["get_avail_flashcard_games"]["request_type"] = "";
	$request_structures["get_avail_flashcard_games"]["authenticator"] = "";
	
	function handle_get_avail_flashcard_games_request($request_object){
		$mysqli_gamedb = connectToMysql();
		$response_object = array();

		$response_object['success'] = "true";
		$response_object['available_games'] = Array();
		
		$q_counts = Array();
		
		$query = "SELECT game_id,COUNT(*) FROM questions GROUP BY game_id;";
		$stmt = $mysqli_gamedb->prepare($query);
		$stmt->execute();
		$stmt->bind_result($col0, $col1);
		
		while ($stmt->fetch()) {
			$q_counts[$col0] = $col1;
		}
	
        unset($stmt);
	
        $query  ="Select * FROM questionSet";
        $stmt = $mysqli_gamedb->prepare($query);
		$stmt->execute();
        $stmt->bind_result($id, $name, $desc, $timeLimit,$imageFname,$renderMethod,$ownerID);
	
		while ($stmt->fetch()) {
			if($q_counts[$id]>0){
			
				$new_game = Array();
				$new_game["id"] = $id;
				$new_game["q_count"] = $q_counts[$id];
				$new_game["image"] = $imageFname;
				$new_game["name"] = $name;
				$new_game["description"] = $desc;
				$new_game["time_limit"] = $timeLimit;
				$new_game["high_scores"] = get_high_scores($id);
				
				$response_object['available_games'][] = $new_game;
			}			
		}
	
        $mysqli_gamedb->close();
		return $response_object;	
	}

	function get_high_scores($game_id){
		$mysqli_gamedb = connectToMysql();
		$ret = array();
		
		$query = "SELECT score,username FROM `scores` WHERE `game_id`= ? ORDER BY score DESC LIMIT 10";
		$stmt = $mysqli_gamedb->prepare( $query );
		
		if(!$stmt){
    		var_dump($mysqli_gamedb->error);
    		die();
		}
		else{
    	    $stmt->bind_param("i",$game_id);
    		$stmt->execute();
    		$stmt->bind_result($score, $username);
    	
    		$position = 1;
    		
    		while ($stmt->fetch()) {
    			$new_hs = array();
    			$new_hs["rank"] = $position++;
    			$new_hs["username"] = $username;
    			$new_hs["score"] = $score;
    			
    			$ret[] = $new_hs;
    		}
    		
    		$mysqli_gamedb->close();
    		return $ret;	
		}
		
		
	}

?>