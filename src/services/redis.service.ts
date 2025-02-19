import { injectable } from 'tsyringe';
import Redis from 'ioredis';

// TypeScript interface for Redis client options
interface CacheOptions {
  host: string;
  port: number;
}

interface OperationRequest {
  number1: number;
  number2: number;
  operation: string;
}

@injectable()
class RedisService {
  private _redis: Redis;

  constructor() {
    const options: CacheOptions = {
      host: '127.0.0.1',
      port: 6379,
    };

    this._redis = new Redis({
      host: options.host,
      port: options.port,
    });

    this._redis.on('error', (err) => {
      console.error('Redis connection error:', err);
    });
  }

  setCache = async (request: OperationRequest, result: number, ttl: number = 60): Promise<void> => {
    const key = `operation_${request.number1}_${request.number2}_${request.operation}`;
  
    await this._redis.set(key, result, 'EX', ttl);
    console.log(`Cache set with key: ${key} and TTL: ${ttl}`);
  };

  getCachedResult = async (request: OperationRequest): Promise<string | null> => {
    const key = `operation_${request.number1}_${request.number2}_${request.operation}`;
  
    const cachedResult = await this._redis.get(key);
    
    if (cachedResult) {
      return cachedResult;
    }
  
    return null;
  };


}

export default RedisService;
