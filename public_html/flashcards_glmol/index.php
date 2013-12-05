<?php
	require_once("../src/php/template.php");
?>

<html>
<head>
	<title> ExSciTecH - Molecule Flashcards </title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- Bootstrap -->
    <link href="/bootstrap/css/cerulean.min.css" rel="stylesheet" media="screen">        
    <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
    <script src="../../assets/js/html5shiv.js"></script>
    <script src="../../assets/js/respond.min.js"></script>
    <![endif]-->
    
    <!-- Custom CSS-->
    <link href="/src/css/custom.css" rel="stylesheet" media="screen">
	<link href="./src/css/gameSelection.css" type="text/css" rel="stylesheet"></link>
	
	<!-- Libraries -->
	<script type="text/javascript" src="./src/js/libs/md5-min.js" language="javascript"></script>
	<script type="text/javascript" src="./src/js/libs/jquery-1.8.0.min.js"></script>
	<script type="text/javascript" src="./src/js/libs/jquery-ui-1.8.22.custom.min.js" language="javascript"></script>
	<script type="text/javascript" src="./src/js/libs/Three49custom.js"></script>
	<script type="text/javascript" src="./src/js/libs/GLmol.js"></script>
	
	<!-- Our Stuff -->
	<script type="text/javascript" src="./src/js/Communication_Manager.js" language="javascript"></script>
	<!--<script type="text/javascript" src="./src/js/flashcards.js"></script> -->
	<script type="text/javascript" src="./src/js/gameSelection.js"></script>
    <script type="text/javascript" src="src/js/cookies.js"></script>

</head>
	<body onload="init();">
        <?php printNavBar(); ?>
		
		<div class="container" id="contentWrapper">
			<div id="tileWrapper" class="well well-sm">
				<h1 id="tileHeader">Select a Topic:</h1>
				<div id="tileList"></div>
			</div>
        </div>	
			
        <div class="container">
        <hr>
        <footer>
            <p>© University of Delaware 2013 - Global Computing Lab</p>
        </footer>
        
        </div><!--container-->
        
        <!-- jQuery (necessary for Bootstraps JavaScript plugins) -->
        <script src="//code.jquery.com/jquery.js"></script>
        <script src="//code.jquery.com/ui/1.10.3/jquery-ui.js"></script>
        <!-- Include all compiled plugins (below), or include individual files as needed -->
        <script src="/bootstrap/js/bootstrap.min.js"></script>
        
        <!-- Login form -->
        <script type="text/javascript" src="/src/js/md5-min.js" language="javascript"></script>
        <script type="text/javascript" src="/src/js/cookies.js" language="javascript"></script>
        <script type="text/javascript" src="/src/js/LoginForm.js" language="javascript"></script>
	</body>
</html>