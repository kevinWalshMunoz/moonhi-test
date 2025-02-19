import { injectable, inject } from 'tsyringe';

import { ILog } from '../models/DB/logRequest.model';
import LogRequestRepository from '../repositories/calculator.repository';

@injectable()
class CalculatorService {

  constructor(@inject(LogRequestRepository) private logRequestRepository: LogRequestRepository) {}

  async newLogRequest(number1: number, number2: number, operation: string, result: number, responseTime: number): Promise<ILog> {
    const logRequest = {
        operation,
        number1,
        number2,
        result,
        timestamp: new Date(),
        responseTime
      };
    return await this.logRequestRepository.newLogRequest(logRequest as ILog);
  }

}
export default CalculatorService;
