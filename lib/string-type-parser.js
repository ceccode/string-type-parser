'use strict';

var parse = function (obj) {

  let parsedObj = {}; 

  if (!obj) {
    return parsedObj;
  }

  for (var prop in obj) {
    parsedObj[prop] = _convert(obj[prop]);
  }

  return parsedObj;

};

var _convert = function (item) {
  if  (_isDate(item)) {
    return new Date(item);
  }
  if (_isNumeric(item)) {
    return +item;
  }
  if (_isBool(item)) {
    return  item.toLowerCase() === 'true' ? true : false;
  }
  return item;
}; 

//according to http://stackoverflow.com/questions/18082/validate-decimal-numbers-in-javascript-isnumeric
var _isNumeric = function (number) {
  return !isNaN(parseFloat(number)) && isFinite(number);
};

//doesn't work with timestamp
var _isDate = function(date) {

  if (_isNumeric(date)) {      
    return false;
  }
  return (new Date(date) !== 'Invalid Date' && !isNaN(new Date(date)) ) ? true : false;
};

var _isBool = function(bool) {
  return (bool.toLowerCase() === 'true' || bool.toLowerCase() === 'false') ? true : false;
};

module.exports = {
  parse: parse
};
