import { Container } from 'inversify';
import { AttendanceRepository } from '../infrastructure/attendance.repository';
import AttendanceRepositoryInterface from '../infrastructure/attendance.repository.interface';
import AttendanceServiceInterface from '../service/serviceInterfaces/attendance.service.interface';
import DITypes from './inversify.types';
import { AttendanceService } from '../service/attendance.service';
import { UserServiceInterface } from '../service/serviceInterfaces/user.service.interface';
import { UserService } from '../service/user.service';
import { StatsService } from '../service/stats.service';

export const container = new Container();

container.bind<AttendanceRepositoryInterface>(DITypes.AttendanceRepositoryInterface).to(AttendanceRepository);
container.bind<AttendanceServiceInterface>(DITypes.AttendanceServiceInterface).to(AttendanceService);
container.bind<UserServiceInterface>(DITypes.UserServiceInterface).to(UserService);
container.bind<StatsService>(DITypes.StatsService).to(StatsService).inSingletonScope();