import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { IUser } from './entities/definitions/user.entity.interface';
import { AbstractUserRepository } from './repositories/definitions/user.repository.abstract';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService implements OnApplicationBootstrap {
    constructor(private repository: AbstractUserRepository) { }

    async onApplicationBootstrap() {
        await this.repository.createUser({
            username: 'momos',
            password: await bcrypt.hash('momos123', 10)
        })
    }

    async findOne(username: string): Promise<IUser | undefined> {
        return this.repository.findOneByUsername(username);
    }
}