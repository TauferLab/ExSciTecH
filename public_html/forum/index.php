<?php
    require_once("../src/php/template.php");
    $CALLING_PREFIX = "../";
    //echo var_dump($_SERVER)."<br>";
    
    if( !isset($_GET['redir']) ){
    	if( loggedIntoSite() ) {
    		if( !loggedIntoForum() ){
    		
    		    //header("Location: https://exscitech.org/forum/?redir=1#/entry/signin");
    		    
    		}
    	}
	}
	
	function loggedIntoForum(){
		if($_COOKIE["Vanilla"] == NULL && $_COOKIE["Vanilla-Volatile"] == NULL){
			return false;
		}
		return true;	
		
	}
	
	function loggedIntoSite(){
    	if($_COOKIE["username"] == NULL || $_COOKIE["auth"] == NULL){
    	    return false;
    	}
    	return true;
	}


?>

<!DOCTYPE html>
<html>
    <head>
        <title>ExSciTecH - Forum</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <!-- Bootstrap -->
        <link href="../bootstrap/css/cerulean.min.css" rel="stylesheet" media="screen">        
        <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
        <!--[if lt IE 9]>
            <script src="../../assets/js/html5shiv.js"></script>
            <script src="../../assets/js/respond.min.js"></script>
        <![endif]-->
        
        
        <!-- Custom CSS-->
        <link href="../src/css/custom.css" rel="stylesheet" media="screen">
        <link href="../src/css/index.css" rel="stylesheet" media="screen">
        
        <script type="text/javascript" src="../src/js/cookies.js"></script>     
    </head>
    
    <body>
    
    <?php printNavBar(); ?>

    <div class="container">
        <script type="text/javascript" src="https://exscitech.org/forum/vanilla/plugins/embedvanilla/remote.js"></script>
    </div>


<?php printFooter();?>

