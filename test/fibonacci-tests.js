var fibonacci = require('../sources/fibonacci').fibonacci;
var readFileSync = require('fs').readFileSync;
var resolve = require('path').resolve;
var wasmSource = new WebAssembly.Module(readFileSync(resolve() + "/sources/fibonacci.wasm"));
var numbers = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181, 6765, 10946, 17711, 28657, 46368, 75025, 121393, 196418, 317811];

QUnit.test("JS fibonacci test", function (assert) {
	numbers.forEach((element, idx) =>
		assert.strictEqual(fibonacci(idx), element));
});

QUnit.test("WASM fibonacci test", function (assert) {
	var wasmModule = new WebAssembly.Instance(wasmSource, {});

	numbers.forEach((element, idx) =>
		assert.strictEqual(wasmModule.exports.fibonacci(idx), element));
});