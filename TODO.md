* [x] Extract Preloader component (get from public/index.html)
* [x] Remove dynamic layout
* [x] Create script for generating media queries for game page
      Search: Does media query include scrollbar? Actually, the whole point is to avoid a scrollbar
* [x] Design game UI screens (new game, pausing)
* [x] Add user list to GamePanel
* [x] Design new game state (with Flow types)
  * [x] Put `curUser` in Redux state
  * [x] Derive paused state from `users(status=playing).len > 0`
* [ ] Add missing screens for multiplayer flows
* [ ] Create server "database" (games with users)
* [ ] Read game (Redux) state from server side in Page.getInitialProps
* [ ] Subscribe to socket.io on mount and dispatch or apply messages based on turn
* [ ] [WORKING PROTOTYPE]
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
