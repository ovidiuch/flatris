### Game mechanics

* Both players start with the same Tetromino.
* Both players receive the same sequence of Tetrominos, but they will likely get out of sync as one progresses quicker.

### Actions

Actions are synced between users over the network and should follow these rules:

* Actions must be deterministic.
* Actions must be as small as possible.
* Actions must leave as little room as possible for cheating. Eg. An action for moving the active Tetromino to left should describe the user action instead of representing the outcome which is the next active Tetromino position. The latter allows the user to broadcast a new active Tetromino position that couldn't be achieved via regular game actions, and has a larger payload anyway.
* Actions should broadcast the intention and not the outcome. The outcome should be derived locally using the same set of rules that all clients share.
* **TODO:** Network optimization: _Noop_ actions should be omitted. When hitting a wall.
* **TODO:** Network optimization: Actions should be batched. Holding a key pressed can yield a dozen actions per second and in these cases it's unrealistic to expect clients to reliably send and receive messages at such high frequency.

These rules tie into each other and overlap, but it's useful to keep each in mind when designing action payloads.
