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

## Development

```bash
npm install
# Build once
node_modules/.bin/gulp build
# Continuous build
node_modules/.bin/gulp
```
