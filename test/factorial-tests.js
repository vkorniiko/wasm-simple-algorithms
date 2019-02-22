var factorial = require('../sources/factorial').factorial;
var readFileSync = require('fs').readFileSync;
var resolve = require('path').resolve;
var wasmSource = new WebAssembly.Module(readFileSync(resolve() + "/sources/factorial.wasm"));
var numbers = [1, 1, 2, 6, 24, 120, 720, 5040, 40320, 362880, 3628800];

QUnit.test("JS factorial test", function (assert) {
	numbers.forEach((element, idx) =>
		assert.strictEqual(factorial(idx), element));
});

QUnit.test("WASM factorial test", function (assert) {
	var wasmModule = new WebAssembly.Instance(wasmSource, {});
	
	numbers.forEach((element, idx) =>
		assert.strictEqual(wasmModule.exports.factorial(idx), element));
});