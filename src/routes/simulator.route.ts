import { Router } from 'express';
import { simulatorService } from '../services';
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
  const profile_id = req.params.profile_id;
  const simulatorDto = {
    profile_id,
    ...req.body
  }
  try {
    const simulator = await simulatorService.createSimulator(simulatorDto);
    res.status(201).json(simulator);
  } catch (err) {
    next(err);
  }
});

export default router;
