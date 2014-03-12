function get_cookie(c_name){
	var c_value = document.cookie;
	var c_start = c_value.indexOf(" " + c_name + "=");
	if (c_start == -1){
		c_start = c_value.indexOf(c_name + "=");
	}
	
	if (c_start == -1){
		c_value = null;
	}
	else{
		c_start = c_value.indexOf("=", c_start) + 1;
		var c_end = c_value.indexOf(";", c_start);
		if (c_end == -1){
			c_end = c_value.length;
			}
		c_value = unescape(c_value.substring(c_start,c_end));
	}
	
	return c_value;
}

function set_cookie(c_name,value,exdays,path){
	var exdate=new Date();
	exdate.setDate(exdate.getDate() + exdays);
	var c_value=escape(value) + ((path) ? ";path="+path:"") + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
	document.cookie=c_name + "=" + c_value;
}

function delete_cookie( name, path, domain ) {
	if ( get_cookie( name ) )
		document.cookie=name+"="+((path) ? ";path="+path:"")+((domain)?";domain="+domain:"") +
			";expires=Thu, 01 Jan 1970 00:00:01 GMT";
}