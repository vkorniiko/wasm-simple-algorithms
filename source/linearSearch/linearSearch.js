"use strict";

function linearSearch(array, number) {
  var result = -1;
  
  for(var idx = 0; idx < array.length; ++idx){
    if(array[idx] === number){
      result = idx;
      break;
    }
  }

  return result;
}

function fastLinearSearch(array, number) {
  var result;

  array.push(number);

  for(var idx = 0; ; ++idx){
    if(array[idx] === number){
      result = idx;
      break;
    }
  }

  array.pop();

  return result === array.length ? -1 : result;
}


module.exports.linearSearch = linearSearch;
module.exports.fastLinearSearch = fastLinearSearch;
