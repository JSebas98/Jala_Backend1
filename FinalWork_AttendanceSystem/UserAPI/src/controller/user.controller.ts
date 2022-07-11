import { Request, Response } from 'express';
import { UserServiceInterface } from '../service/user.service.interface';
import DITypes from '../shared/inversify.types';
import { inject } from 'inversify';
import { controller, httpPost, httpDelete, request, response, httpGet, queryParam, httpPut } from 'inversify-express-utils';
import { ServerResponse } from './server.response';

@controller('/api/user')
export class UserController {

    constructor(@inject(DITypes.UserServiceInterface) private userService: UserServiceInterface) {
    }

    @httpGet('/')
    async getAllUsers(@request() req: Request, @response() res: Response) {
        const users = await this.userService.getAllUsers();
        ServerResponse.success(res, users, 'Users retreived successfully!');
    }

    @httpGet('/user')
    async getUserById(@queryParam('userId') userId: string, @response() res: Response) {
        const user = await this.userService.getUserById(userId);
        ServerResponse.success(res, user, `User ${userId} retrieved successfully.`);
    }

    @httpGet('/filter')
    async getUserByNameOrNickname(@queryParam('name') name: string,
                                @queryParam('nickname') nickname: string,
                                @response() res: Response) {

        const users = await this.userService.getUsersByNameOrNickname(name, nickname);
        ServerResponse.success(res, users, 'User(s) found.');
    }

    @httpGet('/details')
    async getUserDetailed(@queryParam('userId') userId: string, @response() res: Response) {
        const user = await this.userService.getUserDetailed(userId);
        ServerResponse.success(res, user, `User with id ${userId} found.`);
    }

    @httpPost('/')
    async createUser(@request() req: Request, @response() res: Response) {
        const user = req.body;
        const response = await this.userService.createUser(user);
        ServerResponse.created(res, response, 'User successfully created!');
    }

    @httpPut('/')
    async updateUser(@request() req: Request, @response() res: Response) {
        const user = req.body;
        const response = await this.userService.updateUser(user);
        ServerResponse.created(res, response, 'User successfully updated!');
    }

    @httpDelete('/')
    async deleteUser(@queryParam('id') id: string, @response() res: Response) {
        await this.userService.deleteUser(id);
        ServerResponse.success(res, null, `User with id ${id} successfully deleted!`);
    }
}