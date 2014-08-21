LoginRegForm = function(){
    //var DOMAIN = 'http://localhost/~exscitech/';
    var DOMAIN = 'https://exscitech.org/';
    this.loginURL = DOMAIN + 'request_handler.php';
    
    var username = get_cookie('username');
	var auth = get_cookie('auth');

	if( (username != null) && (auth != null) ){
		this.handleLogin(username, auth);
		
	}
	else{
        var form = this;
        $("#loginBtn").click(function(){
            form.submitLogin($('#loginEmail').val(), $('#loginPass').val());
            return false;
        });
        $("#regBtn").click(function(){
            form.submitReg();
            return false;
        });
    }
}

LoginRegForm.prototype.submitLogin = function(login, pass){

	var reqObj = Object.create(null);
	reqObj.request_type = 'login';
	reqObj.login = login;
	reqObj.pass = pass;

	var form = this;
	
	$.ajax({
		    url: this.loginURL,
		    type: 'POST',
		    data: JSON.stringify(reqObj),
		    success: function(data) {
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

		    success: function(data) {
    		    form.submitCallback(data);
		    }
		});
	} else {
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
    
    if(data.success ){
    
        //location.reload();
        set_cookie('username', data.username, 1, '/');
        set_cookie('auth', data.auth, 1, '/');
    
        this.handleLogin(data.username, data.auth);
        
        var URL = document.URL.split("/");
        
        console.log(URL);
        
        if( URL[3] == "forum"){
            document.location = "https://exscitech.org/forum/?redir=1#/entry/signin";
        }

        if( URL[3] == "login" || URL[3] == "register" ){
            document.location =  "/";
        }
        
    }
    else{
        alert('Error: ' + data.error);
    }
}

LoginRegForm.prototype.handleLogin = function(username, auth){
   	set_cookie('username', username, 1, '/');
	set_cookie('auth', auth, 1, '/');
	delete_cookie('Vanilla','/',".exscitech.org");
	delete_cookie('Vanilla-Volatile','/',".exscitech.org");
    
    this.writeUserInfoNav(username);
}

LoginRegForm.prototype.writeUserInfoNav = function( username ){
    var HTML =  '<li class="dropdown">'+
                '<a href="#" class="dropdown-toggle" data-toggle="dropdown">' + username + '<b class="caret"></b></a>'+
                '<ul class="dropdown-menu">'+
                '<li><a href="/forum/index.php#/profile">Profile</a></li>';    

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

LoginRegForm.prototype.logout = function(){
    delete_cookie('auth','/');
	delete_cookie('username','/');
	delete_cookie('teacher','/');
	delete_cookie('admin','/');
	delete_cookie('Vanilla','/',".exscitech.org");
	delete_cookie('Vanilla-Volatile','/',".exscitech.org");
	location.reload();
}

var LoginRegForm = new LoginRegForm();