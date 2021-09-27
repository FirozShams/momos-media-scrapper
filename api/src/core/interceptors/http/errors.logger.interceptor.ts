import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    InternalServerErrorException,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Request, Response } from 'express';
import * as Sentry from '@sentry/minimal';
import { Logger } from '@nestjs/common';

@Injectable()
export class ErrorsLoggerInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            catchError((err) => {
                const ctx = context.switchToHttp();
                const request = ctx.getRequest<Request>();
                let requestDetails = {
                    method: request.method,
                    query_params: request.query,
                    body: request.body,
                    requested_endpoint: request.originalUrl
                }
                let logString = JSON.stringify(requestDetails) + '\n'
                Logger.error(logString);
                if (!err.response?.skip_sentry) {
                    Sentry.captureException(err, {
                        extra: {
                            method: request.method,
                            query_params: request.query,
                            body: request.body,
                            endpoint: request.originalUrl
                        }
                    })
                }
                return throwError(err);
            }),
        );
    }
}
