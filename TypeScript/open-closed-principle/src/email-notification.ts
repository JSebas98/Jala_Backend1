import { INotification } from './INotification';
import { User } from './user';

export class EmailNotification implements INotification {
    
    sendNotification(user: User, message: string): void {
        throw new Error('Method not implemented.');
    }

}