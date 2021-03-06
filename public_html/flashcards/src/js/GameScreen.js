GameScreen = function( questionSessObj ){
    this.questions = questionSessObj.questionSet;
    this.sessionID = questionSessObj.sessionID;
    this.currentQuestion = -1;
    this.gameGLmol = null;
    this.score = 0;
    this.stats = new StatManager();
    
    this.timer = new Timer(questionSessObj.timeLimit);
    this.initGLmol();

    this.lockResponses = false;
}

GameScreen.prototype.start = function(){
    $("#startUI").css({display:"none"});
    $("#gameUI").css({display:"block"});
    $("#endUI").css({display:"none"});

    $("#qProgressBar").css({width: '0%'});
   
    this.timer.start($.proxy(this.endGame, this));

    this.loadNextQuestion();
}

GameScreen.prototype.initGLmol = function ( ){
    this.gameGLmol = new GLmol("GLMolFrame",true);
    this.gameGLmol.doSpin = true;
}

GameScreen.prototype.loadNextQuestion = function() {
    this.currentQuestion++;
    
    if( this.currentQuestion == this.questions.length ){
        this.endGame();
        return;
    }

    var currentProgress = ((this.currentQuestion + 1) / this.questions.length) * 100;
    this.updateProgressBar (currentProgress);

    var question = this.questions[this.currentQuestion];
    this.updateButtons(question.answers);

    this.gameGLmol.loadMoleculeStr(false, question.PDBtext );
    this.gameGLmol.x = 1;
    this.gameGLmol.y = 1;
    this.gameGLmol.rebuildScene();
    if( this.currentQuestion == 0 ){
        this.gameGLmol.spin();
    }
    
    if(question.text == ""){
        $("#qTextInfoWin").css({opacity:0});
    }
    else{
        $("#qTextInfoWin").css({opacity:1});
        $("#qText").html(question.text);    
    }
    
    var self = this.gameGLmol;
    self.WIDTH = self.container.width() * self.aaScale;
    self.HEIGHT = self.container.height() * self.aaScale;
    self.ASPECT = self.WIDTH / self.HEIGHT;
    self.renderer.setSize(self.WIDTH, self.HEIGHT);
    self.camera.aspect = self.ASPECT;
    self.camera.updateProjectionMatrix();
    self.show();
    self.rebuildScene();

    this.lockResponses = false;
} 

GameScreen.prototype.updateProgressBar = function ( currentProgress ) {    
    var progressPercentage = parseInt(currentProgress, 10) + '%';
    $("#qProgressBar").css({width: progressPercentage});
}

GameScreen.prototype.updateButtons = function( answers ){
    $("#answerBtns").html("");

    var parent = this;
    for( var i = 0; i < answers.length;i++){
         $("#answerBtns").append('<button type="button" class="questionBtn btn btn-default btn-block" id="ansBtn_'+answers[i].id+'">'+answers[i].text+'</button>');

        $( '#ansBtn_' + i).prop("disabled", false);
        
        $('#ansBtn_'+answers[i].id).click( function(){
            if(parent.lockResponses == false) {
                parent.lockResponses = true;
                var ansID = ($(this).attr('id')).split("_")[1];
                
                if( ansID == undefined ){
                    console.log("error");
                    return;
                }
                parent.submitAnswer( ansID );
            }
        });
    }
}

GameScreen.prototype.submitAnswer = function( ansID ){

    var reqObj = new Object();
    reqObj.request_type = "submit_flashcard_answer";
    reqObj.game_session_id = this.sessionID;
    reqObj.authenticator = window.sessionInfo.auth;
    reqObj.question_id = this.questions[this.currentQuestion].id;
    reqObj.answer = ansID;
    reqObj.game_time = this.timer.maxTime - this.timer.getVal();
    
    var parent = this;
    
    $.ajax({
            url: "../request_handler.php",
            type: 'POST',
            data: JSON.stringify(reqObj),
            success: function(data){
                data = JSON.parse(data);
                parent.lockResponses = false;
                parent.submitAnswerCallback(data);
            }
    });
}

GameScreen.prototype.submitAnswerCallback = function(data){

    $( '#ansBtn_' + data.ansID ).removeClass("btn-default");
    if(data.correct){
        $( '#ansBtn_' + data.ansID ).addClass("btn-success");
    }
    else{
        $( '#ansBtn_' + data.ansID ).addClass("btn-danger");
    }
    
    this.stats.store(data);
    
    this.updateScore(data.score);
    
    if(!data.correct) {
        $( '#ansBtn_' + data.ansID ).prop("disabled", true);
    } else {
        this.lockResponses = true;
        for(var i = 0; i < this.questions[this.currentQuestion].answers.length; i++) {
            if(i != data.ansID) {
                $( '#ansBtn_' + this.questions[this.currentQuestion].answers[i].id ).prop("disabled", true);
            }
        }
    }
}

GameScreen.prototype.updateScore = function( score ){

    var scoreDiff = score - this.score;
    this.score = score;
    
    var parent = this;
    
    $('#scoreVal').html( commaSeparateNumber( score ) );
    
    if(score < 0){
        $('#scoreVal').css({color: 'red'});    
    }
    else{
        $('#scoreVal').css({color: 'white'});        
    }
    
    $('#scoreDiff').finish();
    $('#scoreDiff').css({"opacity":"1"});
    
    if( scoreDiff > 0 ){
        $('#scoreDiff').css({color: 'green'});
        $('#scoreDiff').html( '+' + commaSeparateNumber(scoreDiff) );
        $('#scoreDiff').animate(
                        {"opacity":"0"},
                        500,
                        "swing",
                        function(){
                            parent.loadNextQuestion();
                        });
    }
    else{
        $('#scoreDiff').css({color: 'red'});
        $('#scoreDiff').html( commaSeparateNumber(scoreDiff) );
        $('#scoreDiff').animate(
                        {"opacity":"0"},
                        1000,
                        "swing");
    }
}

GameScreen.prototype.endGame = function( ){

    var reqObj = new Object(null);
    reqObj.request_type = "end_flashcard_game";
    reqObj.game_time = this.timer.maxTime - this.timer.getVal();
    reqObj.authenticator = window.sessionInfo.auth;
    reqObj.game_session_id = this.sessionID;

    var parent = this;

    $.ajax({
        url: "../request_handler.php",
        type: 'POST',
        data: JSON.stringify(reqObj),
        success: function(data){
            data = JSON.parse(data);
            parent.endGameCallback(data);
        }
    });
}

GameScreen.prototype.endGameCallback = function( data ){

    window.endScreen = new EndScreen( data.rank, data.final_score, this.questionStats );
    
    $("#startUI").css({display:"none"});
    $("#gameUI").css({display:"none"});
    $("#endUI").css({display:"block"});
}