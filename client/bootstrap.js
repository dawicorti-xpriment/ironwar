(function () {

    var bootstrap = {};
    
    bootstrap.loadGame = function () {
        require(['core/game'], bootstrap.startGame);
    };

    bootstrap.startGame = function (Game) {
        var game = new Game();
        game.start();
    };

    window.addEventListener('load', bootstrap.loadGame);
})(this);
