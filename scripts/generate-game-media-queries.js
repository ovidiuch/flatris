// @flow

const GAME_COLS = 16;
const GAME_ROWS = 20;
const CONTROL_BLOCKS = 4;
const MIN_BLOCK_SIZE = 5;
const MAX_BLOCK_SIZE = 100;

let query = ``;

for (let i = MIN_BLOCK_SIZE; i <= MAX_BLOCK_SIZE; i++) {
  const isFirst = i === MIN_BLOCK_SIZE;
  const { width, height } = getPortraitSize(i);

  // First portrait size will be default
  query += isFirst
    ? getPortraitRules({ width, height })
    : getPortraitQuery({ width, height });
  query += getLandscapeQuery({ width, height });
}

console.log(query);

function getPortraitQuery({ width, height }) {
  const cond = getMediaQueryCond({ width, height });
  const body = getPortraitRules({ width, height });

  return getMediaQuery(cond, body);
}

function getLandscapeQuery({ height }) {
  // Add one block size of padding at both top and bottomsides
  const blockSize = Math.floor(height / (GAME_ROWS + 2));
  const width = blockSize * GAME_COLS;
  const widthWithControls = width + 2 * CONTROL_BLOCKS * blockSize;
  const gameHeight = blockSize * GAME_ROWS;

  const cond = getMediaQueryCond({
    width: widthWithControls,
    height
  });
  const body = getLandscapeRules({ width, height: gameHeight });

  return getMediaQuery(cond, body);
}

function getMediaQuery(cond, body) {
  return `
@media ${cond} {
  ${body}
}`;
}

function getPortraitRules({ width, height }) {
  const numBlocks = GAME_ROWS + CONTROL_BLOCKS;
  const innerHeight = (height / numBlocks) * GAME_ROWS;
  const topOffset = (height - innerHeight) / 2;

  return `.container {
    width: ${width}px;
    height: ${innerHeight}px;
    margin-top: -${topOffset}px;
    font-size: ${getFontSizePerWidth(width)}px;
  }
  .controls {
    display: block;
  }
  .ctrl-side {
    display: none;
  }`;
}

function getLandscapeRules({ width, height }) {
  const blockSize = width / 16;

  return `.container {
    width: ${width}px;
    height: ${height}px;
    margin-top: 0;
    font-size: ${getFontSizePerWidth(width)}px;
  }
  .controls {
    display: none;
  }
  .ctrl-side {
    display: block;
    width: ${blockSize * 4}px;
    height: ${blockSize * 8}px;
  }`;
}

function getMediaQueryCond({ width, height }) {
  return `(min-width: ${width}px) and (min-height: ${height}px)`;
}

function getPortraitSize(i) {
  return {
    width: i * GAME_COLS,
    height: i * (GAME_ROWS + CONTROL_BLOCKS)
  };
}

function getFontSizePerWidth(width) {
  return Math.floor(width / 26);
}
