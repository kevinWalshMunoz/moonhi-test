import { injectable, inject } from 'tsyringe';
import BookRepository from '../repositories/calculator.repository';
import { ILog } from '../models/DB/logRequest.model';

@injectable()
class CalculatorService {

  constructor(@inject(BookRepository) private bookRepository: BookRepository) {}

  async calculate(number1: number, number2: number, operation: string): Promise<ILog> {

    let result: number;
    switch (operation) {
      case '+':
      result = Number(number1) + Number(number2);
      break;
      case '-':
      result = number1 - number2;
      break;
      case '*':
      result = number1 * number2;
      break;
      case '/':
      result = number1 / number2;
      break;
      default:
      throw new Error('Invalid operator');
    }

    const logRequest = {
      operation,
      number1,
      number2,
      result,
      timestamp: new Date(),
      responseTime: 100
    };

    return await this.bookRepository.newLogRequest(logRequest as ILog);
  }

}
export default CalculatorService;
