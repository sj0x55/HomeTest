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
   * Calculate distance from 2 points (without using degrees)
   *
   * @param {Object} pointA
   * @param {Object} pointB
   * @return {Number}
   */
  calculateDistance: function (pointA = {}, pointB = {}) {
    if (utils.validPointCordinates(pointA) && utils.validPointCordinates(pointB)) {
      let powArg1, sqrtPart1, sqrtPart2, circumference;

      circumference = 12756.274 * Math.PI;
      powArg1 = (pointB.lat - pointA.lat) * Math.cos(pointA.lng * Math.PI / 180);
      sqrtPart1 = Math.pow(powArg1, 2);
      sqrtPart2 = Math.pow(pointB.lng - pointA.lng, 2);

      return Math.abs(Math.sqrt(sqrtPart1 + sqrtPart2) * (circumference / 360));
    } else {
      throw ['One of the point are not validated', '/@@MODULE_PATH/calculateDistance()'];
    }
  },
  /**
   * Extended source object using target functions
   *
   * @param {Object} source
   * @param {Object} target
   * @return {void}
   */
  extend: function (source, target) {
    if (source && target) {
      source.extended = source.extended || {};

      for (var name in target) {
        source.extended[name] = target[name];
      }
    } else {
      throw ['Source or target are not correct', '/@@MODULE_PATH/extend()'];
    }
  }
};

export default utils;
