const GameView = require("./game_view");
const Asteroid = require("./asteroid");
const Ship = require("./ship");
const Util = require("./util");

class Game {
  constructor(lifepoints = 3) {
    this.asteroids = [];
    this.ship = new Ship({ game: this, pos:[0, Game.DIM_Y]});
    this.asteroidCount = 0;
    this.score = 0;
    this.life = lifepoints;
    this.time = 0;
    this.level = 1;
    this.ticker = null;
  }

  levelUp() {
    this.asteroids.forEach((asteroid) => {
      asteroid.vel[0] -= 0.01;
      asteroid.vel[1] += 0.01;
    });
  }

  add(object) {
    if (object instanceof Asteroid) {
      this.asteroids.push(object);
    } else {
      throw "unknown type of object";
    }
  }

  addAsteroids() {
    if (this.asteroids.length < Game.NUM_ASTEROIDS) {
      const diff = Game.NUM_ASTEROIDS - this.asteroids.length;
      for (let i = 0; i < (diff); i++) {
        this.asteroidCount ++;
        if (this.asteroidCount%30 === 0) {
          this.add(new Asteroid({ game: this, color:"#008000"}));
        } else if (this.asteroidCount%7 === 0) {
          this.add(new Asteroid({ game: this, radius: 5}));
        } else if (this.asteroidCount%4 === 0) {
          this.add(new Asteroid({ game: this, vel: [-2,2]}));
        } else {
          this.add(new Asteroid({ game: this}));
        }
      }
    }
  }

  allObjects() {
    return [].concat(this.ship, this.asteroids);
  }

  draw(ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    ctx.fillStyle = Game.BG_COLOR;
    ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);

    this.allObjects().forEach((object) => {
      object.draw(ctx);
    });

    ctx.font = '100px';
    ctx.textAlign = 'center';
    if (this.life === 0) {
      ctx.fillText("GAME OVER");
      this.ship.radius = 0;
    }

    if (this.life === -1) {
      this.ship.radius = 0;
    }
  }

  moveObjects() {
    this.allObjects().forEach((object) => {
      if (object instanceof Asteroid) {
        object.move();
      }
    });
  }

  isAsteroidOutOfBounds(pos) {
    return (pos[0] < 0) || (pos[1] > Game.DIM_Y);
  }

  // isOutOfBounds(pos) {
  //   return (pos[0] < 0) || (pos[1] < 0) ||
  //     (pos[0] > Game.DIM_X) || (pos[1] > Game.DIM_Y);
  // }

  checkOutOfBounds() {
    for (let i = 0; i < this.asteroids.length; i++) {
      if (this.isAsteroidOutOfBounds(this.asteroids[i].pos)) {
        this.remove(this.asteroids[i]);
      }
    }
    // if (this.isOutOfBounds(this.ship.pos)) {
    //   console.log("SHIP IS OUT OF BOUNDS");
    // }
  }

  remove(object) {
    if (object instanceof Asteroid) {
      this.asteroids.splice(this.asteroids.indexOf(object), 1);
    } else {
      throw "unknown type of object";
    }
  }

  randomPosition() {
    let pos = [
      (200+Math.random()*1500),
      (Math.random()*-500)
    ];
    return pos;
  }

  checkCollisions() {
    for (let i = 0; i < this.asteroids.length; i++) {
      const asteroid = this.asteroids[i];

      if (this.ship.isCollidedWith(asteroid) && asteroid.color === "#008000") {
        // increase points
        this.remove(asteroid);
        this.score ++;
        document.getElementById("score").innerHTML = `Score: ${this.score}`;
      } else if (this.ship.isCollidedWith(asteroid)) {
        // subtract one life
        this.remove(asteroid);
        this.life --;
        document.getElementById("life").innerHTML = `Lives: ${this.life}`;
        const color = this.ship.color;
        this.ship.color = "#FFFFFF";
        setTimeout(() => {
          this.ship.color = color;
        }, 150);
      }
    }
  }

  startTimer() {
    this.ticker = setInterval(() => {
      this.time ++;
      document.getElementById("timer").innerHTML = `Time: ${this.time}s`;
      if (this.time%15 === 0) {
        this.level++;
        document.getElementById("level").innerHTML = `Level: ${this.level}`;
        this.levelUp();
      }
    }, 1000);
  }

  checkGameOver() {
    if (this.life === 0) {
      clearInterval(this.ticker);
    }
  }

  step() {
    this.checkGameOver();
    this.moveObjects();
    this.checkCollisions();
    this.checkOutOfBounds();
  }

  // credit to https://www.kirupa.com/canvas/follow_mouse_cursor.html
  getPosition(el) {
    var xPosition = 0;
    var yPosition = 0;

    while (el) {
      xPosition += (el.offsetLeft - el.scrollLeft + el.clientLeft);
      yPosition += (el.offsetTop - el.scrollTop + el.clientTop);
      el = el.offsetParent;
    }
    return {
      x: xPosition,
      y: yPosition
    };
  }
}

Game.BG_COLOR = "#000000";
Game.DIM_X = 1000;
Game.DIM_Y = 600;
Game.FPS = 32;
Game.NUM_ASTEROIDS = 50;

module.exports = Game;
