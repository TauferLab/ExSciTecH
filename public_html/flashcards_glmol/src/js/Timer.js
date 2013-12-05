Timer = function( timeLimit ){
    this.interval = null;
    this.lastSample = 0;
    this.maxTime = timeLimit;
    this.time = timeLimit;
}

Timer.prototype.start = function(endCallback){
    var timer = this;
    this.lastSample = Date.now();
    
    this.interval = setInterval(function(){timer.update(endCallback)},100);
}

Timer.prototype.stop = function(){
    window.clearInterval(this.interval);
    this.interval = null;
}

Timer.prototype.update = function(endCallback){
    if( this.time > 0 ){
		this.time -= (Date.now() - this.lastSample);
		this.lastSample = Date.now();
	}
	else{
    	this.stop();
    	if( endCallback != undefined ){
        	endCallback();
    	}
	}
	
	$('#timeVal').html( Timer.beautifyTime(this.time) );
	if(this.time < 15000){
        $('#timeVal').css({color:'red'}	);
	}
}

Timer.prototype.addTime = function(amt){
    this.time += amt;
}

Timer.prototype.getVal = function(){
    return this.time - (Date.now() - this.lastSample); 
}

Timer.beautifyTime = function(time){
    var seconds = Math.round(time/1000);
    var minutes = Math.floor(seconds / 60);
    seconds = seconds - minutes * 60;
    
    var tenths = Math.round((time%1000)/100);
    if(tenths < 0)
        tenths = 0;

    var timeStr = undefined;
    if(seconds < 10) {
        timeStr = minutes + ':0' + seconds + '.' + tenths%10;
    } else {
        timeStr = minutes + ':' + seconds + '.' + tenths%10;
    }

    return timeStr;
}