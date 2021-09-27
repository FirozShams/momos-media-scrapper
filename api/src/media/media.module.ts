import { Module, HttpModule } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { AbstractMediaRepository } from './repositories/definitions/media.repository.abstract';
import { MediaRepository } from './repositories/media.repository';
import { MediaService } from './media.service';
import { MediaController } from './media.controller';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Media } from './entities/media.entity';
import { MediaProcessor } from './media.processor';

@Module({
  imports: [
    HttpModule,
    BullModule.registerQueue({
      name: 'media',
    }),
    TypeOrmModule.forFeature([Media])
  ],
  providers: [
    {
      provide: AbstractMediaRepository,
      useClass: MediaRepository
    },
    MediaService,
    MediaProcessor
  ],
  controllers: [MediaController]
})
export class MediaModule { }
