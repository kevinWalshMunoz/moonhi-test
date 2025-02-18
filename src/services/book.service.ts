import { injectable, inject } from 'tsyringe';
import BookRepository from '../repositories/book.repository';
import { IBook } from '../models/DB/book.model';

@injectable()
class BookService {
  constructor(@inject(BookRepository) private bookRepository: BookRepository) {}
  async getBook(id: string): Promise<IBook | null> {
    return this.bookRepository.getBookById(id);
  }
  async getAllBooks(): Promise<IBook[]> {
    return this.bookRepository.getAllBooks();
  }
  async createBook(title: string, author: string, publishedYear: number): Promise<IBook> {
    const newBook = { title, author, publishedYear };
    return this.bookRepository.addBook(newBook);
  }
  async updateBook(id: string, updatedBook: Partial<IBook>): Promise<IBook | null> {
    return this.bookRepository.updateBook(id, updatedBook);
  }
  async deleteBook(id: string): Promise<void> {
    await this.bookRepository.deleteBook(id);
  }
}
export default BookService;
