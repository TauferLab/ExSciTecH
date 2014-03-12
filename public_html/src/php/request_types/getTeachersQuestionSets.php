<?php
	$request_structures["getTeachersQuestionSets"] = array();
	$request_structures["getTeachersQuestionSets"]["auth"] = "";
		
	function handle_getTeachersQuestionSets_request($request_object){
	    $response_object = array();
	    
        $mysqli_gamedb = connectToMysql();
        
        $user = get_user( $request_object["auth"] );
		
		$query = "SELECT * FROM `questionSet` WHERE ownerID = ".$user->id." ORDER BY ID";
		
		$result = $mysqli_gamedb->query($query);
		
		$response_object["questionSets"] = array();

		
		while($obj = $result->fetch_object() ) {
            $response_object["questionSets"][] = $obj;    
        }
        		
		$response_object["success"] = "true";
		return $response_object;
    }
		
?>