import { expect } from 'chai';
import { ProfileService } from './profile.service';
import { Profile } from '../models';
import sinon from 'sinon';
describe('ProfileService', () => {
  let mockProfiles: any[];
  let mockProfileModel: any;
  let profileService: ProfileService;
  beforeEach(() => {
    mockProfiles = [
      {
        id: 1,
        name: 'Profile 1',
        email: 'profile1@example.com',
        nickname: 'profile1',
      },
      {
        id: 2,
        name: 'Profile 2',
        email: 'profile2@example.com',
        nickname: 'profile2',
      },
      {
        id: 3,
        name: 'Profile 3',
        email: 'profile3@example.com',
        nickname: 'profile3',
      },
    ];
    // Mock the Profile model
    mockProfileModel = {
      find: () => ({
        lean: () => mockProfiles,
      }),
      findOne: (query: any) => ({
        lean: () => {
          const existingProfile = mockProfiles.find(
            (profile) =>
              profile.email === query.$or[0].email ||
              profile.nickname === query.$or[1].nickname,
          );
          return existingProfile || null;
        },
      }),
      create: (profileData: any) => {
        const newProfile = {
          id: mockProfiles.length + 1,
          ...profileData,
        };
        mockProfiles.push(newProfile);
        return newProfile;
      },
    } as any;

    // Create an instance of the ProfileService with the mock model
    profileService = new ProfileService(mockProfileModel);
  });

  describe('getProfiles', () => {
    it('should return an array of profiles', async () => {
      const spy = sinon.spy(mockProfileModel, 'find');

      const profiles = await profileService.getProfiles();

      sinon.assert.calledOnce(spy);
      expect(profiles.length).to.equal(3);
      expect(profiles).to.deep.equal(mockProfiles);
    });
  });

  describe('createProfile', () => {
    it('should create a new profile if it does not already exist', async () => {
      const createSpy = sinon.spy(mockProfileModel, 'create');
      const findOneSpy = sinon.spy(mockProfileModel, 'findOne');

      const profileData = {
        name: 'New Profile',
        email: 'newprofile@example.com',
        nickname: 'newprofile',
      };
      const profile = await profileService.createProfile(profileData);
      sinon.assert.calledOnce(createSpy);
      sinon.assert.calledOnce(findOneSpy);
      expect(profile).to.have.property('id');
      expect(profile).to.have.property('name', profileData.name);
      expect(profile).to.have.property('email', profileData.email);
      expect(profile).to.have.property('nickname', profileData.nickname);
    });

    it('should throw an error if the profile already exists', async () => {
      const createSpy = sinon.spy(mockProfileModel, 'create');
      const findOneSpy = sinon.spy(mockProfileModel, 'findOne');
      const profileData = {
        name: 'Profile 1',
        email: 'profile1@example.com',
        nickname: 'profile1',
      };

      try {
        await profileService.createProfile(profileData);
        expect.fail('Expected error to be thrown');
      } catch (err) {
        sinon.assert.notCalled(createSpy);
        sinon.assert.calledOnce(findOneSpy);
        expect(err.message).to.equal('Profile already exists');
      }
    });
  });
});
