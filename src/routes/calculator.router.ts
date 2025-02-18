import { Router } from 'express';
import { injectable, container } from 'tsyringe';

import CalculatorController from '../controllers/calculator.controller';

@injectable()
export class CalculatorRouter {

  public router: Router;
  bookController: CalculatorController;

  constructor() {
    this.router = Router();
    this.bookController = container.resolve(CalculatorController);
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post('/calculator', this.bookController.createBook);
  }
}
