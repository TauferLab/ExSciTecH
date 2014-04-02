QuestionPage = function ( preload ) {

    if( typeof preload != "undefined" ){
        this.ID = preload.ID;    
        
        this.generateHTML();
        MoleculeSearch.Factory( new MoleculeSearch( "#qp_" + this.ID + " .editorPageMolSearch", preload.molName) );
        
        this.loadValues(preload);
    }
    else{
        this.ID = QuestionPage.counter++;
        this.generateHTML();
        MoleculeSearch.Factory( new MoleculeSearch( "#qp_" + this.ID + " .editorPageMolSearch") );
    }
}

//current is used for adding buttons, selected is for navigating pages.
QuestionPage.currentButtonPage = 1;
QuestionPage.selectedButtonPage = 1;

QuestionPage.selectQuestBtnPage = function(ID){
    if(ID < 1)
        ID = 1;
        
    if(ID > QuestionPage.currentButtonPage)
        ID = QuestionPage.currentButtonPage;

    $("#questBtnPage" + QuestionPage.selectedButtonPage).css({display:"none"});
    
    QuestionPage.selectedButtonPage = ID;
    
    $("#questBtnPage" + ID).css({display:"block"});
    
    if(QuestionPage.selectedButtonPage == QuestionPage.currentButtonPage){
        $("#nextQuestSelBtn").css({opacity:0});
    }
    else{
        $("#nextQuestSelBtn").css({opacity:1});        
    }
    if(QuestionPage.selectedButtonPage == 1){
        $("#prevQuestSelBtn").css({opacity:0});
    }
    else{
        $("#prevQuestSelBtn").css({opacity:1});
    }
}

QuestionPage.prototype.generateHTML = function(){
    var HTML = '<button type="button" class="btn btn-primary questionBtn" id="qsb_'+this.ID+'" onClick="QuestionSetEditor.selectPage('+this.ID+');">'+this.ID+'</button>';
    
    /*if(){
        questBtnPage1
    }*/
    
    var numBtns = MoleculeSearch.SearchArray.length - 1; //Index 0 doesn't count towards total
    
    if( numBtns%32 == 0){
        QuestionPage.currentButtonPage++;
    }
    
    var btnDivName = "questBtnPage" + QuestionPage.currentButtonPage;
    
    if( $("#" + btnDivName).length == 0 ){
        $("#questBtnWrapper").append('<div id="'+btnDivName+'"></div>');
        
        if( QuestionPage.currentButtonPage == 2 ){
            $("#questSelBtns").css({opacity: 1});
        }
        
        QuestionPage.selectQuestBtnPage(QuestionPage.currentButtonPage);
    }
    
    if(QuestionPage.selectedButtonPage != QuestionPage.currentButtonPage){
        QuestionPage.selectQuestBtnPage(QuestionPage.currentButtonPage);
    }
    
    $("#" + btnDivName).append(HTML);

    HTML  = '<div class="panel panel-primary"  id="qp_' + this.ID + '" style="display:none">' +
            '    <div class="panel-heading">' +
            '        <h3 class="panel-title">Question ' + this.ID + '</h3>' +
            '    </div>' +
            '    <div class="panel-body">' +
            '        <div class="row"><div class="col-md-12">' +
            '           <div class="editorPageQuestionText">'+
            '               <label for ="qt_' + this.ID +'">Question Text:</label><br>'+
            '               <input class = "questionText" id  ="qt_' + this.ID +'"></input>'+
            '           </div>' +
            '       </div>'+
            '   </div>' +   
            '   <div class="row">' + 
            '       <div class="col-md-6">'+
            '           <div class="editorPageMolSearch"></div>'+
            '       </div>'+
            '       <div class="col-md-6">'+
            '           <div class="editorPageAnswers">'+
            '               <h4 style="text-align:center">Answer Choices</h4>'+
            '               <p style="text-align:center">(Order will be randomized)</p>'+
            '               <table class="editorPageAnswersTable" id="epat_' + this.ID +'">'+
            '                   <tr>'+
            '                       <td>Correct Answer:</td>'+
            '                       <td><input type="text" id="epac_' + this.ID +'_0"></td>'+
            '                   </tr>'+
            '                   <tr>'+
            '                       <td>Other Answers:</td>'+
            '                       <td><input type="text" id="epac_' + this.ID +'_1"></td>'+
            '                   </tr>'+
            '                   <tr>'+
            '                       <td></td>'+
            '                       <td> <button type="button" class="btn btn-primary" onClick="QuestionPage.addAnswerChoice(' + this.ID +');">Add...</button> </td>'+
            '                   </tr>'+
            '               </table>'+
            '           </div>'+
            '       </div>'+
            '   </div>'+
            '</div>';
    
    $("#rightContent").append(HTML);
}

QuestionPage.prototype.loadValues = function ( preload ) {
    $("#qt_"+this.ID).val( preload.qText );

    for( i = 2; i<preload.answerChoices.length; i++){
        QuestionPage.addAnswerChoice( this.ID );
    }

    for( i in preload.answerChoices ){    
        $("#epac_" + this.ID +"_"+i).val( preload.answerChoices[i] );
    }
}

QuestionPage.addAnswerChoice = function(ID){

    var numChoices = $("#qp_" + ID +" .editorPageAnswersTable tr").length;

    if( numChoices < 6 ){
        var HTML = "<tr>"+
        "<td></td>"+
        "<td><input type='text' id='epac_" + ID + "_" + (numChoices-1) +"'></td>"+
        "</tr>";
        
        $("#qp_" + ID + " .editorPageAnswersTable tr:last").before(HTML);    
    }
    else{
        console.log("Maximum answer limit reached");
    }

    
}

QuestionPage.prototype.toObj = function(){
    
    var retVal = Object.create(null);

    retVal.ID = this.ID;
    retVal.qText   = $("#qt_"+this.ID).val();
    retVal.molName = $("#mn_"+this.ID).val();
    retVal.answerChoices = [];
    
    var numChoices = $("#qp_" + this.ID +" .editorPageAnswersTable tr").length -1;
    
    for( i = 0; i < numChoices; i++){
        retVal.answerChoices.push( $("#epac_" + this.ID +"_" + i).val() );
    }
    
    return retVal;    
    
}

QuestionPage.counter = 1;
QuestionPage.activePageID = 0;