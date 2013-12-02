LoginCommManager = function () {
    
};

LoginCommManager.REQUEST_HANDLER_URL = 'http://docktest.gcl.cis.udel.edu/exscitech_sam/request_handler.php';
LoginCommManager.GET_MEDIA_URL = 'http://docktest.gcl.cis.udel.edu/exscitech_sam/get_media.php';
LoginCommManager.MEDIA_PDB = 0;
LoginCommManager.MEDIA_IMAGE = 1;
LoginCommManager.errorCallback = undefined;

LoginCommManager.login = function ( email, password , callback) {
    'use strict';
    email = email.toLowerCase ();
    var passwordHash = hex_md5 (password + email);

    var requestObject = {};
    requestObject.request_type = 'login';
    requestObject.email = email;
    requestObject.hash = passwordHash;

    CommunicationManager.post ( LoginCommManager.REQUEST_HANDLER_URL, requestObject, callback );
};

LoginCommManager.register = function ( email, password , username, callback) {
    'use strict';
    email = email.toLowerCase ();

    var requestObject = {};
    requestObject.request_type = 'register';
    requestObject.email = email;
    requestObject.password = password;
    requestObject.username = username;

    CommunicationManager.post ( LoginCommManager.REQUEST_HANDLER_URL, requestObject, callback );
};

LoginCommManager.error = function ( info ) {
    if(CommunicationManager.retryCount > 0) {
        $('#retryCount').text('Retry attempts: ' + CommunicationManager.retryCount);
    } else {
        $('#retryCount').empty();
    }
    $('#errorCode').text(info.status);
    $('#errorMessage').addClass('in activeTop');

    if( LoginCommManager.errorCallback != undefined ) {
        LoginCommManager.errorCallback();
    }
};

CommunicationManager.errorCallback = LoginCommManager.error;
