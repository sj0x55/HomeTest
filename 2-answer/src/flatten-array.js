'use strict';

module.exports = function flattenArrayModule(inputArray) {
  try {
    if (validateInputArray(inputArray)) {
      return flattenArrayRunnerRecursive(inputArray).filter(Number.isInteger);

      // Alternative to use (without recursive)
      // return flattenArrayLoopRunner(inputArray).filter(Number.isInteger);
    }
  } catch (err) {
    require('./log')(err, '/flattenArrayModule');
  }

  /** API */
  /**
   * Check if input array has correct type (is array)
   *
   * @param {Array} inputArray
   * @return {Boolean}
   */
  function validateInputArray(inputArray) {
    if (Array.isArray(inputArray)) {
      return true;
    } else {
      throw Error('Input value should be an array.');
    }
  }

  /**
   * Function will be fired recursively to flatten array
   *
   * @param {Array} inputArray
   * @return {Array} outputArray
   */
  function flattenArrayRunnerRecursive(inputArray) {
    var outputArray = [];

    if (Array.isArray(inputArray)) {
      inputArray.forEach(function forEachCallback(item) {
        if (Array.isArray(item)) {
          outputArray = outputArray.concat(flattenArrayRunnerRecursive(item));
        } else {
          outputArray.push(item);
        }
      });
    }

    return outputArray;
  }

  /**
   * Alternative to recursive solution!
   * Function will be fired in loop to flatten array
   *
   * @param {Array} inputArray
   * @return {Array} outputArray
   */
  function flattenArrayLoopRunner(inputArray) {
    var
      outputArray,
      stillNeedsFlatten = true,
      i, len,
      getOutputArray = function getOutputArray() {
        // On the beginning outputArray is yndefined so we need use input array to processing as starting array
        return outputArray || inputArray;
      };

    while (stillNeedsFlatten) {
      stillNeedsFlatten = checkIfExistsNestedArray(getOutputArray());

      if (stillNeedsFlatten) {
        outputArray = [].concat.apply([], getOutputArray());
      } else {
        break;
      }
    }

    return getOutputArray();
  }

  /**
   * Checking if in array still exists another nested array
   *
   * @param {Array} array
   * @return {Boolean}
   */
  function checkIfExistsNestedArray(array) {
    for (var i = array.length; i >= 0; i--) {
      if (Array.isArray(array[i])) {
        return true;
      }
    }

    return false;
  }
};
