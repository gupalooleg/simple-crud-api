import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

export default {
  mode: 'production',
  target: 'node16.13',
  entry: './src/app.js',
  output: {
    path: resolve(dirname(fileURLToPath(import.meta.url)), './dist'),
    filename: 'app.bundle.js',
  },
  experiments: {
    outputModule: true,
  },
};
