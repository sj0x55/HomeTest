import log from 'log';
import utils from 'utils';
import JsonReader from 'json-reader';
import Customers from './customers';

function app() {
  let customer;

  // extending Customer prototype adding ability read json file (like mixin). Needs to limited dependencies.
  utils.extend(Customers.prototype, JsonReader.prototype);

  customer = new Customers();

  customer.getAll({
    maxDistance: 100,
    sortBy: 'user_id'
  })
  .then((data) => {
    document.body.innerHTML = generateHTML(customer.toHTML, data);
  })
  .catch((error) => {
    log([error, '@@MODULE_PATH/app()']);
  });
}

/**
 * private:
 * Show data on the website
 *
 * @param {Function} mapper
 * @param {Array} data
 * @return {String}
 */
function generateHTML(mapper, data) {
  return (data) && data.map(mapper).join('') || '';
}

// Needs for test private API
if (process.env.NODE_ENV === 'test') {
  app.privates = {
    generateHTML: generateHTML
  };
}


export default app;
