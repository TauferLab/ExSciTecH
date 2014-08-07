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
	
	$to = $_POST["toEmailList"];
	$subject = $_POST["subject"];
	$message = $_POST["message"];
    
    // To send HTML mail, the Content-type header must be set
    $headers  = 'MIME-Version: 1.0' . "\r\n";
    $headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";

    // Additional headers
    $headers .= 'From: ExSciTecH Project <admin@exscitech.org>' . "\r\n";
    $headers .= 'To: ' . $_POST["toEmailList"] . "\r\n";
    $headers .= 'Cc: ' . $_POST["ccEmailList"]  . "\r\n";
    $headers .= 'Bcc: '. $_POST["bccEmailList"]  . "\r\n";
	
	$result = mail($to, $subject, $message, $headers);
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
		
		<div class="container">
			<div class="row">
				<div class="col-lg-8 col-lg-offset-2">
				    <h2 style='text-align: center'>
        				<?php
        				    if($result){
            				    echo "Message Sent!";
        				    }  
        				    else{
            				    echo "Error sending message.";
        				    }
        				?>
				    </h2>
				</div>
			</div>
		</div><!--container-->
	
		<?php printFooter(); ?>
	</body>
</html>