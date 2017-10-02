# Dodge

## Background and Overview

Dodge is a game in which the user moves through space and attempts to avoid all the red dots. The user's additional goal is to hit green dots to get points. Both the duration of the game and the points are kept track. As the game advances, the difficulty of the game will grow through increasing the number of red dots. The game will work and look highly similar to this: [Sinuous](http://www.sinuousgame.com/).

## Functionality and MVP

In Dodge, users will be able to:
* See their path (around the past 5 centimeters) in space.
* Avoid red dots to stay alive.
* Hit green dots to get points.
* See their current level, score, time elapsed and "lives" left.

## Wireframes

I will be having highly similar visuals as Sinuous so the layout will look something like below. The game begins when the user presses start. Until then, the game will show a space of red dots in motion.

![](https://github.com/jtnshieh/Dodge/blob/master/Wireframe_reference.png)

## Architecture and Technologies

This project will be implemented with the following technologies:

* Vanilla JavaScript for overall structure and game logic,
* HTML5 Canvas for DOM manipulation and rendering,
* Webpack to bundle and serve up the various scripts.

In addition to the webpack entry file, there will be four scripts involved in this project:

`game.js`: this script will handle the logic for creating and updating the necessary DOM elements.

`moving_object.js`: this script will be the base class that any moving object in the game inherits from.

`dots.js`: this script will inherit from `MovingObject` and handle the rendering of and logic for all the dots (red and green) of the game.

`user.js`: this script will inherit from `MovingObject` and handle the rendering of and logic for the user's (mouse) movement in the game, including keeping track of the path and stopping the game when the user has collided with three red dots.

## Implementation Timeline
Day 1:

* Setup all necessary Node modules, including getting webpack up and running. Create webpack.config.js as well as package.json. Write a basic entry file and the bare bones of all 4 scripts outlined above.

Day 2:

* Get all the dots and the user's path to show up on the screen, as well as their movements.

Day 3:

* Create the game logic, including:
  * Increasing the amount of red dots as the level advances (based on the time elapsed)
  * Keeping track of how many "lives" the user has to know when the game ends
  * Subtracting one life when the user hits a red dot
  * Adding to the score when the user hits a green dot

Day 4:

* Style the front end and make it look aesthetically pleasing.
