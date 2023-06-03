import { Router } from 'express';
import { favoriteService } from '../services';
import Joi from 'joi';
import { isValidObjectId } from 'mongoose';
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
  const schema = Joi.object({
    profile_id: Joi.string().custom((value, helpers) => {
      if (!isValidObjectId(value)) {
        return helpers.error('any.invalid');
      }
      return value;
    }, 'Object Id Validation'),
  });

  const { error } = schema.validate(req.params);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const profileId = req.params.profile_id;

  try {
    const favorites = await favoriteService.getFavoritesByProfileId(profileId);
    res.json(favorites);
  } catch (err) {
    next(err);
  }
});

export default router;
