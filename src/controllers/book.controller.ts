import { Request, Response } from 'express';
import { container, injectable } from 'tsyringe';
import BookService from '../services/book.service';

@injectable()
class BookController {
  private bookService: BookService;

  constructor() {
    this.bookService = container.resolve(BookService);
  }

  getBook = async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    try {
      const book = await this.bookService.getBook(id);
      if (book) {
        res.status(200).json(book);
      } else {
        res.status(404).json({ message: 'Book not found' });
      }
    } catch (error) {
      res.status(400).json({ message: 'error.message' });
    }
  }

  getAllBooks = async (_req: Request, res: Response): Promise<void> => {
    try {
      const books = await this.bookService.getAllBooks();
      res.status(200).json(books);
    } catch (error) {
      res.status(400).json({ message: 'error.message' });
    }
  }

  createBook = async (req: Request, res: Response): Promise<void> => {
    const { title, author, publishedYear } = req.body;
    try {
      const book = await this.bookService.createBook(title, author, publishedYear);
      res.status(201).json(book);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  }

  updateBook = async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    const updatedBook = req.body;
    try {
      const book = await this.bookService.updateBook(id, updatedBook);
      if (book) {
        res.status(200).json(book);
      } else {
        res.status(404).json({ message: 'Book not found' });
      }
    } catch (error) {
      res.status(400).json({ message: 'error.message' });
    }
  }

  deleteBook = async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;
    try {
      await this.bookService.deleteBook(id);
      res.status(200).json({ message: 'Book deleted' });
    } catch (error) {
      res.status(400).json({ message: 'error.message' });
    }
  }
}

export default BookController;


























// import { Request, Response } from 'express';
// import { injectable } from 'tsyringe';

// import { paths } from '../types/openapi';

// @injectable()
// export class TestController {
//   addpost = async (req: Request, res: Response) => {
//     res.send('post added');
//   }

//   getPosts = async (req: Request, res: Response) => {
//     res.json({ id: 1, name: "John Doe" });
//   }

//   getAPost = async (req: Request, res: Response) => {
//     const user: paths["/api/test/{id}"]["get"]["responses"]["200"]["content"]["application/json"] = {
//       "id": 1,
//       "name": "Kevin Doe",
//       "email": "johndoe@example.com",
//       "role": "user"
//       };
//     res.json(user);
//   }

//   updatePost = async (req: Request, res: Response) => {
//     res.send('post updated');
//   }

//   deletePost = async (req: Request, res: Response) => {
//     res.send('post deleted');
//   }
// }
