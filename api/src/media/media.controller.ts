import { Controller, Get, Post, Query, Body, ParseIntPipe, DefaultValuePipe, HttpService } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { MediaService } from './media.service';
import { MediaListDto } from './dto/media-list.dto';
import { plainToClass } from 'class-transformer';
import * as validUrl from 'valid-url';

@Controller('media')
export class MediaController {
    constructor(
        private readonly mediaService: MediaService,
        private httpService: HttpService,
        @InjectQueue('media') private readonly mediaQueue: Queue
    ) { }

    @Get('/')
    async getMedia(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page?: number,
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit?: number,
        @Query('search') search?: string,
        @Query('type') type?: string
    ) {
        let medialist = await this.mediaService.getAllMedia(
            page,
            limit,
            search,
            type
        );

        return medialist.map(value => plainToClass(MediaListDto, value));
    }

    @Post('/from-urls')
    async addMediaFromUrls(
        @Body() urls: Array<string>
    ) {

        let queuedItemCount = 0;

        for (let i = 0; i < urls.length; i++) {
            if (validUrl.isUri(urls[i])) {
                queuedItemCount++;
                await this.mediaQueue.add(
                    'scrap',
                    {
                        url: urls[i],
                    }
                );
            }
        }

        return { message: `${queuedItemCount} item(s) added for scrapping. Come back later to view the scrapped files` };
    }

}
