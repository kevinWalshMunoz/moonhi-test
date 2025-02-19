import { Router } from 'express';
import { injectable, container } from 'tsyringe';

import CalculatorController from '../controllers/calculator.controller';

@injectable()
export class CalculatorRouter {

  public router: Router;
  calculateController: CalculatorController;

  constructor() {
    this.router = Router();
    this.calculateController = container.resolve(CalculatorController);
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post('/v1/calculator', this.calculateController.calculate);
  }
}
