<?php
    require_once("./src/php/template.php");
?>

<!DOCTYPE html>
<html>
    <head>
        <title>Welcome to ExSciTecH!</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <!-- Bootstrap -->
        <link href="/bootstrap/css/cerulean.min.css" rel="stylesheet" media="screen">        
        <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
        <!--[if lt IE 9]>
            <script src="../../assets/js/html5shiv.js"></script>
            <script src="../../assets/js/respond.min.js"></script>
        <![endif]-->
        
        
        <!-- Custom CSS-->
        <link href="/src/css/custom.css" rel="stylesheet" media="screen">
        <link href="/src/css/index.css" rel="stylesheet" media="screen">
        
        <script type="text/javascript" src="./src/js/cookies.js"></script>
        <script type="text/javascript" src="./src/js/md5-min.js" language="javascript"></script>        
    </head>
    
    <body>
    
    <?php printNavBar(); ?>

    <div class="section">
        <div class="container" style="overflow:hidden">
            <img style="margin:0 auto;" src="/assets/homepage/Docking.jpg" \>
            <h1 id="pageTitle">Welcome to ExSciTecH!</h1>
        </div>
        
    </div>

    <div class="container">

    <div class="row">
        <div class="col-md-8">
            <h3>What is ExSciTecH?</h3>
            Docking@Home is a project which uses Internet-connected computers to perform scientific calculations that aid in the creation of new and improved medicines. The project aims to help cure diseases such as Human Immunodeficiency Virus (HIV). Docking@Home is a collaboration between the University of Delaware, The Scripps Research Institute, and the University of California - Berkeley. It is part of the Dynamically Adaptive Protein-Ligand Docking System project and is supported by the National Science Foundation.

            <h3>How Does It Work?</h3>
            
            Before new drugs can be produced for laboratory testing, researchers must create molecular models and simulate their interactions to reveal possible candidates for effective drugs. This simulation is called docking. The combinations of molecules and their binding orientations are infinite in number. Simulating as many combinations as possible requires a tremendous amount of computing power. In order to reduce costs, researchers have decided that an effective means of generating this computing power is to distribute the tasks across a large number of computers.
            
            <h3>How Can I Help?</h3>
            
            By downloading a free program developed at University of California - Berkeley called BOINC, you can contribute your computer's idle processing cycles to the Docking@Home project. It's safe, easy to setup, and runs only when you want it to so it won't affect your ability to use your computer. If you are interested in finding out more information, you can read more about the project and the science behind it, or if you are ready to help, you can get started below.
        </div>
        <div class="col-md-4">
        
            
        
        </div>
    </div>


<?php printFooter();?>