import { Request, Response } from 'express';
import { container, injectable } from 'tsyringe';
import { paths } from '../models/openapi';

import CalculatorService from '../services/calculator.service';
import { ILog } from '../models/DB/logRequest.model';
import { calculatorSchema } from '../validators/calculator.validator';

@injectable()
class CalculatorController {
  private calculatorService: CalculatorService;

  constructor() {
    this.calculatorService = container.resolve(CalculatorService);
  }

  calculate = async (req: Request, res: Response): Promise<void> => {
    try {
      const operation: paths["/api/calculator"]["post"]["requestBody"]["content"]["application/json"] = req.body;
      const { error } = calculatorSchema.validate(operation);
      if (error) {
        throw new Error(error.message);
      }
      const result: ILog = await this.calculatorService.calculate(operation.number1, operation.number2, operation.operation);
      res.status(201).json(result);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}

export default CalculatorController;
