(function(window, $) {
    'use strict';

    var MoleculeGame = function() {
        var gameScreen = new GameScreen($('#gameUI, #loadingUI'));
        var tutorialScreen = new TutorialScreen($('#tutorialUI'));
        var menuScreen = new MenuScreen($('#mainMenuUI'));

        Game.apply(this, [menuScreen]);

        $(document).on('screenChange', screenChangeHandler.bind(this));
        this.addScreen('game', gameScreen);
        this.addScreen('tutorial', tutorialScreen);
        this.addScreen('menu', menuScreen);

        menuScreen.onResume();
    };

    MoleculeGame.prototype = Object.create(Game.prototype);
    MoleculeGame.prototype.constructor = MoleculeGame;

    MoleculeGame.prototype.update = function(delta) {
        this.currentScreen.onUpdate(delta);
    };

    MoleculeGame.prototype.changeScreens = function(screenID) {
        Game.prototype.changeScreens.call(this, screenID);
    };

    function screenChangeHandler(e) {
        this.changeScreens(e.screenID);
    }

    window.MoleculeGame = MoleculeGame;
})(window, jQuery);