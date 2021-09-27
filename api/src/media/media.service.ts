import { Injectable } from '@nestjs/common';
import { MediaListDto } from './dto/media-list.dto';
import { plainToClass } from 'class-transformer';
import { AbstractMediaRepository } from './repositories/definitions/media.repository.abstract';

@Injectable()
export class MediaService {
    constructor(
        private repository: AbstractMediaRepository,
    ) { }

    async getAllMedia(
        page: number,
        limit: number,
        search?: string,
        type?: string
    ): Promise<MediaListDto[]> {

        let medialist = await this.repository.findAll(
            page - 1, limit, search, type
        );

        return medialist.map(value => plainToClass(MediaListDto, value));

    }
}