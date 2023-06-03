import { Router } from 'express';
import logger from '../utils/logger';
import profileService from '../services/profile.service';
const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const profiles = await profileService.getProfiles();
    logger.info(profiles);
    res.json(profiles);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  const { email, name, nickname } = req.body;

  try {
    const profile = await profileService.createProfile({
      email,
      name,
      nickname,
    });
    res.status(201).json(profile);
  } catch (err) {
    next(err);
  }
});

export default router;
