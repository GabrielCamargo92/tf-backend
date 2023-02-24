import { Response } from "express";
import { Notes } from "../models/notes.model";

export class SuccessResponse {
  static success(res: Response<any, Record<string, any>>, arg1: string, note: Notes) {
    throw new Error("Method not implemented.");
  }
  public static ok(res: Response, message: string, data: any) {
    return res.status(200).send({
      ok: true,
      message,
      data,
    });
  }

  public static created(res: Response, message: string, data: any) {
    return res.status(201).send({
      ok: true,
      message,
      data,
    });
  }
}
