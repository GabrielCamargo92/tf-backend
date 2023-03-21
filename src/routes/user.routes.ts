import { Router } from "express";
import { NotesController } from "../controllers/notes.controller";
import { UsernameController } from "../controllers/username.controller";

import { UserValidatorMiddleware } from "../middlewares/user-validator.middleware";

// http://localhost:4444/
export const userRoutes = () => {
  const app = Router();

  // GET http://localhost:4444/

  app.get("/", new UsernameController().list);

  // GET http://localhost:4444/
  app.post(
    "/login",
    UserValidatorMiddleware.validateMandatoryFields,
    new UsernameController().login
  );

  // POST http://localhost:4444/
  app.post(
    "/createLogin",
    [UserValidatorMiddleware.validateMandatoryFields],
    new UsernameController().create
  );

  // DELETE http://localhost:4444/user/abc-1234
  app.delete("/:idUser", new UsernameController().delete);

  //notas
  app.get("/:idUser/userNotes", new NotesController().listAll);

  // app.get("/:idUser/userNotes", new NotesController().notesFilter);

  app.get("/:idUser/userNotes/:noteId", new NotesController().listOne);

  app.post("/:idUser/userNotes", new NotesController().create);

  app.put("/:idUser/userNotes/:noteId", new NotesController().editNotes);

  app.delete("/:idUser/userNotes/:noteId", new NotesController().delete);

  return app;
};
