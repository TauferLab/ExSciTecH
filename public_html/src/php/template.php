<?php

    $SITE_URL = "http://exscitech.org/";

    $CALLING_PREFIX = '';

    function printHeader($title){
        global $SITE_URL;
        global $CALLING_PREFIX;
        
        echo '
        <!DOCTYPE html>
            <html>
                <head>
                    <title>'.$title.'</title>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <!-- Bootstrap -->
        
                    <link href="'.$CALLING_PREFIX.'bootstrap/css/cerulean.min.css" rel="stylesheet" media="screen">
                    
                    <link href="'.$CALLING_PREFIX.'src/css/custom.css" rel="stylesheet" media="screen">
                    
                    <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
                    <!--[if lt IE 9]>
                        <script src="'.$CALLING_PREFIX.'assets/js/html5shiv.js"></script>
                        <script src="'.$CALLING_PREFIX.'assets/js/respond.min.js"></script>
                    <![endif]-->
                </head>
                
                <body>';
        
                printNavBar();

    }
    
    function printFooter(){
        global $CALLING_PREFIX;

        echo '
        <div class="container">
        <hr>
        <footer>
            <p>&copy; University of Delaware 2013-2014 - Global Computing Lab</p>
        </footer>
        </div><!--container-->';
        
        echo "<script>
          (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
          (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
          m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
          })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
        
          ga('create', 'UA-8656018-9', 'exscitech.org');
          ga('send', 'pageview');
        
        </script>";
        
        echo '<!-- jQuery (necessary for Bootstraps JavaScript plugins) -->
        <script src="//code.jquery.com/jquery.js"></script>
        <script src="//code.jquery.com/ui/1.10.3/jquery-ui.js"></script>
        <!-- Include all compiled plugins (below), or include individual files as needed -->
        <script src="'.$CALLING_PREFIX.'bootstrap/js/bootstrap.min.js"></script>
        
        <!-- Login form & WebGL tests -->
        <script type="text/javascript" src="'.$CALLING_PREFIX.'src/js/cookies.js" language="javascript"></script>
        <script type="text/javascript" src="'.$CALLING_PREFIX.'src/js/webGLtest.js" language="javascript"></script>
        <script type="text/javascript" src="'.$CALLING_PREFIX.'src/js/LoginForm.js" language="javascript"></script>
        ';
    }
    
    function printNavBar(){ 
        global $CALLING_PREFIX;

        echo '

        <!--<div class="alert alert-dismissable alert-danger" style="text-align: center;">
            <b>Site Under Construction</b>
        </div>-->
        
        <div class="navbar navbar-default navbar-static-top">
            <div class="container">
                <div class="navbar-header">
                    <a class="navbar-brand" href="/"><img src="'.$CALLING_PREFIX.'assets/exscitech_logo.png"><span style="font-size: 10px; vertical-align: bottom;">(Beta)</span></a>
                    <button class="navbar-toggle" type="button" data-toggle="collapse" data-target="#navbar-main">
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                </div>
                
                <div class="navbar-collapse collapse" id="navbar-main">';

                    printLeftNav();
                    
                    
                    $url = $_SERVER['REQUEST_URI']; //returns the current URL
                    $parts = explode('/',$url);
                    if($parts[1] != "login")
                        printRightNav();

        echo '
                </div>
            </div>
        </div>';
                    
    }
    
    function printLeftNav(){
        global $CALLING_PREFIX;

        $basename = explode("/", $_SERVER['PHP_SELF']);
        
        $basename = $basename[1]; 

        echo '
        <ul class="nav navbar-nav">
            <li'.( ($basename=="moleculeviewer")?' class="active"':'' ).'><a href="'.$CALLING_PREFIX.'moleculeViewer">Molecule Viewer</a></li>
			<li'.( ($basename=="flashcards")?' class="active"':'' ).'><a href="'.$CALLING_PREFIX.'flashcards">Flashcards</a></li>
            <li'.( ($basename=="forum")?' class="active"':'' ).'><a href="'.$CALLING_PREFIX.'forum/">Forum</a></li>
            <li class="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown">About <b class="caret"></b></a>
              <ul class="dropdown-menu">
                  <li><a href="'.$CALLING_PREFIX.'contrib.php">Contributors</a></li>
                  <li><a href="'.$CALLING_PREFIX.'contact/">Contact Us</a></li>
                  <li><a href="http://docking.cis.udel.edu">Docking@Home</a></li>
              </ul>
            </li>
        </ul>';
    }
    
    function printRightNav(){
        echo '<ul class="nav navbar-nav navbar-right" id="rightNavbar">';
        
        printHeaderLogin();

        
        echo "</ul>";
    }
    
    
    function printHeaderLogin(){
        global $CALLING_PREFIX;
        echo '
                <li>
                    <a href="'.$CALLING_PREFIX.'register">Register</a>
                </li>
                <li class="dropdown"><a class="dropdown-toggle" data-toggle="dropdown">Sign In<b class="caret"></b></a>
                    <ul class="dropdown-menu" style="padding: 15px;">
                        <form class="form-signin" _lpchecked="1" action="" onSubmit="return false;">
                            <input id="loginEmail" type="text" class="form-control" placeholder="Email or Username" autofocus="">
                            <input id="loginPass" type="password" class="form-control" placeholder="Password">
                            <button id="loginBtn" class="btn btn-primary btn-block" type="submit">Sign in</button>
                            <p id="forgotPass">Forgot your password? <a href="'.$CALLING_PREFIX.'auth/resetPW.php">Click Here</a></p>
                        </form>
                    </ul>
                </li>';
    }

?>
