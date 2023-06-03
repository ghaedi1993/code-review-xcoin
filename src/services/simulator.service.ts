import { Simulator } from '../models';
import logger from '../utils/logger';
export interface SimulatorDTO {
  profile_id: number;
  name: string;
  [key: string]: unknown;
}
export class SimulatorService {
  constructor(private model: typeof Simulator) {
    this.model = model;
  }
  async getSimulators() {
    try {
      const simulators = await this.model.find().lean();
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
      return simulators;
    } catch (err) {
      throw err;
    }
  }

  async createSimulator(simulatorDto: SimulatorDTO) {
    try {
      const simulator = await this.model.create(simulatorDto);
      logger.info(simulator);
      return simulator;
    } catch (err) {
      throw err;
    }
  }
}

export default new SimulatorService(Simulator);
