import { Drone, DroneCreateCommand } from './drone';
import { Location } from './location';

describe('Drone', () => {
  describe('constructor', () => {
    it('should create a drone instance with provided properties', () => {
      const drone = new Drone({ name: 'Drone1', maxWeight: 100 });
      expect(drone.name).toBe('Drone1');
      expect(drone.maxWeight).toBe(100);
      expect(drone.trips).toEqual([]);
    });
  });

  describe('delivery', () => {
    it('should add a trip with valid weight', () => {
      const drone = new Drone({ name: 'Drone1', maxWeight: 100 });
      const locations = [new Location({ name: 'Location1', maxWeight: 30 }), new Location({ name: 'Location2', maxWeight: 40 })];
      drone.delivery(locations);
      expect(drone.trips.length).toBe(1);
    });

    it('should throw an error for invalid weight', () => {
      const drone = new Drone({ name: 'Drone1', maxWeight: 100 });
      const locations = [new Location({ name: 'Location1', maxWeight: 50 }), new Location({ name: 'Location2', maxWeight: 60 })];
      expect(() => drone.delivery(locations)).toThrow('Invalid Capacity');
    });
  });

  describe('create', () => {
    it('should create a new drone instance with provided properties', () => {
      const drone = Drone.create({ name: 'Drone1', maxWeight: 100 });
      expect(drone.name).toBe('Drone1');
      expect(drone.maxWeight).toBe(100);
      expect(drone.trips).toEqual([]);
    });

    it('should throw an error when name is missing', () => {
      expect(() => Drone.create({ maxWeight: 100 } as DroneCreateCommand)).toThrow('name is required');
    });

    it('should throw an error when maxWeight is missing', () => {
      expect(() => Drone.create({ name: 'Drone1' } as DroneCreateCommand)).toThrow('maxWeight is required');
    });
  });
});
