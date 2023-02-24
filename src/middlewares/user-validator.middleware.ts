import { NextFunction, Request, Response } from "express";
import { RequestError } from "../errors/request.error";
import { ServerError } from "../errors/server.error";

export class UserValidatorMiddleware {
  public static validateMandatoryFields(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, password } = req.body;

      if (!username) {
        return RequestError.fieldNotProvided(res, "Username");
      }

      if (!password) {
        return RequestError.fieldNotProvided(res, "Password");
      }

      next();
    } catch (error: any) {
      return ServerError.genericError(res, error);
    }
  }
}
