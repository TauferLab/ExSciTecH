<?php
	// The mysql connection is global just to make things easier
	$mysqli_gamedb = connect_to_mysql();

	// If there is an error connecting to the mysql database return an error
	if ($mysqli_gamedb->connect_errno) {
		$response_object = return_error("Failed to connect to MySQL: (" . $mysqli_gamedb->connect_errno . ") " . $mysqli_gamedb->connect_error);
	}
	
	function connect_to_mysql(){
		global $MYSQL_SERVER;
		global $MYSQL_USER;
		global $MYSQL_PASSWORD;
		global $MYSQL_DB;

		$mysqli = new mysqli($MYSQL_SERVER, $MYSQL_USER, $MYSQL_PASSWORD, $MYSQL_DB);
		return $mysqli;
	}
	
?>