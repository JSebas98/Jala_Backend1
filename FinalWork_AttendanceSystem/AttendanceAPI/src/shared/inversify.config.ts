import { Container } from "inversify";
import { AttendanceRepository } from '../infrastructure/attendance.repository';
import AttendanceRepositoryInterface from '../infrastructure/attendance.repository.interface';
import AttendanceServiceInterface from "../service/attendance.service.interface";
import DITypes from "./inversify.types";
import { AttendanceService } from '../service/attendance.service';

export const container = new Container();

container.bind<AttendanceRepositoryInterface>(DITypes.AttendanceRepositoryInterface).to(AttendanceRepository);
container.bind<AttendanceServiceInterface>(DITypes.AttendanceServiceInterface).to(AttendanceService);