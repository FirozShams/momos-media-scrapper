import { Process, Processor } from '@nestjs/bull';
import { Logger, HttpService } from '@nestjs/common';
import { MediaService } from './media.service';
import { Job } from 'bull';
import { lastValueFrom } from 'rxjs';

@Processor('media')
export class MediaProcessor {
    private readonly logger = new Logger(MediaProcessor.name);
    constructor(
        private mediaService: MediaService,
        private httpService: HttpService
    ) { }


    @Process('scrap')
    async handleScrap(job: Job) {
        this.logger.debug(`Start scrapper for ${job.data.url} ...`);

        let { data, headers } = await lastValueFrom(
            this.httpService.get(
                job.data.url,
                {
                    responseType: 'arraybuffer',
                    responseEncoding: 'binary'
                }
            )
        );

        let contentType: string = headers["content-type"];

        if (contentType.startsWith('image') || contentType.startsWith('video')) {
            this.logger.debug('Storing ...');
            let result = await this.mediaService.addMedia(
                job.data.url.split('#').shift().split('?').shift().split('/').pop(),
                headers["content-type"],
                job.data.url,
                data
            )
            if (result instanceof Error) {
                this.logger.error('Scrapping failed', result.stack);
            } else {
                this.logger.debug('Scrapping completed');
            }
        } else {
            this.logger.debug('Not media content. Scrapping skipped');
        }
    }
}