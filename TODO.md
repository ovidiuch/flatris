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
* [ ] [WORKING PROTOTYPE]
* [ ] Read game (Redux) state from server side in Page.getInitialProps
* [ ] Expand memory db to multi games
* [ ] Create game/:id route
* [ ] Create sharing UI flow
* [ ] Preview all existing games in index page
* [ ] Algorithm for distributing events from bundled messages in time
      Calc time of each event in min-max interval and map [0, 1] value to [server timestamp of last received message...now...1s]
* [ ] Grayscale loading state until JS is loaded
* [ ] Use public assets
* [ ] Minimize state footprint
* [ ] Optimize CSS via will-change
* [ ] Game cleanup when game is over or everyone leaves (wait a bit in case of conn drop)