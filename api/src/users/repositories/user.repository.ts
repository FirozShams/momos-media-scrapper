import { Injectable } from '@nestjs/common';
import { AbstractUserRepository } from "./definitions/user.repository.abstract"
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { IUser } from '../entities/definitions/user.entity.interface'

@Injectable()
export class UserRepository extends AbstractUserRepository {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {
        super();
    }

    createUser(payload: IUser): Promise<IUser> {
        return this.userRepository.save(payload);
    }

    findOneByUsername(username: string): Promise<IUser> {
        return this.userRepository.findOne({ username: username });
    }
}