$(function(){
    new TeacherDashboard();
});

TeacherDashboard = function(){
    this.auth = get_cookie('auth');

    this.questionSets = this.getQuestionSets();
    
    this.setUpListeners();
}

TeacherDashboard.prototype.getQuestionSets = function(){

    var reqObj = new Object(null);
    reqObj.request_type = 'getTeachersQuestionSets';
    reqObj.auth = this.auth;

    $.ajax({
            url: '/request_handler.php',
            data:JSON.stringify(reqObj),
            dataType: 'text',
            type: 'POST',
            success: function (data){
                this.getQuestionsSetsCallback(data);
            }.bind(this)
    }); 
}

TeacherDashboard.prototype.setUpListeners = function(){
    $("#genTab").click(function(){
        $("#genTab").addClass("active");
        $("#guessTab").removeClass("active");
        $("#scoreTab").removeClass("active");
    
        $("#generalStats").show();
        $("#scoreChart").hide();        
        $("#guessChart").hide();
    });
    
    $("#guessTab").click(function(){
        $("#genTab").removeClass("active");
        $("#guessTab").addClass("active");
        $("#scoreTab").removeClass("active");
        
        $("#generalStats").hide();
        $("#scoreChart").hide();        
        $("#guessChart").show();
    });
    $("#scoreTab").click(function(){
        $("#genTab").removeClass("active");
        $("#guessTab").removeClass("active");
        $("#scoreTab").addClass("active");
            
        $("#generalStats").hide();
        $("#scoreChart").show();        
        $("#guessChart").hide();
    });
}

TeacherDashboard.prototype.getQuestionsSetsCallback = function( data ){
    
    data = $.parseJSON(data);
    
    var me = this;
    
    if(data.questionSets.length > 0){
        
        for (var i=0; i<data.questionSets.length; i++) {
            var question = data.questionSets[i];
        
            $("#questionSetList").append(
            '<div class="panel panel-default questionSet">'+
            '    <div class="panel-body">'+
            '        <img class="topicImage img-thumbnail" src="'+question.image+'">'+
            '        <span class="topicTitle" id="tt_'+question.id+'" name="'+question.name+'"><h4>'+question.name+'</h4></span>'+
            '        <a class="editLink" href="questionSetEditor.php?ID='+question.id+'">Edit</a>'+
            '    </div>'+
            '</div>');
            
            $('#tt_'+question.id).click(function(){
               var qSetID = this.id.split("_")[1];
    
               me.getQuestionSetInfo(qSetID);
               
               $("#statTitle").html( "Statistics - " + $(this).attr('name') );
               
               $("#chartsContainer").hide();
               $("#loadingIcon").show();
    
            });
            
        }
        
        this.getQuestionSetInfo(data.questionSets[0].id);
        $("#statTitle").html( "Statistics - " + data.questionSets[0].name);
        
        $("#loadingContainer").hide();
        $("#contents").show();
        
    }else{
        $("#loadingContainer").html('<a href="./questionSetEditor.php" class="btn btn-success btn-lg">Click here to create your first question set</a>');   
    }
}

TeacherDashboard.prototype.getQuestionSetInfo = function(qSetID){
    var reqObj = new Object(null);
    reqObj.request_type = 'getTeachersQuestionSetInfo';
    reqObj.auth = this.auth;
    reqObj.questionSetID = qSetID;


    $.ajax({
            url: '/request_handler.php',
            data:JSON.stringify(reqObj),
            dataType: 'text',
            type: 'POST',
            success: function (data){
                this.getQuestionsSetInfoCallback(data,qSetID);
            }.bind(this)
    });
    
}

TeacherDashboard.prototype.getQuestionsSetInfoCallback = function( data, qSetID ){
    
    data = $.parseJSON(data);
    
    console.log(data);
    
    var questions = data.questions;
        
    var guessGraphData = new Array( ["qNum","correct","incorrect","unanswered"] );
    
    for(var i = 0; i < questions.length; i++){
    
        var question = questions[i];
        
        var correctCount = 0;
        var incorrectCount = 0;
        
        for (var j in question.responses){
            if(question.responses[j].length > 1)
                incorrectCount++;
            else
                correctCount++;
        }
        
        var unansweredCount = data.scores.length - correctCount - incorrectCount;
        
        guessGraphData.push( [ question.id, correctCount, incorrectCount, unansweredCount] );
    }
    
    var guessChart = new google.visualization.ColumnChart(document.getElementById('guessChart'));
    guessChart.draw(
    	google.visualization.arrayToDataTable(guessGraphData),
    	{
    	    isStacked: true,
    	    legend: { position: 'top' },
    	    vAxis:{
        	    gridlines: { count: 0 },
        	    textStyle : { color: "white"}
    	    },
    	    chartArea:{left:50,top:75,width:"85%",height:"75%"},
    	    title: 'Outcome of First Guess',
            hAxis: {title: 'Question #'},
    	    height: 500,
    	    width: 700
    	}
    );
    
    var scoreArray = new Array();
    
    var averageSum = 0;
    
    for(var i = 0; i < data.scores.length; i++){
        scoreArray.push( parseInt(data.scores[i].score) );
        averageSum += parseInt(data.scores[i].score);
    }
    
    scoreArray.sort();
    
    //console.log( Math.round(scoreArray.length*0.25) );
    
    var min = scoreArray[0];
    var firstQuarter = scoreArray[Math.round(scoreArray.length*0.25)];
    var mid = scoreArray[scoreArray.length*0.50];
    var thirdQuarter = scoreArray[Math.round(scoreArray.length*0.75)];
    var max = scoreArray[scoreArray.length-1]
    
    var scoreChartData = google.visualization.arrayToDataTable([ ["Scores",min,firstQuarter,thirdQuarter,max] ],true);
    
    
    
    var scoreChart = new google.visualization.CandlestickChart(document.getElementById('scoreChart'));
    scoreChart.draw(scoreChartData, {
        legend:'none',
        height: 500,
        chartArea:{left:75,top:75,width:"85%",height:"75%"},
        width: 700,
        title: 'Score Distribution',
        bar: { groupWidth : "10%" },
    });
    
    $("#generalStats").html( this.generateSettingsHTML(data,min,averageSum/scoreArray.length,max,qSetID,data.reviewStatus) );
    
	$("#reviewSubBtn").click(function(){
		$(".reviewStatus").html("Submitting...");
		
    	var reqObj = new Object(null);
	    reqObj.request_type = 'submitQsetForReview';
	    reqObj.auth = this.auth;
	    reqObj.questionSetID = qSetID;
	
	    $.ajax({
	            url: '/request_handler.php',
	            data:JSON.stringify(reqObj),
	            dataType: 'text',
	            type: 'POST',
	            success: function (data){
	                $(".reviewStatus").html("Question set has been submitted and is pending review.");
	            }.bind(this)
	    });
	}.bind(this));
    
    $("#chartsContainer").show();
    $("#loadingIcon").hide();

}

TeacherDashboard.prototype.generateSettingsHTML = function(data,minScore,avgScore,maxScore,qSetID,reviewStatus){

    var numPlays = data.scores.length;

    var HTML = "";
    HTML += "       <table id='genStatTable' style=''>";
    HTML += "           <tr>";
    HTML += "               <td>URL</td>";
    HTML += "               <td><input class='form-control' type='text' id='qsn' value='https://exscitech.org/flashcards/play.php?ID="+qSetID+"' style='width: 300px'></td>";
    HTML += "           </tr>";
    HTML += "           <tr>";
    HTML += "               <td># of Plays</td>";
    HTML += "               <td style='text-align: right'>"+numPlays+"</td>";
    HTML += "           </tr>";
    HTML += "           <tr>";
    HTML += "               <td>High Score</td>";
    HTML += "               <td style='text-align: right'>"+maxScore+"</td>";
    HTML += "           </tr>";
    HTML += "           <tr>";
    HTML += "               <td>Average Score</td>";
    HTML += "               <td style='text-align: right'>"+Math.round(avgScore)+"</td>";
    HTML += "           </tr>";
    HTML += "           <tr>";
    HTML += "               <td>Low Score</td>";
    HTML += "               <td style='text-align: right'>"+minScore+"</td>";
    HTML += "           </tr>";
    
    switch(reviewStatus){
	    case "unsubmitted": HTML += "<tr><td class='reviewStatus' colspan='2'><p>Do you want this question set available to the public?</p><button id='reviewSubBtn' type='button' class='btn btn-success'>Submit For Review</button></td></tr>";    break;
	    case "underReview": HTML += "<tr><td class='reviewStatus' colspan='2'>This question set is pending review.</td></tr>";   break;
   	    case "approved":	HTML += "<tr><td class='reviewStatus' colspan='2'>This question set has been approved and is available publicly.</td></tr>"; break;
    }

    HTML += "   </table>";

    return HTML;
    
    
    /*
    GameURL
    # of Plays
    High Score
    Average Score
    Low Score
    */
}