import { Request, Response } from "express";
import { inject } from "inversify";
import { controller, httpDelete, httpGet, httpPost, queryParam, request, response } from "inversify-express-utils";
import AttendanceServiceInterface from '../service/serviceInterfaces/attendance.service.interface';
import DITypes from "../shared/inversify.types";
import { AttendanceId } from "../shared/types";
import { ServerResponse } from "./server.response";

@controller('/api/attendance')
export class AttendanceController {

    constructor(@inject(DITypes.AttendanceServiceInterface) private attendanceService: AttendanceServiceInterface) {}

    @httpGet('/')
    async getAllAttendances(@request() req: Request, @response() res: Response) {
        const attendances = await this.attendanceService.getAllAttendances();
        ServerResponse.success(res, attendances, 'Attendances retrieved successfully!');
    }

    @httpGet('/filter')
    async getAttendancesByUser(@queryParam('userId') userId: string, @response() res: Response) {
        const attendances = await this.attendanceService.getAttendancesByUser(userId);
        ServerResponse.success(res, attendances, `User ${userId} attendances retrieved successfully!`);
    }

    @httpPost('/')
    async createAttendance(@request() req: Request, @response() res: Response) {
        const attendance = req.body;
        const createdAttendance = await this.attendanceService.createNewAttendance(attendance);
        ServerResponse.created(res, createdAttendance, 'Attendance created succesfully!');
    }

    @httpDelete('/')
    async deleteSingleAttendance(@queryParam('id') id: AttendanceId, @response() res: Response) {
        await this.attendanceService.deleteSingleAttendance(id);
        ServerResponse.success(res, null, `Attendance with id ${id} successfully deleted!`);
    }

    @httpDelete('/all')
    async deleteAttendancesByUser(@queryParam('userId') userId: string, @response() res: Response) {
        const result = await this.attendanceService.deleteAttendancesByUser(userId);
        if (!result) {
            ServerResponse.success(res, null, `User ${userId} has no attendances.`);
        } else {
            ServerResponse.success(res, null, `User ${userId} attendances successfully deleted!`);
        }
    }
}