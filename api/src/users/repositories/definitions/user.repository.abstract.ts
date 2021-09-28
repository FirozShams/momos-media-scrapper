// import { CashbackQueryDto } from "src/cashback/dto/cashback-list.dto";
import { IUser } from "src/users/entities/definitions/user.entity.interface";

export abstract class AbstractUserRepository {
    abstract createUser(payload: IUser): Promise<IUser>;
    abstract findOneByUsername(usernmae: string): Promise<IUser>;
}