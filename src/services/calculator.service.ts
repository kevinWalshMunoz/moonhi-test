import { injectable, inject } from 'tsyringe';

import { ILog } from '../models/DB/logRequest.model';

@injectable()
class CalculatorService {

  constructor() {}

  async calculate(number1: number, number2: number, operation: string): Promise<number> {

    const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
    await wait(2000);

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

    return result;
  }

}
export default CalculatorService;
