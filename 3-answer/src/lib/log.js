/*eslint no-console: ["off"] */

import utils from 'utils';

const TYPES = {
  ERROR: 'error',
  INFO: 'info'
};

/**
 * Log errors to specified place (server, mail etc...)
 *
 * @param {Object|String} error
 * @param {String} location
 * @param {String} type
 * @return {void}
 */
function log(error, location, type = TYPES.ERROR) {
  try {
    let args = normalizeLogArguments(error, location, type);

    error = args.error;
    location = args.location;
    type = args.type;

    if (process.env.NODE_ENV === 'production') {
      // TODO: send error to the server
    } else {
      console[type](error && error.message, location);
    }
  } catch (err) {
    if (process.env.NODE_ENV === 'production') {
      console[TYPES.INFO]('Something happened wrong, please let us know: {phone number}');
    } else {
      console.error(err);
    }
  }
}
/**
 * Alias for log() with type error
 *
 * @param {Array} args
 */
log.error = (...args) => {
  try {
    log.call(this, args[0], args[1], TYPES.ERROR);
  } catch (err) {
    log(err, '/lib/log');
  }
};
/**
 * Alias for log() with type info
 *
 * @param {Array} args
 */
log.info = (...args) => {
  try {
    log.call(this, args[0], args[1], TYPES.INFO);
  } catch (err) {
    log(err, '/lib/log');
  }
};
/**
 * Normalize all arguments from different format for log() function
 *
 * @param {Object|String} error
 * @param {String} location
 * @param {String} type
 * @return {void}
 */
function normalizeLogArguments(error, location, type) {
  if (utils.isArray(error)) {
    error = (error[0] instanceof Error) ? error[0] : Error(error[0]);
    location = error[1] || location;
  } else if (utils.isString(error)) {
    error = Error(error);
  } else if (!(error instanceof Error)) {
    error = Error('Unknown error message');
  }

  type = console[type] && type || TYPES.ERROR;

  return {error, location, type};
}

// Needs for test private API
if (process.env.NODE_ENV === 'test') {
  log.privates = {
    normalizeLogArguments: normalizeLogArguments
  };
}

export default log;
