import { Controller, Get, Query, ParseIntPipe, DefaultValuePipe } from '@nestjs/common';
import { MediaService } from './media.service';

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
        return await this.mediaService.getAllMedia(
            page,
            limit,
            search,
            type
        );
    }

}
