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
* [x] PIVOT: Turn collaborative Tetris (2-8 players) into competitive 1vs1 Tetris
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
* [ ] Clean up scripts (Keep server with client together in prod, separate in dev)
* [ ] [WORKING PROTOTYPE]
* [ ] Minimize network communication
  * [ ] Don't send noop actions
  * [ ] Batch actions
  * [ ] Algorithm for distributing events from bundled messages in time
        Calc time of each event in min-max interval and map [0, 1] value to [server timestamp of last received message...now...1s]
* [ ] Keep dispatching left/right/rotate events at intervals when keys are pressed (instead of relying on repeated keypress events, which don't work on mobile anyway)
* [ ] Read game (Redux) state from server side in Page.getInitialProps
* [ ] Create game/:id route
* [ ] Create sharing UI flow
* [ ] Preview all existing games in index page
* [ ] Grayscale loading state until JS is loaded
* [ ] Use public assets
* [ ] Minimize state footprint
* [ ] Optimize CSS via will-change
* [ ] Game cleanup when game is over or everyone leaves (wait a bit in case of conn drop)
