<html>
<head>
    <link href="/bootstrap/css/cerulean.min.css" rel="stylesheet" media="screen">
</head>

<body>



<div id="chart"></div>



<!-- jQuery (necessary for Bootstraps JavaScript plugins) -->
<script src="//code.jquery.com/jquery.js"></script>
<script src="//code.jquery.com/ui/1.10.3/jquery-ui.js"></script>
<!-- Include all compiled plugins (below), or include individual files as needed -->
<script src="/bootstrap/js/bootstrap.min.js"></script>
        
<script type="text/javascript" src="https://www.google.com/jsapi"></script>
<script type="text/javascript">
      google.load("visualization", "1", {packages:["corechart"]});
      google.setOnLoadCallback(makeGraph);

    function makeGraph(){
    
        var JSONstr = '{"questions":[{"id":"1","text":"","molID":"34","answerChoices":["sdf","gdfg"],"answer":"1","responses":[{"game_session_id":"52c99d82c38dc","correct":"1","answer":"0","time":"1426"},{"game_session_id":"52c99d8cedab1","correct":"1","answer":"0","time":"1482"}]}],"success":"true"}';
        
        var data = $.parseJSON(JSONstr);
        
        var questions = data.questions;
        
        var graphData = new Array( ["qNum","correct","incorrect","unanswered"] );
        
        for(var i = 0; i < questions.length; i++){
        
            var question = questions[i];
            
            var correctCount = 0;
            var incorrectCount = 0;
            
            for(var j = 0; j < question.responses.length; j++){
                if( parseInt(question.responses[j].correct) == 1)
                    correctCount++;
                else
                    incorrectCount++;
            }
            
            graphData.push( [ question.id, correctCount, incorrectCount, 0] );
        }
        
        
        var chart = new google.visualization.ColumnChart(document.getElementById('chart'));
        console.log(graphData);
        chart.draw(
        	google.visualization.arrayToDataTable(graphData),
        	{
        	}
        );
    }
   
   
</script>

</body>
</html>