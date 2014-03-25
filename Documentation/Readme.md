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
```{
    "request_type":"login",
    "login":"lololol",
    "pass":"lol1234"
```}
#####Example Response
When an error occurs:
```{
	"success":"false",
	"error":"Invalid username and\/or password."
}```
On success:
```{
    "success":true,
    "username":"lololol",
    "auth":"53319a76bf5a8"
}```
---

####2. register
Register a new user account - only a single password needs to be submitted to the server - either have the user input one password field, or if you have them confirm their password check it client side before submitting the registration request.
#####Request Fields
```{
    "request_type":"register",
    "email":"1234",
    "password":"lol1234",
    "username":"asfd"
}```
#####Response Fields
Failed attempt:
```{
    "success":"false",
    "error":"Invalid email address: you must enter a valid address of the form name@domain"
}```
On success:
```{
    "success":true,
    "username":"lololol",
    "auth":"53319a76bf5a8"
}```

---

####3. get_avail_flashcard_games
get a list of games available for a given user to play
#####Example Request
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
```{
"game_id": 12,
"starting_rank" : 15,
"range": 3
}```
#####Response Fields
```{
"scores": [
    {
        "rank": 15,
        "username": "stephanplus",
        "score": 14891
    },
    {
        "rank": 16,
        "username": "sherbein",
        "score": 14524
    },
    {
        "rank": 17,
        "username": "tbaldwin",
        "score": 14507
    }
],
"success": true
}```
	
---

####5. load_flashcard_game		
load the flashcard game data
#####Request Fields
```{
    "request_type":"load_flashcard_game",
    "authenticator":"53319a76bf5a8",
    "game_id":"1"
}```
#####Example response
```{
    "game_session_id": "53319efea4159",
    "questions": [
        {
            "id": 1,
            "text": "Classify this acid. It is found primarily in seafood and is vital for normal metabolism.",
            "answers": [
                {
                    "id": 0,
                    "text": "Hydrochloric Acid"
                },
                {
                    "id": 1,
                    "text": "Omega-3 fatty acid"
                },
                {
                    "id": 2,
                    "text": "Salic Acid"
                }
            ]
        },
        {
            "id": 2,
            "text": "Which simple sugar is this?",
            "answers": [
                {
                    "id": 0,
                    "text": "Glucose"
                },
                {
                    "id": 1,
                    "text": "Salic Acid"
                },
                {
                    "id": 2,
                    "text": "Fructose"
                }
            ]
        },
        {
            "id": 3,
            "text": "This is Sucrose. Is it a simple or complex sugar?",
            "answers": [
                {
                    "id": 0,
                    "text": "Complex"
                },
                {
                    "id": 1,
                    "text": "Simple"
                }
            ]
        },
        {
            "id": 4,
            "text": "What food can this molecule, pectin, be found in?",
            "answers": [
                {
                    "id": 0,
                    "text": "Pizza"
                },
                {
                    "id": 1,
                    "text": "Hamburgers"
                },
                {
                    "id": 2,
                    "text": "Cake"
                },
                {
                    "id": 3,
                    "text": "Ice cream"
                },
                {
                    "id": 4,
                    "text": "Jello"
                }
            ]
        },
        {
            "id": 5,
            "text": "What type of artificial sweetener is this?",
            "answers": [
                {
                    "id": 0,
                    "text": "Sucralose"
                },
                {
                    "id": 1,
                    "text": "Stevia"
                },
                {
                    "id": 2,
                    "text": "Sugar"
                },
                {
                    "id": 3,
                    "text": "Sucrose"
                }
            ]
        }
    ],
    "name": "Food Chemistry",
    "time_limit": "1800000",
    "description": "This question set is bananas!",
    "imageURL": "/data/flashcardImages/9.png",
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
        }
    ],
    "success": "true"
}```
	
---

####6. submit_flashcard_answer
Submitted when a user answers a question - submit  -1 when the user hits the "start" button
#####Request Fields
```{
    "request_type":"submit_flashcard_answer",
    "game_session_id":"53319efea4159",
    "authenticator":"53319a76bf5a8",
    "question_id":1,
    "answer":"0",
    "game_time":2156
}```
#####Response Fields
```{
    "correct":"false",
    "score":-350,
    "ansID":"0",
    "success":"true"
}```
---

####7. end_flashcard_game
Submitted when the game is over or the user goes back to the main menu (the server will automatically clean up old sessions, this just keeps the table from getting too big). Also computes the final score 
#####Request Fields
```{
    "request_type":"end_flashcard_game",
    "game_time":88228,
    "authenticator":"53319a76bf5a8",
    "game_session_id":"53319efea4159"
}```
#####Response Fields
```{
    "rank":7,
    "final_score":13158.86,
    "success":"true"
}```
	
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