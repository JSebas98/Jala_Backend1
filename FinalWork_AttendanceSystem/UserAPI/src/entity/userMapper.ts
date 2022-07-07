import { Attendance } from '../shared/types';
import { User } from './user.entity';
import { UserDomain } from './user';

export class UserMapper {
    
    static toUserDomain(entity: User, attendances?: Attendance[]): UserDomain {
        return new UserDomain(entity.id, entity.name, entity.nickname, entity.totalAttendance, attendances);
    }

    static toEntity(userDomain: UserDomain): User {
        return {
            id: userDomain.id,
            name: userDomain.name,
            nickname: userDomain.nickname,
            totalAttendance: userDomain.totalAttendance
        }
    }
}