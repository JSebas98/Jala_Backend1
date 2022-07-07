import { injectable } from 'inversify';
import { AppDataSource } from './dataSource';
import { User } from '../entity/user.entity';
import { DeleteResult, Like, Repository } from 'typeorm';
import { UserRepositoryInterface } from './user.repository.interface';
import { UserMapper } from '../entity/userMapper';
import { UserDomain } from '../entity/user';

@injectable()
export class UserRepository implements UserRepositoryInterface {

    private userRepository: Repository<User>;
    
    constructor() {
        this.userRepository = AppDataSource.getRepository(User);
    }

    async getSingleUser(id: string): Promise<UserDomain | null> {
        const userEntity = await this.userRepository.findOneBy({ id: id }); 
        if (userEntity) {
            return UserMapper.toUserDomain(userEntity);
        }

        return userEntity;
    }

    async getAllUsers(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async getUsersByNameOrNickname(name: string, nickname: string) {
        return await this.userRepository.find({
            where: [
                {name: Like(`%${name}%`)},
                {nickname: Like(`%${nickname}%`)}
            ]
        });
    }

    async createUser(user: User): Promise<User> {
        return await this.userRepository.save(user);
    }

    async deleteUser(id: string): Promise<boolean> {
        const result: DeleteResult = await this.userRepository.delete(id);
        let wasDeleted = false;
        if (result.affected) {
            wasDeleted = result.affected > 0;
        }
        
        return wasDeleted;
    }
}