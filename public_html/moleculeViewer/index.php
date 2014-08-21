<?php
    require_once("../src/php/template.php");
    $CALLING_PREFIX = "../";
?>


<!DOCTYPE html>
<html>
    <head>
        <title>ExSciTecH - Molecule Viewer</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <!-- Bootstrap -->

        <link href="bootstrap/css/cerulean.min.css" rel="stylesheet" media="screen">
        
        <link href="../src/css/custom.css" rel="stylesheet" media="screen">
        <link href="src/css/custom.css" rel="stylesheet" media="screen">
        <link href="src/css/molSearch.css" rel="stylesheet" media="screen">
        <link href="src/css/jquery-ui-1.8.23.custom.css" rel="stylesheet" media="screen">
        <link href="src/css/MoleculeSearch.css" rel="stylesheet" media="screen">
        
        <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
        <!--[if lt IE 9]>
            <script src="../../assets/js/html5shiv.js"></script>
            <script src="../../assets/js/respond.min.js"></script>
        <![endif]-->
    </head>
    
    <body>
        
        <?php printNavBar(); ?>
        
        <div id="contentWrapper" class="container">
            <div id="almostEverythingRow" class="row">
                <div class="col-md-8">
                    <div id="gmolArea">
                    </div>
                    <h1 id="moleculeName"> Molecule Viewer </h1>
                    <div class="panel panel-primary">
                        
                        <div id="molDesc" class="panel-body">
                            
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div id="searchArea"></div>
                
                    <div class="panel panel-primary">
                        <div class="panel-heading">
                            Molecule Properties
                        </div>
                        <div id="molProp" class="panel-body">
                            
                        </div>
                    </div>
                    <div id="citationPanel">
                    </div>
                </div>
            </div>
            <!--
            <div class="row">
                <div id="descRow" class="col-md-8">
                    <div class="panel panel-primary">
                        <div class="panel-heading">
                            Molecule Description
                        </div>
                        <div id="molDesc" class="panel-body">
                            
                        </div>
                    </div>
                </div>
            </div>
            -->
            
        </div>


        <div id="footer" >    
            <div class="container">
                <footer>
                    <p style="margin-top : 16px">&copy; University of Delaware 2013 - Global Computing Lab</p>
                </footer>
            </div>
        </div>
        
        <!-- jQuery (necessary for Bootstraps JavaScript plugins) -->
        <script src="//code.jquery.com/jquery.js"></script>
        <!-- Include all compiled plugins (below), or include individual files as needed -->
        <script src="bootstrap/js/bootstrap.min.js"></script>
        <script src="src/js/lib/jquery-ui-1.8.23.custom.min.js"></script>
        
        <script src="src/js/lib/Three49custom.js"></script>
        <script src="src/js/lib/GLmol.js"></script>
        <script src="src/js/glmolMod.js"></script>
                
        <script src="src/js/MoleculeSearch.js"></script>
        <script src="../src/js/cookies.js"></script>
        <script src="../src/js/LoginForm.js"></script>
        <script type="text/javascript" src="../src/js/webGLtest.js" language="javascript"></script>      
        
        <script>
            MoleculeSearch.Factory( new MoleculeSearch("#molSearch") );
        </script>
    </body>
</html>
