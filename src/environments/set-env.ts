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
};
`;
  writeFile(targetPath, envConfigFile);
};

setEnv();
