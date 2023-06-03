import { Simulator } from '../models';
import logger from '../utils/logger';

class SimulatorService {
  async getSimulators() {
    try {
      const simulators = await Simulator.find().lean();
      logger.info(simulators);
      return simulators;
    } catch (err) {
      throw err;
    }
  }

  async getSimulatorsByProfileId(profileId) {
    const query = {
      profile_id: profileId,
    };

    try {
      const simulators = await Simulator.find(query).lean();
      logger.info(simulators);
      return simulators;
    } catch (err) {
      throw err;
    }
  }

  async createSimulator(profileId, data) {
    const newData = {
      ...data,
      profile_id: profileId,
    };

    try {
      const simulator = await Simulator.create(newData);
      logger.info(simulator);
      return simulator;
    } catch (err) {
      throw err;
    }
  }
}

export default new SimulatorService();
