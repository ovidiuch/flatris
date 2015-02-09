Flatris
===
Demo app for the [Cosmos](https://github.com/skidding/cosmos) JavaScript user
interface framework, built using [React](https://github.com/facebook/react)
components.

Take a trip down memory lane with one the classics and [**play some Flatris!**](http://skidding.github.io/flatris/)

The purpose of this demo is to prove that data can drive a user interface, even
one as complex as a game. A snapshot of the game state can be generated at any
time by calling `Flatris.rootComponent.serialize(true)` in the browser console
of the demo page. This will reveal the data structures on top of which the
game is built.

For more insights check out the source code and the
[Cosmos](https://github.com/skidding/cosmos) project.

Thanks [@paulgergely](https://twitter.com/paulgergely) for the flat Tetris
design!

## Components

### SquareBlock

Building block for Tetriminos and the grid of the Well, occupying a 1x1 square
block. The only configurable property square blocks have is their color.

- [Check out code](src/components/square-block.jsx)
- [Explore in Component Playground](http://skidding.github.io/flatris/component-playground.html?fixturePath=SquareBlock%2Fcolor-of-the-I-tetrimino)

### Tetrimino

A Tetromino is a geometric shape composed of four squares, connected
orthogonally. Read more at http://en.wikipedia.org/wiki/Tetromino

- [Check out code](src/components/tetrimino.jsx)
- [Explore in Component Playground](http://skidding.github.io/flatris/component-playground.html?fixturePath=Tetrimino%2FZ-tetrimino)

### WellGrid

Isolated matrix for the landed Tetriminos inside the Well.

- [Check out code](src/components/well-grid.jsx)
- [Explore in Component Playground](http://skidding.github.io/flatris/component-playground.html?fixturePath=WellGrid%2F3x3%20grid)

### Well

A rectangular vertical shaft, where Tetriminos fall into during a Flatris game.
The Well has configurable size and speed. Tetrimino pieces can be inserted
inside the well and they will fall until they hit the bottom, and eventually
fill it. Whenever the pieces form a straight horizontal line it will be
cleared, emptying up space and allowing more pieces to enter afterwards.

- [Check out code](src/components/well.jsx)
- [Explore in Component Playground](http://skidding.github.io/flatris/component-playground.html?fixturePath=Well%2Fpaused)

### GamePanel

The game panel contains:

- The next Tetrimono to be inserted
- The score and lines cleared
- Start or pause/resume controls

It is displayed on the right side of the game.

- [Check out code](src/components/game-panel.jsx)
- [Explore in Component Playground](http://skidding.github.io/flatris/component-playground.html?fixturePath=GamePanel%2Fon-paused-game)

### InfoPanel

Information panel for the Flatris game/Cosmos demo, shown in between game
states.

- [Check out code](src/components/info-panel.jsx)
- [Explore in Component Playground](http://skidding.github.io/flatris/component-playground.html?fixturePath=InfoPanel%2Fstatic-panel)

### FlatrisGame

The Tetris game was originally designed and programmed by Alexey Pajitnov.
It was released on June 6, 1984 and has since become a world-wide phenomenon.
Read more about the game at http://en.wikipedia.org/wiki/Tetris

- [Check out code](src/components/flatris-game.jsx)
- [Explore in Component Playground](http://skidding.github.io/flatris/component-playground.html?fixturePath=FlatrisGame%2Fnew%20game%20running)

### FlatrisStatePreview

Render a Flatris instance next to its prettified, serialized state.

- [Check out code](src/components/flatris-state-preview.jsx)

### FlatrisStatePersistor

Persist Flatris state with local storage.

- [Check out code](src/components/flatris-state-persistor.jsx)

## Development

```bash
npm install
# Build once
node_modules/.bin/gulp build
# Continuous build
node_modules/.bin/gulp
```
