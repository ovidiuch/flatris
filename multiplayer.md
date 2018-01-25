# Game mechanics

* Both players start with the same Tetromino.
* Both players receive the same sequence of Tetrominos, but they will likely get out of sync as one progresses quicker.
* Players see their game in the forefront, but can also spot the other player's game in the background, almost transparent, like a shadow.
* When a player clears one or more lines, the cleared blocks are transferred to the other player (One player's reward is the other's penalty.

## Transferring blocks from one player to the other

The multiplayer game revolves around this core concept. At first it seems like a simple, zero-sum dynamic. But at closer inspection, is bears some complications and isn't necessarily zero-sum. Here are some special cases.

### Transferring partial lines

Lines are formed when a player drops their falling Tetromino piece on other still blocks. The block lines that are then transferred to the other player, as a penalty, omit the blocks from the last Tetromino that fell and completed the lines. We want the transferred lines to be incomplete, because otherwise they would be cleared immediately as soon as they appeared in the other player's grid.

### Recursive line transferring

It's possible for the blocks received from the other player as a penalty to be a blessing in disguise, and help the receiving player form lines upon the new blocks' arrival. These blocks create the opposite effect for the receiving player, as they offer extra points instead of a penalty. To avoid infinite recursion, these lines are no longer transferred back to the player which created the original lines.

### Pushing up the falling Tetromino

If a player's falling Tetromino is close to hitting the ground, transferred blocks from the other player (which just cleared a few lines) will cause the "ground" to rise a few lines and potentially overlap with the falling Tetromino. In this case the falling Tetromino is pushed up as many lines as needed, and will continue to drop from the new (higher) position afterwards.

### Filling the other player's grid

This current implementation isn't ideal: If a player grid is almost full, upon receiving blocks from the other player, the overflowing blocks (at the top) will be trimmed.

# Actions

Actions are synced between users over the network and should follow these rules:

* Actions must be deterministic.
* Actions must be as small as possible.
* Actions must leave as little room as possible for cheating. Eg. An action for moving the active Tetromino to left should describe the user action instead of representing the outcome which is the next active Tetromino position. The latter allows the user to broadcast a new active Tetromino position that couldn't be achieved via regular game actions, and has a larger payload anyway.
* Actions should broadcast the intention and not the outcome. The outcome should be derived locally using the same set of rules that all clients share.
* **TODO:** Network optimization: _Noop_ actions should be omitted. When hitting a wall.
* **TODO:** Network optimization: Actions should be batched. Holding a key pressed can yield a dozen actions per second and in these cases it's unrealistic to expect clients to reliably send and receive messages at such high frequency.

These rules tie into each other and overlap, but it's useful to keep each in mind when designing action payloads.
