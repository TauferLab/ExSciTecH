EndScreen = function(rank,score,stats){
	console.log(rank);
    $('#rankVal').html(rank);
    $('#finalScoreVal').html( commaSeparateNumber( Math.round(score) ) );
    this.populateStats(stats);
}

EndScreen.prototype.populateStats = function(stats){
    
}

