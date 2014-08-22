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
	<link rel="stylesheet" type="text/css" href="./src/css/TeacherDashboard.css" />
  
</head>

<body>

    <?php printHeader(""); ?>
    <div class="container">
        <div id="loadingContainer" class="well well-sm row">
            <h1>Loading...</h1>
        </div>
        <div id="contents" class="well well-sm row">
            <div class="col-md-4" id="questionSetListWrapper">
                <h4>My Question Sets <h5><a href="./questionSetEditor.php">Create New Question Set</a></h5></h4>
                <div id="questionSetList"></div>
            </div>
            <div class="col-md-8">
                <div>
                    <h3 id="statTitle">Statistics</h3>
                    <div class="panel panel-default questionSet">
                        <div class="panel-body">
                            <div id="chartsContainer">
                                <ul class="nav nav-tabs" style="margin-bottom: 15px;">
                                    <li id="genTab" class="active"><a data-toggle="tab">General</a></li>
                                    <li id="guessTab"><a data-toggle="tab">First Guess</a></li>
                                    <li id="scoreTab"><a data-toggle="tab">Score Distribution</a></li>
                                </ul>
                                <div id="generalStats" class="outputFrame">
                                </div>
                                <div id="guessChart" class="outputFrame"></div>
                                <div id="scoreChart" class="outputFrame"></div>
                            
                            </div>
                            
                            <div id="loadingIcon" class="outputFrame">
                                Loading...
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
    
    <?php printFooter();?>
    
    <!-- Google Charts libraries-->
    <script type="text/javascript" src="https://www.google.com/jsapi"></script>
    <script type="text/javascript">
        google.load("visualization", "1", {packages:["corechart"]});
    </script>
    
    <!-- Our JS -->
    <script type="text/javascript" src="../src/js/cookies.js"></script>
    <script type="text/javascript" src="./src/js/TeacherDashboard.js"></script>

</body>
</html>