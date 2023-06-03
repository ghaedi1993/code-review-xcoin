import { Router } from 'express';
import { favoriteService } from '../services';
const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const favorites = await favoriteService.getFavorites();
    res.json(favorites);
  } catch (err) {
    next(err);
  }
});

router.get('/:profile_id', async (req, res, next) => {
  const profileId = req.params.profile_id;

  try {
    const favorites = await favoriteService.getFavoritesByProfileId(profileId);
    res.json(favorites);
  } catch (err) {
    next(err);
  }
});

export default router;
