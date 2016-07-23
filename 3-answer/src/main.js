'use strict';

import log from 'log';
import app from './app/app';

try {
  app();
} catch (err) {
  log.error(err, '/main');
}
