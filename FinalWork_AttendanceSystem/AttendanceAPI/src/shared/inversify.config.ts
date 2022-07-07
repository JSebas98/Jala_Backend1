import { Container } from "inversify";
import { AttendanceRepository } from '../infrastructure/attendance.repository';
import AttendanceRepositoryInterface from '../infrastructure/attendance.repository.interface';
import AttendanceServiceInterface from "../service/attendance.service.interface";
import DITypes from "./inversify.types";
import { AttendanceService } from '../service/attendance.service';
import { UserServiceInterface } from '../service/user.service.interface';
import { UserService } from '../service/user.service';

export const container = new Container();

container.bind<AttendanceRepositoryInterface>(DITypes.AttendanceRepositoryInterface).to(AttendanceRepository);
container.bind<AttendanceServiceInterface>(DITypes.AttendanceServiceInterface).to(AttendanceService);
container.bind<UserServiceInterface>(DITypes.UserServiceInterface).to(UserService);