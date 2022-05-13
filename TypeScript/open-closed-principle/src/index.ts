import { User } from './user';
import { NotificationCenter } from './notification-center';
import { EmailNotification } from './email-notification';

const user: User = new User();

let notificationCenter: NotificationCenter = new NotificationCenter();

notificationCenter.notifyByEmail(user, 'test');
notificationCenter.notifyBySms(user, 'test');

let notificationEmail: EmailNotification = new EmailNotification();
notificationEmail.sendNotification(user, 'test');