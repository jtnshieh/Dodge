/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

const Util = {
  inherits (ChildClass, BaseClass) {
    ChildClass.prototype = Object.create(BaseClass.prototype);
    ChildClass.prototype.constructor = ChildClass;
  },

  dir (vec) {
    const norm = Util.norm(vec);
    return Util.scale(vec, 1 / norm);
  },

  // Find distance between two points.
  dist (pos1, pos2) {
    return Math.sqrt(
      Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)
    );
  },

  // Find the length of the vector.
  norm (vec) {
    return Util.dist([0, 0], vec);
  },

  // Return a randomly oriented vector with the given length.
  // randomVec (length) {
  //   const deg = 2 * Math.PI * Math.random();
  //   return Util.scale([Math.sin(deg), Math.cos(deg)], length);
  // },

  // Scale the length of a vector by the given amount.
  scale (vec, m) {
    return [vec[0] * m, vec[1] * m];
  },


};


module.exports = Util;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

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


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const Util = __webpack_require__(0);

class MovingObject {
  constructor(options) {
    this.pos = options.pos;
    this.vel = options.vel;
    this.radius = options.radius;
    this.color = options.color;
    this.game = options.game;
  }

  draw(ctx) {
    ctx.fillStyle = this.color;

    ctx.beginPath();
    ctx.arc(
      this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
    );

    ctx.fill();
  }

  move() {
    this.pos = [this.pos[0] + this.vel[0], this.pos[1] + this.vel[1]];
  }

  isCollidedWith(otherObject) {
    if (this.radius === 0) {
      return false;
    }
    const centerDist = Util.dist(this.pos, otherObject.pos);
    return centerDist < (this.radius + otherObject.radius);
  }

}

module.exports = MovingObject;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const Game = __webpack_require__(4);
const GameView = __webpack_require__(1);

document.addEventListener("DOMContentLoaded", function() {
  const canvas = document.getElementById("canvas");
  canvas.width = Game.DIM_X;
  canvas.height = Game.DIM_Y;
  const ctx = canvas.getContext("2d");

  document.getElementById("life").innerHTML = `Lives: 3`;
  document.getElementById("score").innerHTML = `Score: 0`;
  document.getElementById("level").innerHTML = `Level: 1`;
  document.getElementById("timer").innerHTML = `Time: 0s`;

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

    // var BB = canvas.getBoundingClientRect();
    const canvasPosition = game.getPosition(canvas);

    canvas.addEventListener("mousemove", (e) => {
      let mouseX = e.clientX - canvasPosition.x;
      let mouseY = e.clientY - canvasPosition.y;
      game.ship.pos = [mouseX, mouseY];
    });
  };

  window.start = start;

});


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const GameView = __webpack_require__(1);
const Asteroid = __webpack_require__(5);
const Ship = __webpack_require__(6);
const Util = __webpack_require__(0);

class Game {
  constructor(lifepoints = 3) {
    this.asteroids = [];
    this.ship = new Ship({ game: this, pos:[0, Game.DIM_Y], color:"#b6b7b5"});
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
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);

    this.allObjects().forEach((object) => {
      object.draw(ctx);
    });

    if (this.life === 0) {
      this.drawGameOver(ctx);
      this.ship.radius = 0;
    }

    if (this.life === -1) {
      this.ship.radius = 0;
    }
  }

  drawGameOver(ctx) {
    ctx.fillStyle = "white";
    ctx.fillText("GAME OVER", Game.DIM_X/2, Game.DIM_Y/2);
    ctx.font = '50px Titillium Web';
    ctx.textAlign = 'center';
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
Game.DIM_X = 850;
Game.DIM_Y = 550;
Game.FPS = 32;
Game.NUM_ASTEROIDS = 50;

module.exports = Game;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

const Util = __webpack_require__(0);
const MovingObject = __webpack_require__(2);

const DEFAULTS = {
	COLOR: "#FF0000",
	RADIUS: 8,
  VEL: [-2.5,2.5]
};

class Asteroid extends MovingObject {
    constructor(options = {}) {
      options.color = options.color || DEFAULTS.COLOR;
      options.pos = options.pos || options.game.randomPosition();
      options.radius = options.radius || DEFAULTS.RADIUS;
      options.vel = options.vel || DEFAULTS.VEL;
			super(options);
    }
}

module.exports = Asteroid;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

const MovingObject = __webpack_require__(2);
const Util = __webpack_require__(0);

function randomColor() {
  const hexDigits = "0123456789ABCDEF";

  let color = "#";
  for (let i = 0; i < 3; i ++) {
    color += hexDigits[Math.floor((Math.random() * 16))];
  }

  return color;
}

class Ship extends MovingObject {
  constructor(options) {
    options.radius = Ship.RADIUS;
    options.color = options.color || randomColor();
    super(options);
  }

}

Ship.RADIUS = 10;

module.exports = Ship;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map