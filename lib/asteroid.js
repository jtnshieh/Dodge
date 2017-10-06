const Util = require("./util");
const MovingObject = require("./moving_object");

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
