<?php
	$request_structures["getTeachersQuestionSetInfo"] = array();
	$request_structures["getTeachersQuestionSetInfo"]["auth"] = "";
	$request_structures["getTeachersQuestionSetInfo"]["questionSetID"] = "";
		
	function handle_getTeachersQuestionSetInfo_request($request_object){
	    $response_object = array();
	    
	    $mysqli_gamedb = connectToMysql();
	    
	    $user = get_user( $request_object["auth"] );
	    
	    $response_object["questions"] = array();
	    
        $qSetID = $mysqli_gamedb->real_escape_string( $request_object["questionSetID"] );

        $query = "SELECT * FROM `questions` WHERE game_id = $qSetID ORDER BY question_id";
        
        //echo $query;

        $result = $mysqli_gamedb->query($query);
	    
	    while($obj = $result->fetch_object() ) {
            $response_object["questions"][] = getQuestion($obj);
        }
	    		
	    $response_object["scores"] = getScores( $request_object["questionSetID"] );
	    
	    $response_object["reviewStatus"] = getReviewStatus($qSetID);
	    		
		$response_object["success"] = "true";
		return $response_object;
    }
    
    function getQuestion($obj){
        $newQuestion = array();

        $newQuestion["id"] = $obj->question_id;
        $newQuestion["text"] = $obj->text;
        $newQuestion["molID"] = $obj->molID;
        $newQuestion["answerChoices"] = explode("|", $obj->answers);
        $newQuestion["answer"] = $obj->answer;
        $newQuestion["responses"] = getResponses($obj->game_id, $obj->question_id);
        
        return $newQuestion;
    }
    
    function getResponses($qSetID, $qID){
    
        $responses = array();
    
        $mysqli_gamedb = connectToMysql();
        $query = "SELECT game_session_id,correct,answer,time FROM `answers` WHERE `original_q_id` = $qID AND `game_id` = $qSetID";
        
        $result = $mysqli_gamedb->query($query);
    
        while($obj = $result->fetch_object() ) {

            if( !isset( $responses[ ($obj->game_session_id) ] ) ){
                $responses[ ($obj->game_session_id) ] = array();
            }

            $responses[ ($obj->game_session_id) ][] = $obj;

        }
        
        $mysqli_gamedb->close();
        
        return $responses;
    }

    function getScores($qSetID){
        $scores = array();
    
        $mysqli_gamedb = connectToMysql();
        $query = "SELECT * FROM scores WHERE game_id = $qSetID ORDER BY score DESC";
        $result = $mysqli_gamedb->query($query);
    
        while($obj = $result->fetch_object() ) {
            $scores[] = $obj;
        }
        
        $mysqli_gamedb->close();
        return $scores;
    }
    
    function getReviewStatus($qSetID){
	    $mysqli_gamedb = connectToMysql();
        $query = "SELECT * FROM questionSet WHERE id = $qSetID";
        $result = $mysqli_gamedb->query($query);
		
        if($result){
        	while($obj = $result->fetch_object() ) {
        		//var_dump($obj);
        	
        		if( $obj->approved == 1){
        			$mysqli_gamedb->close();
	        		return "approved";
				}
        		else if( $obj->underReview == "1"){
					$mysqli_gamedb->close();
					return "underReview";
        		}
        		else{
        			$mysqli_gamedb->close();
	        		return "unsubmitted";
        		}
			}
        }
    }
?>