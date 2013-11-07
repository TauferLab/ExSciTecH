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

    <div class="container">
        <script type="text/javascript" src="http://exscitech.org/forum/plugins/embedvanilla/remote.js"></script>
    </div>


<?php printFooter();?>

