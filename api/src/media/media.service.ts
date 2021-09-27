import { Injectable } from '@nestjs/common';
import { AbstractMediaRepository } from './repositories/definitions/media.repository.abstract';
import { IMedia } from './entities/definitions/media.entity.interface';

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
    ): Promise<IMedia[]> {

        return await this.repository.findAll(
            page - 1, limit, search, type
        );

    }
}