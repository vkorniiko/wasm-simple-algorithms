# wasm-simple-algorithms

## Description

Implementation of the various simple algorithms using WebAssembly.

## Setup

Clone the repository and install the dependencies:

```bash
$ git clone https://gitlab.com/vkorniiko/wasm-simple-algorithms.git
$ cd wasm-simple-algorithms
$ npm i
```

Perform linting (for JavaScript), testing (WASM / JavaScript), code coverage measurement (JavaScript):

```bash
$ npm run build
```

The *.wasm files for tests are pre-built. If you want to compile them youself, you can always use [WABT](https://github.com/WebAssembly/wabt).

## Algorithms

* [Linear Search (and fast version)](source/linearSearch/linearSearch.wat)
* [Binary Search](source/binarySearch/binarySearch.wat)
* [Interpolation Search](source/interpolationSearch/interpolationSearch.wat)
* [Bubble Sort](source/bubbleSort/bubbleSort.wat)
* [Factorial](source/factorial/factorial.wat)
* [Fibonacci Number](source/fibonacci/fibonacci.wat)
* [Sieve of Eratosthenes](source/prime/prime.wat)

## License

[MIT](LICENSE)