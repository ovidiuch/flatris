import NewGame from '../../NewGame';

export default {
  component: NewGame,
  props: {
    onBack: () => console.log('Go back'),
    onNext: numPlayers => console.log(`Create game with ${numPlayers} players`)
  }
};
