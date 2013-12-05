<?php

	$request_structures["submit_flashcard_answer"] = array();
	$request_structures["submit_flashcard_answer"]["request_type"] = "";
	$request_structures["submit_flashcard_answer"]["game_session_id"] = "";
	$request_structures["submit_flashcard_answer"]["authenticator"] = "";
	$request_structures["submit_flashcard_answer"]["question_id"] = "";
	$request_structures["submit_flashcard_answer"]["answer"] = "";
	$request_structures["submit_flashcard_answer"]["game_time"] = "";
	
	function handle_submit_flashcard_answer_request($request_object){
		global $mysqli_gamedb;
		$response = Array();
		
		//get user id
		$user = get_user($request_object["authenticator"]);
		$user_id = $user->id;
		
		$mapped_q_id = $mysqli_gamedb->real_escape_string($request_object["question_id"]);
		$game_session_id = $mysqli_gamedb->real_escape_string($request_object["game_session_id"]);
		$original_q_id = get_original_q_id($game_session_id,$mapped_q_id);
		$answer = $mysqli_gamedb->real_escape_string($request_object["answer"]);
		$time = $mysqli_gamedb->real_escape_string($request_object["game_time"]);
		
		//check to see if it's correct
		if( is_answer_correct($original_q_id,$answer,$game_session_id) ){
			$response['correct'] = "true";
		}
		else{
			$response['correct'] = "false";
		}
		
		//insert the new answer
		insert_answer($game_session_id,$mapped_q_id,$original_q_id,$answer,$time,$response['correct']);
		
		//calculate the score
		$response['score'] = calculate_score($request_object["game_session_id"]);
		$response['ansID'] = $answer;
		
		$response['success'] = "true";
		return $response;
	}

	function is_answer_correct($question_id,$answer,$session_id){
		global $mysqli_gamedb;
		$query = "SELECT answer FROM questions WHERE question_id=".$question_id." AND game_id = (SELECT game_id FROM game_sessions WHERE session_id='".$session_id."')";
		$result = $mysqli_gamedb->query($query);
		
		$row = $result->fetch_array();
		
		if($row){
			if( ($row[0]-1) == $answer){
				return true;
			}
			else{
				return false;
			}
		}
		
		return false;
	}
	
	function calculate_score($game_session_id){
		global $mysqli_gamedb;
		$query = "SELECT correct,COUNT(*) FROM `answers` WHERE `game_session_id` = '".$game_session_id."' GROUP BY correct";
		
		//var_dump($query);
		
		$result = $mysqli_gamedb->query($query);
		
		$score = 0;
		
		while($row = $result->fetch_array()){
			if($row[0]=="0")
				$score = $row[1]*(-350);
			else
				$score = $score + $row[1]*(1000);
		}
		
		return $score;
	}
	
	function insert_answer($session_id,$mapped_q_id,$original_q_id,$answer,$game_time,$correct){
		global $mysqli_gamedb;
		
		if($correct =="true")
			$correct = 1;
		else
			$correct = 0;
		
		$query = "INSERT INTO `answers` (
						`game_session_id`,
						`game_id`,
						`mapped_q_id`,
						`original_q_id`,
						`answer`,
						`time`,
						`correct`)
				VALUES (
				'".$session_id."',
				(SELECT game_id from game_sessions where session_id='".$session_id."'),
				'".$mapped_q_id."',
				'".$original_q_id."',
				'".$answer."',
				'".$game_time."',
				'".$correct."');";
				
		$mysqli_gamedb->query($query);
	}
	
	
	function get_original_q_id($game_session_id,$mapped_q_id){
		global $mysqli_gamedb;
		$query = "SELECT original_q_id from question_id_map WHERE session_id = '".$game_session_id."' AND mapped_q_id='".$mapped_q_id."'"; 
		$result = $mysqli_gamedb->query($query);
		
		$row = $result->fetch_array();
		if($row){
			return $row[0];
		}
	}
	