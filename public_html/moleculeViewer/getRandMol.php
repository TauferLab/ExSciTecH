<?php

    require_once("../src/php/config.inc");

    $mysqli_gamedb = new mysqli($MYSQL_SERVER,$MYSQL_USER,$MYSQL_PASSWORD,$MYSQL_DB);

    $query = "SELECT MAX(id) FROM `molecules`";
    
    $result = $mysqli_gamedb->query($query);
    
    $count = 0;
    
    if( $result->num_rows > 0 ){
       	$row = $result->fetch_array();
       	
       	$unavailable = 1;
       	$max = $row[0];
       	
       	while($unavailable==1 && $count < 4){
            $ID = rand( 1, $max);
       	
           	$query = "select name, unavailable FROM `molecules` WHERE id = ".$ID;
        
           	$result = $mysqli_gamedb->query($query);
           	if( $result->num_rows > 0 ){
               	$row = $result->fetch_array();
               	
               	$unavailable = $row["unavailable"];
               	
               	if( $unavailable == 0){
                   	die( $row["name"] );
               	}
            } 
            $count = $count + 1;  	
       	}
       	
       	echo "methanol";   	
    }

?>
