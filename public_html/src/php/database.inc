<?php

	// The mysql connection is global just to make things easier
	$mysqli_gamedb = connectToMysql();

	// If there is an error connecting to the mysql database return an error
	if ($mysqli_gamedb->connect_errno) {
		$response_object = return_error("Failed to connect to MySQL: (" . $mysqli_gamedb->connect_errno . ") " . $mysqli_gamedb->connect_error);
	}
	
	function connectToMysql(){
        $MYSQL_SERVER = "localhost";
        $MYSQL_USER = "exscitech";
        $MYSQL_PASSWORD = "56eLKG3HVyUTA52u";
        $MYSQL_DB = "exscitech_web";
        $MYSQL_BOINC_DB = "exscitech_boinc";

		$mysqli = new mysqli($MYSQL_SERVER, $MYSQL_USER, $MYSQL_PASSWORD, $MYSQL_DB);
		return $mysqli;
	}
	
?>