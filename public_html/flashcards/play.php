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
	<link href="./src/css/play.css" type="text/css" rel="stylesheet"></link>
	
	<!-- Libraries -->
	<script type="text/javascript" src="./src/js/libs/md5-min.js" language="javascript"></script>
	<script type="text/javascript" src="./src/js/libs/Three49custom.js"></script>
	<script type="text/javascript" src="./src/js/libs/GLmol.js"></script>
	
	<!-- Our Stuff -->
	<script type="text/javascript" src="./src/js/Communication_Manager.js" language="javascript"></script>
	<script type="text/javascript" src="./src/js/play.js"></script>
	<script type="text/javascript" src="./src/js/LoadingScreen.js"></script>
	<script type="text/javascript" src="./src/js/GameScreen.js"></script>
	<script type="text/javascript" src="./src/js/EndScreen.js"></script>
	<script type="text/javascript" src="./src/js/Timer.js"></script>
	<script type="text/javascript" src="./src/js/StatManager.js"></script>
    <script type="text/javascript" src="src/js/cookies.js"></script>

</head>
	<body onload="init();">
        <?php printNavBar(); ?>
		
		<div class="container" id="contentWrapper">
			<div id="gameWrapper" class="well well-sm">
				<div id="startUI">
                    <div class="row">
                        <div class="col-md-2">
                            <button id="backBtn" onClick="window.location = './'" class="btn btn-success">
                                <span class="glyphicon glyphicon-chevron-left"></span> Back
                            </button>
                        </div>
                        <h1 id="qSetTitle" class="col-md-8">                        
                            <span  id="qSetTitleVal"></span>
                        </h1>

                    </div>
                    <div class="row">
                        <div id="qSetInfoWrapper" class="col-md-8" style="font-size: 1.5em">
                            <div class="qSetImgWrapper">
                                <img id="qSetImage">
                            </div> 
                            <p id="qSetInfo">
                                <label for="infoNum" class="control-label">Questions:</label>
                                <span id="infoNum"></span><br>
                                <label for="infoTime" class="control-label">Time Limit:</label>
                                <span id="infoTime"></span><br>
                                <label for="infoDesc" class=" control-label">Description:</label>
                                <span id="infoDesc"></span> 
                            </p>
                            <div id="loadingContainer">
                                <div class="progress progress-striped active">
                                    <div class="progress-bar progress-bar-info" style="width: 0%;"></div>
                                </div>
                                <p style="text-align: center">Loading...</p>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div id="hsWrapper">
                                <h2>High Scores</h2>
                                <div class="table-responsive" style="background: white">
                                    <table class="table table-striped table-bordered table-hover">
                                        <tbody id="highScores"></tbody>
                                    </table>
                                </div>                  
                            </div>
                        </div>
                    </div>
                    <!--
                    <div class="row">
                        <div class="col-md-8 col-md-offset-2" id="loadingContainer">
                            <div class="progress progress-striped active">
                                <div class="progress-bar progress-bar-info" style="width: 0%;"></div>
                            </div>
                            <p style="text-align: center">Loading...</p>
                        </div>
                    </div>
                    -->
				</div>
				<div id="gameUI">
				    <div class="row">
                        <div class="col-md-8">
                            <div id="GLMolFrame"></div>
                        </div>
                        <div class="col-md-4">
                            <div id= "scoreInfoWinWrapper">
                                <div class="panel panel-default gameInfoWin" id="scoreInfoWin">
                                  <div class="panel-body">
                                    <h2>Time Left<span class="infoWinVal" id="timeVal">00:00</span></h2>
                                    <h2>Score<span class="infoWinVal" id="scoreVal">0</span></h2>
                                  </div>
                                </div>
                            
                                <h2 id="scoreDiff">+1,000</h2>
                            </div>
                            <div id="answerBtns">
                            </div>
                        </div>
				    </div>
				    <div id="qTextInfoWinWrapper">
    				    <div class="panel panel-default gameInfoWin" id="qTextInfoWin">
                            <div class="panel-body">
                                <h3 id="qText">What would happen if we had a really long question!? What would happen if we had a really long question!?</h3>
                            </div>
    				    </div>
				    </div>
				</div>
				<div id="endUI">
                    <div class="row" style="min-height: 500px;">
                        <div class="col-md-6">
                            <h1>Rank: <span id="rankVal">#1</span></h1>
                            <h1>Final Score: <span id="finalScoreVal">8,000</span></h1>
                        </div>
                        <div class="col-md-6">
                            <h2 style="text-align: center; color: rgb(85, 85, 85)">Statistics</h2>
                            <div class="table-responsive" style="background:white; min-height:">
                                <table class="table table-striped table-bordered table-hover">
                                    <thead><tr><th>#</th><th>Time</th><th>Attempts</th><th>Score</th></tr></thead>
                                    <tbody id="qStats"></tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div  class="row">
                        <div class="col-md-6  col-md-offset-3">
                            <button class="btn btn-primary btn-lg btn-block playAgainBtn" onclick="window.location = './' ">Play a different question set</button><br>
           				    <button class="btn btn-primary btn-lg btn-block playAgainBtn" onclick="window.location.reload() ">Play again!</button>
                        </div>
                    </div>
				</div>
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
        <script type="text/javascript" src="/src/js/cookies.js" language="javascript"></script>
        <script type="text/javascript" src="/src/js/LoginForm.js" language="javascript"></script>
	</body>
</html>