// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyB2c4gdGqOMBDnVus8fxqmBcmvF_Q83B5k' ,
    authDomain: 'ndaychallenge.firebaseapp.com',
    databaseURL: 'https://ndaychallenge.firebaseio.com',
    projectId: 'ndaychallenge',
    storageBucket: 'ndaychallenge.appspot.com',
    messagingSenderId: '344025540630'
  }
};
