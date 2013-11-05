QuestionSetEditor = function ( parentSelector ) {
    
    this.ID = QuestionSetEditor.getURLParameter("ID"); 
    this.generateHTML( parentSelector );
    this.setUpListeners();
    
    this.questionPages = [];
    
    this.username = get_cookie('username');
	this.auth = get_cookie('authenticator');
	
	if( (this.username == null) || (this.auth == null) )
	    console.log("Redirect");
    
    this.commManager = new Communication_Manager();
    
    if( this.ID == "null" ){
        this.ID = 0;
        
        var newQuestPage = new QuestionPage();
        this.questionPages[ newQuestPage.ID ] = newQuestPage;
        
        QuestionSetEditor.selectPage( 0 );
    }
    else{
        this.downloadQSet();
        QuestionSetEditor.selectPage( 0 );
    }
};

QuestionSetEditor.prototype.downloadQSet = function(){

    var reqObj = Object.create(null);
    reqObj.request_type = "loadQuestionSet";
    reqObj.qSetID = this.ID;
    reqObj.authenticator = this.auth;
    
    var qSetEditor = this;

    $.ajax({
        url: "/request_handler.php",
        data:JSON.stringify(reqObj),
        dataType: "text",
        type: 'POST',
        success: function (data){
            qSetEditor.downloadQSetCallback(data);
        }
    }); 
}

QuestionSetEditor.prototype.downloadQSetCallback = function(data) {
    var preloadObj = jQuery.parseJSON( data );
    this.loadSavedSettings( preloadObj.settings );
    this.questionPages = this.loadSavedQuestions( preloadObj.questions );
    QuestionSetEditor.selectPage( 0 );
}

QuestionSetEditor.getURLParameter = function(name) {
    return decodeURI(
        (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1]
    );
}

QuestionSetEditor.activePage = 0;


QuestionSetEditor.prototype.loadSavedQuestions = function ( preload ) {

    //var newQuestPage = new QuestionPage();
    questionPages = [];

    for(i in preload){
        newQuestPage = new QuestionPage( preload[i] );
        questionPages[ newQuestPage.ID ] = newQuestPage;
    }
    
    QuestionPage.counter = preload.length+1;
    MoleculeSearch.counter = preload.length+1;

    return questionPages;    
}

QuestionSetEditor.prototype.loadSavedSettings = function (settings) {
    $("#qsn").val( settings.name );
    $("#qsd").val( settings.description );
    $("#qstl").val( settings.timeLimit );
};

QuestionSetEditor.prototype.generateHTML = function ( parentSelector ){

    var HTML = "";
    HTML += '<h2 style="text-align:center; margin: 7 0;">Question Set Editor</h2>';
    HTML += '<div class="row">';
    HTML += '    <div class="col-md-3" id="leftSidebar">';
    HTML += '           <div class="well ">';
    HTML += '                    <button type="button" class="btn btn-primary" id="genOptBtn">General Settings</button>';
    
    
    HTML += '                <h4 style="text-align:center;">Questions</h4>';
    HTML += '                <div id="questBtnWrapper"></div>';
    

    HTML += '                <button type="button" class="btn btn-primary" id="addQuestBtn">Add Another Question... </button>';
    HTML += '                <button type="button" class="btn btn-primary" id="SaveBtn">Save</button>';
    
    HTML += '            </div>';
    HTML += '    </div>';
    HTML += '    <div class="col-md-9"  id="rightContent"></div>';
    HTML += '</div>';
    
    $(parentSelector).append( HTML );
    
    this.addGenSettingPage( parentSelector );
};

QuestionSetEditor.prototype.addGenSettingPage = function( parentSelector ){

    var HTML = "";
    
    HTML +='<div class="panel panel-primary"  id="qp_0">';
    HTML +='    <div class="panel-heading">';
    HTML +='        <h3 class="panel-title">General Settings</h3>';
    HTML +='    </div>';
    HTML +='    <div class="panel-body">';
    
    HTML += "       <table>";
    HTML += "           <tr>";
    HTML += "               <td>Question Set Name</td>";
    HTML += "               <td><input class='form-control' type='text' id='qsn'></td>";
    HTML += "           </tr>";
    HTML += "           <tr>";
    HTML += "               <td>Description</td>";
    HTML += "               <td><input class='form-control' type='text' id='qsd'></td>";
    HTML += "           </tr>";
    HTML += "           <tr>";
    HTML += "               <td>Time Limit</td>";
    HTML += "               <td><input class='form-control' type='text' id='qstl'></td>";
    HTML += "           </tr>";
    HTML += "           <tr>";
    HTML += "               <td>Render Method</td>";
    HTML += "               <td>";
    HTML += "                   <select class='form-control' id='rndMthd'>";
    HTML += "                       <option value='3D'>3D</option>";
    HTML += "                       <option value='2D'>2D</option>";
    HTML += "                   </select>";
    HTML += "               </td>";
    HTML += "           </tr>";
    HTML += "       </table>";
    
    HTML +='    </div>';
    HTML +='</div>';
    
    $(parentSelector + " #rightContent").append(HTML);
};

QuestionSetEditor.prototype.setUpListeners = function (){
    $("#addQuestBtn").click( function(){
        var newQuestPage = new QuestionPage();
        QuestionSetEditor.instace.questionPages[ newQuestPage.ID ] = newQuestPage;
        
        QuestionSetEditor.selectPage(newQuestPage.ID);
    } );
    
    $("#genOptBtn").click( function(){
        QuestionSetEditor.selectPage( 0 );
    } );
    
    $("#SaveBtn").click( function(){
        QuestionSetEditor.save();
    } );
};

QuestionSetEditor.selectPage = function( pageNum ){
    $( "#qp_" + QuestionSetEditor.activePage ).css( { display: "none" } );
    
    $( "#qp_" + pageNum ).css( { display: "block" } );   
    
    QuestionSetEditor.activePage  = pageNum; 
    MoleculeSearch.activeSearchID = pageNum; 
};

QuestionSetEditor.save = function( ){

    var qSetObj = QuestionSetEditor.instace.toObj();
    
    qSetObj.request_type = "saveQuestionSet";
    qSetObj.authenticator = QuestionSetEditor.instace.auth;
    
    var qSetEditor = QuestionSetEditor.instace;
    
    $.ajax({
        url: "/request_handler.php",
        data:JSON.stringify(qSetObj),
        dataType: "text",
        type: 'POST',
        success: function (data){
            qSetEditor.saveCallback(data);
        }
    }); 
    
    //console.log( QuestionSetEditor.instace.commManager.send_request(qSetObj) );
    
};

QuestionSetEditor.prototype.saveCallback = function(data){
    var result = jQuery.parseJSON( data );
    
    this.ID = result.ID;
    
    window.history.pushState("object or string", "Title", "./index.php?ID="+this.ID );
}

QuestionSetEditor.prototype.toObj = function (){
    var retVal = Object.create(null);
    
    retVal.settings = this.getSettings();
    
    retVal.questions = [];

    var pages = this.questionPages;
    
    for( i in pages){
        retVal.questions.push( pages[i].toObj() );
    }
    
    return retVal;
}

QuestionSetEditor.prototype.getSettings = function (){
    var retVal = Object.create(null);
    
    retVal.ID = this.ID;
    retVal.name = $("#qsn").val();
    retVal.description = $("#qsd").val();
    retVal.timeLimit = $("#qstl").val();
    retVal.renderMethod = $("#rndMthd").val();
    
    return retVal;
};