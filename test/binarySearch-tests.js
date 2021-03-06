var requireHelper = require("./_require_helper");
var binarySearch = requireHelper('../source/binarySearch/binarySearch').binarySearch;
var readFileSync = require('fs').readFileSync;
var resolve = require('path').resolve;
var wasmSource = new WebAssembly.Module(readFileSync(resolve() + "/source/binarySearch/binarySearch.wasm"));

var array1 = [Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER+1, Number.MIN_VALUE, 1,2,3,4,5,6,7,8,10, 11.23443565476587, Number.MAX_SAFE_INTEGER-1, Number.MAX_SAFE_INTEGER];
var array2 = [10,10,10,10,10];
var array3 = [0,1,1,5];
var array4 = [];

QUnit.test("JS binarySearch test", function (assert) {
	array1.forEach((element, index) =>
		assert.strictEqual(binarySearch(array1, element), index));

	array2.forEach((element, index) =>
		assert.strictEqual(binarySearch(array2, element), 2))
		
	assert.strictEqual(binarySearch(array2, 9), -1);

	assert.strictEqual(binarySearch(array3, -1), -1);
	assert.strictEqual(binarySearch(array3, 0), 0);
	assert.strictEqual(binarySearch(array3, 1), 1);
	assert.strictEqual(binarySearch(array3, 2), -1);
	assert.strictEqual(binarySearch(array3, 5), 3);
	assert.strictEqual(binarySearch(array3, 10), -1);
	assert.strictEqual(binarySearch(array3, -10), -1);

	assert.strictEqual(binarySearch(array4, 9), -1);
});

QUnit.test("WASM binarySearch test", function (assert) {
	var importObject = {
		env: {
			memory: new WebAssembly.Memory({ initial: 1 })
		}
	};

	var wasmModule = new WebAssembly.Instance(wasmSource, importObject);
	var wasmMemoryF64Array = new Float64Array(importObject.env.memory.buffer);
	var binarySearch = wasmModule.exports.binarySearch;

	array1.forEach((element, idx) =>
		wasmMemoryF64Array[idx] = element);
	
	array1.forEach((element, index) =>
		assert.strictEqual(binarySearch(array1.length - 1, element), index));

	array2.forEach((element, idx) =>
		wasmMemoryF64Array[idx] = element);

	array2.forEach((element, index) =>
		assert.strictEqual(binarySearch(array2.length - 1, element), 2))
		
	assert.strictEqual(binarySearch(array2.length - 1, 9), -1);

	array3.forEach((element, idx) =>
		wasmMemoryF64Array[idx] = element);

	assert.strictEqual(binarySearch(array3.length - 1, -1), -1);
	assert.strictEqual(binarySearch(array3.length - 1, 0), 0);
	assert.strictEqual(binarySearch(array3.length - 1, 1), 1);
	assert.strictEqual(binarySearch(array3.length - 1, 2), -1);
	assert.strictEqual(binarySearch(array3.length - 1, 5), 3);
	assert.strictEqual(binarySearch(array3.length - 1, 10), -1);
	assert.strictEqual(binarySearch(array3.length - 1, -10), -1);

	assert.strictEqual(binarySearch(0, 9), -1);
});