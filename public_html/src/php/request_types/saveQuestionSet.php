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
                $response_object['success'] = true;
		    }
    		else{
    		    $response_object['success'] = false;
    		}
		}
		else{
		    if( updateQuestionSet($request_object) ){
    		    $response_object['ID'] = $ID;
        		$response_object['update'] = "true";
        		$response_object['success'] = true;
            }
            else{
                $response_object['update'] = "true";
    		    $response_object['success'] = false;
    		}
		}

		return $response_object;
	}
	
	function updateQuestionSet($request_object){
	    $mysqli_gamedb = connectToMysql();
	
    	if( userHasPermission($request_object["settings"]["ID"], $request_object["authenticator"]) ){
    	
    	    $ID           = $mysqli_gamedb->escape_string($request_object["settings"]["ID"]);
    	    $name         = $mysqli_gamedb->escape_string($request_object["settings"]["name"]);
    	    $image        = $mysqli_gamedb->escape_string($request_object["settings"]["image"]);
    	    $desc         = $mysqli_gamedb->escape_string($request_object["settings"]["description"]);
            $timeLimit    = $mysqli_gamedb->escape_string($request_object["settings"]["timeLimit"]);
            $renderMethod = $mysqli_gamedb->escape_string($request_object["settings"]["renderMethod"]);
            
            if( $image =="" ){
                $image = "/data/flashcardImages/functional_groups.png";
            }

            $image = str_replace("..", "", $image);
            
            $query = "UPDATE `questionSet` SET
                        `name`         = \"$name\",
                        `description`  = \"$desc\",
                        `time_limit`   = \"$timeLimit\",
                        `image`        = \"$image\",
                        `renderMethod` = \"$renderMethod\"
                      WHERE id= ".$ID;
            
            if($mysqli_gamedb->query($query)){
                foreach($request_object["questions"] as $question){
                    if( ! updateQuestion($question, $ID) ){
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
    	    return false;
	    } 
	}
	
	function updateQuestion($question, $questionSetID){
	    $mysqli_gamedb = connectToMysql();
	 /*  
       error_log("###############################################");
        error_log($question);
        error_log($question[molName]);
        error_log($question[answerChoices]);
        error_log($question[questionText]);
*/

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
                        `answers`=\"".$answerChoices["answerChoices"]."\",
                        `answer`= ".$answerChoices["answer"]."
                    WHERE `question_id` = $questionID AND `game_id`= $questionSetID ";
                    
            
            return $mysqli_gamedb->query($query);
            
    	}
    	else{
        	//insert the question
        	$mysqli_gamedb->close();
        	return insertQuestion($question, $questionSetID);
    	}
    	
	}
	
	function questionExists($questionID, $questionSetID){
	    $mysqli_gamedb = connectToMysql();
	
	    $questionID = $mysqli_gamedb->escape_string($questionID);
	    $questionSetID = $mysqli_gamedb->escape_string($questionSetID);
	
    	$query = "SELECT * FROM `questions` WHERE `question_id` = $questionID AND `game_id` = $questionSetID";
    	
    	$result = $mysqli_gamedb->query($query);
    	
    	if( $result->num_rows > 0 ){
    	    $mysqli_gamedb->close();
    	    return true;
    	}
    	else{
        	$mysqli_gamedb->close();
        	return false;
    	}
	}

	function insertQuestionSet($request_object){
        $mysqli_gamedb = connectToMysql();
        
        $name         = $mysqli_gamedb->escape_string($request_object["settings"]["name"]);
        $desc         = $mysqli_gamedb->escape_string($request_object["settings"]["description"]);
        $timeLimit    = $mysqli_gamedb->escape_string($request_object["settings"]["timeLimit"]);
        $image        = $mysqli_gamedb->escape_string($request_object["settings"]["image"]);
        $renderMethod = $mysqli_gamedb->escape_string($request_object["settings"]["renderMethod"]);
        $auth         = $mysqli_gamedb->escape_string($request_object["authenticator"]);

        if( $image =="" ){
                $image = "../data/flashcardImages/functional_groups.png";
            }
            
        $user = get_user($auth);
        
        if( ($timeLimit > 2400000) || ($timeLimit < 1000) ){
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
                        \"$image\",
                        \"$renderMethod\",
                        \"".$user->id."\"
                   )";
        
        if($mysqli_gamedb->query($query))
            $ID = $mysqli_gamedb->insert_id;
        else
            return false;
        
        foreach($request_object["questions"] as $question){
            if( ! insertQuestion($question, $ID) ){
                $mysqli_gamedb->close();
                return false;
            }
                
        }
        
        $mysqli_gamedb->close();
        return $ID;
	}
	
	function insertQuestion($question, $questionSetID){
	    $mysqli_gamedb = connectToMysql();
	    
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
    	            \"".$answerChoices["answerChoices"]."\",
    	            ".$answerChoices["answer"]."
    	       )";
    	       
    	 if($mysqli_gamedb->query($query) ){
    	    $mysqli_gamedb->close();
    	    return true; 
    	 }
    	 else{
    	    $mysqli_gamedb->close();
        	return false;
    	 }
	}
	
	function getMolID($molName){
	    $mysqli_gamedb = connectToMysql();
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
    	
            $sdfURL = "http://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/". rawurlencode($molName) ."/SDF?record_type=3d";
            
            $pngURL = "http://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/". rawurlencode($molName) ."/PNG";
            file_put_contents($pngFilename, fopen($pngURL, 'r'));
	    
            if( //false != file_put_contents($pngFilename, fopen($pngURL, 'r')) &&
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
                    $retVal = $mysqli_gamedb->insert_id;
                    $mysqli_gamedb->close();
                    return $retVal;
                }
                else{
                    $mysqli_gamedb->close();
                    return -1;
                }
            }
            else{
                $query = "INSERT INTO `molecules`(
                                        `name`,
                                        `imgFile`,
                                        `sdfFile`,
                                        `unavailable`
                                      ) VALUES (
                                        \"".$molName."\",
                                        \"".$pngFilename."\",
                                        \"\",
                                        1
                                      )";
                                      
                if( $mysqli_gamedb->query($query) ){
                    $mysqli_gamedb->close();
                    return -1;
                }
            }
    	}
	}
	
	function buildAnswerChoicesString($answerArray){
	    $mysqli_gamedb = connectToMysql();
	    
	    $retVal = array();
        $retVal["answerChoices"] = "";
        
        $correctAnsString = $answerArray[0];
        $correctAns = -1;
        
        shuffle($answerArray);
        
        $i = 1;
        foreach($answerArray as $choice){
            if($choice == $correctAnsString){
                $correctAns = $i;
            }
            $retVal["answerChoices"] .= $mysqli_gamedb->escape_string($choice)."|";
            $i++;
        }
        $retVal["answerChoices"] = rtrim($retVal["answerChoices"],'|');
        
        $retVal["answer"] = $correctAns;
        
        $mysqli_gamedb->close();
        return $retVal;
	}
?>