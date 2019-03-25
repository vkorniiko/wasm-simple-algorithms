"use strict";

function isPrime(num) {
  var result = num > 1;
  var i = 2;

  while(i < num){
    if(num % i === 0){
      result = false;
      break;
    }

    i++;
  }

  return result;
}

function sieve(count){
  var limit = Math.floor(Math.sqrt(count));
  var array = Array(count).fill(true);

  array[0] = false;
  array[1] = false;

  var number = 2;

  while(number <= limit){
    if(array[number] === true){
      let mulNumber = number * number;

      while(mulNumber <= count){
        array[mulNumber] = false;
        mulNumber += number;
      }
    }

    ++number;
  }

  return array;
}

module.exports.isPrime = isPrime;
module.exports.sieve = sieve;
