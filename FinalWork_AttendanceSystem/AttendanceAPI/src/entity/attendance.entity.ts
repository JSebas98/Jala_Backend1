import { model, Schema } from 'mongoose';
import AttendanceInterface from './attendance.interface';

const attendanceSchema = new Schema<AttendanceInterface>({
    userId: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    date: { type: Date, required: true, default: Date.now},
    notes: { type: String, required: false, default: ''}
});

const AttendanceModel = model<AttendanceInterface>('AttendanceModel', attendanceSchema);

export default AttendanceModel;