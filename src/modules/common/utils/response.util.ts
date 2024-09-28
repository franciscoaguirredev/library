import { HttpException, HttpStatus } from '@nestjs/common';

export const handleResponse = (data: any = null, message: string, statusCode: HttpStatus) => {
  return {
    statusCode,
    message,
    data,
  };
};

export const handleError = (error: any, message: string) => {
  throw new HttpException({
    statusCode: HttpStatus.BAD_REQUEST,
    message: message || 'An error occurred',
    error: error.message || 'Internal Server Error',
  }, HttpStatus.BAD_REQUEST);
};