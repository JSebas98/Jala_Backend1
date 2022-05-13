import Log from './log';
import { ILogRepository } from './Interfaces/ILogRepository';

export default class LogRepository implements ILogRepository {
    
    insert(log: Log): Log {
        console.log('Insert OK');
        return new Log();
    }

}