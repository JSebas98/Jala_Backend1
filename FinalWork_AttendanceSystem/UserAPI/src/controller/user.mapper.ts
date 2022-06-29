import { User } from '../entity/user.entity';
import { UserDTO } from '../entity/user';
import { UserProps } from '../shared/types';

export class UserMapper {

    static userEntityToDTO(user: User): UserDTO {
        const userProps: UserProps = {
            id: user.id,
            name: user.name,
            nickname: user.nickname,
            totalAttendance: user.totalAttendance 
        }
        
        return new UserDTO(userProps);
    }

    static userDTOToEntity(userDTO: UserDTO): User {
        return {
            id: userDTO.id,
            name: userDTO.name,
            nickname: userDTO.nickname,
            totalAttendance: userDTO.totalAttendance 
        }
    }
}