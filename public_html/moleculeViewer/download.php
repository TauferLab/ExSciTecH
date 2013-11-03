<?php
    $stringArray = array();
    $stringArray[] = "rand";
    
    $count = 0;
    
    while( count($stringArray) > 0 ){
    
        $URL = "http://pubchem.ncbi.nlm.nih.gov/pcautocp/pcautocp.cgi?callback=rem_ove&dict=pc_compoundnames&n=10&q=".$stringArray[0]."&_=".round(microtime(true) * 1000);
    
        $output = file_get_contents( $URL );
        
        //$output = 'rem_ove({"total": 10, "autocp_array": ["indomethacin", "pyrimethamine", "dexamethasone", "bumetanide", "methanol", "methimazole", "sulfamethazine", "methazolamide", "acemetacin", "sulfameter"]});';

        
        $output = json_decode( str_replace(");", "",str_replace("rem_ove(", "", $output) ) , true);
        $output = $output["autocp_array"];
    
        foreach($output as $molName){
            $URL = "http://samschlachter.com/moleculeViewer/getPDB.php?mName=".rawurlencode($molName);
            
            if( !file_get_contents($URL) ){
                die("File didn't download?");
            }
            
            $count = $count + 1;
            
            if($count % 25 == 0){
                echo "$count Molecules \n";
            }
            if($count > 1000){
                die("Over 1000!");
            }
        }
        
        
        
        $start = rand( 0, strlen($molName) - 1 );
        $range = rand( 1, strlen($molName) - $start );
        
        //echo substr($molName,$start,$range)."\n";
        
        $stringArray[] = substr($molName,$start,$range);
    
        array_splice($stringArray, 0, 1);
        
    }
    
    
    
    

?>