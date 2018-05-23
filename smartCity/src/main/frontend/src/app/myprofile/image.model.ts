export class ImageModel {
  private _id: number;
  private _name: string;
  private _type: string;
  private _blob:Blob;
  private _uploader:string;


  constructor(name: string, type: string, blob: Blob, uploader: string) {
    this._name = name;
    this._type = type;
    this._blob = blob;
    this._uploader = uploader;
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

  get type(): string {
    return this._type;
  }

  set type(value: string) {
    this._type = value;
  }


  get blob(): Blob {
    return this._blob;
  }

  set blob(value: Blob) {
    this._blob = value;
  }


  get uploader(): string {
    return this._uploader;
  }

  set uploader(value: string) {
    this._uploader = value;
  }
}
