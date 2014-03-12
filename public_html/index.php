<?php
    require_once("./src/php/template.php");
    require_once("./src/php/config.inc");
    
    function getNews(){
        global $MYSQL_SERVER;
        global $MYSQL_USER;
        global $MYSQL_PASSWORD;
        global $MYSQL_FORUM_DB;
        
        $newsItems = array();
        
        $mysqli = new mysqli($MYSQL_SERVER, $MYSQL_USER, $MYSQL_PASSWORD, $MYSQL_FORUM_DB);
        
        $query = "SELECT `DiscussionID`,`Name`,`Body`,`DateInserted` FROM `GDN_Discussion` WHERE `CategoryID` = 8 ORDER BY `DateInserted` DESC LIMIT 4;";
        $result = $mysqli->query($query);
        
        if($result === false){
            echo $mysqli->error;
        }
        else{
            while ($obj = $result->fetch_object()) {
                $newsItems[] = $obj;
            }
        }
        
        return $newsItems;
    }
    
    function printNewsItems($newsItems){
        foreach($newsItems as $item){
        
            $bodyStr = substr( str_replace("<br>","<br><br>",strip_tags($item->Body,"<br>")) ,0,100);
            $dateStr = date('F d, Y', strtotime(str_replace('-', '/', $item->DateInserted)));
            
            if( strlen($item->Body) > strlen($bodyStr) ){
                $bodyStr = $bodyStr."... <a href='https://exscitech.org/forum/#/discussion/".$item->DiscussionID."/'>More...</a>";
            }
        
            echo "<div class='newsItem'>
                    <h4 class='newsTitle'>".$item->Name." - <span class='newsDate'>$dateStr</span></h4>
                    <p class='newsBody'>$bodyStr</p>
                  </div>";
        }
    }
    
    $newsItems = getNews();
    
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>Welcome to ExSciTecH!</title>

    <!-- Bootstrap core CSS -->
    <link href="./bootstrap/css/cerulean.min.css" rel="stylesheet">

    <!-- Custom styles for this template -->
    <link href="./src/css/homepage.css" rel="stylesheet">
    <link href="./src/css/custom.css" rel="stylesheet">

    <!-- Fonts from Google Fonts -->
	<link href='https://fonts.googleapis.com/css?family=Lato:300,400,900' rel='stylesheet' type='text/css'>
    
    <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
      <script src="https://oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js"></script>
    <![endif]-->
  </head>

  <body>

      <?php printNavBar(); ?>

	<div id="headerwrap">
		<div class="container">
			<div class="row">
				<div class="col-lg-8 col-lg-offset-2" style="text-align: right">
					<h1>Welcome to ExSciTecH<br>Molecule Flashcards</h1>
					<a href="https://exscitech.org/flashcards" class="btn btn-success btn-lg">Play Now!</a>
				</div><!-- /col-lg-12 -->
				
			</div><!-- /row -->
		</div><!-- /container -->
	</div><!-- /headerwrap -->
	
	
	<div id="explanation" class="container">
		<div class="row mt centered">
			<div class="col-md-8 col-md-offset-2">
				<h1>What is ExSciTecH?</h1>
				<p>ExSciTecH is a set of chemistry study tools designed to help students learn about and understand chemical structures.</p>
			</div>
		</div><!-- /row -->
		
		<div class="row mt centered">
			<div class="col-md-4">
				<img src="assets/homepage/microscope5.png" height="155" alt="">
				<h4>Explore </h4>
				<p>Explore a huge database of 3D molecules with the molecule viewer.</p>
			</div><!--/col-md-4 -->

			<div class="col-md-4">
				<img src="assets/homepage/chemical.png" height="155" alt="">
				<h4>Challenge</h4>
				<p>Test your knowledge and show your skills with the molecule flashcards.</p>

			</div><!--/col-md-4 -->

			<div class="col-md-4">
				<img src="assets/homepage/cards1.png" height="155" alt="">
				<h4>Create</h4>
				<p>Build your own flashcard decks with the deck editor.</p>

			</div><!--/col-md-4 -->
		</div><!-- /row -->
	</div><!-- /container -->
	
	<div id="bottomwrap">
	    <div class="container">
        	<div class="row mt centered">
    			<div class="col-md-6" id="news">
    			    <h3>Latest News</h3>
    			    <div class="row">
    			        <div class="col-sm-12">
        			        <?php printNewsItems($newsItems) ?>
    			        </div>
    			    </div>
    			</div>
    			<div class="col-md-6" id="sponsors">
    			    <h3>Sponsors</h3>
    			    <div class="row">
    			        <div class="col-sm-8 col-sm-offset-2">
            			    <div class="row">
                                <div class="col-sm-4 imgWrap"><a href="http://www.nsf.gov/awardsearch/showAward?AWD_ID=0968350"><img src="./assets/homepage/nsf1.png"></a></div>
                                <div class="col-sm-4 imgWrap"><a href="http://gcl.cis.udel.edu"><img src="./assets/homepage/GCLlogo.png"></a></div>
                                <div class="col-sm-4 imgWrap"><a href="http://www.cis.udel.edu/"><img src="./assets/homepage/UD_circle1743_logo.png"></a></div>
            			    </div>
    			        </div>
    			    </div>
    			</div>
        	</div>
	    </div>
	</div>
	
	<?php printFooter(); ?>
  </body>
</html>
