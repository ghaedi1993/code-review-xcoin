import { Router } from 'express';
import { Simulator } from '../models';
import logger from '../utils/logger';

const router = Router();

router.get('/', async (req, res, next) => {
  return Simulator.find()
    .lean()
    .then((simulators) => {
      logger.info(simulators);
      res.json(simulators);
    })
    .catch((err) => next(err));
});

router.get('/:profile_id', async (req, res, next) => {
  const query = {
    profile_id: req.params.profile_id,
  };

  return Simulator.find(query)
    .lean()
    .then((simulators) => {
      logger.info(simulators);
      res.json(simulators);
    })
    .catch((err) => next(err));
});

router.post('/:profile_id', async (req, res, next) => {
  const newData = {
    ...req.body,
    profile_id: req.params.profile_id,
  };
  return Simulator.create(newData)
    .then((simulator) => {
      logger.info(simulator);
      res.status(201).json(simulator);
    })
    .catch((err) => next(err));
});

export default router;
