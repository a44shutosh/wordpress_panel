const underscore = require("underscore");

const utility = {};

/**
 * Generate a valid V4 UUID
 * @return string
 */
utility.uuid = function() {
  return uuIdv4();
};

/**
 * check string is valid or return default value
 * @param {string} value
 * @param {string} defaultValue
 *
 * @return string
 */
utility.validOrDefault = function(value, defaultValue = "") {
  if (utility.isEmpty(value) === false) {
    return underscore.isString(value) === true ? value : defaultValue;
  }
  return defaultValue;
};

/**
 * check variable is exit or not
 *
 * @return boolean
 */
utility.isset = function(params) {
  return typeof params !== "undefined";
};

/**
 * Check any object, array, string, number, boolean is empty or not.
 *
 * @param obj
 * @return {boolean}
 */
utility.isEmpty = function(obj) {
  if (underscore.isNumber(obj) || underscore.isBoolean(obj)) {
    return false;
  }

  return underscore.isEmpty(obj);
};

/**
 * Remove the duplicate objects from array
 *
 * @param {Array} arrWithDuplicateObj
 * @param {string} keyForUniqueness
 * @return {Array} arrWithUniqueObj
 */
utility.getUniqueArray = function(arr, comp) {
  const unique = arr
    .map(e => e[comp])
    .map((e, i, final) => final.indexOf(e) === i && i)
    .filter(e => arr[e])
    .map(e => arr[e]);

  return unique;
};

utility.removeEmptyFromObject = function(object) {
  return underscore.pick(object, function(value) {
    return value !== undefined && value !== null && value !== "";
  });
};

/**
 * Find column in 2 Dimension array
 *
 * @param list
 * @param column
 * @param indice
 *
 * @return array
 */
utility.arrayColumn = function(list, column, indice) {
  var result;

  if (typeof indice != "undefined") {
    result = {};
    underscore.map(list, function(num, key) {
      result[list[key][indice]] = list[key][column];
    });
  } else {
    result = [];

    underscore.map(list, function(num, key) {
      result.push(list[key][column]);
    });
  }

  return result;
};

/**
 * Form Validation check & scroll to invalid/Required input field
 *
 * @param list
 *
 * @return array
 */
utility.formValidateAndScroll = function(list, e) {
  let result = [];
  let target = e.target;
  let value;
  if (underscore.size(list) > 0) {
    underscore.map(list, function(inputObj, key) {
      if (underscore.isObject(inputObj)) {
        const { require = "false", name, rules } = inputObj.props;
        value = target[name].value;
        if (require == "true" && utility.isEmpty(value) === true) {
          result.push(inputObj);
        }
      }
    });
  }

  return result;
};

utility.formatNumber = function(number) {
  return number.split(",").join("");
};

utility.validatingFields = function(fieldsArray, inputArray) {
  let resultArray = {};
  for (var i = 0; i < fieldsArray.length; i++) {
    if (inputArray[fieldsArray[i]] == "") {
      resultArray[fieldsArray[i]] = 1;
    }
  }
  return resultArray;
};
utility.checkValue = function(value, val) {
  console.log(value, val);
  return value;
};
utility.getNestedObject = function(nestedObj, pathArr, defaultValue) {
  if (nestedObj === undefined) {
    return defaultValue;
  }
  let finalValue = nestedObj;
  for (var i = 0; i < pathArr.length; i++) {
    if (pathArr[i] in finalValue === true) finalValue = finalValue[pathArr[i]];
    else {
      finalValue = defaultValue;
      break;
    }
  }

  return finalValue;
};
utility.checkValue = function(value, val) {
  return value;
};
utility.getNestedObject = function(nestedObj, pathArr, defaultValue) {
  if (nestedObj === undefined) {
    return defaultValue;
  }
  let finalValue = nestedObj;
  for (var i = 0; i < pathArr.length; i++) {
    if (typeof pathArr[i] == "object" && pathArr[i] in finalValue === true) {
      finalValue = finalValue[pathArr[i]];
    } else {
      finalValue = defaultValue;
      break;
    }
  }

  return finalValue;
};

export default utility;
