import { Profile } from '../models';
import Boom from '@hapi/boom';

class ProfileService {
  async getProfiles() {
    try {
      const profiles = await Profile.find().lean();
      return profiles;
    } catch (err) {
      throw err;
    }
  }

  async createProfile(profileData) {
    const { email, name, nickname } = profileData;

    try {
      const existingProfile = await Profile.findOne({
        $or: [{ email }, { nickname }],
      }).lean();

      if (!existingProfile) {
        const profile = await Profile.create({ name, email, nickname });
        return profile;
      } else {
        throw Boom.conflict('Profile already exists');
      }
    } catch (err) {
      throw err;
    }
  }
}

export default new ProfileService();
