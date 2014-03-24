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
send_request(request_obj, "/request_handler");
```

###List of Request Types

1. login
2. register
3. get_avail_flashcard_games
4. get_high_scores
5. load_flashcard_game		
6. submit_flashcard_answer
7. end_flashcard_game
8. getTeachersQuestionInfo
9. loadQuestionSet
10. saveQuestionSet
11. submitQsetForReview
12. getTeachersQuestionSets
13. getPDB
14. get_media
---

####1. login
login and get basic user data
#####Request Fields
	email or username
    password
#####Response Fields
	username
	authenticator
---

####2. register
register a new user account 
#####Request Fields
	email
    password
#####Response Fields
	username
	authenticator
---

####3. get_avail_flashcard_games
get a list of games available for a given user to play
#####Request Fields
    ```{
	"request_type":"get_avail_flashcard_games",
	"authenticator":null
	}```
#####Example reponse
    ```{
    "success": "true",
    "categories": [
        {
            "ID": "1",
            "name": "Test1",
            "description": "Test1 Desc"
        },
        {
            "ID": "2",
            "name": "Test2",
            "description": "Test2 Desc"
        }
    ],
    "available_games": [
        {
            "id": "1",
            "name": "Food Chemistry",
            "category": "1",
            "image": "/data/flashcardImages/9.png",
            "description": "This question set is bananas!",
            "time_limit": "1800000",
            "high_scores": [
                {
                    "rank": 1,
                    "username": "stephanplus",
                    "score": 14891
                },
                {
                    "rank": 2,
                    "username": "sherbein",
                    "score": 14524
                },
                {
                    "rank": 3,
                    "username": "tbaldwin",
                    "score": 14507
                },
                {
                    "rank": 4,
                    "username": "tbaldwin",
                    "score": 13744
                },
                {
                    "rank": 5,
                    "username": "Amy",
                    "score": 13695
                },
                {
                    "rank": 6,
                    "username": "Connor",
                    "score": 12300
                },
                {
                    "rank": 7,
                    "username": "Connor",
                    "score": 11250
                },
                {
                    "rank": 8,
                    "username": "Laura",
                    "score": 7060
                },
                {
                    "rank": 9,
                    "username": "Becky",
                    "score": 7028
                },
                {
                    "rank": 10,
                    "username": "Joel",
                    "score": 6007
                }
            ],
            "mol_count": 6
        }
    ]
}```
---

####4. get_high_scores
get additional high scores for a specific game
#####Request Fields
	email or username
    password
#####Response Fields
	username
	authenticator
---

####5. load_flashcard_game		
load the flashcard game data
#####Request Fields
	email or username
    password
#####Response Fields
	username
	authenticator
---

####6. submit_flashcard_answer
Submitted when a user answers a question - submit  -1 when the user hits the "start" button
#####Request Fields
	email or username
    password
#####Response Fields
	username
	authenticator
---

####7. end_flashcard_game
Submitted when the game is over or the user goes back to the main menu (the server will automatically clean up old sessions, this just keeps the table from getting too big). Also computes the final score 
#####Request Fields
	email or username
    password
#####Response Fields
	username
	authenticator
---

####8. getTeachersQuestionInfo
For the question set editor - load the question sets to displa
#####Request Fields
	email or username
    password
#####Response Fields
	username
	authenticator
---

####9. loadQuestionSet
login and get basic user data
#####Request Fields
	email or username
    password
#####Response Fields
	username
	authenticator
---

####10. saveQuestionSet
login and get basic user data
#####Request Fields
	email or username
    password
#####Response Fields
	username
	authenticator
---

####11. submitQsetForReview
login and get basic user data
#####Request Fields
	email or username
    password
#####Response Fields
	username
	authenticator
---

####12. getTeachersQuestionSets
login and get basic user data
#####Request Fields
	email or username
    password
#####Response Fields
	username
	authenticator
---

####13. getPDB
Used to get molecule files for the molecule search - actually downloads SDFs
#####Request Fields
	compoundName
#####Response
    SDF file
---


####14. get_media
	get a single piece of media (image/pdb). This is a GET request is sent to /get_media.php
#####Request Fields
	gsi - game_session_id
	mt - media_type (0 for pdbs, 1 for images)
	qid - question_id
#####Example:
	if:
	 game_session_id = 5203f94a9f4b2
	 media_type = pdb
	 question_id = 1
	then:
	 GET /get_media.php?gsi=5203f94a9f4b2&mt=0&qid=1
#####Response:
	Media 