import { expect } from 'chai';
import { SimulatorDTO, SimulatorService } from './simulator.service';
import sinon from 'sinon';

describe('SimulatorService', () => {
  let mockSimulators: any[];
  let mockSimulatorModel: any;
  let simulatorService: SimulatorService;

  beforeEach(() => {
    mockSimulators = [
      {
        id: 1,
        name: 'Simulator 1',
        profile_id: 1,
      },
      {
        id: 2,
        name: 'Simulator 2',
        profile_id: 1,
      },
      {
        id: 3,
        name: 'Simulator 3',
        profile_id: 2,
      },
    ];

    // Mock the Simulator model
    mockSimulatorModel = {
      find: (query?: any) => {
        if (query) {
          return {
            // should change in case there was other types of query yet suffise for now
            lean: () =>
              mockSimulators.filter((f) => f.profile_id === query.profile_id),
          };
        } else {
          return {
            lean: () => mockSimulators,
          };
        }
      },
      create: (stimulatorDto: SimulatorDTO) => {
        const id = mockSimulators.length + 1;
        const newSimulator = {
          ...stimulatorDto,
          id,
        };
        mockSimulators.push(newSimulator);
        return newSimulator;
      },
    } as any;

    // Create an instance of the SimulatorService with the mock model
    simulatorService = new SimulatorService(mockSimulatorModel);
  });

  describe('getSimulators', () => {
    it('should return an array of simulators', async () => {
      const spy = sinon.spy(mockSimulatorModel, 'find');

      const simulators = await simulatorService.getSimulators();

      sinon.assert.calledOnce(spy);
      expect(simulators.length).to.equal(3);
    });
  });

  describe('getSimulatorsByProfileId', () => {
    it('should return an array of simulators filtered by profile id', async () => {
      const profileId = 1;
      const query = {
        profile_id: profileId,
      };
      const spy = sinon.spy(mockSimulatorModel, 'find');

      const simulators = await simulatorService.getSimulatorsByProfileId(
        profileId,
      );

      sinon.assert.calledOnceWithExactly(spy, query);
      expect(simulators.length).to.equal(2);
    });
  });

  describe('createSimulator', () => {
    it('should create a new simulator', async () => {
      const data = {
        profile_id: 1,
        name: 'New Simulator',
      };
      const createSpy = sinon.spy(mockSimulatorModel, 'create');

      const simulator = await simulatorService.createSimulator(data);

      sinon.assert.calledOnceWithExactly(createSpy, data);
      expect(simulator).to.have.property('id');
      expect(simulator).to.have.property('name', data.name);
      expect(simulator).to.have.property('profile_id', data.profile_id);
    });
  });
});
