import { Location } from "./location";
export class Trip {
  private _locations: Location[];

  constructor(props: TripConstructorProps) {
    this._locations = props.locations;
  }

  get locations(): Location[] {
    return this._locations;
  }

  static create(props: TripCreateCommand): Trip {
    return new Trip(props);
  }

}

type TripCreateCommand = {
  locations: Location[];
}

type TripConstructorProps = {
  locations: Location[];
}