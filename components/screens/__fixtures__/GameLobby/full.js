import GameLobby from '../../GameLobby';

export default {
  component: GameLobby,
  props: {
    game: {
      curPlayers: 4,
      maxPlayers: 4
    },
    onView: () => console.log('Just watch'),
    onPlay: () => console.log('Start playin')
  }
};
