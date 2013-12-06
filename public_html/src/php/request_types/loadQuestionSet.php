<?php

	//request_structure
	$request_structures["loadQuestionSet"] = array();
	$request_structures["loadQuestionSet"]["request_type"] = "";
	$request_structures["loadQuestionSet"]["authenticator"] = "";
	$request_structures["loadQuestionSet"]["qSetID"] = "";
	
	
	function handle_loadQuestionSet_request($request_object){
	    $response_object = array();
	    
	    if( userHasPermission($request_object["qSetID"], $request_object["authenticator"]) ){
    	    $response_object["settings"] = getQsetSettings($request_object["qSetID"]);
    	    $response_object["questions"] = getQsetQuestions($request_object["qSetID"]);
	    }
	    else{
    	    $response_object["success"] = false;
	    } 
	    
	    $mysqli_gamedb->close();
	    return $response_object;
	}
	
	function getQsetSettings($qSetID){
    	$mysqli_gamedb = connectToMysql();
	    $retVal = array();
	    
	    $qSetID = $mysqli_gamedb->escape_string($qSetID);
	    
	    $query = "SELECT * FROM `questionSet` WHERE `id` = $qSetID";
    	
    	$result = $mysqli_gamedb->query($query);
    	
    	if( $result && $result->num_rows > 0 ){
        	
        	$row = $result->fetch_array();
        	
        	$retVal["ID"] = $row["id"];
        	$retVal["name"] = $row["name"];
        	$retVal["description"] = $row["description"];
        	$retVal["timeLimit"] = $row["time_limit"];
        	
    	}
        else{
            $mysqli_gamedb->close();
            return false;
        }    	

        $mysqli_gamedb->close();
    	return $retVal;
	}
	
	function userHasPermission($qSetID,$auth){
    	$mysqli_gamedb = connectToMysql();
    	
    	$qSetID = $mysqli_gamedb->escape_string($qSetID);
	    $auth = $mysqli_gamedb->escape_string($auth);
	    $user = get_user($auth);
    	
    	$query = "SELECT * FROM `questionSet` WHERE `id` = $qSetID AND `ownerID` = ".$user->id;

    	$result = $mysqli_gamedb->query($query);
    	
    	if( $result && $result->num_rows > 0 ){
    	    $mysqli_gamedb->close();
    	    return true;
        }
        else{
            $mysqli_gamedb->close();
            return false;
        }
	}

	function getQsetQuestions($qSetID){
    	$mysqli_gamedb = connectToMysql();
    	$retVal = array();
    	
    	$query = "SELECT question_id,name,text,answers,answer FROM questions
                  INNER JOIN molecules
                  ON questions.molID = molecules.id
                  WHERE game_id = $qSetID";
    	
    	$result = $mysqli_gamedb->query($query);
    	
    	while( $row = $result->fetch_array() ){
    	
    	    $retVal[] = buildLoadQuestion(
            	$row["question_id"],
            	$row["text"],
            	$row["name"],
            	$row["answers"],
            	$row["answer"]
            );
    	}
    	
    	$mysqli_gamedb->close();
    	return $retVal;
	}

	function buildLoadQuestion($ID, $text, $molName, $answerChoices, $answer){
    	$retVal = array();
    	
    	$retVal["ID"] = $ID;
    	$retVal["qText"] = $text;
    	$retVal["molName"] = $molName;
    	$retVal["answerChoices"] = explode("|", $answerChoices);
    	
    	$temp = $retVal["answerChoices"][0];
    	$retVal["answerChoices"][0] = $retVal["answerChoices"][$answer-1];
    	$retVal["answerChoices"][$answer-1] = $temp;
    	
    	
    	return $retVal;
	}
?>
