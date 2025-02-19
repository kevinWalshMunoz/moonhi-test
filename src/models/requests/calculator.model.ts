export interface ErrorResponse {
  status: string;
  message: string;
  timestamp: string;
}

export interface SuccessResponse {
  status: string;
  operation: string;
  inputs: {
    number1: number;
    number2: number;
  };
  result: number;
  timestamp: string;
  responseTime: number;
}