import { Request, Response, Router } from "express";
import { UserServiceInterface } from '../service/user.service.interface';
import DITypes from '../shared/inversify.types';
import { inject } from "inversify";
import { controller, httpPost, httpDelete, request, response, requestParam } from "inversify-express-utils";

@controller('/api/user')
export class UserController {

    constructor(@inject(DITypes.UserServiceInterface) private userService: UserServiceInterface) {
    }

    @httpPost('/')
    createUser(@request() req: Request, @response() res: Response): void {
        const user = req.body;
        const response: any = this.userService.createUser(user);
        res.send(response);
    }

    @httpDelete('/:id')
    deleteUser(@requestParam('id') id: string, @response() res: Response): void {
        this.userService.deleteUser(id);
        res.sendStatus(204);
    };
}