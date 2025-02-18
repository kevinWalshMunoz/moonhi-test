import { Request, Response } from 'express';
import { container, injectable } from 'tsyringe';
import CalculatorService from '../services/calculator.service';

@injectable()
class CalculatorController {
  private calculatorService: CalculatorService;

  constructor() {
    this.calculatorService = container.resolve(CalculatorService);
  }

  createBook = async (req: Request, res: Response): Promise<void> => {
    const { number1, number2, operation } = req.body;
    try {
      const result = await this.calculatorService.calculate(number1, number2, operation);
      res.status(201).json(result);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }
}

export default CalculatorController;


























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
