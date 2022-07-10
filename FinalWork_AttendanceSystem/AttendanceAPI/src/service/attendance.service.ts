import { inject, injectable } from 'inversify';
import AttendanceServiceInterface from './serviceInterfaces/attendance.service.interface';
import AttendanceRepositoryInterface from '../infrastructure/attendance.repository.interface';
import DITypes from '../shared/inversify.types';
import { Attendance } from '../entity/attendance';
import AttendanceInterface from '../entity/attendance.interface';
import { AttendanceId, MessageToQueue } from '../shared/types';
import { NotFound } from '../shared/exceptions/notFound';
import { BadRequest } from '../shared/exceptions/badRequest';
import { UserServiceInterface } from './serviceInterfaces/user.service.interface';
import { StatsService } from './stats.service';

@injectable()
export class AttendanceService implements AttendanceServiceInterface {

    constructor(@inject(DITypes.AttendanceRepositoryInterface) private attendanceRepository: AttendanceRepositoryInterface,
                @inject(DITypes.UserServiceInterface) private userService: UserServiceInterface,
                @inject(DITypes.StatsService) private statsService: StatsService) {}

    async getAllAttendances(): Promise<AttendanceInterface[]> {
        const attendances = await this.attendanceRepository.getAllAttendances();

        return attendances;
    }

    async createNewAttendance(attendance: Attendance): Promise<AttendanceInterface> {

        const userExists = await this.validateUserExistence(attendance.userId);
        if(!userExists) {
            throw new NotFound(`User with id ${attendance.userId} doesn't exists.`);
        }
        
        const resultValidation: string[] = await this.validateFieldsAttendance(attendance);

        if (resultValidation.length > 0) {
            let errorDescription = '';
            resultValidation.forEach((message) => {
                errorDescription += `${message} `;
            });
            throw new BadRequest(errorDescription);
        }

        const createdAttendance = await this.attendanceRepository.createNewAttendance(attendance);
        const message: MessageToQueue = { event: 'AttendanceCreated', userId: attendance.userId };
        this.statsService.sendMessage(message);

        return createdAttendance;
    }

    async getAttendancesByUser(userId: string): Promise<AttendanceInterface[]> {
        const attendances = await this.attendanceRepository.getAttendancesByUser(userId);
        if(attendances.length === 0) {
            throw new NotFound(`No attendances for user ${userId} have been found.`);
        }

        return attendances;
    }
    
    async deleteSingleAttendance(id: AttendanceId): Promise<boolean> {
        const attendance = await this.attendanceRepository.getSingleAttendance(id);
        const result = await this.attendanceRepository.deleteSingleAttendance(id);
        if(!result) {
            throw new NotFound(`Attendance with id ${id} not found. Cannot delete.`);
        }

        const message: MessageToQueue = { event: 'AttendanceDeleted', userId: attendance.userId };
        this.statsService.sendMessage(message);

        return result;
    }

    async deleteAttendancesByUser(userId: string): Promise<boolean> {
        const result = await this.attendanceRepository.deleteAttendancesByUser(userId)
        if(!result) {
            throw new NotFound(`No attendances for user ${userId} have been found.`);
        }

        return result;
    }

    validateFieldsAttendance(attendance: Attendance): string[] {
        const errorDetails: string[] = [];

        if (!attendance.userId) {
            errorDetails.push('userId is a required field.');
        }

        if (!attendance.startTime) {
            errorDetails.push('startTime is a required field.');
        }

        if (!attendance.endTime) {
            errorDetails.push('endTime is a required field.');
        }

        return errorDetails;
    }

    async validateUserExistence(userId: string): Promise<boolean> {
        const user = await this.userService.getSingleUser(userId);
        if (!user) {
            return false;
        }

        return true;
    }
}