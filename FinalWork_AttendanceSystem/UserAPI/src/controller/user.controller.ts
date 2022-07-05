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

    @httpGet('/filter')
    async getUserByNameOrNickname(@queryParam('name') name: string,
                                @queryParam('nickname') nickname: string,
                                @response() res: Response) {

        const users = await this.userService.getUsersByNameOrNickname(name, nickname);
        ServerResponse.success(res, users, 'User(s) found.');
    }

    @httpPost('/')
    async createUser(@request() req: Request, @response() res: Response) {
        const user = req.body;
        const response = await this.userService.createUser(user);
        ServerResponse.created(res, response, 'User successfully created!');
    }

    @httpDelete('/')
    async deleteUser(@queryParam('id') id: string, @response() res: Response): Promise<void> {
        const result: boolean = await this.userService.deleteUser(id);
        if (!result) {
            res.status(404).json({data: null, message: `User with id ${id} not found.`})
        } else {
            ServerResponse.success(res, null, `User with id ${id} successfully deleted!`);
        }

    };
}