import { writeFile } from "fs/promises";
import { config } from "dotenv";
import { env } from "process";

const setEnv = () => {
  // Configure Angular `environment.ts` file path
  const targetPath = "./src/environments/environment.ts";
  // Load node modules
  config({ path: "src/environments/.env" });
  // `environment.ts` file structure
  const envConfigFile = `export const environment = {
  secret: '${env?.["SECRET"]}',
  production: true,
};
`;
  writeFile(targetPath, envConfigFile);
};

setEnv();
