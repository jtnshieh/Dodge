# Dodge

![](https://github.com/jtnshieh/Dodge/blob/master/docs/Dodge.gif)

[Dodge](https://jtnshieh.github.io/Dodge/), built with plain Javascript and Canvas, is a fun, interactive game in which the user attempts to dodge red asteroids and acquire green asteroids in outer space.

## Features & Implementation

### Smooth Dynamic Animation

Using the method `requestAnimationFrame()`, Dodge continuously calls the function `animate()` on the HTML canvas element to create seamless, beautiful graphics. The game features asteroids of various velocities and sizes.

### Collision Detection

The game detects ship and asteroid collision by comparing the distance between the two objects and the sum of their radii. If the sum is greater than the distance, the method `isCollidedWith(otherObject)` would return true.
The explicit return of false when the concerned object's radius is 0 prevents the ship from colliding once the game is over, and the ship's radius is set to 0.

````
isCollidedWith(otherObject) {
  if (this.radius === 0) {
    return false;
  }
  const centerDist = Util.dist(this.pos, otherObject.pos);
  return centerDist < (this.radius + otherObject.radius);
}
````
### Intuitive Game Control

Dodge makes game control intuitive by basing it on the user's mouse movement. Using the function `getPosition(el)`, Dodge gets the location of the canvas and then creates an event listener that sets the ship's position to wherever the mouse is on the canvas.

````
const canvasPosition = game.getPosition(canvas);

canvas.addEventListener("mousemove", (e) => {
  let mouseX = e.clientX - canvasPosition.x;
  let mouseY = e.clientY - canvasPosition.y;
  game.ship.pos = [mouseX, mouseY];
});
````

## Additional Features

* Change the asteroids' and ship's shapes to be more realistic, and plot out their outermost coordinates to update the collision logic accordingly.

* Create cool collision animation.
