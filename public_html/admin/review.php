<?php

	require_once("../src/php/config.inc");
	require_once("../src/php/database.inc");
	require_once("../src/php/template.php");
	require_once("../BOINC/main.inc");
	
	$user = get_user($_COOKIE['auth']);
	if( !isAdmin( $user->name ) ){
    	header("Location: /");
    	die();
	}

	$mysqli_gamedb = connectToMysql();
	
	$query = "SELECT * FROM `questionSet` WHERE `underReview` = 1";
	
	$result = $mysqli_gamedb->query($query);
	
	$questionSets = array();
	if($result){
		while($obj = $result->fetch_object() ) {
			$questionSets[] = $obj;
		}
	}
	
	function printQuestionSets($questionSets){
	
		if( count($questionSets)>0 ){	
			foreach($questionSets as $set){
				
				echo "	<div class=\"well\">
							<div class=\"row\">
								<div class=\"col-lg-4\">
									<img src=\"".$set->image."\" >
								</div>
								<div class=\"col-lg-6\">
									<h3><a href=\"https://exscitech.org/flashcards/play.php?ID=".$set->id."\">".$set->name."</a></h3>
								</div>
								<div class=\"col-lg-2\">
									<a href=\"./reviewAction.php?ID=".$set->id."&action=approve\" class=\"btn btn-primary\">Approve</a>
								</div>
							</div>
						</div>";
			}
		}
		else{
			echo "<h2 style='text-align:center;'>No question sets to review</h2>";
		}
	}
?>
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta name="description" content="">
		<meta name="author" content="">
		<link rel="shortcut icon" href="../../docs-assets/ico/favicon.png">
		
		<title>Welcome to ExSciTecH</title>
		
		<!-- Bootstrap core CSS -->
		<!--<link href="./mailingList/cerulean.min.css" rel="stylesheet">
		<link href="./mailingList/custom.css" rel="stylesheet">-->
		
		<link href="/bootstrap/css/cerulean.min.css" rel="stylesheet" media="screen">
		<link href="/src/css/custom.css" rel="stylesheet" media="screen">
		<link href="/src/css/homepage.css" rel="stylesheet">
		
		<!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
		<!--[if lt IE 9]>
			<script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
			<script src="https://oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js"></script>
		<![endif]-->
	</head>
	
	<body>
		<?php printNavBar(); ?>
		
		<div class="container adminPanel">
			<div class="row">
			    <div class="col-lg-2 col-lg-offset-1">
				    <h4>Admin Panel</h4>
				    <ul>
    				    <li><a href="./email.php">Email</a></li>
    				    <li><a href="../forum/index.php#/dashboard/settings">Forum Dashboard</a></li>
    				    <li><a href="./review.php">Review Question Sets</a></li>
				    </ul>
				</div>
				<div class="col-lg-8">
					<?php printQuestionSets($questionSets); ?>
				</div>
			</div>
		</div><!--container-->
	
		<?php printFooter(); ?>
	</body>
</html>