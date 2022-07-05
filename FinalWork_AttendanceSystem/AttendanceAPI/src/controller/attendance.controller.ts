import { Request, Response } from "express";
import { controller, httpGet, request, response } from "inversify-express-utils";

@controller('/api/attendance')
export class AttendanceController {
    @httpGet('/')
    helloWorld(@request() req: Request, @response() res: Response) {
        res.send('Hello world!')
    }
}