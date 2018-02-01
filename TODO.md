* [x] Extract Preloader component (get from public/index.html)
* [x] Remove dynamic layout
* [x] Create script for generating media queries for game page
      Search: Does media query include scrollbar? Actually, the whole point is to avoid a scrollbar
* [x] Design game UI screens (new game, pausing)
* [x] Add user list to GamePanel
* [x] Design new game state (with Flow types)
  * [x] Put `curUser` in Redux state
  * [x] Derive paused state from `users(status=playing).len > 0`
* [x] Add missing screens for multiplayer flows
* [x] PIVOT: Turn collaborative Flatris (2-8 players) into competitive 1vs1 Flatris
  * [x] Redesign state and actions
    * [x] Make MOVE, ROTATE, ENABLE_ACCELERATION, DISABLE_ACCELERATION userId based
    * [x] Cancel ADVANCE loop on unmount
    * [x] Disable acceleration on line drop
    * [x] ADVANCE action for current user
    * [x] Remove START/STOP actions
  * [x] Clear onboarding screens (postpone UI this time until game mechanics are confirmed)
  * [x] Update fixtures and tests
  * [x] Add 2nd player
    * [x] Start game when both players are ready
    * [x] Render other player's grid in the background
* [x] Create server MVP database
  * [x] Split client logic between starting or joining a game
* [x] Rename state.game to state.curGame
* [x] Add blocks to other player when clearing lines
* [x] Bring back "falling" block transition when lines are cleared
* [x] Transitions when clearing lines
  * [x] Cleared lines should go down (not instantly disappear)
  * [x] Lines from enemy should come up (not instantly appear)
  * [x] getNextCellId(gameState) abstraction
* [x] Fix concomitant line clearing between players
  * [x] Fix multiplayer test case: Clearing lines that aren't bottom ones
* [x] Expand memory db to multi games
* [x] Green/red wall flash when clearing lines (own vs enemy)
* [x] Earthquake effect when clearing lines
* [x] Make enemy grid visible on Firefox
* [x] Add hidden keyboard shortcut for stopping game
* [x] Clean up server scripts (Keep server with client together in prod, separate in dev)
* [x] [WORKING PROTOTYPE]
* [x] Handle wrong game ID with 404
* [x] Create server-side user sessions
* [x] Read game (Redux) state from server side in Page.getInitialProps
* [x] Use HTTP request instead of socket event to create game
* [x] Load entire game state on load
* [x] Don't join game if 2 players are already in
* [x] Create join/:id route
* [x] Turn sessionId, userId & gameId numbers into hashes
* [x] Grayscale loading state until JS is loaded
* [x] Subscribe to game events on game page, once JS is loaded
* [x] Continue game after hard refresh
* [x] Add fixtures for all components
* [ ] Create "Invite or play" screen
* [ ] Create "Join game" screen
* [ ] Create "Join game" screen
* [ ] Show both players' score in game panel
* [ ] Show player READY state
* [ ] Allow players to restart once game is over
* [ ] Add disabled state to buttons (get rid of early exists in handlers)
* [ ] Keep dispatching left/right/rotate events at intervals when keys are pressed (instead of relying on repeated keypress events, which don't work on mobile anyway)
* [ ] Use public assets
* [ ] Different layouts per device type/orientation
  * [ ] No controls on desktop
  * [ ] Side controls on landscape mobile
* [ ] [BEAUTIFUL MVP]
* [ ] Create actionId, link actions to prev actions, ensuring consistency
* [ ] Create action backfill if user has old state and new actions
* [ ] Minimize network communication: Don't send noop actions
* [ ] Minimize state footprint
* [ ] Freeze game on player disconnect (Keep seat taken in case user returns)
* [ ] Index page with preview of all existing games
  * [ ] Batch actions
  * [ ] Algorithm for distributing events from bundled messages in time
        Calc time of each event in min-max interval and map [0, 1] value to [server timestamp of last received message...now...1s]
