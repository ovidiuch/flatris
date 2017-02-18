[![Flatris](https://cloud.githubusercontent.com/assets/250750/6101303/f1de45b4-afef-11e4-9040-7a4b99c08a7c.png)](http://skidding.github.io/flatris/)

Take a trip down memory lane and [**play some Flatris!**](http://skidding.github.io/flatris/)

Thanks [@paulgergely](https://twitter.com/paulgergely) for the flat Tetris
design!

> New documentation in progress!

## Components

### SquareBlock

Building block for Tetrominoes and the grid of the Well, occupying a 1x1 square
block. The only configurable property square blocks have is their color.

- [Check out code](src/components/SquareBlock.jsx)

### Tetromino

A Tetromino is a geometric shape composed of four squares, connected
orthogonally. Read more at http://en.wikipedia.org/wiki/Tetromino

- [Check out code](src/components/Tetromino.jsx)

### WellGrid

Isolated matrix for the landed Tetrominoes inside the Well.

- [Check out code](src/components/WellGrid.jsx)

### Well

A rectangular vertical shaft where Tetrominoes fall into during a Flatris game.
The Well has configurable size and speed. Tetromino pieces can be inserted
inside the well and they will fall until they hit the bottom, eventually
fill the well. Whenever pieces form a straight horizontal line it will be
cleared, emptying up space and allowing more pieces to enter.

- [Check out code](src/components/Well.jsx)

### GamePanel

The game panel contains:

- The next Tetromino to be inserted
- The score and number of lines cleared
- Start, pause or resume control

It is displayed on the right side of the game.

- [Check out code](src/components/GamePanel.jsx)

### InfoPanel

Information panel shown when game is paused or stopped.

- [Check out code](src/components/InfoPanel.jsx)

### FlatrisGame

The Tetris game was originally designed and programmed by Alexey Pajitnov.
It was released on June 6, 1984 and has since become a world-wide phenomenon.
Read more about the game at http://en.wikipedia.org/wiki/Tetris

- [Check out code](src/components/FlatrisGame.jsx)

### FlatrisStatePreview

Prettified app state preview.

- [Check out code](src/components/FlatrisStatePreview.jsx)

## Development

```bash
yarn install
yarn start
yarn run cosmos
```
