<?php
    
	//request_structure
	$request_structures["getPDB"] = array();
	$request_structures["getPDB"]["request_type"] = "";
	$request_structures["getPDB"]["compoundName"] = "";
	
	function handle_getPDB_request($request_object){
		$response_object = array();
		
		$compoundName = $request_object["compoundName"];

		$ID = getMolID($compoundName);

		if($ID > 0){
    	    
    	    $SDF = getSDF($ID);
    	    
    	    if( isset($SDF) ){
    	        header("Content-Type:chemical/x-mdl-sdfile");
    	        echo $SDF;
    	        die();        	    
    	    }

    	   
		}
		
		
    	$response_object['success'] = "false";
		
		return $response_object;
	}
	
	function getSDF($ID){
    	global $mysqli_gamedb;
    	
    	$query = "SELECT `sdfFile`, `unavailable` FROM `molecules` WHERE id = $ID";
    	
    	$result = $mysqli_gamedb->query($query);
    	
    	if( $result && $result->num_rows > 0 ){
        	
        	$row = $result->fetch_array();
    	
        	if( $row[1] == "1" ){
            	return;
        	}
        	
        	if( file_exists($row[0]) ){
                return file_get_contents($row[0]);	
        	}
    	    else{
        	    return;
    	    }
            
        }
	}
?>