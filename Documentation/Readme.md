#ExSciTecH Documentation



## Communication API

Brief Client Side: The request object is encoded in JSON and posted to the /request_handler.php page, then the response text is an object encoded in JSON, which can be evaluated as a JavaScript object.

Example code:

```
function send_request(request_object, request_URL){
	//Make request
	var response= $.ajax({
	    url: request_URL,
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

var request_obj = Object();
request_obj.request_type = "login";
request_obj.email = "sam@lol.com";
request_obj.pw_hash = "1234dinosaur";
send_request(request_obj, "/request_handler.php");
```

###List of Request Types

1. login.php
2. register.php
3. get_avail_flashcard_games.php
4. get_high_scores.php
5. load_flashcard_game.php		
6. start_flashcard_game.php
7. submit_flashcard_answer.php
8. end_flashcard_game.php

9. getTeachersQuestionInfo.php
10. loadQuestionSet.php
11. saveQuestionSet.php
12. submitQsetForReview.php
13. getTeachersQuestionSets.php
14. getPDB.php
