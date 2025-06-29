// En tu archivo error-handler.middleware.ts
import { ErrorRequestHandler } from 'express';
import { AppError } from '../errors/custom-errors';

const errorHandler: ErrorRequestHandler = (err, req, res, next): any => {
  console.error(`[ERROR] ${err.name || 'Error'}: ${err.message}`);

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      error: err.name,
      message: err.message,
    });
  }

  return res.status(500).json({
    error: 'InternalServerError',
    message: 'Error interno del servidor',
  });
};

export default errorHandler;