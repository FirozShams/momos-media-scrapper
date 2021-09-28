import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AbstractUserRepository } from './repositories/definitions/user.repository.abstract';
import { UserRepository } from './repositories/user.repository'
import { UsersService } from './users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User])
  ],
  providers: [
    {
      provide: AbstractUserRepository,
      useClass: UserRepository
    },
    UsersService
  ],
  exports: [UsersService],
})
export class UsersModule { }