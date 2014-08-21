
<?php
require_once(__DIR__."/../src/php/config.inc");
require_once(__DIR__."/db_conn.inc");
require_once(__DIR__."/boinc_db.inc");
require_once(__DIR__."/util_basic.inc");
require_once(__DIR__."/countries.inc");

function lookup_user_email_addr($email_addr) {
    $e = BoincDb::escape_string($email_addr);
    return BoincUser::lookup("email_addr='$e'");
}

function send_cookie($name, $value, $permanent, $ops=false) {
    // the following allows independent login for projects on the same server
    //
    $master_url = parse_config(get_config(), "<master_url>");
    $url = parse_url($master_url);
    $path = $url['path'];
    if ($ops) {
        $path = substr($path, 0, -1);
        $path .= "_ops/";
    }
    $expire = $permanent?time()+3600*24*365:0;
    setcookie($name, $value, $expire, $path);
}

function is_valid_email_addr($addr) {
    $pattern = '/^([^@]+)@([^@\.]+)\.([^@]{2,})$/';
    $match = preg_match($pattern, $addr);
    return (bool) $match;
}

function sanitize_tags($x) {
    if (function_exists('filter_var')) {
        return filter_var($x, FILTER_SANITIZE_STRING);
    } else {
        return strip_tags($x);
    }
}

function is_ascii($str) {
    // the mb_* functions are not included by default
    // return (mb_detect_encoding($passwd) -= 'ASCII');

    for ($i=0; $i<strlen($str); $i++) {
        $c = ord(substr($str, $i));
        if ($c < 32 || $c > 127) return false;
    }
    return true;
}

function make_user(
    $email_addr, $name, $passwd_hash,
    $country=null, $postal_code=null, $project_prefs=null, $teamid=0
) {
    if (!is_valid_email_addr($email_addr)) return null;
    if (is_banned_email_addr($email_addr)) return null;

    $authenticator = uniqid();
    $cross_project_id = uniqid();
    $now = time();
    if (!is_valid_country($country)) return null;

    $email_addr = BoincDb::escape_string($email_addr);
    $name = sanitize_tags($name);
    $name = BoincDb::escape_string($name);
    $passwd_hash = BoincDb::escape_string($passwd_hash);

    $country = BoincDb::escape_string($country);
    $postal_code = sanitize_tags(BoincDb::escape_string($postal_code));

    $uid = BoincUser::insert("(create_time, email_addr, name, authenticator, country, postal_code, total_credit, expavg_credit, expavg_time, project_prefs, teamid,  send_email, show_hosts, cross_project_id, passwd_hash) values($now, '$email_addr', '$name', '$authenticator', '$country', '$postal_code', 0, 0, unix_timestamp(), '$project_prefs', $teamid, 1, 1, '$cross_project_id', '$passwd_hash')");

    if ($uid) {
        return BoincUser::lookup_id($uid);
    } else {
        return null;
    }
}

function is_banned_email_addr($email_addr) {
    global $banned_email_domains;
    if (isset($banned_email_domains)) {
        foreach($banned_email_domains as $d) {
            $x = strstr($email_addr, $d);
            if ($x == $d) return true;
        }
    }
    return false;
}

function get_user($authenticator){
	$authenticator = BoincDb::escape_string($authenticator);
	
	$user = BoincUser::lookup("authenticator = \"".$authenticator."\"");
	
	return $user;
}

function lookup_user_username($username) {
    $username = BoincDb::escape_string($username);
    return BoincUser::lookup("name='$username'");
}

function isAdmin( $username ){  
    global $MYSQL_SERVER;
    global $MYSQL_USER;
    global $MYSQL_PASSWORD;
    global $MYSQL_FORUM_DB;
    
    $mysqli = new mysqli($MYSQL_SERVER, $MYSQL_USER, $MYSQL_PASSWORD, $MYSQL_FORUM_DB);
    
    $query = "SELECT `Admin` FROM `GDN_User` WHERE `Name` = ?";
    
    if($stmt = $mysqli->prepare($query)){
        $stmt->bind_param("s", $username );
        $stmt->execute();
        
        $stmt->bind_result( $admin );
        
        $admin = 0;
        
        $stmt->fetch();
        
        $stmt->close();
        $mysqli->close();
        
        return $admin == 1;
    }
    else{
        var_dump($mysqli->error);
        return false;
    }
}

?>