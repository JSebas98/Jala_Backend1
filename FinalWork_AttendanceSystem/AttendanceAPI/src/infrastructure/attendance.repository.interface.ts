import { Attendance } from "../entity/attendance";
import AttendanceInterface from '../entity/attendance.interface';
import { AttendanceId } from '../shared/types';

interface AttendanceRepositoryInterface {
    getSingleAttendance(id: AttendanceId): any;
    getAllAttendances(): Promise<AttendanceInterface[]>;
    createNewAttendance(attendance: Attendance): Promise<AttendanceInterface>;
    getAttendancesByUser(userId: string): Promise<AttendanceInterface[]>;
    deleteSingleAttendance(id: AttendanceId): Promise<boolean>;
    deleteAttendancesByUser(userId: string): Promise<boolean>;
}

export default AttendanceRepositoryInterface;