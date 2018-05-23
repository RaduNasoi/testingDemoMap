export class Parking {
  private _id: number;
  private _name: string;
  private _owner: string;
  private _longitude: number;
  private _latitude: number;
  private _noOfPlaces: number;
  private _noOfOccupiedPlaces: number;
  private _freeSpots: number;


  constructor(name: string, noOfPlaces: number, longitude: number, latitude: number, owner: string) {

    this._name = name;
    this._longitude = longitude;
    this._latitude = latitude;
    this._noOfPlaces = noOfPlaces;
    this._owner = owner;

  }


  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get longitude(): number {
    return this._longitude;
  }

  set longitude(value: number) {
    this._longitude = value;
  }

  get latitude(): number {
    return this._latitude;
  }

  set latitude(value: number) {
    this._latitude = value;
  }

  get numberOfPlaces(): number {
    return this._noOfPlaces;
  }

  set numberOfPlaces(value: number) {
    this._noOfPlaces = value;
  }

  get numberOfOccupiedPlaces(): number {
    return this._noOfOccupiedPlaces;
  }

  set numberOfOccupiedPlaces(value: number) {
    this._noOfOccupiedPlaces = value;
  }


  get freeSpots(): number {
    return this._noOfPlaces - this._noOfOccupiedPlaces;
  }

  set freeSpots(value: number) {
    this._freeSpots = value;
  }


  get owner(): string {
    return this._owner;
  }

  set owner(value: string) {
    this._owner = value;
  }
}
