import { Drone } from "../entity/drone";
import { Location } from "../entity/location";

export class DroneDeliveryService {
  public delivery(drones: Drone[], locations: Location[]): DeliverySummary {
    const groupedDrones = this.groupDronesByMaxWeight(drones);
    const sortedUniqueMaxWeights = Array.from(groupedDrones.keys()).sort((a, b) => a - b);
    const highestCapacity = sortedUniqueMaxWeights[sortedUniqueMaxWeights.length - 1];
    while (this.hasLocationToDelivery(locations)) {
      const table = this.generateKnapsackTable(locations, highestCapacity);
      const [locationIndicesToDelivery, sumCapacityLocations] = this.getLocationsToDelivery(table, locations);
      if (this.capacityIsEmpty(sumCapacityLocations)) {
        break;
      }
      const locationsToDelivery = locationIndicesToDelivery.map((index) => locations[index]);
      this.deliverLocationsAmongDrones(locationsToDelivery, groupedDrones, sortedUniqueMaxWeights, sumCapacityLocations);
      locations = this.removeLocations(locationIndicesToDelivery, locations);
    }

    return drones.map(drone => {
      const droneJson = drone.toJSON();
      return {
        name: droneJson.name,
        trips: droneJson.trips
      };
    });
  }


  private deliverLocationsAmongDrones(locations: Location[], groupedDrones: GroupedDrones, sortedUniqueMaxWeights: number[], sumCapacityLocations: number): void {
    const droneCapacityMap = groupedDrones;
    for (const capacity of sortedUniqueMaxWeights) {
      if (this.isCapacitySufficientForDelivery(capacity, sumCapacityLocations)) {
        const [currentIndex, availableDrones] = droneCapacityMap.get(capacity)!;
        const currentDrone = availableDrones[currentIndex];
        this.deliverLocationsToDrone(currentDrone, locations);
        this.updateDroneIndex(currentIndex, availableDrones, capacity, droneCapacityMap);
        break;
      }
    }
  }

  private isCapacitySufficientForDelivery(capacity: number, sumCapacityLocations: number): boolean {
    return sumCapacityLocations <= capacity;
  }

  private deliverLocationsToDrone(drone: Drone, locationsToDelivery: Location[]): void {
    drone.delivery(locationsToDelivery);
  }

  private updateDroneIndex(currentIndex: number, availableDrones: Drone[], capacity: number, droneCapacityMap: GroupedDrones): void {
    const nextIndex = currentIndex + 1 < availableDrones.length ? currentIndex + 1 : 0;
    droneCapacityMap.get(capacity)![0] = nextIndex;
  }



  private capacityIsEmpty(capacity: number): boolean {
    return capacity === 0;
  }

  private removeLocations(locationIndicesToDelivery: number[], locations: Location[]): Location[] {
    return locations.filter((_, index) => !locationIndicesToDelivery.includes(index));
  }

  private hasLocationToDelivery(locations: Location[]): boolean {
    return locations.length > 0;
  }

  private groupDronesByMaxWeight(drones: Drone[]): GroupedDrones {
    const groupedDrones: GroupedDrones = new Map();
    for (const drone of drones) {
      const maxWeight = drone.maxWeight;
      if (!groupedDrones.has(maxWeight)) {
        groupedDrones.set(maxWeight, [0, [drone]]);
      } else {
        const existingGroup = groupedDrones.get(maxWeight);
        if (existingGroup) {
          existingGroup[1].push(drone);
        }
      }
    }
    return groupedDrones;
  }


  private generateKnapsackTable(locations: Location[], capacity: number): number[][] {
    const matrix = new Array(locations.length + 1);
    for (let i = 0; i < matrix.length; i++) {
      matrix[i] = new Array(capacity + 1).fill(0);
    }
    for (let i = 1; i < locations.length + 1; i++) {
      const currentValue = locations[i - 1].packageWeigth;
      const currentWeigth = locations[i - 1].packageWeigth;
      for (let c = 0; c < capacity + 1; c++) {
        if (currentWeigth > c) {
          matrix[i][c] = matrix[i - 1][c];
        } else {
          matrix[i][c] = Math.max(matrix[i - 1][c], matrix[i - 1][c - currentWeigth] + currentValue);
        }
      }
    }
    return matrix;
  }

  private getLocationsToDelivery(table: number[][], locations: Location[]): DeliveryLocations {
    const locationIndeces = [];
    let i = table.length - 1;
    let c = table[0].length - 1;
    let maxCapacity = 0;
    while (i > 0) {
      if (table[i][c] !== table[i - 1][c] || table[i][c] === locations[i - 1].packageWeigth) {
        locationIndeces.push(i - 1);
        c -= locations[i - 1].packageWeigth;
        maxCapacity += locations[i - 1].packageWeigth;
      }
      i -= 1;
      if (c === 0) {
        break;
      }
    }
    return [locationIndeces, maxCapacity];
  }
}

type MaxCapacity = number;
type CurrentIndex = number;
type DroneGroup = [CurrentIndex, Drone[]];
type GroupedDrones = Map<MaxCapacity, DroneGroup>;
type DeliveryLocations = [number[], MaxCapacity];

type DroneDeviverySummary = {
  name: string;
  trips: string[][]
}
type DeliverySummary = DroneDeviverySummary[]