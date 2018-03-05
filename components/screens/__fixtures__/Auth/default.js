// @flow

import Auth from '../../Auth';

const fixture = {
  component: Auth,

  props: {
    onAuth: () => console.log('Auth started...')
  },

  reduxState: {
    jsReady: true
  },

  container: {
    width: 10,
    backgroundColor: 'rgba(236, 240, 241, 0.85)'
  }

  // NOTE: This doesn't work because fetch-mock isn't compatible with
  // isomorphic-(un)fetch. fetch-mock overrides the global fetch function, but
  // since we import fetch in every file our fetch calls point to the original
  // definition, and not the later added mock. We'd need to use fetch like
  // window.fetch(...) or global.fetch(...) for this to work.
  // fetch: [
  //   {
  //     matcher: 'end:/auth',
  //     method: 'POST',
  //     response: {
  //       id: '1337',
  //       name: 'Prabu'
  //     }
  //   }
  // ]
};

export default fixture;
