import * as http from 'http';
import { ServerError, AppError } from './error/index.js';
import { MESSAGES, formatString } from './common/index.js';
import { PersonController } from './controller/index.js';

const port = process.env.PORT || 3000;

function runServer() {
  http
    .createServer((req, res) => {
      try {
        const url = decodeURIComponent(req.url);

        if (url === '/person' || (url.startsWith('/person/') && url !== '/person/')) {
          const personController = new PersonController();
          switch (req.method) {
            case 'GET':
              personController.get(req, res);
              break;
            case 'POST':
              personController.post(req, res);
              break;
            case 'PUT':
              personController.put(req, res);
              break;
            case 'DELETE':
              personController.delete(req, res);
              break;
            default:
              throw new ServerError(
                formatString(MESSAGES.HTTP_METHOD_NOT_SUPPORTED, [req.method]),
                501
              );
          }
        } else {
          throw new ServerError(formatString(MESSAGES.RESOURCE_NOT_FOUND, [url]), 404);
        }
      } catch (e) {
        res.statusCode = e.statusCode ?? 500;
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        res.end(e.message);

        if (!(e instanceof AppError)) {
          console.log(e);
        }
      }
    })
    .listen(port, () => {
      console.log(`Server running at port ${port}`);
    });
}

export { runServer };
