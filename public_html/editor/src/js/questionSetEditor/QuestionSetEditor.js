QuestionSetEditor = function ( parentSelector ) {
    
    this.ID = QuestionSetEditor.getURLParameter("ID"); 
    this.generateHTML( parentSelector );
    this.setUpListeners();
    
    this.questionPages = [];
    
    this.username = get_cookie('username');
	this.auth = get_cookie('auth');
	
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
    console.log(settings);

    $("#qsn").val( settings.name );
    $("#qsd").val( settings.description );
    $("#qstl").val( settings.timeLimit );
    $("#selectedImg").attr("src", settings.image );
};

QuestionSetEditor.prototype.generateHTML = function ( parentSelector ){

    var HTML = "";
    HTML += '<h2 style="text-align:center; margin: 7 0;">Question Set Editor</h2>';
    HTML += '<div class="row">';
    HTML += '    <div class="col-md-3" id="leftSidebar">';
    HTML += '           <div class="well ">';
    HTML += '                <button type="button" class="btn btn-primary settingBtn" id="backBtn">Back to Dashboard</button>';
    HTML += '                <button type="button" class="btn btn-primary settingBtn" id="genOptBtn">General Settings</button>';
    HTML += '                <button type="button" class="btn btn-primary settingBtn" id="SaveBtn">Save</button>';
        
    HTML += '                <h4 style="text-align:center;">Questions</h4>';
    HTML += '                <div id="questBtnWrapper"></div>';

    HTML += '                <button type="button" class="btn btn-primary settingBtn" id="addQuestBtn">Add Another Question... </button>';
    
    HTML += '            </div>';
    HTML += '    </div>';
    HTML += '    <div class="col-md-9"  id="rightContent"></div>';
    HTML += '</div>';
    HTML += '<div id="overlayBg"></div>';
    HTML += '<div class="row">';
    HTML += '   <div id="imgSelOverlay" class="panel panel-default col-sm-8 col-sm-offset-2 col-md-8 col-md-offset-2">';
    HTML += '       <div class="panel-heading">';
    HTML += '           <h3 class="panel-title">Select Image</h3>';
    HTML += '       </div>';
    HTML += '       <div class="panel-body" id="imgSelBody"></div>';
    HTML += '   </div>';
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
    HTML += "               <td>Name</td>";
    HTML += "               <td><input class='form-control' type='text' id='qsn'></td>";
    HTML += "           </tr>";
    HTML += "               <td>Image</td>";
    HTML += '               <td>';
    HTML += '                   <img id="selectedImg" class="topicImage img-thumbnail" src="">';
    HTML += '                   <button id="imgSelBtn" class="btn btn-info btn-sm">Select an Image</button>';
    HTML += '               </td>';
    HTML += "           </tr>";
    HTML += "           <tr>";
    HTML += "               <td>Description</td>";
    HTML += "               <td><input class='form-control' type='text' id='qsd' style='height:100px;'></td>";
    HTML += "           </tr>";
    HTML += "           <tr>";
    HTML += "               <td>Time Limit</td>";
    HTML += '               <td>';
    HTML += '                   <div id="timeLimit" style="width:15%; float:left;">5:00</div>';
    HTML += '                   <input class="form-control" type="text" id="qstl" style="display:none" value="300000">';
    HTML += '                   <div id="timeLimitSlider" style="width:85%; float:right;"></div>';
    HTML += '               </td>';
    HTML += "           </tr>";
    /*
    HTML += "           <tr>";
    HTML += "               <td>Public</td>";
    HTML += "               <td><input class='form-control' type='checkbox' id='qspub'></td>";
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
    */
    HTML += "       </table>";
    HTML +='    </div>';
    HTML +='</div>';
    
    $(parentSelector + " #rightContent").append(HTML);
    
    $( "#timeLimitSlider" ).slider({
        min: 15,
        max: 1800,
        value: 300,
        step: 15,
        slide: function( event, ui ) {
            $("#timeLimit").html(QuestionSetEditor.prettyPrintTime(ui.value));
            $("#qstl").val(ui.value*1000);
        }
    });
};

QuestionSetEditor.prettyPrintTime = function(time){
    // Minutes and seconds
    var mins = ~~(time / 60);
    var secs = time % 60;
    
    // Hours, minutes and seconds
    var hrs = ~~(time / 3600);
    var mins = ~~((time % 3600) / 60);
    var secs = time % 60;
    
    // Output like "1:01" or "4:03:59" or "123:03:59"
    ret = "";
    
    if (hrs > 0)
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    
    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
}

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
    
    $("#imgSelBtn").click( function(){
        QuestionSetEditor.openImageSelect();
    });
    $("#backBtn").click( function(){
        window.location = "/editor";
    });
};

QuestionSetEditor.openImageSelect = function(){
    var imgArray = [];
    

        imgArray.push("/data/flashcardImages/apples.jpg");
        imgArray.push("/data/flashcardImages/biochem.png");
        imgArray.push("/data/flashcardImages/functional_groups.png");
        imgArray.push("/data/flashcardImages/hydrocarbons.png");
        imgArray.push("/data/flashcardImages/vitamins.jpg");
        for(var j =1; j< 25;j++){
            imgArray.push("/data/flashcardImages/"+j+".png");
        } 

    
    $("#imgSelBody").html("");

    for(i in imgArray){
        $("#imgSelBody").append('<img class="topicImage img-thumbnail imgSelImg" src="'+imgArray[i]+'">');
    }

    $("#overlayBg").show();
    $("#imgSelOverlay").show();
    
    $(".topicImage").click(function(){
        QuestionSetEditor.selectImg( this );
    });
}

QuestionSetEditor.selectImg = function(el){
    $("#selectedImg").attr( "src", $(el).attr("src") );
    $("#overlayBg").hide();
    $("#imgSelOverlay").hide();
}

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
    
};

QuestionSetEditor.prototype.saveCallback = function(data){
    var result = jQuery.parseJSON( data );
    
    this.ID = result.ID;
    
    window.history.pushState("object or string", "Title", "./questionSetEditor.php?ID="+this.ID );
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
    retVal.image = $("#selectedImg").attr("src");
    retVal.timeLimit = $("#qstl").val();
    
    if($("#qspub").is(':checked')){
        retVal.private = 0;    
    }
    else{
        retVal.private = 1;
    }
    
    //TODO: add support for 2D question sets
    //retVal.renderMethod = $("#rndMthd").val();
    retVal.renderMethod = "3D";
    
    return retVal;
};
