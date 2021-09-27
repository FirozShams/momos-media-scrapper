import { HttpService, Injectable, InternalServerErrorException, Logger, UnauthorizedException, HttpException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Sentry from '@sentry/minimal';


@Injectable()
export class TokenService {
    constructor(
        private configService: ConfigService,
        private httpService: HttpService,
    ) { }

    public async validate(token: string) {
        const headers = { Authorization: token };
        try {
            const { data: { data: user } } = await this.httpService
                .get(`${this.configService.get("auth_host")}/validate-token`, {
                    headers
                })
                .toPromise();
            if (!user) throw new UnauthorizedException('User not found!');
            return user;
        } catch (ex) {
			Sentry.captureException(ex,{
                extra: ex?.response?.data
            })
            if (ex.response && (ex.response.status >= 400 && ex.response.status < 500))
                throw new HttpException({ message: ex.response.data.message }, ex.response.status);
            else {
                Logger.error(ex.message)
                throw new InternalServerErrorException('Internal server error.')
            };
        }
    }
}
