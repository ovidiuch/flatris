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

~~It's possible for the blocks received from the other player as a penalty to be a blessing in disguise, and help the receiving player form lines upon the new blocks' arrival. These blocks create the opposite effect for the receiving player, as they offer extra points instead of a penalty. To avoid infinite recursion, these lines are no longer transferred back to the player which created the original lines.~~ This functionality was removed in favor of a simpler, easier to understand game dynamic.

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

## Ensuring action consistency

### Context

When a user loads a game, the server returns the current state snapshot at the time of the request, already converted into a server-side rendered HTML output. Upon receiving the initial HTML, the client starts fetching JS assets and once they're received it runs the client-side code, which _hydrates_ the static HTML received initially from the server. At this point a socket connection is opened with the server, instructing it to send the client any new action other (active) players dispatch for the loaded game.

### Problem

From the time the server returns the initial snapshot, to the time the client opens the socket connection, other players might've authored new actions which the connecting user needs to also receive, lest he get the game state out of sync. In other words, once a new user subscribes to receive a game's actions, a **backfill** operation might be needed.

### Solution

#### Short term action pool

First off, the server needs to retain actions for a short time window, before discarding them to rely solely on the reduced state snapshot.

> TODO: GC strategy for short-term action pool (ie. make it short term)

#### Action id

In order to know that a new action cannot be applied on a state snapshot, there must be a connection between the state snapshot and the last action applied.

To be able to identify a **valid chain of actions**, actions will also point to the previous action.

#### Backfill

While the (async) backfill operation is underway, real time actions can still be received. This means that:

1. Real time actions received must be stored in a secondary client state location until backfill has completed.
2. Upon backfill completion, we merge the returned actions with other recent actions that might've been received via websocket in the meantime, remove duplicates, and dispatch them into the the local Redux store. From here on new actions are dispatched as they are received. We assume an open websocket connection does not drop messages.

#### How does the action id look like?

The action id is a local timestamp, separate for each player. Being a timestamp, it allows us to fast forward events while still conveying the rhythm in which the actions were performed.

Caveat: To ensure action order consistency, the action id needs to be unique. So each player will ensure a new action's id is higher than the id of the previous action, in the highly unlikely event that two actions are dispatched in the same millisecond.

> Player state is initiated with `lastActionId` equal to `0`, and `JOIN_GAME` actions also have `prevActionId` set to `0`.
