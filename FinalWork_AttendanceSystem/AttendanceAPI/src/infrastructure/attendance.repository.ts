import { injectable } from 'inversify';
import { Attendance } from '../entity/attendance';
import AttendanceInterface from '../entity/attendance.interface';
import { AttendanceId } from '../shared/types';
import AttendanceRepositoryInterface from './attendance.repository.interface';
import AttendanceModel from '../entity/attendance.entity';
import { DeleteResult } from 'mongodb';

@injectable()
export class AttendanceRepository implements AttendanceRepositoryInterface {
    
    async getSingleAttendance(id: AttendanceId): Promise<AttendanceInterface | null> {
        return await AttendanceModel.findById(id);
    }
    
    async getAllAttendances(): Promise<AttendanceInterface[]> {
        return await AttendanceModel.find();
    }

    async createNewAttendance(attendance: Attendance): Promise<AttendanceInterface> {
        const newAttendance = new AttendanceModel({
            userId: attendance.userId,
            startTime: attendance.startTime,
            endTime: attendance.endTime,
            date: attendance.date,
            notes: attendance.notes
        });

        return await newAttendance.save();
    }

    async getAttendancesByUser(userId: string): Promise<AttendanceInterface[]> {
        return await AttendanceModel.find({ userId: userId } );
    }

    async deleteSingleAttendance(id: AttendanceId): Promise<boolean> {
        const result: DeleteResult = await AttendanceModel.deleteOne({ _id: id }); 
        return result.deletedCount > 0;
    }

    async deleteAttendancesByUser(userId: string): Promise<boolean> {
        const result: DeleteResult = await AttendanceModel.deleteMany({ userId: userId });
        return result.deletedCount > 0;
    }
}