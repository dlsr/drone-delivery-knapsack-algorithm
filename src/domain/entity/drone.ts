import { Location } from "./location";
import { Trip } from "./trip";

export class Drone {
  private _name: string;
  private _maxWeight: number;
  private _trips: Trip[];

  constructor(props: DroneConstructorProps) {
    this._name = props.name;
    this._maxWeight = props.maxWeight;
    this._trips = [];
  }

  get name(): string {
    return this._name;
  }

  get maxWeight(): number {
    return this._maxWeight;
  }

  get trips(): Trip[] {
    return this._trips;
  }

  public toJSON() {
    return {
      name: this.name,
      trips: this.trips.map((trip) => trip.locations.map((location) => location.name)),
      maxWeight: this.maxWeight,
    };
  }

  public delivery(locations: Location[]): void {
    const sumWeigth = locations.reduce((acc, location) => acc + location.packageWeigth, 0);
    if (sumWeigth > this._maxWeight) {
      throw new Error('Invalid Capacity');
    }

    this.addTrip(locations);
  }

  private addTrip(locations: Location[]): void {
    this._trips.push(Trip.create({ locations }));
  }

  static create(props: DroneCreateCommand): Drone {
    const drone = new Drone(props);
    this.validate(drone);
    return drone;
  }

  private static validate(drone: Drone): void {
    if (!drone.name) {
      throw new Error('name is required');
    }
    if (!drone.maxWeight) {
      throw new Error('maxWeight is required');
    }
  }
}

export type DroneCreateCommand = {
  name: string;
  maxWeight: number;
}

export type DroneConstructorProps = {
  name: string;
  maxWeight: number;
}