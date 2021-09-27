import { HttpService, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(
    private httpService: HttpService,
  ) { }
  async getHello(): Promise<string> {
    return 'Hello World! This is momos media scrapper';
  }
}
