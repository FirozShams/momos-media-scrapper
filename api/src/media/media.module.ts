import { Module } from '@nestjs/common';
import { AbstractMediaRepository } from './repositories/definitions/media.repository.abstract';
import { MediaRepository } from './repositories/media.repository';
import { MediaService } from './media.service';
import { MediaController } from './media.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Media } from './entities/media.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([Media])
  ],
  providers: [
    {
      provide: AbstractMediaRepository,
      useClass: MediaRepository
    },
    MediaService
  ],
  controllers: [MediaController]
})
export class MediaModule { }
