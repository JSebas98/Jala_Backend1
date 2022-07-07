import { Types } from "mongoose";
import AttendanceInterface from '../entity/attendance.interface';

type AttendanceId = string | Types.ObjectId;

type UserDomain = {
    _id: string,
    _name: string,
    _nickname: string,
    _totalAttendance: string,
    _attendances?: AttendanceInterface[]
};

export { AttendanceId, UserDomain };