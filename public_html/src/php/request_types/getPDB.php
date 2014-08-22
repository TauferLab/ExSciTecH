<?php
    
	//request_structure
	$request_structures["getPDB"] = array();
	$request_structures["getPDB"]["request_type"] = "";
	$request_structures["getPDB"]["compoundName"] = "";
	
	function handle_getPDB_request($request_object){
		$response_object = array();
		
		$compoundName = $request_object["compoundName"];

		$ID = getMolID($compoundName);

		if($ID > 0) {
    	    
    	    $SDF = getSDF($ID);
    	    
    	    if( isset($SDF) ) {
    	        header("Content-Type:chemical/x-mdl-sdfile");
    	        echo $SDF;
    	        die();       	    
    	    }
		}
		
    	$response_object['success'] = "false";
		
		return $response_object;
	}
	
	function getSDF($ID){
    	$mysqli_gamedb = connectToMysql();
    	
    	$query = "SELECT `sdfFile`, `unavailable` FROM `molecules` WHERE `id` = ?";
    	$stmt = $mysqli_gamedb->prepare( $query );
    	$stmt->bind_param("i", $ID);
		$stmt->execute();
		$stmt->store_result();
		$stmt->bind_result($sdfFile,$unavailable);
    	
    	if($stmt->num_rows > 0){
        	
        	$stmt->fetch();
        	
        	//echo $stmt->error;
    	
        	if( $unavailable == "1" ){
        	    $mysqli_gamedb->close();
            	return -1;
        	}
            
        	$sdfFile = str_replace("/var/www/ExSciTecH/public_html/", "", $sdfFile);
            //$sdfFile = str_replace("/var/www/ExSciTecH/public_html/", "../", $sdfFile);

        	if(file_exists($sdfFile)){
        	    $mysqli_gamedb->close();
                return file_get_contents($sdfFile);	
        	}
    	    else{
    	        $mysqli_gamedb->close();
        	    return -2;
    	    }
        }
	}
?>