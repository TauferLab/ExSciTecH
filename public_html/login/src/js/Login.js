function redirect() {
    switch(window.location.hash) {
        case '#flashcards':
            window.location = '../flashcards';
            break;
        case '#jobSubmission':
            window.location = '../jobSubmission';
            break;
        case '#moleculeViewer':
            window.location = '../moleculeViewer';
            break;
        case '#forum':
            window.location = '../forum';
            break;
        default:
            $('#loginUI').removeClass('in active');
            $('#endLogin').addClass('in active');
    }
}

function createDivShow() {
    $('#loginBox').addClass('up');
    setTimeout(function() {
        $('#registerBox').removeClass('up');
    }, 300);
}

function loginDivShow() {
    $('#registerBox').addClass('up');
    setTimeout(function() {
        $('#loginBox').removeClass('up');
    }, 300);
}

function loginComplete(response) {
    if(response.success === 'false') {
        $('#loginButton, #loginMessage').removeClass('hide');
        $('#passLogin').val('');
    } else {
        $('#loginMessage').addClass('hide');
        CookieManager.setCookie('username', response.username, 1, '/');
        CookieManager.setCookie('auth', response.auth, 1, '/');
        redirect();
    }
}

function registerComplete(response) {
    if(response.success === 'false') {
        $('#registerFail').text(response.error);
        $('#registerFail, #registerButton').removeClass('hide');
    } else {
        $('#registerMessage').removeClass('hide');
        $('#registerForm').addClass('hide');
        loginDivShow();
        loginComplete(response);
    }
}

function enableButtons() {
    $('#loginUI')
        .find('.button[data-logic=\'login\']')
        .on('click', function() {
            $('#loginButton').addClass('hide');
            LoginCommManager.login(
                $('#emailLogin').val(),
                $('#passLogin').val(),
                loginComplete
            );
        })
        .end()

        .find('[data-logic=\'showCreate\']')
        .on('click', createDivShow)
        .end()

        .find('[data-logic=\'showLogin\']')
        .on('click', loginDivShow)
        .end()

        .find('.button[data-logic=\'register\']')
        .on('click', function() {
            $('#registerMismatch, #registerFail').addClass('hide');

            if($('#passRegister').val() == $('#passRepRegister').val()) {
                $('#registerButton').addClass('hide');
                LoginCommManager.register(
                    $('#emailRegister').val(),
                    $('#passRegister').val(),
                    $('#usernameRegister').val(),
                    registerComplete
                );
            } else {
                $('#registerMismatch').removeClass('hide');
            }
        });

    $('#errorMessage').find('[data-logic=\'retry\']').on('click', function() {
        CommunicationManager.retry();
        $('#errorMessage').removeClass('in activeTop');
    });

    $('#passLogin').keypress( function( e ) {
        if( e.keyCode == 13 ) {
            $('#loginButton').trigger('click');
        }
    });

    $('#passRepRegister').keypress( function( e ) {
        if( e.keyCode == 13 ) {
            $('#registerButton').trigger('click');
        }
    });

}

$(document).ready(function(){
    var username = CookieManager.getCookie('username');
    var auth = CookieManager.getCookie('auth');
    if(username !== null && auth !== null) {
        redirect();
    } else {
        $('#loginUI').addClass('in active');
        enableButtons();
    }
});