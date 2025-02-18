import { injectable } from 'tsyringe';
import { ILog, LogModel } from '../models/DB/logRequest.model';

@injectable()
class LogRequestRepository {

  async newLogRequest(logRequest: Partial<ILog>): Promise<ILog> {
    return LogModel.create(logRequest);
  }

}
export default LogRequestRepository;
