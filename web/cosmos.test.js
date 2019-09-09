// @flow

import { detectCosmosConfig, getFixtures } from 'react-cosmos';
import { create } from 'react-test-renderer';

it('renders fixtures', async () => {
  const cosmosConfig = detectCosmosConfig();
  const fixtures = await getFixtures({ cosmosConfig });
  fixtures.forEach(({ fixtureId, getElement }) => {
    const renderer = create(getElement());
    expect(renderer.toJSON()).toMatchSnapshot(stringifyFixtureId(fixtureId));
  });
});

function stringifyFixtureId(fixtureId: { path: string, name: null | string }) {
  return fixtureId.name
    ? `${fixtureId.path}-${fixtureId.name}`
    : fixtureId.path;
}
