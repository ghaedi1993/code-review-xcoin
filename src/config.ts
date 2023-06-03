import dotenv from 'dotenv';

dotenv.config();
type DefaultValue = string | boolean; 
const checkEnv = (envVar: string, defaultValue?: DefaultValue) => {
  if (!process.env[envVar]) {
    if (defaultValue !== undefined) {
      return defaultValue;
    }
    throw new Error(`Please define the Enviroment variable"${envVar}"`);
  } else { 
    return process.env[envVar] as string;
  }
};
export const PORT: number = parseInt(checkEnv('PORT') as string, 10);
export const INSIDE_DOCKER_CONTAINER:boolean = checkEnv('INSIDE_DOCKER_CONTAINER',false) as boolean;
export const CORS_ORIGINS = ['http://localhost:3000'];
export const NODE_ENV: string = checkEnv('NODE_ENV', 'development') as string;
export const DBURL: string = INSIDE_DOCKER_CONTAINER ? checkEnv('DBURL_FOR_DOCKER') as string :checkEnv('DBURL') as string;
export const DBURL_TEST: string = INSIDE_DOCKER_CONTAINER ? checkEnv('DBURL_TEST_FOR_DOCKER') as string :checkEnv('DBURL_TEST') as string;