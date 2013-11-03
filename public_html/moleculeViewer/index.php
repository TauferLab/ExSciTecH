<?php
    require_once("/var/www/html/src/php/template.php");
?>


<!DOCTYPE html>
<html>
    <head>
        <title>Molecule Viewer</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <!-- Bootstrap -->

        <link href="bootstrap/css/cerulean.min.css" rel="stylesheet" media="screen">
        
        <link href="./src/css/custom.css" rel="stylesheet" media="screen">
        <link href="./src/css/molSearch.css" rel="stylesheet" media="screen">
        <link href="./src/css/jquery-ui-1.8.23.custom.css" rel="stylesheet" media="screen">
        <link href="./src/css/MoleculeSearch.css" rel="stylesheet" media="screen">
        
        <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
        <!--[if lt IE 9]>
            <script src="../../assets/js/html5shiv.js"></script>
            <script src="../../assets/js/respond.min.js"></script>
        <![endif]-->
    </head>
    
    <body>
    
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
                
                <div class="navbar-collapse collapse" id="navbar-main">
        <ul class="nav navbar-nav">
            <li><a href="/jobSubmission">Job Submission</a></li>
            <li><a href="/flashcards">Flashcards</a></li>
            <li><a href="/moleculeViewer">Molecule Viewer</a></li>
            <li class="dropdown">
              <a href="#" class="dropdown-toggle" data-toggle="dropdown">About <b class="caret"></b></a>
              <ul class="dropdown-menu">
                  <li><a href="/teachersContact.php">For Teachers</a></li>
                  <li><a href="/contrib.php">Contributors</a></li>
                  <li><a href="/contact.php">Contact Us</a></li>
                  <li><a href="http://docking.cis.udel.edu">Docking@Home</a></li>
              </ul>
            </li>
        </ul>
                </div>
            </div>
        </div>

        <div class="container">
            <h1 id="moleculeName"> Molecule Viewer </h1>
            <div class="row">
                <div class="col-md-8" id="gmolArea">
                    
                </div>
                <div class="col-md-4">
                    
                        <div id="searchArea"></div>
                    
                </div>
            </div>
            
        </div>


        <div class="navbar navbar-default navbar-fixed-bottom">    
            <div class="container">
                <footer>
                    <p style="margin-top : 16px">© University of Delaware 2013 - Global Computing Lab</p>
                </footer>
            </div>
        </div>
        
        <!-- jQuery (necessary for Bootstraps JavaScript plugins) -->
        <script src="//code.jquery.com/jquery.js"></script>
        <!-- Include all compiled plugins (below), or include individual files as needed -->
        <script src="bootstrap/js/bootstrap.min.js"></script>
        <script src="src/js/MoleculeSearch.js"></script>
        <script src="src/js/lib/Three49custom.js"></script>
        <script src="src/js/lib/GLmol.js"></script>
        <script src="src/js/lib/jquery-ui-1.8.23.custom.min.js"></script>
        <script src="src/js/glmolMod.js"></script>
        
        <script>
            MoleculeSearch.Factory( new MoleculeSearch("#molSearch") );
        </script>
    </body>
</html>