"use strict";

function factorial(number){
  var result = 1;
  var idx = 2;

  while(idx <= number){
    result = result * idx;
    idx++;
  }
    
  return result;
}

module.exports.factorial = factorial;
