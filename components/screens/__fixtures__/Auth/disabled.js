// @flow

import Auth from '../../Auth';

const fixture = {
  component: Auth,

  props: {
    disabled: true,
    onAuth: () => console.log('Auth started...')
  },
  reduxState: {},

  container: {
    width: 10,
    backgroundColor: 'rgba(236, 240, 241, 0.85)'
  }
};

export default fixture;
