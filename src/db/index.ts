import mongoose from 'mongoose';
import { DBURL, DBURL_TEST, NODE_ENV } from '../config';
import { logger } from '../utils';

async function mongoFactory() {
  const db_url = NODE_ENV === 'test' ? DBURL_TEST : DBURL;
  try {
    const connection = await mongoose.connect(db_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    logger.info(`Connected to ${connection.connection.name}`);
    return {
      getInstance: () => connection.connection,
    };
  } catch (e) {
    logger.error(e);
  }
}

export default mongoFactory();
