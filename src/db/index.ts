import mongoose from 'mongoose';
import { DBURL, DBURL_TEST, NODE_ENV, INSIDE_DOCKER_CONTAINER } from '../config';
import { logger } from '../utils';

async function mongoFactory() {
  const db_url = NODE_ENV === 'test' ? DBURL_TEST : DBURL;
  if(INSIDE_DOCKER_CONTAINER == true &&  db_url.includes('localhost') == true){
    throw new Error("Make sure db_url is using docker DNS");
  }
  try {
    const connection = await mongoose.connect(db_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    logger.info(`Connected to ${db_url}`);
    return {
      getInstance: () => connection.connection,
    };
  } catch (e) {
    logger.error(e);
  }
}

export default mongoFactory();
