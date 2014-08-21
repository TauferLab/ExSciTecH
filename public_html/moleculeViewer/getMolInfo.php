<?php

    require_once("simple_html_dom.php");

	header('Content-type: application/json');

	if(isset($_GET['molName'])){
		$molName = urlencode( $_GET['molName'] );
	
        $URL = "http://en.wikipedia.org/w/api.php?action=parse&page=$molName&redirects&format=json&prop=text";
	
		$out = file_get_contents( $URL );
	
        $wikiObj = json_decode($out,true);
        
        $printing = false;
	
        if( array_key_exists ( 'parse' , $wikiObj ) ){	
            $htmlStr = $wikiObj['parse']['text']['*'];
            $html = str_get_html($htmlStr);
            
            //var_dump(str_get_html($htmlStr));
            
            if($html){
            
                $rows = $html->find('.infobox', 0);
                //$rows = array();
                
                if( count($rows) > 0 ){
                    $rows = $rows->find('tr');
                    
                    $molProp = "<table class='molPropTable'>";
                
                    foreach($rows as $row){
                    
                        if( strpos($row->children(0)->plaintext, "Chemical data") === 0 ||
                            strpos($row->children(0)->plaintext, "Properties") === 0 
                         ){
                            $printing = true;
                            continue;
                        }
                    
                        if($printing){
                            if( $row->children(0)->colspan > 0 ){
                                $printing = false;
                                continue;    
                            }
                            
                            $tmp = preg_replace('/<a[^>]*>/', '', $row->outertext);
                            
                            
                            $molProp.= preg_replace('/(\[\])/','', $tmp);
                        }
                    }
                    
                    $molProp .= "</table>";
                    
                }
                else{
                    $molProp = "<p class='molPropText'>Properties Unavailable</p>";
                }
                
                //FIX THIS !!!!!!!
                //$molDesc = $html;//->find('p',0)->innertext;
                
                $pattern = '#<p>(.*)</p>#Us';
                if(preg_match($pattern, $htmlStr, $matches)){
                    $molDesc = strip_tags($matches[1]);
                    $molName = $_GET['molName'];
                }
                
                $molCit = "<p class='citation'>Text from Wikipedia article: <a href='http://en.wikipedia.org/wiki/$molName'>$molName</a>. Molecule data from <a href='https://pubchem.ncbi.nlm.nih.gov/'>PubChem</a>.</p>";
            }
            else{            
                $pattern = '#<p>(.*)</p>#Us';
                if(preg_match($pattern, $htmlStr, $matches)){
                    $molDesc = strip_tags($matches[1]);
                    $molName = $_GET['molName'];
                    $molCit = "<p class='citation'>Text from Wikipedia article: <a href='http://en.wikipedia.org/wiki/$molName'>$molName</a>. Molecule data from <a href='https://pubchem.ncbi.nlm.nih.gov/'>PubChem</a>.</p>";
                }
                else{
                    $molDesc = "<p class='molPropText'>Description Unavailable</p>";
                }
                $molProp = "<p class='molPropText'>Properties Unavailable</p>";
            }
		}
		else{
            $molProp = "<p class='molPropText'>Properties Unavailable</p>";
            $molDesc = "<p class='molPropText'>Description Unavailable</p>";
        }
	
	}
	else{
        $molProp = "<p class='molPropText'>Properties Unavailable</p>";
        $molDesc = "<p class='molPropText'>Description Unavailable</p>";
	}
	
	if(!isset($molCit)){
    	$molCit = "<p class='citation'>Molecule data from <a href='https://pubchem.ncbi.nlm.nih.gov/'>PubChem</a>.</p>";
	}
	
    $output = array();
    $output["prop"] = $molProp;
    $output["desc"] = $molDesc;
    $output["citation"] = $molCit;
	echo json_encode($output);

    
	

?>
