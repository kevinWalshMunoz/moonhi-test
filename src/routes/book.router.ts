import { Router } from 'express';
import { injectable, container } from 'tsyringe';

import BookController from '../controllers/book.controller';

@injectable()
export class TestRouter {

  public router: Router;
  bookController: BookController;

  constructor() {
    this.router = Router();
    this.bookController = container.resolve(BookController);
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/books/:id', this.bookController.getBook);
    this.router.get('/books', this.bookController.getAllBooks);
    this.router.post('/books', this.bookController.createBook);
    this.router.put('/books/:id', this.bookController.updateBook);
    this.router.delete('/books/:id', this.bookController.deleteBook);
  }
}
