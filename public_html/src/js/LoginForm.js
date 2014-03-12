LoginRegForm = function(){
    this.loginURL = 'https://exscitech.org/request_handler.php';
    
    var username = get_cookie('username');
	var auth = get_cookie('auth');

	if( (username != null) && (auth != null) ){
		this.handleLogin(username, auth);
		
	}
	else{
        var form = this;
        $("#loginBtn").click(function(){
            form.submitLogin();
            return false;
        });
        $("#regBtn").click(function(){
            form.submitReg();
            return false;
        });
    }
}

LoginRegForm.prototype.submitLogin = function(){
    
    var login = $('#loginEmail').val();
	var pass = $('#loginPass').val();

	var reqObj = Object.create(null);
	reqObj.request_type = 'login';
	reqObj.login = login;
	reqObj.pass = pass;

	var form = this;
	
	$.ajax({
		    url: this.loginURL,
		    type: 'POST',
		    data: JSON.stringify(reqObj),
		    success: function(data){
    		    form.submitCallback(data);
		    }
		});
		
    return false;
}

LoginRegForm.prototype.submitReg = function(){
    var email = $('#regEmail').val().toLowerCase();
    var username = $('#regUser').val();
	var pass1 = $('#regPass1').val();
	var pass2 = $('#regPass2').val();

	if( pass1 == pass2 ){
        var reqObj = Object.create(null);
    	reqObj.request_type = 'register';
        reqObj.email = email;
        reqObj.password = pass1;
        reqObj.username = username;
        
        var form = this;
      	$.ajax({
		    url: this.loginURL,
		    type: 'POST',
		    data: JSON.stringify(reqObj),
		    success: function(data){
    		    form.submitCallback(data);
		    }
		});
	}
	else{
	    //TODO: BETTER
    	alert ('Error: Passwords don\'t match');
	}
}

LoginRegForm.prototype.submitCallback = function( data ){
    
    try{
        data =  JSON.parse(data);
    } catch(err){
        alert('Error: Invalid server response;');
        return;
    }
    
    if( true == data.success ){
    
        //location.reload();
        set_cookie('username', data.username, 1, '/');
        set_cookie('auth', data.auth, 1, '/');
    
        this.handleLogin(data.username, data.auth);
        
        var URL = document.URL.split("/");
        
        console.log(URL);
        
        if( URL[3] == "login" || URL[3] == "register" ){
            document.location =  "https://exscitech.org/" + decodeURIComponent((window.location.hash).replace("#",""));
        }
        if( URL[3] == "forum"){
    	    document.location = "https://exscitech.org/forum/?redir=1#/entry/signin";
        }
    }
    else{
        alert('Error: ' + data.error);
    }
}

LoginRegForm.prototype.handleLogin = function(username,auth){
   	set_cookie('username', username, 1, '/');
	set_cookie('auth', auth, 1, '/');
	delete_cookie('Vanilla','/',".exscitech.org");
	delete_cookie('Vanilla-Volatile','/',".exscitech.org");
    
    this.showAlerts();
    
    this.writeUserInfoNav(username);
}

LoginRegForm.prototype.writeUserInfoNav = function( username ){
    var HTML =  '<li class="dropdown">'+
                '<a href="#" class="dropdown-toggle" data-toggle="dropdown">' + username + '<b class="caret"></b></a>'+
                '<ul class="dropdown-menu">'+
                '<li><a href="https://exscitech.org/forum/index.php#/profile">Profile</a></li>';    

        HTML += '<li><a href="/editor">Question Set Editor</a></li>';
        HTML += '<li><a href="/flashcards/' + username + '">My Question Sets</a></li>';
        
        if(get_cookie("admin") == 1)
            HTML += '<li><a href="/forum/index.php#/dashboard/settings">Forum Dashboard</a></li>'; 
        
        HTML += '<li><a href="/forum/index.php#/messages/inbox">Inbox</a></li>'+
                '<li><a href="#" id="logoutBtn">Logout</a></li>'+
                '</ul>'+
                '</li>';
    
    $('#rightNavbar').html(HTML);
    
    var form = this;
    $('#logoutBtn').click(function(){
       form.logout(); 
    });
}

LoginRegForm.prototype.showAlerts = function(){
/*
    if(get_cookie("welcomeAlert") != 1){
        var HTML =  '<div class="alert alert-dismissable alert-success" id="welcomeAlert">'+
                        '<button type="button" class="close" data-dismiss="alert">×</button>'+
                        '<h4>Welcome to ExSciTecH!</h4>'+
                        '<p>We’re excited to announce that the ExSciTecH molecule flashcards are now in beta. '+
                            'Please be advised the is still under active development and there may be bugs. '+
                            'If you encounter a bug please stop by the forums and let us know.</p>'+
    
                            '<p>Also, you may notice there are currently only a couple of question sets. '+
                            'We are looking for volunteers to help write question sets. You can create question sets by clicking on the button below.'+
                            'Once you\'ve built the question set click you can submit them to be available publicly by clicking on the "Submit for review" button in the question set editor.</p>'+
                            
                            '<p><a href="/editor" class="btn btn-primary">Build a question set!</a></p><br>'+
                            
                            '<p>Thanks!<br>'+
                            'The ExSciTecH Admins</p>'+
                    '</div>';
                    
        $("#contentWrapper").prepend(HTML);
        
        $('#welcomeAlert').on('closed.bs.alert', function () {
            set_cookie('welcomeAlert', 1, 365*5, '/');
        });
    }
    */
}

LoginRegForm.prototype.logout = function(){
    delete_cookie('auth','/');
	delete_cookie('username','/');
	delete_cookie('teacher','/');
	delete_cookie('admin','/');
	delete_cookie('Vanilla','/',".exscitech.org");
	delete_cookie('Vanilla-Volatile','/',".exscitech.org");
	location.reload();
}

new LoginRegForm();
