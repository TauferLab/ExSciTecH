<?php
    require_once("../src/php/template.php");
    require_once("../BOINC/main.inc");
    
    $CALLING_PREFIX = "../";

    if( !isset($_COOKIE["auth"]) ){
        header("Location: https://exscitech.org");
    }
?>

<html>
<head>
    
    <title> ExSciTecH - Question Set Editor</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Bootstrap -->

    <link href="../bootstrap/css/cerulean.min.css" rel="stylesheet" media="screen">
    
    <link href="../src/css/custom.css" rel="stylesheet" media="screen">
    
    <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
        <script src="../../assets/js/html5shiv.js"></script>
        <script src="../../assets/js/respond.min.js"></script>
    <![endif]-->

    <link rel="stylesheet" href="https://code.jquery.com/ui/1.10.3/themes/smoothness/jquery-ui.css" />
	<link rel="stylesheet" type="text/css" href="src/css/MoleculeSearch.css" />
	<link rel="stylesheet" type="text/css" href="src/css/questionEditor.css" />

    
    <!-- jQuery -->
    <!--<script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>-->
    <!-- <script src="https://code.jquery.com/ui/1.10.3/jquery-ui.js"></script> -->

    <!-- GLmol -->
  	<script type="text/javascript" src="./src/js/libs/Three49custom.js"></script>
	<script type="text/javascript" src="./src/js/libs/GLmol.js"></script>


    <!-- Our JS -->
    <script type="text/javascript" src="./src/js/Communication_Manager.js"></script>
    <script type="text/javascript" src="../src/js/cookies.js"></script>
    <script type="text/javascript" src="./src/js/questionSetEditor/QuestionPage.js"></script>
    <script type="text/javascript" src="./src/js/questionSetEditor/QuestionSetEditor.js"></script>
	<script type="text/javascript" src="./src/js/questionSetEditor/MoleculeSearch.js"></script>

  <!-- <script src="http://code.jquery.com/jquery-1.9.1.js"></script> -->

  
</head>

<body onload="init()">

    <?php printHeader(); ?>
    <div class="container">
        <div id="contents"></div>
    </div>
    
    <?php printFooter();?>


	<script type="text/javascript">
	    function init(){
    	    QuestionSetEditor.instace = new QuestionSetEditor( "#contents" );
	    }
	</script>
</body>
</html>