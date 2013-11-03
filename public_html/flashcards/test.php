<html>
<head>

<script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>

<script type="text/javascript">
	    
    function clicky(){
    
        var JSONstr = '{"settings":{"ID":"0","name":"hello","description":"","timeLimit":""},"questions":[{"ID":1,"qText":"test test test","molName":"testosterone","answerChoices":["test1","test2"]},{"ID":2,"qText":"test2","molName":"2,6-Pyridinedimethanol","answerChoices":["methanol","sdagfgdfg","sdfgdfsg","who did what?","no u"]},{"ID":3,"qText":"extra","molName":"1,3-Bis(diphenylphosphino)propane","answerChoices":["1,3-Bis(diphenylphosphino)propane","1,3-Bis(diphenylphosphino)propany"]}],"request_type":"saveQuestionSet","authenticator":"1234"}';
    
        var response= $.ajax({
		    url: "./request_handler.php",
		    type: 'POST',
		    data: JSONstr,
		    async: false
		}).responseText;
    
    
		console.log(response);
    }
</script>


</head>
<body>

<button onclick="clicky()">Submit</button>

</body>