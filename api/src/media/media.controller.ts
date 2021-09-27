import { Controller, Get, Post, Query, Body, ParseIntPipe, DefaultValuePipe } from '@nestjs/common';
import { MediaService } from './media.service';
import { MediaListDto } from './dto/media-list.dto';
import { plainToClass } from 'class-transformer';

@Controller('media')
export class MediaController {
    constructor(private readonly mediaService: MediaService) { }

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

        return urls;
    }

}
