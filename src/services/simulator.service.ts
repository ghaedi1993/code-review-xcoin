import { Simulator } from '../models';
import logger from '../utils/logger';

export class SimulatorService {
  constructor(private model:typeof Simulator) {
    this.model = model;
  }
  async getSimulators() {
    try {
      const simulators = await this.model.find().lean();
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
      const simulators = await this.model.find(query).lean();
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
      const simulator = await this.model.create(newData);
      logger.info(simulator);
      return simulator;
    } catch (err) {
      throw err;
    }
  }
}

export default new SimulatorService(Simulator);
