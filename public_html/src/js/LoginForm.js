LoginRegForm = function(){
    this.loginURL = 'http://exscitech.org/flashcards/request_handler.php';
    
    var username = get_cookie('username');
	var auth = get_cookie('auth');

	if( (username != null) && (auth != null) ){
		this.handleLogin(username, auth);
	}
	else{
        var form = this;
        $("#loginBtn").click(function(){
            form.submitLogin();
        });
        $("#regBtn").click(function(){
            form.submitReg();
        });
    }
}

LoginRegForm.prototype.submitLogin = function(){
    
    var email = $('#loginEmail').val().toLowerCase();
	var pass = $('#loginPass').val();

	var reqObj = Object.create(null);
	reqObj.request_type = 'login';
	reqObj.email = email;
	reqObj.hash = hex_md5(pass+email);

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
        this.handleLogin(data.username, data.auth);
    }
    else{
        alert('Error: ' + data.error);
    }
}

LoginRegForm.prototype.handleLogin = function(username,auth){
   	set_cookie('username', username, 1, '/');
	set_cookie('auth', auth, 1, '/');
    
    this.writeUserInfoNav(username);
}

LoginRegForm.prototype.writeUserInfoNav = function( username ){
    var HTML =  '<li class="dropdown">'+
                '<a href="#" class="dropdown-toggle" data-toggle="dropdown">' + username + '<b class="caret"></b></a>'+
                '<ul class="dropdown-menu">'+
                '<li><a href="#">My Account</a></li>'+
                '<li><a id="logoutBtn">Logout</a></li>'+
                '</ul>'+
                '</li>'+
    
    $('#rightNavbar').html(HTML);
    
    var form = this;
    $('#logoutBtn').click(function(){
       form.logout(); 
    });
}

LoginRegForm.prototype.logout = function(){
    delete_cookie('auth','/');
	delete_cookie('username','/');
	location.reload();
}
