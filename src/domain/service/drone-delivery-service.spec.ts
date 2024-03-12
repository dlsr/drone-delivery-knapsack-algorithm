import { DroneDeliveryService } from "./drone-delivery-service";
import { Drone } from "../entity/drone";
import { Location } from "../entity/location";

describe('DroneDeliveryService', () => {
  describe('when there is 1 drone and 1 location', () => {
    it('should not make a trip if the location exceeds the max weight of the drone', () => {
      const drones = [
        Drone.create({ name: 'DroneA', maxWeight: 200 }),
      ];

      const locations = [
        Location.create({ name: 'LocationA', maxWeight: 300 }),
      ];


      const deliverySummary = new DroneDeliveryService();
      const [droneA] = deliverySummary.delivery(drones, locations);
      expect(droneA.name).toBe('DroneA');
      expect(droneA.trips.length).toBe(0);
    })

    it('should make 1 trip to 1 location if the location is within the max weight of the drone', () => {
      const drones = [
        Drone.create({ name: 'DroneA', maxWeight: 200 }),
      ];

      const locations = [
        Location.create({ name: 'LocationA', maxWeight: 190 }),
      ];

      const deliveryCalculator = new DroneDeliveryService();
      const [droneA] = deliveryCalculator.delivery(drones, locations);
      expect(droneA.name).toBe('DroneA');
      expect(droneA.trips.length).toBe(1);
      expect(droneA.trips[0][0]).toBe('LocationA');
    })

    it('should make 1 trip to 1 location if the location matches the max weight of the drone', () => {
      const drones = [
        Drone.create({ name: 'DroneA', maxWeight: 200 }),
      ];

      const locations = [
        Location.create({ name: 'LocationA', maxWeight: 200 }),
      ];

      const deliveryCalculator = new DroneDeliveryService();
      const [droneA] = deliveryCalculator.delivery(drones, locations);
      expect(droneA.name).toBe('DroneA');
      expect(droneA.trips.length).toBe(1);
      expect(droneA.trips[0][0]).toBe('LocationA');
    })
  })

  describe('when there is 1 drone and 2 locations', () => {
    it('should not make any trips if both locations exceed the max weight of the drone', () => {
      const drones = [
        Drone.create({ name: 'DroneA', maxWeight: 200 }),
      ];

      const locations = [
        Location.create({ name: 'LocationA', maxWeight: 300 }),
        Location.create({ name: 'LocationB', maxWeight: 300 }),
      ];


      const deliveryCalculator = new DroneDeliveryService();
      const [droneA] = deliveryCalculator.delivery(drones, locations);
      expect(droneA.name).toBe('DroneA');
      expect(droneA.trips.length).toBe(0);
    })

    it('should make 1 trip to 2 locations if both locations are within the max weight of the drone', () => {
      const drones = [
        Drone.create({ name: 'DroneA', maxWeight: 200 }),
      ];

      const locations = [
        Location.create({ name: 'LocationA', maxWeight: 60 }),
        Location.create({ name: 'LocationB', maxWeight: 50 }),
      ];

      const deliveryCalculator = new DroneDeliveryService();
      const [droneA] = deliveryCalculator.delivery(drones, locations);
      expect(droneA.name).toBe('DroneA');
      expect(droneA.trips.length).toBe(1);
      expect(droneA.trips[0][0]).toBe('LocationB');
      expect(droneA.trips[0][1]).toBe('LocationA');

    })

    it('should make 1 trip to 1 location if one of the locations exceeds the max weight of the drone', () => {
      const drones = [
        Drone.create({ name: 'DroneA', maxWeight: 200 }),
      ];

      const locations = [
        Location.create({ name: 'LocationA', maxWeight: 210 }),
        Location.create({ name: 'LocationB', maxWeight: 50 }),
      ];

      const deliveryCalculator = new DroneDeliveryService();
      const [droneA] = deliveryCalculator.delivery(drones, locations);
      expect(droneA.name).toBe('DroneA');
      expect(droneA.trips.length).toBe(1);
      expect(droneA.trips[0][0]).toBe('LocationB');
    })

    it('should make 1 trip to 2 locations if both locations match the max weight of the drone', () => {
      const drones = [
        Drone.create({ name: 'DroneA', maxWeight: 200 }),
      ];

      const locations = [
        Location.create({ name: 'LocationA', maxWeight: 100 }),
        Location.create({ name: 'LocationB', maxWeight: 100 }),
      ];

      const deliveryCalculator = new DroneDeliveryService();
      const [droneA] = deliveryCalculator.delivery(drones, locations);
      expect(droneA.name).toBe('DroneA');
      expect(droneA.trips.length).toBe(1);
      expect(droneA.trips[0][0]).toBe('LocationB');
      expect(droneA.trips[0][1]).toBe('LocationA');
    })
  })

  describe('when there are 2 drones and 2 locations', () => {
    it('should not make any trips if both locations exceed the combined max weight of the drones', () => {
      const drones = [
        Drone.create({ name: 'DroneA', maxWeight: 100 }),
        Drone.create({ name: 'DroneB', maxWeight: 100 }),
      ];

      const locations = [
        Location.create({ name: 'LocationA', maxWeight: 110 }),
        Location.create({ name: 'LocationB', maxWeight: 110 }),
      ];


      const deliveryCalculator = new DroneDeliveryService();
      const [droneA, droneB] = deliveryCalculator.delivery(drones, locations);
      expect(droneA.name).toBe('DroneA');
      expect(droneA.trips.length).toBe(0);
      expect(droneB.name).toBe('DroneB');
      expect(droneB.trips.length).toBe(0);
    })

    it('should make 1 trip for each drone if both locations are within the combined max weight of the drones', () => {
      const drones = [
        Drone.create({ name: 'DroneA', maxWeight: 200 }),
        Drone.create({ name: 'DroneB', maxWeight: 200 }),
      ];

      const locations = [
        Location.create({ name: 'LocationA', maxWeight: 200 }),
        Location.create({ name: 'LocationB', maxWeight: 200 }),
      ];

      const deliveryCalculator = new DroneDeliveryService();
      const [droneA, droneB] = deliveryCalculator.delivery(drones, locations);

      expect(droneA.name).toBe('DroneA');
      expect(droneA.trips.length).toBe(1);
      expect(droneA.trips[0][0]).toBe('LocationB');

      expect(droneB.name).toBe('DroneB');
      expect(droneB.trips.length).toBe(1);
      expect(droneB.trips[0][0]).toBe('LocationA');
    })

    it('should make 1 trip to 1 location if one of them has weight greather than the max weight of the drone', () => {
      const drones = [
        Drone.create({ name: 'DroneA', maxWeight: 200 }),
      ];

      const locations = [
        Location.create({ name: 'LocationA', maxWeight: 210 }),
        Location.create({ name: 'LocationB', maxWeight: 50 }),
      ];

      const deliveryCalculator = new DroneDeliveryService();
      const [droneA] = deliveryCalculator.delivery(drones, locations);
      expect(droneA.name).toBe('DroneA');
      expect(droneA.trips.length).toBe(1);
      expect(droneA.trips[0][0]).toBe('LocationB');
    })

    it('should make 1 trip to 2 locations if both locations match the max weight of the drones', () => {
      const drones = [
        Drone.create({ name: 'DroneA', maxWeight: 200 }),
        Drone.create({ name: 'DroneB', maxWeight: 200 }),
      ];

      const locations = [
        Location.create({ name: 'LocationA', maxWeight: 200 }),
        Location.create({ name: 'LocationB', maxWeight: 200 }),
      ];

      const deliveryCalculator = new DroneDeliveryService();
      const [droneA, droneB] = deliveryCalculator.delivery(drones, locations);
      expect(droneA.name).toBe('DroneA');
      expect(droneA.trips.length).toBe(1);
      expect(droneA.trips[0][0]).toBe('LocationB');

      expect(droneB.name).toBe('DroneB')
      expect(droneB.trips.length).toBe(1);
      expect(droneB.trips[0][0]).toBe('LocationA');
    })
  })


  it('should distribute correctly among drones and locations', () => {
    const drones = [
      Drone.create({ name: 'DroneA', maxWeight: 200 }),
      Drone.create({ name: 'DroneB', maxWeight: 250 }),
      Drone.create({ name: 'DroneC', maxWeight: 100 })
    ];

    const locations = [
      Location.create({ name: 'LocationA', maxWeight: 200 }),
      Location.create({ name: 'LocationB', maxWeight: 150 }),
      Location.create({ name: 'LocationC', maxWeight: 50 }),
      Location.create({ name: 'LocationD', maxWeight: 150 }),
      Location.create({ name: 'LocationE', maxWeight: 100 }),
      Location.create({ name: 'LocationF', maxWeight: 200 }),
      Location.create({ name: 'LocationG', maxWeight: 50 }),
      Location.create({ name: 'LocationH', maxWeight: 80 }),
      Location.create({ name: 'LocationI', maxWeight: 70 }),
      Location.create({ name: 'LocationJ', maxWeight: 50 }),
      Location.create({ name: 'LocationK', maxWeight: 30 }),
      Location.create({ name: 'LocationL', maxWeight: 20 }),
      Location.create({ name: 'LocationM', maxWeight: 50 }),
      Location.create({ name: 'LocationN', maxWeight: 30 }),
      Location.create({ name: 'LocationO', maxWeight: 20 }),
      Location.create({ name: 'LocationP', maxWeight: 90 })
    ];

    const deliveryCalculator = new DroneDeliveryService();
    const [droneA, droneB, droneC] = deliveryCalculator.delivery(drones, locations);

    expect(droneA.name).toBe('DroneA');
    expect(droneA.trips.length).toBe(0);

    expect(droneB.name).toBe('DroneB');
    expect(droneB.trips.length).toBe(5);
    expect(droneB.trips[0][0]).toBe('LocationC');
    expect(droneB.trips[0][1]).toBe('LocationA');
    expect(droneB.trips[1][0]).toBe('LocationE');
    expect(droneB.trips[1][1]).toBe('LocationD');
    expect(droneB.trips[2][0]).toBe('LocationG');
    expect(droneB.trips[2][1]).toBe('LocationF');
    expect(droneB.trips[3][0]).toBe('LocationK');
    expect(droneB.trips[3][1]).toBe('LocationI');
    expect(droneB.trips[3][2]).toBe('LocationB');
    expect(droneB.trips[4][0]).toBe('LocationO');
    expect(droneB.trips[4][1]).toBe('LocationN');
    expect(droneB.trips[4][2]).toBe('LocationM');
    expect(droneB.trips[4][3]).toBe('LocationL');
    expect(droneB.trips[4][4]).toBe('LocationJ');
    expect(droneB.trips[4][5]).toBe('LocationH');

    expect(droneC.name).toBe('DroneC');
    expect(droneC.trips.length).toBe(1);
    expect(droneC.trips[0][0]).toBe('LocationP');
  });
})