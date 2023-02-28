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
  app.delete("/:id", new UsernameController().delete);

  // PUT http://localhost:4444/user/abc-1234
  // app.put("/:id", new UsernameController());

  // POST http://localhost:4444/user/:id/transactions
  app.post("/:idUser/notes", new NotesController().create);

  app.get("/:idUser/userNotes", new NotesController().getNotes);

  // DELETE http://localhost:4444/user/:userId/transactions/:idTransaction
  app.delete("/:idUser/notes/:idNotes", new NotesController().delete);

  //GET - Filtrar pelo id do user http://localhost:4444/user/:userId/transactions/   <-- via req.query
  app.get("/:idUser/notes/", new NotesController().notesFilter);

  //GET - Filtrar pelo ID da transaction - http://localhost:4444/user/:userId/transactions/:transactionId
  app.get("/:idUser/notes/:noteId", new NotesController().listById);

  app.put("/:idUser/notes/:idNote", new NotesController().editNotes);

  return app;
};
