(function(window, $) {
    'use strict';

    var TOPIC_HTML = '<div class = \'topic\' data-id = \'$uniqueID\' >' +
            '<img class = \'topicImage img-thumbnail\' src = \'$imageSrc\' width = \'114\' height = \'94\' >' +
            '<b>$title</b>' + '<br />' +
            '<div class = \'topicDescription\'>$description</div>' +
            '</div>';
    var NAMES_HTML = '#$rank $name <br />';
    var SCORES_HTML = '$score <br />';
    
    var MenuScreen = function($element) {
        Screen.apply(this, [$element]);
        this.topics = undefined;
        this.$currentTopic = undefined;
    };
 
    MenuScreen.prototype = Object.create(Screen.prototype);
    MenuScreen.prototype.constructor = MenuScreen;

    MenuScreen.prototype.onUpdate = function(delta) {

    };

    MenuScreen.prototype.onPause = function( ) {

    };

    MenuScreen.prototype.onLeave = function( ) {
        disableButtons( );
        $('#mainMenuUI').removeClass('active in');
    };

    MenuScreen.prototype.onResume = function( ) {
        UserData.username = CookieManager.getCookie('username');
        UserData.auth = CookieManager.getCookie('auth');
        if(UserData.username !== null && UserData.auth !== null) {
            enableButtons(this);
            $('#mainMenuUI').addClass('active in');
            $('#accountButton').text(UserData.username);
            FCCommunicationManager.availableGames(UserData.auth, this.showAvailableTopics.bind(this));
        } else {
            window.location = '../login#flashcards';
        }
    };

    MenuScreen.prototype.showAvailableTopics = function(response) {
        var $topicList = $('#topicList').empty();
        this.topics = response.available_games;
        UserData.gameID = this.topics[0].id;
        UserData.gameTimeLimit = this.topics[0].time_limit;

        this.topics.forEach(function (topic, i) {
            insertInfo(
                {
                    '$title': topic.name,
                    '$description': topic.description,
                    '$imageSrc': absoluteUrl(topic.image), // TODO: remove in production
                    //'$imageSrc': topic.image,
                    '$uniqueID': i
                },
                TOPIC_HTML,
                '#topicList'
            );
            topic.dataID = i;
        });

        $topicList.scrollTop(0);
        this.$currentTopic = $topicList.children(':first');
        this.$currentTopic.addClass('selected');
        this.updateRightPanel(this.topics[0]);
    };

    MenuScreen.prototype.updateRightPanel = function(topic) {
        $('#timeLimit')
                .text('Time Limit: ' + Timer.getDigitalRep(topic.time_limit / 1000));
        $('#questionCount').text('Number of Questions: ' + topic.q_count);
        $('#names, #scores').empty();

        topic.high_scores.forEach(function (entry) {
            insertInfo({'$rank': entry.rank, '$name': entry.username}, NAMES_HTML, '#names');
            insertInfo({'$score': entry.score }, SCORES_HTML, '#scores');
        });
        UserData.gameID = topic.id;
        UserData.gameTimeLimit = topic.time_limit;
    };
    
    MenuScreen.prototype.selectTopic = function(topic) {
        
        
        (function updateRightPanel()
        {

        })();
    };

    function insertInfo(replacements, templateString, selector) {
        var result = templateString;
        for(var key in replacements) {
            result = result.replace(key, replacements[key]);
        }

        $(selector).append(result);
    }

    function absoluteUrl (imageSrc) {
        /* TODO Until this is running on the exscitech server, we need to give an absolute path */
        return 'http://exscitech.gcl.cis.udel.edu/' + imageSrc.substr(2, imageSrc.length - 2);
    }

    function enableButtons(menuScreen) {

        $('#mainMenuUI')
            .find('[data-logic=\'tutorial\']')
            .on('click', function() {
                $(this).trigger(new ScreenChangeEvent('tutorial'));
            })
            .end()

            .find('[data-logic=\'scores\']')
            .on('click', function() {
                $(this).trigger(new ScreenChangeEvent('score'));
            })
            .end()

            .find('[data-logic=\'start\']')
            .on('click', function() {
                $(this).trigger(new ScreenChangeEvent('game'));
            });

        $('#topicList').on('click', '.topic[data-id]', function(e) {
            var $topic = $(this);
            menuScreen.updateRightPanel(menuScreen.topics[$topic.data('id')]);
            menuScreen.$currentTopic.removeClass('selected');
            menuScreen.$currentTopic = $topic.addClass('selected');
        });

        $('#errorMessage').find('[data-logic=\'retry\']').on('click', function() {
            CommunicationManager.retry();
            $('#errorMessage').removeClass('in activeTop');
        });
    }

    function disableButtons( ) {
        $('#mainMenuUI, #tutorialUI').off('click');
        $('#topicList').off('click');
    }

    window.MenuScreen = MenuScreen;
})(window, jQuery);