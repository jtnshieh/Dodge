class GameView {
  constructor(game, ctx) {
    this.ctx = ctx;
    this.game = game;
  }

  start() {
    //start the animation
    requestAnimationFrame(this.animate.bind(this));
  }

  animate() {
    this.game.step();
    this.game.draw(this.ctx);
    this.game.addAsteroids();
    //every call to animate requests causes another call to animate
    requestAnimationFrame(this.animate.bind(this));
  }

}

module.exports = GameView;
