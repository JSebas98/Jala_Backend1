import { User } from './user';

export interface INotification {

    sendNotification(user: User, message: string): void;

}