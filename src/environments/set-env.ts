/* eslint-disable @typescript-eslint/no-var-requires */

const setEnv = () => {
  const fs = require('fs/promises');
  const writeFile = fs.writeFile;
  // Configure Angular `environment.ts` file path
  const targetPath = './src/environments/environment.ts';
  // Load node modules

  require('dotenv').config({ path: 'src/environments/.env' });
  // `environment.ts` file structure
  const envConfigFile = `export const environment = {
  secret: '${require('process').env?.['SECRET']}',
  production: true,
    firebase: {
    apiKey: '${require('process').env?.['API_KEY']}',
    authDomain: 'aikido-journey.firebaseapp.com',
    projectId: 'aikido-journey',
    storageBucket: 'aikido-journey.appspot.com',
    messagingSenderId: '27492302921',
    appId: '1:27492302921:web:d7fe14d90803f70e5ebf98',
  },
};
`;
  writeFile(targetPath, envConfigFile);
};

setEnv();
