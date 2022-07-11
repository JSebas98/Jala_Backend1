import { Attendance } from '../shared/types';

export interface AttendanceServiceInterface {
    getAllAttendancesByUser(userId: string): Promise<Attendance[]>;
    deleteAllAttendancesByUser(userId: string): Promise<void>;
}