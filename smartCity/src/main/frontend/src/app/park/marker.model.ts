export class Marker {
  private _id: number;
  private _name: string;
  private _owner: string;
  private _longitude: number;
  private _latitude: number;
  private _type: string;


  constructor(name: string, owner: string, longitude: number, latitude: number, type: string) {
    this._name = name;
    this._owner = owner;
    this._longitude = longitude;
    this._latitude = latitude;
    this._type = type;
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

  get owner(): string {
    return this._owner;
  }

  set owner(value: string) {
    this._owner = value;
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

  get type(): string {
    return this._type;
  }

  set type(value: string) {
    this._type = value;
  }


}
