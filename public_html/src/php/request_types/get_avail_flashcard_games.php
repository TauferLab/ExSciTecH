<?php

	//request_structure
	$request_structures["get_avail_flashcard_games"] = array();
	$request_structures["get_avail_flashcard_games"]["request_type"] = "";
	$request_structures["get_avail_flashcard_games"]["authenticator"] = "";
	
	function handle_get_avail_flashcard_games_request($request_object){
		$mysqli_gamedb = connectToMysql();
		
		$cats = getCategories();
		
		$response_object = array();
		$response_object['success'] = "true";
		$response_object['categories'] = $cats;
		$response_object['available_games'] = Array();
		
		if(isset($request_object['user'])){
			$username = $mysqli_gamedb->real_escape_string($request_object["user"]);
			
			$user = lookup_user_username($username);
	        
	        $query  = "SELECT * FROM questionSet WHERE ownerID = \"".$user->id."\"";
		}
		else{
			$query  = "SELECT * FROM questionSet WHERE approved = 1";
		}
        
        $result = $mysqli_gamedb->query($query);
        
        if($result){
            while($obj = $result->fetch_object() ) {
                $newGame = Array();
                $newGame["id"] = $obj->id;
                $newGame["name"] = $obj->name;
                $newGame["category"] = $obj->category;
                $newGame["image"] = $obj->image;
                $newGame["description"] = $obj->description;
                $newGame["time_limit"] = $obj->time_limit;
                $newGame["high_scores"] = get_high_scores($obj->id);
                $response_object['available_games'][] = $newGame;    
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
	
	function getCategories(){
		$ret = array();
	
		$mysqli_gamedb = connectToMysql();
		$query = "SELECT * FROM `categories`";
		$result = $mysqli_gamedb->query($query);
        
        if($result){
			while($obj = $result->fetch_object() ) {
				$ret[] = $obj;
			}
		}
		
		return $ret;
	}

?>