import { Request, Response } from 'express';
import { container, injectable, inject } from 'tsyringe';
import { paths } from '../models/openapi';

import CalculatorService from '../services/calculator.service';
import { SuccessResponse, ErrorResponse } from '../models/requests/calculator.model';
import { calculatorSchema } from '../validators/calculator.validator';
import RedisService from '../services/redis.service';
import LogRequestService from '../services/logRequest.service';


@injectable()
class CalculatorController {
  private calculatorService: CalculatorService;
  private logRequestService: LogRequestService;

  constructor(@inject(RedisService) private redisService: RedisService) {
    this.calculatorService = container.resolve(CalculatorService);
    this.logRequestService = container.resolve(LogRequestService);
  }

  calculate = async (req: Request, res: Response): Promise<void> => {
    try {
      const start = new Date();
      const operation: paths["/api/calculator"]["post"]["requestBody"]["content"]["application/json"] = req.body;
      const response: SuccessResponse = {
        status: 'success',
        operation: operation.operation,
        inputs: {
          number1: operation.number1,
          number2: operation.number2,
        },
        result: 0,
        timestamp: start.toISOString(),
        responseTime: 0,

      }
      const { error } = calculatorSchema.validate(operation);

      if (error) {
        throw new Error(error.message);
      }

      const cachedResult = await this.redisService.getCachedResult(operation);
      if (cachedResult) {
        const end = new Date();
        const executionTime = end.getTime() - start.getTime();
        this.logRequestService.newLogRequest(operation.number1, operation.number2, operation.operation, Number(cachedResult), executionTime);
        response.result = Number(cachedResult);
        response.responseTime = executionTime;
        res.status(200).json(response);
        return;
      }
      const result = await this.calculatorService.calculate(operation.number1, operation.number2, operation.operation);
      this.redisService.setCache(operation, result);
      const end = new Date();
      const executionTime = end.getTime() - start.getTime();
      this.logRequestService.newLogRequest(operation.number1, operation.number2, operation.operation, Number(cachedResult), executionTime);
      response.result = Number(cachedResult);
      response.responseTime = executionTime;
      res.status(201).json(response);
    } catch (error: any) {
      const responseError: ErrorResponse = {
        status: 'error',
        message: error.message,
        timestamp: new Date().toISOString(),
      };
      res.status(400).json(responseError);
    }
  }
}

export default CalculatorController;
