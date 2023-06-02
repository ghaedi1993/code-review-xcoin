import { Router } from 'express';
import favoriteRouter from './favorite';
import profileRouter from './profile';
import simulatorRouter from './simulator';

const router = Router();

router.use('/favorites', favoriteRouter);
router.use('/profiles', profileRouter);
router.use('/simulators', simulatorRouter);

export default router;
