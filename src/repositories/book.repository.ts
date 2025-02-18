import { injectable } from 'tsyringe';
import { IBook, BookModel } from '../models/DB/book.model';

@injectable()
class BookRepository {
  async getBookById(id: string): Promise<IBook | null> {
    return BookModel.findById(id).exec();
  }
  async getAllBooks(): Promise<IBook[]> {
    return BookModel.find().exec();
  }
  async addBook(book: Partial<IBook>): Promise<IBook> {
    return BookModel.create(book);
  }
  async updateBook(id: string, updatedBook: Partial<IBook>): Promise<IBook | null> {
    return BookModel.findByIdAndUpdate(id, updatedBook, { new: true }).exec();
  }
  async deleteBook(id: string): Promise<void> {
    await BookModel.findByIdAndDelete(id).exec();
  }
}
export default BookRepository;
