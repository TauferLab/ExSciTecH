<?php
    require_once("../src/php/template.php");
?>
<!DOCTYPE html>
<html>
    <head>
        <title>Flashcards</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <!-- Bootstrap -->

        <link href="/bootstrap/css/cerulean.min.css" rel="stylesheet" media="screen">
        
        <link href="/src/css/custom.css" rel="stylesheet" media="screen">
        
        <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
        <!--[if lt IE 9]>
            <script src="../../assets/js/html5shiv.js"></script>
            <script src="../../assets/js/respond.min.js"></script>
        <![endif]-->
    </head>
    
    <body>
    
    <?php printNavBar(); ?>

        <div class="container">
    
                <h1>Molecule Flashcards</h1>
                
                <!--
                <div class="row">
                    <div class="col-lg-8">
                        <div id="demo_molecule"><canvas width="540" height="455" style="width: 100%; height: 100%;"></canvas></div>
                    </div>
                    
                
                    <div class="col-lg-4">
                        <form class="form-signin" _lpchecked="1">
                            <legend>Please sign in</legend>
                            <input type="text" class="form-control" placeholder="Email address" autofocus="">
                            <input type="password" class="form-control" placeholder="Password">
                            <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
                        </form>
                    </div>
                </div>
                -->

<?php printFooter();?>