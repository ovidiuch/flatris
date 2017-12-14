const COLS = 16;
const ROWS = 20;
const GAMES_PER_HEIGHT = 3;
const MIN_HEIGHT = 320;
const MAX_HEIGHT = 4000;
const COLS_PADDING = 1;
const ROWS_PADDING = 2;

const breakpoints = {};
const resolutions = [];
let mediaQueries = '';

for (var i = MIN_HEIGHT; i <= MAX_HEIGHT; i++) {
  const cols = COLS + COLS_PADDING;
  const rows = ROWS + ROWS_PADDING;
  const heightForOne = i / GAMES_PER_HEIGHT;
  const maxRoudedHeight = Math.floor(heightForOne / rows) * rows;

  if (!breakpoints[maxRoudedHeight]) {
    breakpoints[maxRoudedHeight] = i;

    const width = maxRoudedHeight / rows * cols;
    const col = width / cols;
    const row = maxRoudedHeight / rows;
    const innerWidth = col * COLS;
    const innerHeight = row * ROWS;
    const topPadding = Math.floor(col * ROWS_PADDING / 2);
    const leftPadding = Math.floor(row * COLS_PADDING / 2);
    resolutions.push({
      width,
      height: maxRoudedHeight,
      innerWidth,
      innerHeight,
      topPadding,
      leftPadding,
      startingWithHeight: i
    });
  }
}

resolutions.forEach((res, i) => {
  const isFirst = i === 0;

  if (isFirst) {
    mediaQueries += `.item {
  width: ${res.width}px;
  height: ${res.height}px;
  padding: ${res.topPadding}px 0 0 ${res.leftPadding}px;
}
.inner {
  width: ${res.innerWidth}px;
  height: ${res.innerHeight}px;
}
`;
  } else {
    mediaQueries += `@media (min-height: ${res.startingWithHeight}px) {
  .item {
    width: ${res.width}px;
    height: ${res.height}px;
    padding: ${res.topPadding}px 0 0 ${res.leftPadding}px;
  }
  .inner {
    width: ${res.innerWidth}px;
    height: ${res.innerHeight}px;
  }
}
`;
  }
});

console.log(mediaQueries);
