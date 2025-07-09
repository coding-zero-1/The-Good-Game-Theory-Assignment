import { Router } from "express";
import { createBook, deleteBook, getBookByAuthor, getBooksById, updateBooks } from "../controllers/bookControllers";

const bookRouter = Router();

bookRouter.post('/', createBook);

bookRouter.get('/:author', getBookByAuthor);

bookRouter.get('/:id', getBooksById);

bookRouter.put('/:id', updateBooks);

bookRouter.delete('/:id', deleteBook);

export default bookRouter;
