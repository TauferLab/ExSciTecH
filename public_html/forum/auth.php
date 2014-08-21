<?php
    require_once(__DIR__."/../BOINC/main.inc");
    
    $auth = $_COOKIE["auth"];
    
    $auth = BoincDb::escape_string($auth);
    $user = BoincUser::lookup("authenticator='$auth'");

    if( !($user===false) ){
        echo "UniqueID=".$user->id."\n";
        echo "Name=".$user->name."\n";
        echo "Email=".$user->email_addr."\n";    
    }
    
?>