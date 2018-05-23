export class Payment{

  private _username: string;
  private _price:number;
  private _owner:string;
  private _date:Date;


  constructor(username: string, price: number, owner: string, date: Date) {
    this._username = username;
    this._price = price;
    this._owner = owner;
    this._date = date;
  }


  get username(): string {
    return this._username;
  }

  set username(value: string) {
    this._username = value;
  }

  get price(): number {
    return this._price;
  }

  set price(value: number) {
    this._price = value;
  }

  get owner(): string {
    return this._owner;
  }

  set owner(value: string) {
    this._owner = value;
  }

  get date(): Date {
    return this._date;
  }

  set date(value: Date) {
    this._date = value;
  }
}
