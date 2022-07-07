import { Container } from 'inversify';
import { UserRepositoryInterface } from '../infrastructure/user.repository.interface';
import DITypes from './inversify.types';
import { UserRepository } from '../infrastructure/user.repository';
import { UserServiceInterface } from '../service/user.service.interface';
import { UserService } from '../service/user.service';
import { AttendanceServiceInterface } from '../service/attendance.service.interface';
import { AttendanceService } from '../service/attendance.service';

export const container = new Container();

container.bind<UserRepositoryInterface>(DITypes.UserRepositoryInterface).to(UserRepository);
container.bind<UserServiceInterface>(DITypes.UserServiceInterface).to(UserService);
container.bind<AttendanceServiceInterface>(DITypes.AttendanceServiceInterface).to(AttendanceService);