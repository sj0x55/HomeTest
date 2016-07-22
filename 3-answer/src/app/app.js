import log from 'log';
import utils from 'utils';
import JsonReader from 'json-reader';
import Customers from './customers';
import CONSTANTS from './constants';

function app() {
  let customer;

  // extending Customer prototype to add ability read json file (like mixin). Needs to limited dependencies.
  utils.extend(Customers.prototype, JsonReader.prototype);

  customer = new Customers();

  customer.getAll({
    maxDistance: 100,
    sortBy: 'user_id',
    sortDirection: CONSTANTS.SORT_DIRECTIONS.ASC
  })
  .then((data) => {
    drawOnSite(customer.toHTML, data);
  })
  .catch(onError);
}

/**
 * private:
 * Show data on the website
 *
 * @param {Function} mapper
 * @param {Array} data
 * @return {void}
 */
function drawOnSite(mapper, data) {
  document.body.innerHTML = (data) && data.map(mapper).join('') || '';
}

/**
 * private:
 * Handle error
 *
 * @param {Error} error
 * @return {void}
 */
function onError(error) {
  log([error, '@@MODULE_PATH/app()']);
}

// Needs for test private API
if (process.env.NODE_ENV === 'test') {
  app.privates = {
    drawOnSite: drawOnSite,
    onError: onError
  };
}


export default app;
