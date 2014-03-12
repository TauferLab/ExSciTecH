<?php
  
  
  
  require_once(__DIR__."/../../../BOINC/main.inc");
  
	$request_structures["login"] = array();
	$request_structures["login"]["login"] = "";
	$request_structures["login"]["pass"] = "";

	function handle_login_request($request_object){
        
        		
		if(isset($request_object['login']) && isset($request_object['pass'])){

			$user = lookup_user_email_addr(strtolower($request_object['login']));
			
			if(!$user){
			    $user = lookup_user_username($request_object['login']);
            }
            if(!$user){
                return build_error_response("Invalid username and/or password.");
            }
            
            $hash = md5($request_object['pass'].$user->email_addr);
	
			if($user->passwd_hash == $hash){
				//Success

				if (substr($user->authenticator, 0, 1) == 'x'){
					//user is banned (or maybe suspended?), write error.
					return build_error_response("Your account has been disabled, please contact the system administrator.");
				}
		
                //TODO - check the forum database to see if a user is an admin, then if they are set the cookie.
                /*
                define('APPLICATION', 'Vanilla');
                define('APPLICATION_VERSION', '2.0.16');
                define('DS', '/');
                define('PATH_ROOT', 'forum');
                ob_start();
                require_once(PATH_ROOT.DS.'bootstrap.php');
                ob_end_clean(); // clear any header output from vanila
                $Session = Gdn::Session();
		
                if ($Session->IsValid()) {
                    var_dump($Session);
                }
                */
                if($user->name == "Sam"){
                    send_cookie('admin', "1", true);
                }
                
				//write cookie!
				send_cookie('auth', $user->authenticator, true);

                if($user->teacherAccess>=1){
                    send_cookie('teacher', "1", true);
                }

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
