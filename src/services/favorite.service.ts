import { Favorite } from '../models';
import logger from '../utils/logger';

class FavoriteService {
  constructor(private model:typeof Favorite) {
    this.model = model;
  }
  async getFavorites() {
    try {
      const favorites = await this.model.find().lean();
      logger.info(favorites);
      return favorites;
    } catch (err) {
      throw err;
    }
  }

  async getFavoritesByProfileId(profileId) {
    const query = {
      profile_id: profileId,
    };

    try {
      const favorites = await this.model.find(query).lean();
      logger.info(favorites);
      return favorites;
    } catch (err) {
      throw err;
    }
  }
}

export default new FavoriteService(Favorite);
