import { v4 as createUuid } from "uuid";

export class Notes {
  private _id: string;
  private _status: boolean;

  constructor(private _description: string, private _detailing: string) {
    this._id = createUuid();
    this._status = false;
  }
  // getter
  public get id() {
    return this._id;
  }

  public get description() {
    return this._description;
  }

  public get detailing() {
    return this._detailing;
  }

  public get status() {
    return this._status;
  }

  //setter

  public set description(description: string) {
    this._description = description;
  }

  public set detailing(detailing: string) {
    this._detailing = detailing;
  }

  public set status(status: boolean) {
    this._status = status;
  }
}
