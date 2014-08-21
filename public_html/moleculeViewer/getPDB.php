<?php

    /* Config */
    require_once("../src/php/config.inc");
    
    $mysqli_gamedb = new mysqli($MYSQL_SERVER,$MYSQL_USER,$MYSQL_PASSWORD,$MYSQL_DB);   
	
	function main(){
	    $response_object = array();

    	if(isset($_GET["mName"])){
    	        	    
            $SDF = getSDF($_GET["mName"]);
            
            if( isset($SDF) ){
            
                increaseHitCount($_GET["mName"]);
            
                header("Content-Type:chemical/x-mdl-sdfile");
                echo $SDF;
                die();        	    
            }
    	}
			
    	$response_object['success'] = false;
		
		echo json_encode( $response_object );
	}
	
	function getSDF($molName){
	    global $mysqli_gamedb;
	    global $SDF_DIR;
	    	    
	    $molName = $mysqli_gamedb->escape_string($molName);
	    
    	$query = "SELECT `sdfFile` FROM `molecules` WHERE `name` = \"". $molName ."\"";
    	
    	$result = $mysqli_gamedb->query($query);
    	
    	if( $result->num_rows > 0 ){
        	$row = $result->fetch_array();
        	
        	if( $row[0] == "" ){
            	return;
        	}
        	
		$row[0] = str_replace("/var/www/ExSciTecH/public_html", "..", $row[0]);

        	if( file_exists($row[0]) ){
                	return file_get_contents($row[0]);	
        	}
    	    else{
        	    return;
    	    }
    	}
    	else{
    	
    	    $basename = uniqid();
    	
    	    $sdfFilename = $SDF_DIR.$basename.".sdf"; 
    	    $pngFilename = $PNG_DIR.$basename.".png";
	
    	
            $sdfURL = "http://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/". rawurlencode($molName) ."/SDF?record_type=3d";
            $pngURL = "http://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/". rawurlencode($molName) ."/PNG";
	    error_log($sdfURL);
	    error_log($pngURL);
            file_put_contents($pngFilename, fopen($pngURL, 'r'));
	    
            if( 
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
                
                    return file_get_contents($sdfFilename);//$mysqli_gamedb->insert_id;
                }
                else{
                    
                    return;
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
                    return;
                }
            }
    	}
	}
	
	function increaseHitCount($molName){
    	global $mysqli_gamedb;
	    	    
	    $molName = $mysqli_gamedb->escape_string($molName);
	    
	    $query = "UPDATE `molecules`
	              SET hits = hits + 1
	              WHERE name = '".$molName."'";
	    
	    if( $mysqli_gamedb->query($query) ){
    	    return;
        } 
	}

	main();
?>
