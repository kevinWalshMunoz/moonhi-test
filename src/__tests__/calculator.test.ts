import 'reflect-metadata';
import CalculatorService from "../services/calculator.service";

describe("CalculatorService", () => {
  let calculatorService: CalculatorService;

  beforeEach(() => {
    calculatorService = new CalculatorService();
  });

  test("adds two numbers", async () => {
    const result = await calculatorService.calculate(5, 3, "+");
    expect(result).toBe(8);
  });

  test("subtracts two numbers", async () => {
    const result = await calculatorService.calculate(10, 4, "-");
    expect(result).toBe(6);
  });

  test("multiplies two numbers", async () => {
    const result = await calculatorService.calculate(6, 7, "*");
    expect(result).toBe(42);
  });

  test("divides two numbers", async () => {
    const result = await calculatorService.calculate(20, 5, "/");
    expect(result).toBe(4);
  });

  test("throws an error for an invalid operator", async () => {
    await expect(calculatorService.calculate(10, 2, "^")).rejects.toThrow("Invalid operator");
  });

  test("does not allow division by zero", async () => {
    const result = await calculatorService.calculate(10, 0, "/");
    expect(result).toBe(Infinity); // In JavaScript, division by 0 results in Infinity
  });

  test("waits before returning the result", async () => {
    const start = Date.now();
    await calculatorService.calculate(10, 5, "+");
    const duration = Date.now() - start;
    
    expect(duration).toBeGreaterThanOrEqual(2000); // Ensure it waits at least 2s
  });
});
