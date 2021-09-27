import { HttpModule, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core';

import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';

import { TypeOrmModule } from '@nestjs/typeorm';

import { RequestLoggingInterceptor, ResponseTransformInterceptor, ErrorsLoggerInterceptor } from './interceptors/http';

import { HttpExceptionFilter } from './filters/http/exeptions.formatter.filter';
import { AuthModule } from '../auth/auth.module';
import { BullModule } from '@nestjs/bull';
import { MediaModule } from '../media/media.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
      cache: true
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        let dbConfig = {
          type: 'mysql',
          ...configService.get('database'),
          entities: [__dirname + '/../**/*.entity{.ts,.js}'],
          synchronize: true,
        }
        return dbConfig;
      },
      inject: [ConfigService],
    }),
    BullModule.forRoot({
      redis: {
        host: 'redis',
        port: 6379,
      },
    }),
    HttpModule,
    AuthModule,
    MediaModule
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: RequestLoggingInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ErrorsLoggerInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseTransformInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    AppService
  ],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) { }
}