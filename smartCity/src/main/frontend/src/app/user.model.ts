export class User {
  private _id: number;
  private _username: string;
  private _password: string;
  private _role: string;
  private _accountCreated: any;
  private _domain:string;
  private _email:string;


  constructor(id: number, username: string, password: string, role: string) {
    this._id = id;
    this._username = username;
    this._password = password;
    this._role = role;
    // this._accountCreated = accountCreated;
    // this._domain = domain;
    // this._email = email;
  }


  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get username(): string {
    return this._username;
  }

  set username(value: string) {
    this._username = value;
  }

  get password(): string {
    return this._password;
  }

  set password(value: string) {
    this._password = value;
  }

  get role(): string {
    return this._role;
  }

  set role(value: string) {
    this._role = value;
  }

  get accountCreated(): any {
    return this._accountCreated;
  }

  set accountCreated(value: any) {
    this._accountCreated = value;
  }

  get domain(): string {
    return this._domain;
  }

  set domain(value: string) {
    this._domain = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }
}

