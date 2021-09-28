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

    async addMedia(
        fileName: string,
        fileType: string,
        sourceUri: string,
        content: Buffer
    ): Promise<IMedia> {

        return await this.repository.createMedia({
            name: fileName,
            type: fileType,
            source_uri: sourceUri,
            content: content
        })

    }
}