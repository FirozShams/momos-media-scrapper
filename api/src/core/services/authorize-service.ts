import { HttpService, Injectable, UnauthorizedException, InternalServerErrorException, HttpException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as Sentry from '@sentry/minimal';



@Injectable()
export class AuthorizeService {
    constructor(
        private configService: ConfigService,
        private httpService: HttpService,
    ) { }

    public async checkAuthorization(role: string, module: string, actions: string[]) {
        const url = this.configService.get('evaly_authorization');
        const headers = { 'secret-key': this.configService.get('secret_key') };
        const body = {
            role: role,
            platform: this.configService.get('platform'),
            module: module,
            actions: actions
        };
        try {
            const { data } = await this.httpService.post(url, body, { headers }).toPromise();
            return data;
        } catch (ex) {
			Sentry.captureException(ex.response.data)
            if (ex.response && (ex.response.status === 400 || ex.response.status === 401)) {
                throw new UnauthorizedException(ex.response.data.message);
            } else if (ex.response && (ex.response.status > 401 && ex.response.status < 500)) {
                throw new HttpException({ message: ex.response.data.message }, ex.response.status);
            } else {
                throw new InternalServerErrorException();
            }
        }
    }
}