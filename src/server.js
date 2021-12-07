import * as http from 'http';
import { ServerError } from './error/index.js';
import { MESSAGES, formatString, errorResponseHandler } from './common/index.js';
import { PersonController } from './controller/index.js';

const port = process.env.PORT || 3000;

function runServer() {
  http
    .createServer((req, res) => {
      try {
        // const url = decodeURIComponent(req.url);

        if (req.url === '/person' || req.url.startsWith('/person/')) {
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
          throw new ServerError(formatString(MESSAGES.RESOURCE_NOT_FOUND, [req.url]), 404);
        }
      } catch (err) {
        errorResponseHandler(res, err);
      }
    })
    .listen(port, () => {
      console.log(`Server running at port ${port}`);
    });
}

export { runServer };
