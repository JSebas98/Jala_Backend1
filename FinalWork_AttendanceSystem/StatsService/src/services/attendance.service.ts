import fetch from "node-fetch";
import { ResponseAttendance } from "../shared/types";

export class AttendanceService {

    constructor() {}

    async getAllAttendancesByUser(userId: string): Promise<ResponseAttendance> {
        const attendances = await fetch(`${process.env.ATTENDANCE_API_URL}/filter?userId=${userId}`);
        const data: ResponseAttendance = (await attendances.json()) as ResponseAttendance; 
        
        return data;
    }

    async getTotalAttendancesByUser(userId: string): Promise<number> {
        const attendances: ResponseAttendance = await this.getAllAttendancesByUser(userId);
        return attendances.data.length;
    }
}