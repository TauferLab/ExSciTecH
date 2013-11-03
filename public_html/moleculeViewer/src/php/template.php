<?php

    function printHeader($title){
        
        echo '
        <!DOCTYPE html>
            <html>
                <head>
                    <title>'.$title.'</title>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <!-- Bootstrap -->
        
                    <link href="bootstrap/css/cerulean.min.css" rel="stylesheet" media="screen">
                    
                    <link href="src/css/custom.css" rel="stylesheet" media="screen">
                    
                    <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
                    <!--[if lt IE 9]>
                        <script src="../../assets/js/html5shiv.js"></script>
                        <script src="../../assets/js/respond.min.js"></script>
                    <![endif]-->
                </head>
                
                <body>';
        
                printNavBar();
            
        echo '<div class="container">';
        
    
    }
    
    function printFooter(){
        echo '
        <div class="container">
        <hr>
        <footer>
            <p>© University of Delaware 2013 - Global Computing Lab</p>
        </footer>
        
        </div><!--container-->
        
        
        <!-- jQuery (necessary for Bootstraps JavaScript plugins) -->
        <script src="//code.jquery.com/jquery.js"></script>
        <!-- Include all compiled plugins (below), or include individual files as needed -->
        <script src="bootstrap/js/bootstrap.min.js"></script>
        ';
    }
    
    function printNavBar(){    
        echo '
        <div class="navbar navbar-default navbar-static-top">
            <div class="container">
                <div class="navbar-header">
                    <a class="navbar-brand" href="/"><img src="./assets/exscitech_logo.png"></a>
                    <button class="navbar-toggle" type="button" data-toggle="collapse" data-target="#navbar-main">
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                </div>
                
                <div class="navbar-collapse collapse" id="navbar-main">';

                    printLeftNav();
                    printRightNav();

        echo '
                </div>
            </div>
        </div>';
                    
    }
    
    function printLeftNav(){
        $basename = substr(strtolower(basename($_SERVER['PHP_SELF'])),0,strlen(basename($_SERVER['PHP_SELF']))-4);
    
        
    
        echo '
        <ul class="nav navbar-nav">
            <li'.( ($basename=="jobsubmission")?' class="active"':'' ).'><a href="./jobSubmission.php">Job Submission</a></li>
            <li'.( ($basename=="flashcards")?' class="active"':'' ).'><a href="./flashcards.php">Flashcards</a></li>
            <li'.( ($basename=="molsearch")?' class="active"':'' ).'><a href="./molSearch.php">Molecule Search</a></li>
            <li class="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown">About <b class="caret"></b></a>
              <ul class="dropdown-menu">
                  <li><a href="./contrib.php">Contributors</a></li>
                  <li><a href="./contact.php">Contact Us</a></li>
              </ul>
            </li>
        </ul>';
    }
    
    function printRightNav(){
        echo '<ul class="nav navbar-nav navbar-right">';
        
        if(false){
            printUserInfo();
        }
        else{
            printHeaderLogin();
        }
        
        echo "</ul>";
    }
    
    function printUserInfo(){
        echo '
            <li class="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown">Sam Schlachter <b class="caret"></b></a>
              <ul class="dropdown-menu">
                  <li><a href="#">My Account</a></li>
                  <li><a href="#">Logout</a></li>
              </ul>
            </li>';
    }
    
    function printHeaderLogin(){
        echo '
                <li class="dropdown">
                    <a class="dropdown-toggle" data-toggle="dropdown">Register</b></a>
                    <ul class="dropdown-menu" style="padding: 15px;">
                        <form class="form-signin" _lpchecked="1" style="width: 250px">
                            <input type="text" class="form-control" placeholder="Email address" autofocus="">
                            <input type="password" class="form-control" placeholder="Password">
                            <button class="btn btn-primary btn-block" type="submit">Sign in</button>
                        </form>
                    </ul>
                </li>
                <li class="dropdown"><a class="dropdown-toggle" data-toggle="dropdown">Sign In<b class="caret"></b></a>
                    <ul class="dropdown-menu" style="padding: 15px;">
                        <form class="form-signin" _lpchecked="1" style="width: 250px">
                            <input type="text" class="form-control" placeholder="Email address" autofocus="">
                            <input type="password" class="form-control" placeholder="Password">
                            <button class="btn btn-primary btn-block" type="submit">Sign in</button>
                        </form>
                    </ul>
                </li>';
    }

?>