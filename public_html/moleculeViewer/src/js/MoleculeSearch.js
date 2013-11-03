
MoleculeSearch = function ( ) {
    this.ID = MoleculeSearch.counter++;
    
    this.generateHTML(); 
    
    this.getTopMolecules();
    
    var ID = this.ID;
    var molSearch = this;
    
    $( "#mn_" + this.ID ).autocomplete({
        source: this.autocp,
        select: function(event, ui){ molSearch.search( event, ui, ID ) }
    });
    
    this.glmol = new GLmol( 'glmol_'+ this.ID );
    this.glmol.defineRepresentation = glmol_ball_and_stick_rep;
    
    this.glmol.x = 1;
	this.glmol.y = 1;
    this.glmol.rebuildScene();
    this.glmol.spin();
    
    if( typeof preloadName != "undefined" ){
        this.downloadSDF(preloadName);
        $("#mn_" + this.ID).val(preloadName);
    }
    
    this.showRandomMolecule();
    
};

MoleculeSearch.Factory = function ( newSearch ){
    MoleculeSearch.SearchArray[ newSearch.ID ] = newSearch;
}

MoleculeSearch.numOptions = 10;
MoleculeSearch.counter = 1;
MoleculeSearch.activeSearchID = 1;
MoleculeSearch.SearchArray = [];

MoleculeSearch.prototype.generateHTML = function (){
    
    var ID = this.ID;
    
    /*  
    ret  = "    <div class='ui-widget molNameWrapper' id='mnw_" + ID +"' type='text'>";
    ret += "       <label class='molNameLabel' for='mn_" + ID +"'>Molecule Search: </label><br>";
    ret += "       <input class='molName' id='mn_" + ID +"' />";
    ret += "    </div>";
    */
    
    ret  = "<div class=\"panel panel-primary\">";
    ret += "    <div class=\"panel-heading\">";
    ret += "        Molecule Search";
    ret += "    </div>";
    ret += "    <div class=\"panel-body\">";
    ret += "        <div class='ui-widget molNameWrapper' id='mnw_" + ID +"' type='text'>";
    ret += "            <input class='molName' id='mn_" + ID +"' />";
    ret += "        </div>";
    ret += "    </div>";
    ret += "</div>";
    
    ret += "<div class=\"panel panel-primary\">";
    ret += "    <div class=\"panel-body\">";
    ret += "        <button type=\"button\" class=\"btn btn-default\" onClick=\"MoleculeSearch.SearchArray[1].showRandomMolecule()\">Random Molecule</button>";
    ret += "    </div>";
    ret += "</div>";
    
    ret += "<div class=\"panel panel-primary\">";
    ret += "    <div class=\"panel-heading\">";
    ret += "        Top Molecules";
    ret += "    </div>";
    ret += "    <div class=\"panel-body\">";
    ret += "        <div class='list-group' id='topMolList'>";
    ret += "        </div>";
    ret += "    </div>";
    ret += "</div>";
    
    
    
    $("#searchArea").append(ret);
    
    
    ret  = "    <div class ='glmol' id='glmol_" + ID +"'></div>";
    ret += "    <textarea class='glmol_src' id='glmol_" + ID +"_src'></textarea>";
    ret += "    <h4 class='loadingMsg' id='lm_" + ID +"'></h4>";
    $("#gmolArea").append(ret);

}

MoleculeSearch.prototype.getTopMolecules = function (){
    var URL = "./getTopMol.php";

    $.ajax({
            url: URL,
            //dataType: "text/json",
            success: function(data){
                MoleculeSearch.getTopMoleculesCallback(data);
            }
        });
}

MoleculeSearch.getTopMoleculesCallback = function(data){
    data = $.parseJSON(data);

    for( i in data ){
        $("#topMolList").append("<a class='list-group-item' onClick=\"MoleculeSearch.SearchArray[1].downloadSDF('"+data[i]+"');\">"+data[i].capitalize()+"</a>");
    }
}

MoleculeSearch.prototype.autocp = function (request, response) {
    var input = request.term;    
    var time = (new Date).getTime();
    
    var URL = "http://pubchem.ncbi.nlm.nih.gov/pcautocp/pcautocp.cgi?callback=rem_ove&dict=pc_compoundnames&n="+MoleculeSearch.numOptions+"&q="+ input +"&_="+time;

    if( request.term.length > 1 ){
       $.ajax(URL,{
            dataType: "text",
            success: function (data){
                response( MoleculeSearch.autocpCallback(data) );
            }
        });        
    }
    else{
        response([]);
    }
};

MoleculeSearch.autocpCallback = function (data) {
    cleanData = data.replace("rem_ove(", "").replace(");", "");
    
    dataObj = jQuery.parseJSON( cleanData );
    
    return dataObj.autocp_array;
};

MoleculeSearch.prototype.showRandomMolecule = function(){
    $( "#lm_" + this.ID ).html("<img src='./assets/ajax-loader.gif'>   Loading...");
    $( "#lm_" + this.ID ).css( {display : "block", background: ""} );
    
    var URL = "./getRandMol.php";
    var response = $.ajax({url: URL, async : false}).responseText;
    
    this.downloadSDF(response);
    
}

MoleculeSearch.prototype.search = function ( event, ui , ID) {
    this.downloadSDF( ui.item.value );
};

MoleculeSearch.prototype.downloadSDF = function ( compoundName ){
    //var URL = "http://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/" + compoundName + "/SDF?record_type=3d";
    var URL = "./getPDB.php?mName=" + compoundName;
    //var URL = "./request_handler.php";

    var ID = this.ID;
    
    $("#glmol_" + ID +"_src").val("");
    this.glmol.loadMolecule();
    
    $( "#lm_" + ID ).html("<img src='./assets/ajax-loader.gif'>   Loading...");
    $( "#lm_" + ID ).css( {display : "block", background: ""} );

    $("#moleculeName").html(compoundName.capitalize());

    var reqObj = Object.create(null);
    reqObj.compoundName = compoundName;
    reqObj.request_type = "getPDB";



    $.ajax({
            url: URL,
            data:JSON.stringify(reqObj),
            dataType: "text",
            type: 'POST',
            success: function (data){
                MoleculeSearch.downloadCallbackSuccess(data, ID);
            },
            error: function(){
                MoleculeSearch.downloadCallbackFailure();
            }
        }); 
};

MoleculeSearch.downloadCallbackSuccess = function (data, ID) {
    $("#lm_" + ID ).css( {display : "none"} );
    
    try{
        var response = jQuery.parseJSON( data );
        console.log(response);
        $( "#lm_" + ID ).html("Unfortunately that molecule is unavailable. <br> Please try another.");
        $( "#lm_" + ID ).css( {display : "block", background: "red"} );

    }
    catch(err){
        $("#glmol_" + ID +"_src").val(data);
        MoleculeSearch.SearchArray[ID].glmol.loadMolecule();    
    }
};

MoleculeSearch.downloadCallbackFailure = function (data) {
    $("#lm_" + MoleculeSearch.activeSearchID ).css( {opacity : 0} );
    
    $( "#lm_" + ID ).html("Unfortunitely that molecule is unavailable");
    $( "#lm_" + ID ).css( {display : "block", background: "red"} );
}

function glmol_ball_and_stick_rep(){
	var all = this.getAllAtoms();
	var hetatm = this.removeSolvents(this.getHetatms(all));
	this.colorByAtom(all, {});
	this.colorByChain(all);
	
	this.drawBondsAsStick(this.modelGroup, hetatm, this.cylinderRadius / 2.0, this.cylinderRadius, true, true, 0.3); 
	this.drawMainchainCurve(this.modelGroup, all, this.curveWidth, 'P');
	this.drawCartoon(this.modelGroup, all, this.curveWidth);
}

String.prototype.capitalize = function() {
    return this.toLowerCase().replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); }).replace(/(?:^|-)\S/g, function(a) { return a.toUpperCase(); });
};