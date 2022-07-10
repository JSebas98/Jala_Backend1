import fetch from "node-fetch";
import { MessageReceived, UserUpdate } from "../shared/types";
import { AttendanceService } from './attendance.service';

export class UserService {

    attendanceService!: AttendanceService;

    constructor() {
        this.attendanceService = new AttendanceService();
    }

    async makePutRequestToUserAPI(userUpdate: UserUpdate) {
        const response = await fetch(`${process.env.USER_API_URL}`, {
            method: 'PUT',
            body: JSON.stringify(userUpdate),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        return data.data; 
    }

    async updateUserTotalAttendance(message: MessageReceived) {
        const userUpdate: UserUpdate = {
            id: message.userId,
            totalAttendance: await this.attendanceService.getTotalAttendancesByUser(message.userId),
        }
        const updatedUser = await this.makePutRequestToUserAPI(userUpdate);
        return updatedUser;
    }
}