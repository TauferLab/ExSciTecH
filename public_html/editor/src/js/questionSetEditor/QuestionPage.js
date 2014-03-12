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

QuestionPage.prototype.generateHTML = function(){
    var HTML = '<button type="button" class="btn btn-primary questionBtn" id="qsb_'+this.ID+'" onClick="QuestionSetEditor.selectPage('+this.ID+');">'+this.ID+'</button>';
    
    $('#questBtnWrapper').append(HTML);
    var height = 40 *11;// * Math.ceil(this.ID/4);
    
    $('#questBtnWrapper').css({height: height});
    

    HTML  ='<div class="panel panel-primary"  id="qp_' + this.ID + '" style="display:none">';
    HTML +='    <div class="panel-heading">';
    HTML +='        <h3 class="panel-title">Question ' + this.ID + '</h3>';
    HTML +='    </div>';
    HTML +='    <div class="panel-body">';
    
    HTML += ' <div class="row"><div class="col-md-12">';
    HTML += "       <div class='editorPageQuestionText'>"+
            "           <label for ='qt_" + this.ID +"'>Question Text:</label><br>"+
            "           <input class = 'questionText' id  ='qt_" + this.ID +"'></input>"+
            "       </div>";
    HTML += '</div></div>';        
           
    HTML += ' <div class="row">'; 
    HTML += '       <div class="col-md-6"><div class="editorPageMolSearch"> </div></div>';
    HTML += "       <div class='col-md-6'>"+
            "       <div class='editorPageAnswers'>"+
            "           <h4 style='text-align:center'>Answer Choices</h4> <p style='text-align:center'>(Order will be randomized)</p>"+
            "           <table class='editorPageAnswersTable' id='epat_" + this.ID +"'>"+
            "               <tr>"+
            "                   <td>Correct Answer:</td>"+
            "                   <td><input type='text' id='epac_" + this.ID +"_0'></td>"+
            "               </tr>"+
            "               <tr>"+
            "                   <td>Other Answers:</td>"+
            "                   <td><input type='text' id='epac_" + this.ID +"_1'></td>"+
            "               </tr>"+
            "               <tr>"+
            "                   <td></td>"+
            '                   <td> <button type="button" class="btn btn-primary" onClick="QuestionPage.addAnswerChoice(' + this.ID +');">Add...</button> </td>'+
            "               </tr>"+
            "            </table>"+
            "          </div>"+
            "       </div>";

    HTML += "   </div>";    
    HTML += "</div>";
    
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