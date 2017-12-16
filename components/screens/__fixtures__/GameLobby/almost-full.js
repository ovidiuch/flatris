import GameLobby from '../../GameLobby';

export default {
  component: GameLobby,
  props: {
    game: {
      curPlayers: 2,
      maxPlayers: 3
    },
    onView: () => console.log('Just watch'),
    onPlay: () => console.log('Start playin')
  }
};
