import { Request, Response } from 'express';
import Book from '../models/bookModel';

class BookController {
  async createBook(req: Request, res: Response) {
    const { title } = req.body;
    const creator = (req as any).user?.username;

    try {
      const newBook = await Book.create({ title, creator });
      res.status(201).json(newBook);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  async getBooks(req: Request, res: Response) {
    const { old, new: isNew } = req.query;
    const filter = isNew ? { createdAt: { $gte: new Date(Date.now() - 10 * 60 * 1000) } } : {};

    try {
      const books = await Book.find(filter);
      res.status(200).json(books);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}

export default new BookController();
