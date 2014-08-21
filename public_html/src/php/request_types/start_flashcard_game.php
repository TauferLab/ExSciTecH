<?php
    
	//request_structure
	$request_structures["start_flashcard_game"] = array();
	$request_structures["start_flashcard_game"]["request_type"] = "";
	$request_structures["start_flashcard_game"]["authenticator"] = "";
	$request_structures["start_flashcard_game"]["game_id"] = "";
	
	function handle_start_flashcard_game_request($request_object){
		$mysqli_gamedb = connectToMysql();
		$response_object = array();

		$response_object['questions'] = Array();
		$response_object['question_ID'] = Array();

		$result = $mysqli_gamedb->query("Select * from questions where game_id=".$request_object["game_id"].";");
		
		while($row = $result->fetch_array()){
			$answers = explode("|", $row["answers"]);
			array_push($response_object['questions'], build_question("Question Text",$answers,$row["pdb_file"]));
			array_push($response_object['question_ID'], $row["answer"]);
			
		}

		$response_object['success'] = true;
		
		$mysqli_gamedb->close();
		return $response_object;
	}
	
?>