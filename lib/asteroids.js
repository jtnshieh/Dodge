const Game = require("./game");
const GameView = require("./game_view");

document.addEventListener("DOMContentLoaded", function() {
  const canvas = document.getElementById("canvas");
  canvas.width = Game.DIM_X;
  canvas.height = Game.DIM_Y;
  const ctx = canvas.getContext("2d");

  var nullGame = new Game(-1);

  new GameView(nullGame, ctx).start();

  const start = () => {
    var game = new Game();

    game.startTimer();
    new GameView(game, ctx).start();

    document.getElementById("life").innerHTML = `Lives: ${game.life}`;
    document.getElementById("score").innerHTML = `Score: ${game.score}`;
    document.getElementById("level").innerHTML = `Level: ${game.level}`;
    document.getElementById("timer").innerHTML = `Time: ${game.time}s`;

    const canvasPosition = game.getPosition(canvas);
    var BB = canvas.getBoundingClientRect();
    canvas.addEventListener("mousemove", (e) => {
      let mouseX = e.clientX - canvasPosition.x - BB.left;
      let mouseY = e.clientY - canvasPosition.y - BB.top;
      game.ship.pos = [mouseX, mouseY];
    });
  };

  window.start = start;

});