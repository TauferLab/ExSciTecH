<?php
    require_once("../src/php/template.php");
    $CALLING_PREFIX = "../";
?>
<!doctype html>
<html>
    <head>
    <?php
        if( isset($_GET['register']) ){
            echo "<title> ExSciTecH - Register</title>";
        }
        else{
            echo "<title> ExSciTecH - Login</title>";
        }
    ?>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Bootstrap -->

    <link href="../bootstrap/css/cerulean.min.css" rel="stylesheet" media="screen">
    
    <link href="../src/css/custom.css" rel="stylesheet" media="screen">

    <script src="../src/js/LoginForm.js"></script>
    
    <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
        <script src="../../assets/js/html5shiv.js"></script>
        <script src="../../assets/js/respond.min.js"></script>
    <![endif]-->

    
    <link rel="stylesheet" href="https://code.jquery.com/ui/1.10.3/themes/smoothness/jquery-ui.css" />
	<link rel="stylesheet" type="text/css" href="login/src/css/Login.css" /> <!-- Production -->
    <!--<link rel="stylesheet" type="text/css" href="src/css/Login.css" /> Testing Environment -->
  
    </head>
    
    <body>
    
        <?php 
            if( !isset($_GET['embed']) ){
                printHeader("ExSciTecH");
        ?>
        <div class="container">
        <?php }?>
        
            <div class="jumbotron">
                <h1 id="welcomeMsg">Welcome to ExSciTecH!</h1>
                <h4 id="redirectMsg">Please log in to gain access</h4>
                <div class="row" id="bodyRow">
        			<!--<div class="col-lg-7" id="demoMolecule"></div>-->
        			<!--<div class="col-lg-5" id="login_frame">-->
        			    <div class="col-md-6 col-md-offset-3" id="login_frame">
        			    <div class="panel panel-default" id="loginWrapper">
            				<div class="panel-body" id="loginArea">
            				    <h1 id="loginHeader">Login!</h1>
            				    
            				    <form id="loginForm" class="form-horizontal">
                    				<input class='form-control' id="loginScreenEmail" text="cat" placeholder="Email or Username" type="text" required="required" />
                    				<input class='form-control' id="loginScreenPass" placeholder="Password" type="password" required="required" />
                    				<input id="loginScreenBtn" type="button" class="btn btn-success" value="Login!" />
            				    </form>
            				    
            				    
            				    <div class="loginOption">Don't have an account yet? <a onclick="displayRegArea();">Register!</a></div>            					    
            				</div>
        			    </div>
        			    <div class="panel panel-default" id="regWrapper">
            				<div class="panel-body" id="regArea">
            				    <h1 id="loginHeader">Register!</h1>
            				    
            				    <form class="form-horizontal">
                    				<input class='form-control' id="regEmail"    placeholder="Email" type="text" required="required" />
                    				<input class='form-control' id="regUser" placeholder="Username" type="text" required="required" />
                    				<input class='form-control' id="regPass1"    placeholder="Password" type="password" required="required" />
                    				<input class='form-control' id="regPass2"    placeholder="Repeat Password" type="password" required="required" />
                    				<input type="submit" id="regScreenBtn" type="button" class="btn btn-success" value="Register!" />
            				    </form>
            				    
            				    <div class="loginOption">Already have an account? <a onclick="displayLoginArea();">Login!</a></div>            					    
            				</div>
        			    </div>
        			</div>
                </div>
            </div>
        <?php if( !isset($_GET['embed']) ){ ?>
        </div>
        <?php printFooter(); }?>
        
        <?php
            //Horrible Practice
            if( isset($_GET['register']) ){
                echo '  <script type="text/javascript">
                            var REGISTER = true;
                        </script>';
            }
        ?>
        
        
        
        <!-- Our JS -->
        <script type="text/javascript" src="../src/js/cookies.js"></script>
        <script type="text/javascript" src="login/src/js/login.js"></script> <!--Production-->
        <!--<script type="text/javascript" src="src/js/login.js"></script> Testing Environment -->
        <script type="text/javascript" src="/src/js/LoginForm.js"></script> <!--Production-->
        <!-- <script type="text/javascript" src="../src/js/LoginForm.js"></script> Testing Environment -->
    
    </body>
</html>
