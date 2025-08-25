import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { ProductCodeAlreadyExists } from '../errors';
import { Response } from 'express';

@Catch(ProductCodeAlreadyExists)
export class ProductAlreadyExistFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = HttpStatus.CONFLICT;

    response.status(status).json({
      statusCode: status,
      message: exception.message,
      error: 'Conflict',
    });
  }
}
