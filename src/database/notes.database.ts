import { Notes } from "../models/notes.model";
import { notes } from "./notes";

export class NotesDatabase {
  public list() {
    return [...notes];
  }

  public getOneNote(id: string) {
    return notes.find((note) => note.id === id);
  }

  public getByDescription(description: string) {
    return notes.find((note: { description: string }) => note.description === description);
  }

  public getByStatus(status: boolean) {
    return notes.find((note: { status: boolean }) => note.status === status);
  }

  public getIndex(id: string) {
    return notes.findIndex((note: { id: string }) => note.id === id);
  }

  public create(note: Notes) {
    notes.push(note);
  }

  public delete(index: number) {
    notes.splice(index, 1);
  }
}
