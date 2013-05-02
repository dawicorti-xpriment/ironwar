require(['jquery', 'core/game'], function ($, Game) {
    var bootstrap = {};
    
    bootstrap.startGame = function () {
        var game = new Game();
        game.start();
    };

    $(bootstrap.startGame);
});
