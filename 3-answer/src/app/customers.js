import utils from 'utils';
import CONSTANTS from './constants';

function Customers() {
  this.dataFilePath = './data/customers.json';
}
/**
 * Get all items using Reader object
 *
 * @param {Object} options
 * @return {Promise}
 */
Customers.prototype.getAll = function (options = {}) {
  return readData(this.extended && this.extended.read, this.dataFilePath)
    .then(preprocessData)
    .then((items) => {
      return filterDataBy(items, options);
    })
    .then((items) => {
      return items.filter(utils.isObject);
    })
    .then((items) => {
      return sortData(items, {
        sortBy: options.sortBy,
        sortDirection: options.sortDirection
      });
    });
};
/**
 * Filter items by max distance
 *
 * @param {Array} items
 * @param {Integer} maxDistance
 * @return {Array} filteredItems
 */
Customers.prototype.toHTML = function (item) {
  return item && `
    <p>${item.user_id} | ${item.name} (${fixedDistance(item.distance, 2) || '-'} ${CONSTANTS.KM_UNITS})</p>
  ` || undefined;
};

/**
 * Filter items by options
 *
 * @param {Array} items
 * @param {Object} options
 * @return {Array} filteredItems
 */
function filterDataBy(items, options = {}) {
  // Create copy of array to avoid side-effects
  let filteredItems = items.slice();

  if (options.maxDistance >= 0) {
    filteredItems = filterDataByMaxDistance(filteredItems, options.maxDistance);
  }

  return filteredItems;
}
/**
 * Filter items by max distance
 *
 * @param {Array} items
 * @param {Integer} maxDistance
 * @return {Array} filteredItems
 */
function filterDataByMaxDistance(items, maxDistance) {
  return items.filter((item) => {
    return (item.distance = utils.calculateDistance(CONSTANTS.INTERCOM_CORDS, {
      lat: parseFloat(item.latitude),
      lng: parseFloat(item.longitude)
    })) < maxDistance;
  });
}
/**
 * Fixed distance by precision
 *
 * @param {Number} distance
 * @param {Number} precision
 * @return {Number}
 */
function fixedDistance(distance, precision) {
  return distance && parseFloat(distance).toFixed(precision) || undefined;
}
/**
 * Read data using reader function and file path
 *
 * @param {Function} reader
 * @param {String} dataFilePath
 * @return {Promise}
 */
function readData(reader, dataFilePath) {
  if (reader) {
    return reader(dataFilePath)
  } else {
    throw ['Reader not exists', '/@@MODULE_PATH/readData()'];
  }
}
/**
 * Transform data to better type
 *
 * @param {String} data
 * @return {Array}
 */
function preprocessData(data) {
  return (data && data.split('\n') || []).map(preprocessItem).filter(utils.isObject);
}
/**
 * Transform item to better type
 *
 * @param {String} item
 * @return {Object}
 */
function preprocessItem(item) {
  try {
    return item && JSON.parse(item) || undefined;
  } catch (err) {
    throw [err, '/@@MODULE_PATH/readData()'];
  }
}
/**
 * Sorting items by options
 *
 * @param {Array} item
 * @param {Object} options
 * @return {Array}
 */
function sortData(items, options = {}) {
  return items.sort((a, b) => {
    return sortingFn(a, b, options);
  });
}
/**
 * Sorting callback with sorting logic
 *
 * @param {Object} a
 * @param {Object} b
 * @param {Object} options
 * @return {Number}
 */
function sortingFn(a, b, options) {
  if (!a[options.sortBy] || !b[options.sortBy]) {
    return 0;
  }

  if (options.sortDirection === CONSTANTS.SORT_DIRECTIONS.ASC) {
    return a[options.sortBy] - b[options.sortBy];
  } else {
    return b[options.sortBy] - a[options.sortBy];
  }
}

// Needs for test private API
if (process.env.NODE_ENV === 'test') {
  Customers.privates = {
    filterDataBy: filterDataBy,
    filterDataByMaxDistance: filterDataByMaxDistance,
    readData: readData,
    preprocessData: preprocessData,
    preprocessItem: preprocessItem,
    fixedDistance: fixedDistance,
    sortData: sortData,
    sortingFn: sortingFn
  };
}

export default Customers;
