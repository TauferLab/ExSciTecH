<?php
  
  
   require_once(__DIR__."/../../../BOINC/main.inc");
  
	$request_structures["login"] = array();
	$request_structures["login"]["login"] = "";
	$request_structures["login"]["pass"] = "";

	function handle_login_request($request_object){
        
		if(!isset($request_object['login']) || !isset($request_object['pass'])){
			return build_error_response("Invalid login request");
		}

		$user = lookup_user_email_addr(strtolower($request_object['login']));
		
		if(!$user){
		    $user = lookup_user_username($request_object['login']);
        }
        if(!$user){
            return build_error_response("Invalid username and/or password.");
        }
        
        $hash = md5($request_object['pass'].$user->email_addr);

		if($user->passwd_hash != $hash){
			$response = array();
			$response['success'] = false;
			$response['error'] = "Invalid username and/or password.";
			return $response;
		}
			//Success

		if (substr($user->authenticator, 0, 1) == 'x'){
			//user is banned (or maybe suspended?), write error.
			$response = array();
			$response['success'] = false;
			$response['error'] = "Your account has been disabled, please contact the system administrator.";
			return $response;
		}

        if( isAdmin($user->name) ) {
            send_cookie('admin', "1", true);
        }
        
		//write cookie!
		send_cookie('auth', $user->authenticator, true);

        if($user->teacherAccess >= 1) {
            send_cookie('teacher', "1", true);
        }

		//form response text
		$response = array();
		$response["success"] = true;
		$response["username"] = $user->name;
		$response["auth"] = $user->authenticator;

		return $response;
	}

?>
