import { AppError } from '../error/index.js';

function errorResponseHandler(res, err) {
  res.statusCode = err.statusCode ?? 500;
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.end(err.message);

  if (!(err instanceof AppError)) {
    console.log(err);
  }
}

export { errorResponseHandler };
