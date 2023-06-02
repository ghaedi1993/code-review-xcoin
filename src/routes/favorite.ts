import { Router } from 'express';
import { Favorite } from '../models';
import logger from '../utils/logger';

const router = Router();

router.get('/', async (req, res, next) => {
  return Favorite.find()
    .lean()
    .then((favorites) => {
      logger.info(favorites);
      res.json(favorites);
    })
    .catch((err) => next(err));
});

router.get('/:profile_id', async (req, res, next) => {
  const query = {
    profile_id: req.params.profile_id,
  };
  return Favorite.find(query)
    .lean()
    .then((favorites) => {
      logger.info(favorites);
      res.json(favorites);
    })
    .catch((err) => next(err));
});

export default router;
