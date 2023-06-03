import { Profile } from '../models';
import Boom from '@hapi/boom';
import logger from '../utils/logger';
export interface ProfileDTO {
  name: string;
  nickname?: string;
  email: string;
}
export class ProfileService {
  constructor(private model: typeof Profile) {
    this.model = model;
  }
  async getProfiles() {
    try {
      const profiles = await this.model.find().lean();
      return profiles;
    } catch (err) {
      throw err;
    }
  }

  async createProfile(profileData: ProfileDTO) {
    const { email, name, nickname } = profileData;

    try {
      const existingProfile = await this.model
        .findOne({
          $or: [{ email }, { nickname }],
        })
        .lean();

      if (!existingProfile) {
        const profile = await this.model.create({ name, email, nickname });
        logger.info(profile);
        return profile;
      } else {
        throw Boom.conflict('Profile already exists');
      }
    } catch (err) {
      throw err;
    }
  }
}

export default new ProfileService(Profile);
