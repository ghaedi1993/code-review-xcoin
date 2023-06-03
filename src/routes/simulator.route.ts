import { Router } from 'express';
import { simulatorService } from '../services';
import Joi from 'joi';
import { isValidObjectId } from 'mongoose';
const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const simulators = await simulatorService.getSimulators();
    res.json(simulators);
  } catch (err) {
    next(err);
  }
});

router.get('/:profile_id', async (req, res, next) => {
  const profileId = req.params.profile_id;

  try {
    const simulators = await simulatorService.getSimulatorsByProfileId(
      profileId,
    );
    res.json(simulators);
  } catch (err) {
    next(err);
  }
});

router.post('/:profile_id', async (req, res, next) => {
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

  const profile_id = req.params.profile_id;
  const simulatorDto = {
    profile_id,
    ...req.body,
  };
  try {
    const simulator = await simulatorService.createSimulator(simulatorDto);
    res.status(201).json(simulator);
  } catch (err) {
    next(err);
  }
});

export default router;
