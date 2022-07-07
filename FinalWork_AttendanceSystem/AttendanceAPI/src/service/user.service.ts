import { injectable } from 'inversify';
import fetch from 'node-fetch';
import { UserDomain } from '../shared/types';
import { UserServiceInterface } from './user.service.interface';

@injectable()
export class UserService implements UserServiceInterface {
    
    USER_API_URL = 'http://localhost:3000/api/user';

    constructor() {}
    
    async getSingleUser(userId: string): Promise<UserDomain | null> {
        const response = await fetch(`${this.USER_API_URL}/details?userId=${userId}`);
        const data = await response.json();

        return data.data;
    }
}