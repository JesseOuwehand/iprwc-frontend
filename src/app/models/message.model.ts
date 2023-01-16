export class Message {
  private _type: string;
  private _message: string;

  constructor(type: string, message: string) {
    this._type = type;
    this._message = message;
  }

  get type(): string {
    return this._type;
  }

  set type(value: string) {
    this._type = value;
  }

  get message(): string {
    return this._message;
  }

  set message(value: string) {
    this._message = value;
  }
}
