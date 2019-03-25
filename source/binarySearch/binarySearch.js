"use strict";

function binarySearch(array, number){
  var start = 0, end = array.length - 1, middle, arrayValue;
  var result = -1;

  while (start <= end) {
    //eslint-disable-next-line no-magic-numbers
    middle = start + Math.floor((end - start) / 2);
    arrayValue = array[middle];

    if (number === arrayValue) {
      result = middle;
      break;
    }
    else if (number < arrayValue) 
      end = middle - 1;
    else 
      start = middle + 1;
  }

  return result;
}

module.exports.binarySearch = binarySearch;
