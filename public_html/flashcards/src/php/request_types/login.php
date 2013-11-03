<?php
  
  
  //require_once(__DIR__."/../boinc/project/project.inc");
  /*
  require_once(__DIR__."/../boinc/inc/boinc_db.inc");
  require_once(__DIR__."/../boinc/inc/util.inc");
  require_once(__DIR__."/../boinc/inc/email.inc");
  require_once(__DIR__."/../boinc/inc/user.inc");
  */
  
  require_once(__DIR__."/../boincReplacement/main.inc");
  
	$request_structures["login"] = array();
	$request_structures["login"]["email"] = "";
	$request_structures["login"]["hash"] = "";

	function handle_login_request($request_object){
        
        		
		if(isset($request_object['email']) && isset($request_object['hash'])){

			$user = lookup_user_email_addr($request_object['email']);
	
			if($user->passwd_hash == $request_object['hash']){
				//Success

				if (substr($user->authenticator, 0, 1) == 'x'){
					//user is banned (or maybe suspended?), write error.
					return build_error_response("Your account has been disabled, please contact the system administrator.");
				}
		
				//write cookie!
				send_cookie('auth', $user->authenticator, true);

				//form response text
				$response = array();
				$response["success"] = true;
				$response["username"] = $user->name;		
				$response["auth"] = $user->authenticator;
				return $response;
			}
			else{
				//Failure
				return build_error_response("Invalid username and/or password.");
			}
		}
		else{
			return build_error_response("Invalid login request");
		}
				

		//form response text
		//$response = array();
		//$response["success"] = true;
		//$response["username"] = "Sam";
		//$response["auth"] = "74d5012a6404319d777dadd18322a437";
		return $response;
	}
	

?>
