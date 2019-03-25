"use strict";

function interpolationSearch(array, number){
  var result = -1;
  var start = 0;
  var end = array.length - 1;

  //eslint-disable-next-line no-constant-condition
  while (true) {
    const startValue = array[start];
    const endValue = array[end];

    if(start <= end && startValue <= number && endValue >= number){
      const rangeDelta = endValue - startValue;

      if (rangeDelta === 0){
        result = startValue === number ? start : -1;
        break;
      }

      const middle = start + 
        Math.floor((number - startValue) * ((end - start) / rangeDelta));
      const middleValue = array[middle];

      if (middleValue < number)
        start = middle + 1;
      else if (middleValue > number)
        end = middle - 1;
      else {
        result = middle;
        break;
      }
    } else 
      break;
  }

  return result;
}

module.exports.interpolationSearch = interpolationSearch;
