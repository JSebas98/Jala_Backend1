import { injectable } from 'inversify';
import { AttendanceServiceInterface } from './attendance.service.interface';
import fetch from 'node-fetch';
import { Attendance } from '../shared/types';

@injectable()
export class AttendanceService implements AttendanceServiceInterface{
    
    ATTENDANCE_API_URL = 'http://localhost:3001/api/attendance';

    constructor() {}

    async getAllAttendancesByUser(userId: string): Promise<Attendance[]> {
        const response = await fetch(`${this.ATTENDANCE_API_URL}/filter?userId=${userId}`);
        const data = await response.json();

        return data.data;
    }

    async deleteAllAttendancesByUser(userId: string): Promise<void> {
        const response = await fetch(`${this.ATTENDANCE_API_URL}/all?userId=${userId}`, {
            method: 'DELETE'
        });
        if (response.status !== 200) {
            throw new Error(`Error while deleting user ${userId}' attendances.`);
        }
    }
}