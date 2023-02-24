import { v4 as createUuid } from "uuid";
import { Notes } from "./notes.model";

export class Username {
  private _idUser: string;
  private _notes: Notes[] = [];
  private _logged: boolean | undefined;

  constructor(private _username: string, private _password: string) {
    this._idUser = createUuid();
    this._logged = false || true;
  }

  // getter
  public get idUser() {
    return this._idUser;
  }

  public get username() {
    return this._username;
  }

  public get password() {
    return this._password;
  }

  public get logged() {
    return this._logged;
  }

  public get notes() {
    return this._notes ?? [];
  }

  // setter
  public set username(username: string) {
    this._username = username;
  }

  public set password(password: string) {
    this._password = password;
  }

  public set Notes(notes: Notes[]) {
    this._notes = notes;
  }

  public set logged(logged: boolean | undefined) {
    this._logged = logged;
  }

  public toJson() {
    return {
      id: this._idUser,
      nome: this._username,
      notes: this._notes,
      logged: this._logged,
    };
  }
}
