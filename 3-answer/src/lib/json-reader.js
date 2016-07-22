import promise from 'es6-promise';
import Ajax from 'simple-ajax';

function JsonReader() {}

/**
 * Get data from json file
 *
 * @param {String} filePath
 * @return {Promise}
 */
JsonReader.prototype.read = function (filePath) {
  return new promise.Promise((resolve, reject) => {
    sendAjaxRequest(filePath, resolve, reject);
  });
};
/**
 * private:
 * Send ajax request
 *
 * @param {Function} onSuccess
 * @param {Function} onError
 * @return {void}
 */
function sendAjaxRequest(filePath, onSuccess, onError) {
  (new Ajax(filePath))
    .on('success', (event, data) => {
      onSuccess(data);
    })
    .on('error', onError)
    .send();
}

// Needs for test private API
if (process.env.NODE_ENV === 'test') {
  JsonReader.privates = {
    sendAjaxRequest: sendAjaxRequest
  };
}

export default JsonReader;
