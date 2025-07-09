import { Request, Response } from "express";
import BookModel from "../models/bookModel";

const getBooksById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const book = await BookModel.findById(id);

    if (!book) {
      return res.status(404).json({ message: "Book not found." });
    }

    res.status(200).json(book);
  } catch (error: any) {
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid book ID format." });
    }
    console.error("Error fetching book by ID:", error.message);
    res.status(500).json({ message: "Server error while fetching book." });
  }
};

const updateBooks = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedBook = await BookModel.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found for update." });
    }

    res.status(200).json(updatedBook);
  } catch (error: any) {
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid book ID format." });
    }
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }
    console.error("Error updating book:", error.message);
    res.status(500).json({ message: "Server error while updating book." });
  }
};

const deleteBook = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deletedBook = await BookModel.findByIdAndDelete(id);

    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found for deletion." });
    }
    res.status(200).json({ message: "Book deleted successfully." });
  } catch (error: any) {
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid book ID format." });
    }
    console.error("Error deleting book:", error.message);
    res.status(500).json({ message: "Server error while deleting book." });
  }
};

const getBookByAuthor = async (req: Request, res: Response) => {
  try {
    const { author } = req.params;
    const books = await BookModel.find({ author });
    res.status(200).json(books);
  } catch (error: any) {
    console.error("Error fetching books:", error.message);
    res
      .status(500)
      .json({
        message: "Server error while fetching books.",
        error: error.message,
      });
  }
};

const createBook = async (req: Request, res: Response) => {
  try {
    const { title, author, publishedYear, cost } = req.body;

    // Basic validation, will add zod for validation later
    if (!title || !author) {
      return res
        .status(400)
        .json({ message: "Title and author are required." });
    }

    const newBook = await BookModel.create({
      title,
      author,
      publishedYear,
      cost,
    });

    res.status(201).json(newBook);
  } catch (error: any) {
    console.error("Error creating book:", error.message);
    res.status(500).json({ message: "Server error while creating book." });
  }
};

export { getBooksById, updateBooks, deleteBook, getBookByAuthor, createBook };
