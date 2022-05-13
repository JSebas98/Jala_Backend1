import { INotification } from './INotification';
import { User } from './user';

export class SmsNotification implements INotification {
    
    sendNotification(user: User, message: string): void {
        throw new Error('Method not implemented.');
    }

}