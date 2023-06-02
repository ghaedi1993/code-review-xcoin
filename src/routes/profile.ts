import { Router } from 'express';
import { Profile } from '../models';
import logger from '../utils/logger';
import Boom from '@hapi/boom';
const router = Router();

router.get('/', async (req, res, next) => {
  return Profile.find()
    .lean()
    .then((profiles) => {
      logger.info(profiles);
      res.json(profiles);
    })
    .catch((err) => next(err));
});

router.post('/', async (req, res, next) => {
  const { email, name, nickname } = req.body;

  return Profile.findOne({
    $or: [{ email }, { nickname }],
  })
    .lean()
    .then((profile) => {
      if (!profile) {
        return Profile.create({ name, email, nickname }).then((profile) =>
          res.status(201).json(profile),
        );
      } else {
        throw Boom.conflict('Profile already exists');
      }
    })
    .catch((err) => next(err));
});

export default router;
