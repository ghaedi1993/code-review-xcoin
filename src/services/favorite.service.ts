import { Favorite } from '../models';
import logger from '../utils/logger';

export class FavoriteService {
  constructor(private model: typeof Favorite) {
    this.model = model;
  }
  async getFavorites() {
    try {
      const favorites = await this.model.find().lean();
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
      return favorites;
    } catch (err) {
      throw err;
    }
  }
}

export default new FavoriteService(Favorite);
