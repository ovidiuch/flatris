import GameLobby from '../../GameLobby';

export default {
  component: GameLobby,
  props: {
    game: {
      curPlayers: 2,
      maxPlayers: 8
    },
    onView: () => console.log('Just watch'),
    onPlay: () => console.log('Start playin')
  }
};
