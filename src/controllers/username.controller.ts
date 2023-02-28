import { Request, Response } from "express";
import { RequestError } from "../errors/request.error";
import { ServerError } from "../errors/server.error";
import { SuccessResponse } from "../util/success.response";
import { UserDatabase } from "../database/username.database";
import { Username } from "../models/username.model";

export class UsernameController {
  public create(req: Request, res: Response) {
    try {
      const { username, password } = req.body;
      const database = new UserDatabase();

      const user = new Username(username, password);
      database.create(user);

      return SuccessResponse.created(res, "User was successfully create", user.toJson());
    } catch (error: any) {
      return ServerError.genericError(res, error);
    }
  }

  public login(req: Request, res: Response) {
    try {
      const { username, password, logged } = req.body;

      const database = new UserDatabase();
      const user = database.getOne(username, password);

      if (!user) {
        return RequestError.notFound(res, "User");
      }
      user.logged = true;
      res.status(200).send({
        ok: true,
        message: "User successfully obtained",
        data: {
          id: user.idUser,
          username: user.username,
          logged: user.logged,
          // notes: user.notes,
        },
      });
    } catch (error: any) {
      return ServerError.genericError(res, error);
    }
  }

  public list(req: Request, res: Response) {
    try {
      const database = new UserDatabase();
      const users = database.list();
      const result = users.map((user) => user.toJson());
      res.status(200).send({
        ok: true,
        message: "Users successfully listed",
        data: result,
      });
    } catch (error: any) {
      return ServerError.genericError(res, error);
    }
  }

  public delete(req: Request, res: Response) {
    try {
      const { idUser } = req.params;

      const database = new UserDatabase();
      const userIndex = database.getUserIndex(idUser);

      if (userIndex < 0) {
        return res.status(404).send({
          ok: false,
          message: "User not found",
        });
      }

      database.delete(userIndex);

      return SuccessResponse.ok(res, "User was successfully deleted", userIndex);
    } catch (error: any) {
      return ServerError.genericError(res, error);
    }
  }
}
