<?php
	require_once("../src/php/config.inc");
	require_once("../src/php/database.inc");
	require_once("../BOINC/main.inc");
	$CALLING_PREFIX = "../";
	
    $user = get_user($_COOKIE['auth']);
	if( !isAdmin( $user->name ) ){
    	header("Location: /");
    	die();
	}
	
	if( isset($_GET["ID"]) && isset($_GET["action"]) ){
		if($_GET["action"] == "approve"){
			$mysqli_gamedb = connectToMysql();
	
			$qSetID = $mysqli_gamedb->real_escape_string( $_GET["ID"] );
	
			$query = "UPDATE `exscitech_web`.`questionSet` SET `underReview` = '0', `approved` = '1' WHERE `questionSet`.`id` = $qSetID;";
			
			$mysqli_gamedb->query($query);
		
			header("location: ./index.php");
			
		}
		else{
			echo "Unsupported Action: ".$GET["action"]."<br>";
		}
	}
	else{
		echo "Invalid Input";
	}

?>