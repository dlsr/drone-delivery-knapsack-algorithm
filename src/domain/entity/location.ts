export class Location {
  private _name: string;
  private _packageWeight: number;

  constructor(props: LocationConstructorProps) {
    this._name = props.name;
    this._packageWeight = props.maxWeight;
  }

  get name(): string {
    return this._name;
  }

  get packageWeigth(): number {
    return this._packageWeight;
  }

  static create(props: LocationCreateCommand): Location {
    const order = new Location(props);
    this.validate(order);
    return order;
  }

  private static validate(order: Location): void {
    if (!order.name) {
      throw new Error('location is required');
    }
    if (!order.packageWeigth) {
      throw new Error('packageWeight is required');
    }
  }
}

type LocationCreateCommand = {
  name: string;
  maxWeight: number;
}

type LocationConstructorProps = {
  location_id?: string;
  name: string;
  maxWeight: number;
}