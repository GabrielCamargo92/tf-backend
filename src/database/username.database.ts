import { Username } from "../models/username.model";
import { usernames } from "./usernames";

export class UserDatabase {
  public list() {
    return [...usernames];
  }

  public getUserId(id: string) {
    return usernames.find((user) => user.idUser === id);
  }
  public getOne(username: string, password: string) {
    return usernames.find((item) => item.username === username && item.password === password);
  }

  public getUsername(username: string) {
    return usernames.find((item) => item.username === username);
  }

  public getUserIndex(id: string) {
    return usernames.findIndex((item) => item.idUser === id);
  }

  public create(user: Username) {
    usernames.push(user);
  }

  public delete(index: number) {
    usernames.splice(index, 1);
  }
}
