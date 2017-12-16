const COLS = 16;
const ROWS = 24;
const MIN_BLOCK_SIZE = 5;
const MAX_BLOCK_SIZE = 200;

function getFontSizePerWidth(width) {
  return Math.floor(width / 26);
}

let queries = `
.container {
  width: ${COLS * MIN_BLOCK_SIZE}px;
  height: ${ROWS * MIN_BLOCK_SIZE}px;
  font-size: ${getFontSizePerWidth(COLS * MIN_BLOCK_SIZE)}px;
}
`;

for (var i = MIN_BLOCK_SIZE + 1; i <= MAX_BLOCK_SIZE; i++) {
  const width = i * COLS;
  const height = i * ROWS;

  queries += `
@media (min-width: ${width}px) and (min-height: ${height}px) {
  .container {
    width: ${width}px;
    height: ${height}px;
    font-size: ${getFontSizePerWidth(width)}px;
  }
}`;
}

console.log(queries);
