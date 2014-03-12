<?php
	$request_structures["submitQsetForReview"] = array();
	$request_structures["submitQsetForReview"]["auth"] = "";
	$request_structures["submitQsetForReview"]["questionSetID"] = "";
		
	function handle_submitQsetForReview_request($request_object){
	    $response_object = array();

		// Check for authorization
		$user = get_user( $request_object["auth"] );
		
		if(getQsetOwner($request_object["questionSetID"]) == $user->id){
			// Make update query
			$mysqli_gamedb = connectToMysql();
			$qSetID = $mysqli_gamedb->real_escape_string( $request_object["questionSetID"] );
			
			$query = "UPDATE `exscitech_web`.`questionSet` SET `underReview` = '1' WHERE `questionSet`.`id` = $qSetID;";
			
			$result = $mysqli_gamedb->query($query);
			
			$mysqli_gamedb->close();
		}

		$response_object["success"] = "true";
		return $response_object;
    }
    
    function getQsetOwner($qSetID){
    
	    $mysqli_gamedb = connectToMysql();
		$qSetID = $mysqli_gamedb->real_escape_string( $qSetID );
	
		$query = "SELECT `ownerID` FROM `questionSet` WHERE `id`=$qSetID";
		
		$result = $mysqli_gamedb->query($query);
	
		if( $obj = $result->fetch_object() ) {
			return $obj->ownerID;
		}
		else{
			$mysqli_gamedb->close();
			return -1;	
		}
		
    }