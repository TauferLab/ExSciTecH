<?php
    /* Config */
    require_once("../src/php/config.inc");
    
    $mysqli_gamedb = new mysqli($MYSQL_SERVER,$MYSQL_USER,$MYSQL_PASSWORD,$MYSQL_DB);
    
    $query = "SELECT name FROM `molecules` WHERE `unavailable` = 0 ORDER BY `molecules`.`hits` DESC LIMIT 5";
    
    $result = $mysqli_gamedb->query($query);
    
    $top = array();
    
    while( $row = $result->fetch_array() ){
        $top[] = $row["name"];
    }
    
    echo json_encode($top);
        	
?>
