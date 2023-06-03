import { expect } from 'chai';
import { FavoriteService } from './favorite.service';
import { Favorite } from '../models';

describe('FavoriteService', () => {
  const mockFavorites = [
    { id: 1, name: 'Favorite 1', profile_id: 1 },
    { id: 2, name: 'Favorite 2', profile_id: 1 },
    { id: 3, name: 'Favorite 3', profile_id: 2 },
  ];

  // Mock the Favorite model
  const mockFavoriteModel: typeof Favorite = {
    find: (query?: any) => {
      if (query) {
        return {
          // should change in case there was other types of query yet suffise for now
          lean: () =>
            mockFavorites.filter((f) => f.profile_id === query.profile_id),
        };
      } else {
        return {
          lean: () => mockFavorites,
        };
      }
    },
  } as any;

  // Create an instance of the FavoriteService with the mock model
  const favoriteService = new FavoriteService(mockFavoriteModel);

  describe('getFavorites', () => {
    it('should return an array of favorites', async () => {
      const favorites = await favoriteService.getFavorites();
      expect(favorites.length).to.equal(3);
      expect(favorites).to.deep.equal(mockFavorites);
    });
  });

  describe('getFavoritesByProfileId', () => {
    it('should return an array of favorites filtered by profile id', async () => {
      const profileId = 1;
      const favorites = await favoriteService.getFavoritesByProfileId(
        profileId,
      );
      expect(favorites.length).to.equal(2);
    });
  });
});
