WebGLTest = function(){

    if(get_cookie("welcomeAlert") != 1){
        var HTML =  '<div class="alert alert-dismissable alert-success" id="welcomeAlert">'+
                        '<button type="button" class="close" data-dismiss="alert">x</button>'+
                        '<h4>Welcome to ExSciTecH!</h4>'+
                        '<p>We&#39;re excited to announce that the ExSciTecH molecule flashcards are now in beta. '+
                            'Please be advised the is still under active development and there may be bugs. '+
                            'If you encounter a bug please stop by the forums and let us know.</p>'+
    
                            '<p>Also, you may notice there are currently only a couple of question sets. '+
                            'We are looking for volunteers to help write question sets. In order to build new question sets you need to <a href="/register">register</a> an account. '+
                            'Once you\'ve built a question set submit them for review in the question set editor. You can find a tutorial on how to build question sets <a href="https://exscitech.org/forum/#/discussion/9/tutorial-building-question-sets">here</a>.</p>'+
                            
                            //'<p><a href="/editor" class="btn btn-primary">Build a question set!</a></p><br>'+
                            
                            '<p id="dismissMsg">You can dismiss this message with the close button in the upper right corner.</p>'+
                            
                            '<p>Thanks and have fun!<br>'+
                            'The ExSciTecH admins</p>'+
                    '</div>';
                    
        $("#contentWrapper").prepend(HTML);
        
        $('#welcomeAlert').on('closed.bs.alert', function () {
            set_cookie('welcomeAlert', 1, 365*5, '/');
        });
    }

    var HTML =  '<div id="supportWarning" class="alert alert-dismissable alert-danger">'+
                '    <h3>ExSciTecH is only supported in the Firefox and Chrome web browsers.</h3>'+
                '    <p>Please install a new version of Chrome or Firefox in order to use the Flashcards.</p>'+
                '    <p>Firefox: <a>Download</a><br>'+
                '    Chrome: <a>Download</a></p>'+
                '    <p>For more information on supported browsers please visit: <a href="http://get.webgl.org/">http://get.webgl.org/</a></p><br>'+
                '<h4>Experimental Safari Support</h4>'+
                '    <p>If you would like to try a experimental Safari version you can follow these instructions:<br>'+
                '    In Safari, open the <b>Safari</b> menu and select <b>Preferences</b>.<br>'+ 
                '   Then, click the <b>Advanced</b> tab in the Preferences window.<br>'+
                '   Then, at the bottom of the window, check the <b>Show Develop menu in menu</b> bar checkbox.<br>'+
                '   Then, open the Develop menu in the menu bar and select <b>Enable WebGL</b>.<br>'+
                '   Finally, refresh the page.</p>'+
               '</div>';
    
    if ( !WebGLTest.test() ){
         $("#contentWrapper").html(HTML);
    }
}

    
     
WebGLTest.test = function(){
    var asa; var canvas; var dcanvas; var gl; var expmt;
    
    $("body").append('<canvas id="hiddenCanvas" style="display:none"></canvas>');
 
    canvas = $('#hiddenCanvas');
    //console.log(canvas);
    
    // Source: https://gist.github.com/philadams/1709384
    // check to see if we can do webgl
    // ALERT FOR JQUERY PEEPS: canvas is a jquery obj - access the dom obj at canvas[0]
        dcanvas = canvas[0];
        expmt = false;
        if ("WebGLRenderingContext" in window) {
            //console.log("browser at least knows what webgl is.");
        }
        // some browsers don't have a .getContext for canvas...
        try {
            gl = dcanvas.getContext("webgl");
        } catch (x) { gl = null; }
        if (gl == null) {
            try {
                gl = dcanvas.getContext("experimental-webgl");
            } catch (x) {
                gl = null;
            }
            if (gl == null) {
                //console.log('but can\'t speak it');
            }
            else {
                expmt = true;
                //console.log('and speaks it experimentally.');
            }
        } else {
            //console.log('and speaks it natively.');
        }
     
        if (gl || expmt) {
            //console.log("loading webgl content.");
            return true;
        } else {
            //console.log("image-only fallback. no webgl.");
            canvas.remove();
            return false;
        }
     
}

WebGLTest();
