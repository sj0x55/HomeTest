let utils = {
  /**
   * Check if argument is object
   *
   * @param {Object} arg
   * @return {Boolean}
   */
  getType: function (arg) {
    return Object.prototype.toString.call(arg);
  },
  /**
   * Check if argument is object
   *
   * @param {Object} arg
   * @return {Boolean}
   */
  isObject: function (arg) {
    return !!(arg && utils.getType(arg) === '[object Object]');
  },
  /**
   * Check if argument is number
   *
   * @param {Object} arg
   * @return {Boolean}
   */
  isNumber: function (arg) {
    return !!(utils.getType(arg) === '[object Number]' && !isNaN(arg));
  },
  /**
   * Check if argument is array
   *
   * @param {Array} arg
   * @return {Boolean}
   */
  isArray: function (arg) {
    return !!(arg && utils.getType(arg) === '[object Array]');
  },
  /**
   * Check if argument is string
   *
   * @param {String} arg
   * @return {Boolean}
   */
  isString: function (arg) {
    return !!(utils.getType(arg) === '[object String]');
  },
  /**
   * Validation corditation point
   *
   * @param {Object} point
   * @return {Boolean}
   */
  validPointCordinates: function (point) {
    return utils.isObject(point) && utils.isNumber(point.lat) && utils.isNumber(point.lng);
  },
  /**
   * Converted degrees to radians
   *
   * @param {Object} point
   * @return {Boolean}
   */
  toRadians: (function () {
    const PI180 = Math.PI / 180;

    return (degrees) => {
      return degrees * PI180;
    };
  })(),
  /**
   * Calculate distance from 2 points (without using degrees)
   * linK: http://andrew.hedges.name/experiments/haversine/
   *
   * @param {Object} pointA
   * @param {Object} pointB
   * @return {Number}
   */
  calculateDistance: (function () {
    const DOUBLED_EARTH_RADIUS = 12742;

    return (pointA = {}, pointB = {}) => {
      if (utils.validPointCordinates(pointA) && utils.validPointCordinates(pointB)) {
        let
          radiansDiffLat = utils.toRadians(pointB.lat - pointA.lat),
          radiansDiffLng = utils.toRadians(pointB.lng - pointA.lng);

        return DOUBLED_EARTH_RADIUS * Math.asin(Math.sqrt(
          Math.pow(Math.sin(radiansDiffLat / 2), 2) +
          Math.cos(utils.toRadians(pointA.lat)) * Math.cos(utils.toRadians(pointB.lat)) *
          Math.pow(Math.sin(radiansDiffLng / 2), 2)
        ));
      } else {
        throw ['One of the point are not validated', '/@@MODULE_PATH/calculateDistance()'];
      }
    };
  })(),
  /**
   * Extended source object using target functions
   *
   * @param {Object} source
   * @param {Object} target
   * @return {void}
   */
  extend: function (source, target) {
    if (source && target) {
      for (var name in target) {
        source[name] = target[name];
      }
    } else {
      throw ['Source or target are not correct', '/@@MODULE_PATH/extend()'];
    }
  }
};

export default utils;
