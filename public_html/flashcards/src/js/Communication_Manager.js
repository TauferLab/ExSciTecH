/***************************************
 *     Communication Manager Class     *
 *************************************** 
	This class is an abstraction layer for all of
	the server-client communication. Any server 
	requests should be made through this class.

*/
function Communication_Manager(){
	    this.request_URL = "request_handler.php";
	    this.login_request = login_request;
	    this.send_request = send_request;
	    this.get_user_request = get_user_request;
	    this.get_pdb_contents = get_pdb_contents;
	
	function login_request(email, password){
		email = email.toLowerCase();
		var password_hash = hex_md5(password+email);
	
		var request_object = Object();
		request_object.request_type = "login";
		request_object.email = email;
		request_object.hash = password_hash;
	
		return this.send_request(request_object);
    }

    function get_user_request(){
		var user = Object();
		user.username = "sam";
		user.authenticator = "12345";		
	
		this.send_request(user);
	
		return user;
    }

    function get_pdb_contents(pdb_url){
		var response= $.ajax({
		    url: pdb_url,
		    type: 'GET',
		    async: false
		}).responseText;
		return response;
    }

    function send_request(request_object){

	    console.log(request_object);

		if(this.request_URL ==null){
		    console.log("this.request==null");
		}
		
		//Make request
		var response= $.ajax({
		    url: this.request_URL,
		    type: 'POST',
		    data: JSON.stringify(request_object),
		    async: false
		}).responseText;
	
		//Turn the JSON response into an object and return it
		try{
		    return JSON.parse(response);
		} catch(err){
		    var ret = Object();
		    ret.success = false;
		    ret.error = "JSON syntax error, invalid server response";
		    return ret;
		}
    }

}
