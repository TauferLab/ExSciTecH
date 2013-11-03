<?php
    
	//request_structure
	$request_structures["saveQuestionSet"] = array();
	$request_structures["saveQuestionSet"]["request_type"] = "";
	$request_structures["saveQuestionSet"]["authenticator"] = "";
	
	function handle_saveQuestionSet_request($request_object){
		$response_object = array();
		
		$ID = $request_object["settings"]["ID"];

		if( $ID == 0 ){
		    $ID = insertQuestionSet($request_object);
		    if( $ID != false ){
                $response_object['ID'] = $ID;
                $response_object['insert'] = "true";
                $response_object['success'] = "true";
		    }
    		else{
    		    $response_object['success'] = "false";
    		}
		}
		else{
		    if( updateQuestionSet($request_object) ){
    		    $response_object['ID'] = $ID;
        		$response_object['update'] = "true";
        		$response_object['success'] = "true";
            }
            else{
                $response_object['update'] = "true";
    		    $response_object['success'] = "false";
    		}
		}

		return $response_object;
	}
	
	function updateQuestionSet($request_object){
	    global $mysqli_gamedb;
	
    	if( userHasPermission($request_object["settings"]["ID"], $request_object["authenticator"]) ){
    	
    	    $ID           = $mysqli_gamedb->escape_string($request_object["settings"]["ID"]);
    	    $name         = $mysqli_gamedb->escape_string($request_object["settings"]["name"]);
    	    $desc         = $mysqli_gamedb->escape_string($request_object["settings"]["description"]);
            $timeLimit    = $mysqli_gamedb->escape_string($request_object["settings"]["timeLimit"]);
            $renderMethod = $mysqli_gamedb->escape_string($request_object["settings"]["renderMethod"]);
            
            $query = "UPDATE `questionSet` SET
                        `name`         = \"$name\",
                        `description`  = \"$desc\",
                        `time_limit`   = \"$timeLimit\",
                        `renderMethod` = \"$renderMethod\"
                      WHERE id= ".$ID;
            
            if($mysqli_gamedb->query($query)){
                foreach($request_object["questions"] as $question){
                    if( ! updateQuestion($question, $ID) ){
                        echo "lol";
                        return false;
                    }
                }
                return true;
            }
            else{
                echo $mysqli_gamedb->error;
                return false;
            }
	    }
	    else{
    	    echo "lol2";
    	    return false;
	    } 
	}
	
	function updateQuestion($question, $questionSetID){
	    global $mysqli_gamedb;
	
    	//Check if question exists
    	if( questionExists($question["ID"], $questionSetID) ){
    	    $questionID = $mysqli_gamedb->escape_string($question["ID"]);
    	    $molID = getMolID($question["molName"]);
	        $text = $mysqli_gamedb->escape_string($question["qText"]);
	        $questionSetID = $mysqli_gamedb->escape_string($questionSetID);
	        
       	    $answerChoices = buildAnswerChoicesString($question["answerChoices"]);
    	
            //if it exists run update query	
            $query = "UPDATE `questions` SET
                        `molID`=$molID,
                        `text`=\"$text\",
                        `answers`=\"$answerChoices\",
                        `answer`= 1
                    WHERE `question_id` = $questionID AND `game_id`= $questionSetID ";
                    
            return $mysqli_gamedb->query($query);
            
    	}
    	else{
        	//insert the question
        	return insertQuestion($question, $questionSetID);
    	}
    	
	}
	
	function questionExists($questionID, $questionSetID){
	    global $mysqli_gamedb;
	
	    $questionID = $mysqli_gamedb->escape_string($questionID);
	    $questionSetID = $mysqli_gamedb->escape_string($questionSetID);
	
    	$query = "SELECT * FROM `questions` WHERE `question_id` = $questionID AND `game_id` = $questionSetID";
    	
    	$result = $mysqli_gamedb->query($query);
    	
    	if( $result->num_rows > 0 ){
    	    return true;
    	}
    	else{
        	return false;
    	}
	}

	function insertQuestionSet($request_object){
        global $mysqli_gamedb;
        
        $name         = $mysqli_gamedb->escape_string($request_object["settings"]["name"]);
        $desc         = $mysqli_gamedb->escape_string($request_object["settings"]["description"]);
        $timeLimit    = $mysqli_gamedb->escape_string($request_object["settings"]["timeLimit"]);
        $renderMethod = $mysqli_gamedb->escape_string($request_object["settings"]["renderMethod"]);
        $auth         = $mysqli_gamedb->escape_string($request_object["authenticator"]);
                
        $user = get_user($auth);
        
        if( !(($timeLimit < 1800000) && ($timeLimit > 10000)) ){
            $timeLimit = 120000;
        }else{
            
        }
        
        $query = "INSERT INTO `questionSet`(
                        `name`,
                        `description`,
                        `time_limit`,
                        `image`,
                        `renderMethod`,
                        `ownerID`
                   ) VALUES (
                        \"$name\",
                        \"$desc\",
                        $timeLimit,
                        \"\",
                        \"$renderMethod\",
                        \"".$user->id."\"
                   )";
        
        if($mysqli_gamedb->query($query))
            $ID = $mysqli_gamedb->insert_id;
        else
            return false;
        
        foreach($request_object["questions"] as $question){
            if( ! insertQuestion($question, $ID) )
                return false;
        }
        
        return $ID;
	}
	
	function insertQuestion($question, $questionSetID){
	    global $mysqli_gamedb;    
	    
	    $ID = $mysqli_gamedb->escape_string($question["ID"]);
	    $molID = getMolID($question["molName"]);
	    $text = $mysqli_gamedb->escape_string($question["qText"]);
	    
	    $correctAns = $question["answerChoices"][0];
	    
	    $answerChoices = buildAnswerChoicesString($question["answerChoices"]);
	
    	$query = "INSERT INTO `questions`(
    	            `question_id`,
    	            `game_id`,
    	            `molID`,
    	            `text`,
    	            `answers`,
    	            `answer`
    	       ) VALUES (
    	            $ID,
    	            $questionSetID,
    	            $molID,
    	            \"$text\",
    	            \"$answerChoices\",
    	            1
    	       )";
    	       
    	 if($mysqli_gamedb->query($query) ){
    	    return true; 
    	 }
    	 else{
        	 return false;
    	 }
	}
	
	function getMolID($molName){
	    global $mysqli_gamedb;
	    global $PNG_DIR;
	    global $SDF_DIR;
	    	    
	    $molName = $mysqli_gamedb->escape_string($molName);
	    
    	$query = "SELECT ID FROM `molecules` WHERE `name` = \"". $molName ."\"";
    	
    	$result = $mysqli_gamedb->query($query);
    	
    	if( $result->num_rows > 0 ){
        	$row = $result->fetch_array();
        	
        	if( isset($row["ID"]) ){
            	return $row["ID"];
        	}
    	}
    	else{
    	
    	    $basename = uniqid();
    	
    	    $pngFilename = $PNG_DIR.$basename.".png";
    	    $sdfFilename = $SDF_DIR.$basename.".sdf";
    	
            $sdfURL = "http://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/". $molName ."/SDF?record_type=3d";
            $pngURL = "http://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/". $molName ."/PNG";
	    
            if( false != file_put_contents($pngFilename, fopen($pngURL, 'r')) &&
                false != file_put_contents($sdfFilename, fopen($sdfURL, 'r')) 
            ){
                $query = "INSERT INTO `molecules`(
                                        `name`,
                                        `imgFile`,
                                        `sdfFile`
                                      ) VALUES (
                                        \"".$molName."\",
                                        \"".$pngFilename."\",
                                        \"".$sdfFilename."\"
                                      )";
                                      
                if( $mysqli_gamedb->query($query) ){
                    return $mysqli_gamedb->insert_id;
                }
                else{
                    return -1;
                }
            }
            else{
                $query = "INSERT INTO `molecules`(
                                        `name`,
                                        `unavailable`
                                      ) VALUES (
                                        \"".$molName."\",
                                        1
                                      )";
                                      
                if( $mysqli_gamedb->query($query) ){
                    return -1;
                }
            }
    	}
	}
	
	function buildAnswerChoicesString($answerArray){
	    global $mysqli_gamedb;
	    
        $answerChoices = "";
        
        foreach($answerArray as $choice){
            $answerChoices .= $mysqli_gamedb->escape_string($choice)."|";
        }
        return rtrim($answerChoices,'|');
	}
?>