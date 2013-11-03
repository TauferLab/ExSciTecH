<?php
	require_once("/var/www/html/src/php/template.php");
?>



<html>
<head>
	<title> ExSciTecH - Molecule Flashcards </title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Bootstrap -->

    <link href="/bootstrap/css/cerulean.min.css" rel="stylesheet" media="screen">
    
    <link href="/src/css/custom.css" rel="stylesheet" media="screen">
    
    <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
        <script src="../../assets/js/html5shiv.js"></script>
        <script src="../../assets/js/respond.min.js"></script>
    <![endif]-->
	
	<!-- Libraries -->
	<script type="text/javascript" src="./src/js/libs/md5-min.js" language="javascript"></script>
	<script type="text/javascript" src="./src/js/libs/jquery-1.8.0.min.js"></script>
	<script type="text/javascript" src="./src/js/libs/jquery-ui-1.8.22.custom.min.js" language="javascript"></script>
	<script type="text/javascript" src="./src/js/libs/Three49custom.js"></script>
	<script type="text/javascript" src="./src/js/libs/GLmol.js"></script>
	
	<!-- Our Stuff -->
	<script type="text/javascript" src="./src/js/Communication_Manager.js" language="javascript"></script>
	<script type="text/javascript" src="./src/js/flashcards/flashcards.js"></script>
    <script type="text/javascript" src="src/js/cookies.js"></script>

	<!-- <link media="all" href="./src/css/common.css" type="text/css" rel="stylesheet"></link>-->
	<link media="all" href="./src/css/flashcards/flashcards.css" type="text/css" rel="stylesheet"></link>
	

</head>
	<body onload="init();">

        <?php printNavBar(); ?>

        <div class="container">
			
				<div id="login_wrapper">
					<h1 id="welcome_message">Welcome to Molecule Flashcards!</h1>
					<div id="demo_molecule"></div>
					<div id="login_frame">
						<div id="login_area">
							<h1 id="login_header">Login!</h1>
							<form action="login.php" onSubmit="return login();">
								<div>Email:		</div> <input class='login_input' id="email" type="text" required="required"\>
								<div>Password:	</div> <input class='login_input' id="password" type="password" required="required"\>
								<div id="login_error">placeholder</div>
								<input id="login_button" class="login_frame_button" type="submit" name="doLogin" value="Login!" />
								<div class="login_option">Not a member? <a onclick="display_reg_area();">Create an account</a></div>
							</form>
						</div>
						<div id="reg_area">
							<h1 id="reg_header">Register!</h1>
							<form action="register.php" onSubmit="return register();">
								<div>Username:			</div> <input class='register_input' id="username" type="text">
								<div>Email:				</div> <input class='register_input' id="email" type="text">
								<div>Password:			</div> <input class='register_input' id="password_1" type="password">
								<div>Repeat password:	</div> <input class='register_input' id="password_2" type="password">
								<div id="reg_error">placeholder</div>
								<input id="reg_button" class="login_frame_button" type="submit" name="doLogin" value="Register!" />
								<div class='login_option'>Have an account? <a onclick="display_login_area();">Login</a></div>
							</form>
						</div>
					</div>
				</div>
				<div id="tile_wrapper">
					<h1 id="tile_header">Select a Topic:</h1>
					<div id="tile_pages"></div>
					<button class="login_frame_button" id="tile_prev_page" onclick="go_to_tile_screen(curr_tile_page-1)">
						<img id="arrow" src="./media/images/back.png"/>Previous Page
					</button>
					<button class="login_frame_button" id="tile_next_page" onclick="go_to_tile_screen(curr_tile_page+1)">
						More Games<img id="arrow" src="./media/images/back.png"/>
					</button>
				</div>
				<div id="game_wrapper">
					<div id="start_ui">
						<table id="layout">
							<tr>
								<td><button onClick="exit_game()" class="back_button"><img id="back_arrow" src="./media/images/back.png"/><div id="text">Back</div></button></td>
								<td></td>
							</tr>
							<tr><td id="game_title" colspan="2"></td></tr>
							<tr>
								<td style="width:60%; height:350px; vertical-align: top;">
									<div id="num_questions"><b>Molecules: </b><span id="val"></span></div>
									<div id="start_time"><b>Time Limit: </b><span id="val"></div>
									<div id="description"><b>Description: </b><span id="val"></div>	
								</td>
								<td style="width:30%; vertical-align: top;">
									<table id="global_high">
										<tr><td colspan="3" style="text-align:center;"><h1>High Scores</h1></td></tr>
									</table>
								</td>
							</tr>
							<tr><td colspan="2">
								<button id="start_button" onclick="start_game()" >Start</button>
								<div id="loading_bar_wrapper">
									<div id="loading_bar"><div id="loading_progress"></div></div>
									<div id="loading_text">Loading... 30%</div>
								</div>
							</td></tr>
						</table>
					</div>
					<div id="game_ui">
						<div style="height:100px">
							<h1 id="score">Score<br><span id="val">0</span></h1>
							<h1 id="augment_score" class="correct"><br><span id="val">+1000</span></h1>
							<h1 id="time">Time<br><span id="time_val"></span></h1>
						</div>
						<div id="molecule_frame"></div>
						<div id="answers_frame"></div>
						<h1 id="progress">Molecule<br/><span id="q_num">1</span>/<span id="q_total">10</span></h1>
					</div>
					<div id="end_ui">
						<div id="end_left">
							<div id="percent_correct">
								<span id="val">90%</span><br>
								<span id="message">Good Job!</span>
							</div>
							<table id="final_score">
								<tr id="base"><td>Score:</td><td id="val"></td></tr> 
								<tr id="time_left"><td>Remaining Time:</td><td id="val"></td></tr> 
								<tr id="bonus"><td>Bonus Points:</td><td id="val"></td></tr> 
								<tr id="final"><td>Final Score:</td><td id="val"></td></tr> 
								<tr id="rank"><td>Leaderboard Rank:</td><td id="val"></td></tr> 
							</table>
							<div id="play_again_wrapper">
								<br>
								<button id="play_again_button" onclick="exit_game()">Play Again!</button>
							</div>
						</div>
						<div id = "end_right">
							<h1>Question Stats</h1>
							<table id="question_stats">
								<tr><th>Question</th><th>Time</th><th>Tries</th><th>Score</th></tr>
							</table>
						</div>
					</div>
				</div>
			</div>
			<?php printFooter();?>
	</body>
</html>