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

    <!-- Bootstrap core CSS -->
    <link href="./mailingList/cerulean.min.css" rel="stylesheet">
    <link href="./mailingList/custom.css" rel="stylesheet">

    <!-- Just for debugging purposes. Don't actually copy this line! -->
    <!--[if lt IE 9]><script src="../../docs-assets/js/ie8-responsive-file-warning.js"></script><![endif]-->

    <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
      <script src="https://oss.maxcdn.com/libs/respond.js/1.3.0/respond.min.js"></script>
    <![endif]-->
  </head>

  <body>

        <div class="navbar navbar-default navbar-static-top">
            <div class="container">
                <div class="navbar-header">
                    <a class="navbar-brand" href="/"><img src="./mailingList/exscitech_logo.png"></a>
                    <button class="navbar-toggle" type="button" data-toggle="collapse" data-target="#navbar-main">
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                </div>
            </div>
        </div>

    <!-- Main jumbotron for a primary marketing message or call to action -->
    <div class="jumbotron">
      <div class="container">
        <h1>Welcome to ExSciTecH!</h1>
        <div class="row">
            <div class="col-md-6">
                <input id="demo_molecule_src" style="display:none" type="text"></input>
                <div id="demo_molecule"></div>
            </div>
            <div class="col-md-6">
                <p>ExSciTecH's goal is to improve the Volunteer Computing paradigm by bringing together human intuition and discernment with the unused power of millions of computers to engage diverse communities in aiding scientific discovery by:
                <ul>
<li>Converting participation from simply donation of idle cycles to donation of cycles plus deductive reasoning </li>
<li>Reaching out to a broader and more diverse community of volunteers</li>
                </ul>
                ExSciTecH will be launching in the coming weeks! If you're interested in receiving announcements and updates on the project please join our mailing list below!
</p>
                <div id="mc_embed_signup">
                    <form action="http://exscitech.us3.list-manage.com/subscribe/post?u=d9e292ceddb98023c6292928b&amp;id=b5f8274e58" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate>
                    
                    <input type="email" value="" name="EMAIL" class="email form-control" id="mce-EMAIL" placeholder="Email" required>
                    <div class="clear"><input class="btn btn-primary" type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" class="button"></div>
                    </form>
                </div>
            </div>
        </div>    
      </div>
    </div>

    <div class="container">
      <!-- Example row of columns -->
      <div class="row">
          <div class="col-md-4">
                <div class="thumbnail">
                    <h2 style="text-align:center">Molecule Explorer</h2>
                    <img src="./mailingList/explorer.png">
                    <p>Users are given tools to easily search, visualize and explore the properIes of a huge database of molecules. Students can use this tool to beXer understand molecular properIes and structures right from their web browser </p>
                </div>
           </div>
    
            <div class="col-md-4">
                <div class="thumbnail">
                    <h2 style="text-align:center">Molecule Flashcards</h2>
                    <img src="./mailingList/flashcards.png">
                    <p>Users compete against one another and against the clock for high scores in a molecule idenIficaIon game. The game has a wide array of quesIon sets covering topics such as organic and inorganic chemistry at various difficulty levels</p>
                </div>
           </div>
            <div class="col-md-4">
                <div class="thumbnail">
                    <h2 style="text-align:center">Job Submission</h2>
                    <img src="./mailingList/jobsubmit.png">
                    <p>Users select a protein and associated disease and then solve puzzles in order to create a D@H job. Puzzle objects correlate to job input parameters; things like the protein (disease); ligand (drug); ligand conformaIon, ligand rotaIon, simulated annealing (SA) length and temperatures</p>
                </div>
           </div>
       </div>

        <hr>
        
        <p>NSF IIS #0968350: Collaborative Research: SoCS - ExSciTecH: An Interactive, Easy-to-Use VolunteerComputing System to Explore Science, Technology, and Health</p>
        
        <footer>
            <p>© University of Delaware 2013 - Global Computing Lab</p>
        </footer>
    
    </div><!--container-->


    <!-- Bootstrap core JavaScript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <script src="https://code.jquery.com/jquery-1.10.2.min.js"></script>
    <script src="./mailingList/bootstrap.min.js"></script>
    <script src="./mailingList/Three49custom.js"></script>
    <script src="./mailingList/GLmol.js"></script>
    
    <script>
        $.get("./mailingList/pdb1ajx.pdb", function(data) {
		    var glmol = new GLmol("demo_molecule",true);
		    
		    glmol.spin = function(){
    		    dx = this.x;
            	dy = this.y;
            	
            	//Modify stored X value
            	//this.x = parseFloat(dx) + .002;
            	this.y = parseFloat(dy) + .002;
            	
            	var r = Math.sqrt(dx * dx + dy * dy);
            	var rs = Math.sin(r * Math.PI) / r;
            	this.dq.x = 0;
            	this.dq.y = Math.cos(r * Math.PI);
            	this.dq.z =  rs * dx;
            	this.dq.w =  rs * dy;
            	this.rotationGroup.quaternion = new THREE.Quaternion(1, 0, 0, 0);
            	this.rotationGroup.quaternion.multiplySelf(this.dq);
            	this.rotationGroup.quaternion.multiplySelf(this.cq);
            	this.show();
            	//window.requestAnimationFrame($.proxy(game_glmol.spin, game_glmol));
            	window.requestAnimationFrame($.proxy(this.spin, this));
		    }
		    
		    glmol.defineRepresentation = function(){
    		    var all = this.getAllAtoms();
            	var hetatm = this.removeSolvents(this.getHetatms(all));
            	this.colorByAtom(all, {});
            	this.colorByChain(all);
            	
            	this.drawBondsAsStick(this.modelGroup, hetatm, this.cylinderRadius / 2.0, this.cylinderRadius, true, true, 0.3); 
            	this.drawMainchainCurve(this.modelGroup, all, this.curveWidth, 'P');
            	this.drawCartoon(this.modelGroup, all, this.curveWidth);
		    }
		    
		    glmol.loadMoleculeStr(false, data);
		    glmol.x = 0;
	        glmol.y = 0;
		    glmol.rebuildScene();
		    glmol.spin();
        });
    </script>
  </body>
</html>
