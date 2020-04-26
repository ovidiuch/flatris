import { getCosmosConfigAtPath, getFixtures2 } from 'react-cosmos';
import { toMatchImageSnapshot } from 'jest-image-snapshot';

expect.extend({ toMatchImageSnapshot });

const cosmosConfig = getCosmosConfigAtPath(require.resolve('./cosmos.config'));
const fixtures = getFixtures2({ cosmosConfig });

fixtures.forEach(fixture => {
  const { playgroundUrl, rendererUrl, relativeFilePath, treePath } = fixture;
  const snapshotId = treePath.join('-');

  if (
    // Ignore fixtures that animate on load
    snapshotId.startsWith('effects-') ||
    snapshotId.startsWith('FlatrisGame-') ||
    snapshotId.startsWith('Loading-') ||
    snapshotId.startsWith('pages-Dashboard-') ||
    snapshotId === 'Stats-update'
  )
    return;

  it(`matches snapshot for ${relativeFilePath}`, async () => {
    await page.goto(rendererUrl, { waitUntil: 'load' });

    // Wait for fade in transition to finish
    await delay(500);

    const element = await page.$('#root');

    if (element === null) {
      console.warn(`No snapshot for fixture: ${playgroundUrl}`);
      return;
    }

    const boundingBox = await element.boundingBox();
    // Take a screenshot of the entire window if the root element has 0 height,
    // which happens if the root component uses position: absolute.
    const clip = boundingBox.height > 0 ? boundingBox : getFullPageClip(page);
    const image = await page.screenshot({ clip });

    expect(image).toMatchImageSnapshot({
      customSnapshotIdentifier: snapshotId,
      failureThreshold: 0.03
    });
  });
});

const delay = t => new Promise(resolve => setTimeout(resolve, t));

function getFullPageClip(page) {
  return {
    x: 0,
    y: 0,
    width: page.viewport().width,
    height: page.viewport().height
  };
}
