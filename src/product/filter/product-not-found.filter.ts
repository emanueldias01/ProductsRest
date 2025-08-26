import { ArgumentsHost, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

export class ProductNotFoundErrorFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = HttpStatus.NOT_FOUND;

    response.status(status).json({
      statusCode: status,
      message: exception.message,
      error: 'Not found',
    });
  }
}
