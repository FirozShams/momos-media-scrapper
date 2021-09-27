// import { CashbackQueryDto } from "src/cashback/dto/cashback-list.dto";
import { IMedia } from "src/media/entities/definitions/media.entity.interface";

export abstract class AbstractMediaRepository {
    abstract createMedia(payload: IMedia): Promise<IMedia>;
    abstract findOneById(id: string): Promise<IMedia>;
    abstract findAll(
        skip: number,
        limit: number,
        search?: string,
        type?: string
    ): Promise<IMedia[]>;
}