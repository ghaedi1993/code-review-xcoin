import { Router } from 'express';
import favoriteRouter from './favorite.route';
import profileRouter from './profile.route';
import simulatorRouter from './simulator.route';

const router = Router();

router.use('/favorites', favoriteRouter);
router.use('/profiles', profileRouter);
router.use('/simulators', simulatorRouter);

export default router;
