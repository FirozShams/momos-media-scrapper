import { Injectable } from '@nestjs/common';
import { AbstractMediaRepository } from "./definitions/media.repository.abstract"
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Media } from '../entities/media.entity';
import { IMedia } from '../entities/definitions/media.entity.interface'

@Injectable()
export class MediaRepository extends AbstractMediaRepository {
    constructor(
        @InjectRepository(Media)
        private mediaRepository: Repository<Media>,
    ) {
        super();
    }

    createMedia(payload: IMedia): Promise<IMedia> {
        return this.mediaRepository.save(payload);
    }

    findAll(
        skip: number,
        limit: number,
        search?: string,
        type?: string
    ): Promise<[IMedia[], number]> {
        return this.mediaRepository
            .createQueryBuilder("media")
            .where(
                search ?
                    'media.name LIKE :search' : 'TRUE', { search: `%${search}%` }
            )
            .andWhere(
                type ?
                    'media.type LIKE :type' : 'TRUE', { type: `%${type}%` }
            )
            .skip(skip)
            .take(limit)
            .select([
                "media.id",
                "media.name",
                "media.type",
                "media.created_at"
            ])
            .getManyAndCount();
    }

    findOneById(id: string): Promise<IMedia> {
        return this.mediaRepository.findOne(id);
    }
}