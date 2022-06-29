import { Request, Response, Router } from "express";
import { UserServiceInterface } from '../service/user.service.interface';
import DITypes from '../shared/inversify.types';
import { inject } from "inversify";
import { controller, httpPost, httpDelete, request, response, httpGet, queryParam } from "inversify-express-utils";
import { ServerResponse } from "./server.response";

@controller('/api/user')
export class UserController {

    constructor(@inject(DITypes.UserServiceInterface) private userService: UserServiceInterface) {
    }

    @httpGet('/')
    async getAllUsers(@request() req: Request, @response() res: Response) {
        const users = await this.userService.getAllUsers();
        ServerResponse.success(res, users, 'Users retreived successfully!');
    }

    @httpGet('/:name')
    async getUserByName(@queryParam('name') name: string, @response() res: Response) {

    }

    @httpGet('/:nickname')
    async getUserByNickname(@queryParam('nickname') name: string, @response() res: Response) {
        
    }

    @httpPost('/')
    async createUser(@request() req: Request, @response() res: Response) {
        const user = req.body;
        const response = await this.userService.createUser(user);
        ServerResponse.created(res, response, 'User successfully created!');
    }

    @httpDelete('/')
    deleteUser(@queryParam('id') id: string, @response() res: Response): void {
        this.userService.deleteUser(id);
        ServerResponse.success(res, null, `User with id ${id} successfully deleted!`);
    };
}