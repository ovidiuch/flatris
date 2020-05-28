import { toMatchImageSnapshot } from 'jest-image-snapshot';
import { getCosmosConfigAtPath, getFixtures2 } from 'react-cosmos';

expect.extend({ toMatchImageSnapshot });

const cosmosConfig = getCosmosConfigAtPath(require.resolve('./cosmos.config'));
if (process.env.COSMOS_HOSTNAME)
  cosmosConfig.hostname = process.env.COSMOS_HOSTNAME;

const fixtures = getFixtures2(cosmosConfig);

const ignoreMatch = [
  // These fixtures animate on load and aren't reliable to diff visually
  'Dashboard-Stats-update',
  'Loading',
];

// Manually whitelist fixtures
const onlyMatch = /.*/;

const fluidWidthMatch = [
  'pages-Dashboard-game',
  'pages-Dashboard-no-games',
  'pages-Dashboard-own-game',
];

const defaultViewport = { width: 800, height: 600 };

// Load transitions take up to 0.5s
const loadDelay = 600;

fixtures.forEach(fixture => {
  const { playgroundUrl, rendererUrl, relativeFilePath, treePath } = fixture;
  const snapshotId = treePath.join('-');

  if (ignoreMatch.some(m => snapshotId.indexOf(m) !== -1)) return;

  if (!snapshotId.match(onlyMatch)) return;

  it(`matches snapshot for ${relativeFilePath}`, async () => {
    await page.setViewport(defaultViewport);
    await page.goto(rendererUrl, { waitUntil: 'load' });

    if (!fluidWidthMatch.some(m => snapshotId.indexOf(m) !== -1))
      await page.evaluate(() => {
        document.querySelector('#root').style.position = 'absolute';
      });

    // Wait for fade in transitions to finish
    await delay(loadDelay);

    const element = await page.$('#root');
    if (element === null) {
      console.error(`No snapshot for fixture: ${playgroundUrl}`);
      return;
    }

    const boundingBox = await element.boundingBox();

    // Resize the window to match the content, unless the content has 0 height,
    // in which case screenshot the entire viewport
    if (boundingBox.height > 0)
      await page.setViewport({
        width: Math.ceil(boundingBox.width),
        height: Math.ceil(boundingBox.height),
      });

    const image = await page.screenshot({
      clip: getFullPageClip(),
    });

    expect(image).toMatchImageSnapshot({
      customSnapshotIdentifier: snapshotId,
      failureThreshold: 0.01,
    });
  });
});

const delay = t => new Promise(resolve => setTimeout(resolve, t));

function getFullPageClip() {
  const { width, height } = page.viewport();
  return { x: 0, y: 0, width, height };
}
