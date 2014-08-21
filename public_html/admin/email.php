<?php

	require_once("../src/php/config.inc");
	require_once("../src/php/database.inc");
	require_once("../src/php/template.php");
	require_once("../BOINC/main.inc");
	$CALLING_PREFIX = "../";
	
    $user = get_user($_COOKIE['auth']);
	if( !isAdmin( $user->name ) ){
    	header("Location: /");
    	die();
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
		
		<link href="../bootstrap/css/cerulean.min.css" rel="stylesheet" media="screen">
		<link href="../src/css/custom.css" rel="stylesheet" media="screen">
		<link href="../src/css/homepage.css" rel="stylesheet">
		
		<!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
		<!--[if lt IE 9]>
			<script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
			<script src="https://oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js"></script>
		<![endif]-->
	</head>
	
	<body>
		<?php printNavBar(); ?>
		
		<div class="container">
			<div class="row adminPanel">
			    <div class="col-lg-2 col-lg-offset-1">
				    <h4>Admin Panel</h4>
				    <ul>
    				    <li><a href="./email.php">Email</a></li>
    				    <li><a href="../forum/index.php#/dashboard/settings">Forum Dashboard</a></li>
    				    <li><a href="./review.php">Review Question Sets</a></li>
				    </ul>
				</div>
				<div class="col-lg-8">
					<form class="form-horizontal" method="post" action="emailAction.php">
                        <fieldset>
                            <legend>Send Administrative Email</legend>
                            <div class="form-group">
                                <label for="inputEmail" class="col-lg-2 control-label">To: </label>
                                <div class="col-lg-10">
                                    <input type="text" class="form-control" name="toEmailList" placeholder="Emails" mouseev="true" autocomplete="off" keyev="true" clickev="true">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="inputEmail" class="col-lg-2 control-label">CC: </label>
                                <div class="col-lg-10">
                                    <input type="text" class="form-control" name="ccEmailList" placeholder="Emails" mouseev="true" autocomplete="off" keyev="true" clickev="true">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="inputEmail" class="col-lg-2 control-label">BCC: </label>
                                <div class="col-lg-10">
                                    <input type="text" class="form-control" name="bccEmailList" placeholder="Emails" mouseev="true" autocomplete="off" keyev="true" clickev="true">
                                    <span class="help-block">Separate emails with commas.</span>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="inputEmail" class="col-lg-2 control-label">Subject  </label>
                                <div class="col-lg-10">
                                    <input type="text" class="form-control" name="subject" placeholder="Subject" mouseev="true" autocomplete="off" keyev="true" clickev="true">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="textArea" class="col-lg-2 control-label">Message</label>
                                <div class="col-lg-10">
                                    <textarea class="form-control" rows="3" name="message"></textarea>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-lg-10 col-lg-offset-2">
                                    <button type="submit" class="btn btn-primary">Send</button>
                                </div>
                            </div>
                        </fieldset>
                    </form>
				</div>
			</div>
		</div><!--container-->
	
		<?php printFooter(); ?>
	</body>
</html>