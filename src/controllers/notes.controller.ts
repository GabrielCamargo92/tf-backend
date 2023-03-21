import { Request, Response } from "express";
import { notes } from "../database/notes";
import { NotesDatabase } from "../database/notes.database";
import { UserDatabase } from "../database/username.database";
import { usernames } from "../database/usernames";
import { RequestError } from "../errors/request.error";
import { ServerError } from "../errors/server.error";
import { Notes } from "../models/notes.model";
import { Username } from "../models/username.model";
import { SuccessResponse } from "../util/success.response";

export class NotesController {
  public listAll(req: Request, res: Response) {
    try {
      const { idUser } = req.params;
      const { description, filed } = req.query;

      const database = new UserDatabase();
      const user = database.getUserId(idUser);

      let noteList = user?.Notes;

      if (description) {
        noteList = noteList?.filter(
          (note) =>
            note.description.toString().toLowerCase() === description?.toString().toLowerCase()
        );
      }

      if (filed !== undefined && filed !== "") {
        const isFiled = filed?.toString().toLowerCase() === "true";
        noteList = noteList?.filter((note) => note.filed === isFiled);
      }

      return SuccessResponse.ok(res, "Exibindo notas do usuário", noteList);
    } catch (error: any) {
      return ServerError.genericError(res, error);
    }
  }

  public listOne(req: Request, res: Response) {
    try {
      const { idUser, noteId } = req.params;

      const database = new UserDatabase();
      const user = database.getUserId(idUser);

      const note = user?.notes.find((note) => note.id === noteId);

      return SuccessResponse.ok(res, "Note successfully listed", note);
    } catch (error: any) {
      return ServerError.genericError(res, error);
    }
  }
  // http://localhost:4444/user/5bd700e3-88ea-453a-ba62-27633d4a1f8b/transactions
  public create(req: Request, res: Response) {
    try {
      const { idUser } = req.params;
      const { description, detailing } = req.body;
      const database = new UserDatabase();
      const user = database.getUserId(idUser);

      if (!idUser) {
        return res.status(400).send({
          ok: false,
          message: "Id user not found",
        });
      }

      if (!user) {
        return res.status(404).send({
          ok: false,
          message: "User not found",
        });
      }

      if (!description) {
        return res.status(404).send({
          ok: false,
          message: "Description not found",
        });
      }

      if (!detailing) {
        return res.status(404).send({
          ok: false,
          message: "Detailing not found",
        });
      }

      const newNotes = new Notes(description, detailing);
      user.Notes = user.notes.concat(newNotes);

      return res.status(201).send({
        ok: true,
        message: "Note success created",
        data: newNotes,
      });
    } catch (error: any) {
      return ServerError.genericError(res, error);
    }
  }

  // http://localhost:4444/5bd700e3-88ea-453a-ba62-27633d4a1f8b/skill/nodejs
  public delete(req: Request, res: Response) {
    try {
      const { idUser, noteId } = req.params;

      const user = usernames.find((user) => user.idUser === idUser);

      if (!user) {
        return RequestError.notFound(res, "User");
      }
      const note = user.notes.find((note) => note.id === noteId);
      if (!note) {
        return RequestError.notFound(res, "Note");
      }

      const indexNotes = user.notes.findIndex((note) => note.id === noteId);

      user.notes.splice(indexNotes, 1);

      return res.status(200).send({
        ok: true,
        message: `Note was successfully deleted!`,
      });
    } catch (error: any) {
      return ServerError.genericError(res, error);
    }
  }

  public editNotes(req: Request, res: Response) {
    try {
      const { idUser, noteId } = req.params;
      const { description, detailing, filed } = req.body;

      const database = new UserDatabase();
      const user = database.getUserId(idUser);

      const noteList = user?.notes;
      const note = noteList?.find((note) => note.id === noteId);

      if (description) {
        note!.description = description;
      }

      if (detailing) {
        note!.detailing = detailing;
      }

      if (filed !== undefined) {
        note!.filed = filed;
      }

      return SuccessResponse.ok(res, "Note successfully updated", { note, noteList });
    } catch (error: any) {
      return ServerError.genericError(res, error);
    }
  }

  public notesFilter(req: Request, res: Response) {
    /////////////////////original
    try {
      const { idUser } = req.params;
      const { description, status } = req.query;
      const user = usernames.find((user) => user.idUser === idUser);
      if (!user) {
        return RequestError.notFound(res, "User");
      }

      const allNotes = user.notes;

      const notesToJason = allNotes.map((item) => {
        return {
          id: item.id,
          description: item.description,
          detailing: item.detailing,
          status: item.filed,
        };
      });

      if (description) {
        let filterDescription = allNotes.find((notes: Notes) => notes.description === description);
        if (filterDescription?.description === filterDescription?.description) {
          res.status(200).send({
            ok: true,
            message: "Description successfully obtained",
            data: filterDescription,
          });
        }
        RequestError.notFound(res, "Title");
      }

      if (status) {
        let filterStatus = allNotes.filter((note: Notes) => note.filed === Boolean(status));

        res.status(200).send({
          ok: true,
          message: "Status successfully obtained",
          status: filterStatus,
        });

        RequestError.notFound(res, "Status");
      }

      return res.status(200).send({
        notes: notesToJason,
      });
    } catch (error: any) {
      return ServerError.genericError(res, error);
    }
  }
}
