var requireHelper = require("./_require_helper");
var interpolationSearch = requireHelper('../source/interpolationSearch/interpolationSearch').interpolationSearch;
var readFileSync = require('fs').readFileSync;
var resolve = require('path').resolve;
var wasmSource = new WebAssembly.Module(readFileSync(resolve() + "/source/interpolationSearch/interpolationSearch.wasm"));
var array1 = [Number.MIN_SAFE_INTEGER, Number.MIN_SAFE_INTEGER+1, Number.MIN_VALUE, 1,2,3,4,5,6,7,8,10, 11.23443565476587, Number.MAX_SAFE_INTEGER-1, Number.MAX_SAFE_INTEGER];
var array2 = [10,10,10,10,10];
var array3 = [0,1,1,5];
var array4 = [];

QUnit.test("JS interpolationSearch test", function (assert) {
	array1.forEach((element, index) =>
		assert.strictEqual(interpolationSearch(array1, element), index));

	array2.forEach((element, index) =>
		assert.strictEqual(interpolationSearch(array2, element), 0))
		
	assert.strictEqual(interpolationSearch(array2, 9), -1);

	assert.strictEqual(interpolationSearch(array3, -1), -1);
	assert.strictEqual(interpolationSearch(array3, 0), 0);
	assert.strictEqual(interpolationSearch(array3, 1), 1);
	assert.strictEqual(interpolationSearch(array3, 2), -1);
	assert.strictEqual(interpolationSearch(array3, 5), 3);
	assert.strictEqual(interpolationSearch(array3, 10), -1);
	assert.strictEqual(interpolationSearch(array3, -10), -1);

	assert.strictEqual(interpolationSearch(array4, 9), -1);
});

QUnit.test("WASM interpolationSearch test", function (assert) {
	var importObject = {
		env: {
			memory: new WebAssembly.Memory({ initial: 1 })
		}
	};

	var wasmModule = new WebAssembly.Instance(wasmSource, importObject);
	var wasmMemoryF64Array = new Float64Array(importObject.env.memory.buffer);
	var interpolationSearch = wasmModule.exports.interpolationSearch;

	array1.forEach((element, idx) =>
		wasmMemoryF64Array[idx] = element);
	
	array1.forEach((element, index) =>
		assert.strictEqual(interpolationSearch(array1.length - 1, element), index));

	array2.forEach((element, idx) =>
		wasmMemoryF64Array[idx] = element);

	array2.forEach((element, index) =>
		assert.strictEqual(interpolationSearch(array2.length - 1, element), 0))
		
	assert.strictEqual(interpolationSearch(array2.length - 1, 9), -1);

	array3.forEach((element, idx) =>
		wasmMemoryF64Array[idx] = element);

	assert.strictEqual(interpolationSearch(array3.length - 1, -1), -1);
	assert.strictEqual(interpolationSearch(array3.length - 1, 0), 0);
	assert.strictEqual(interpolationSearch(array3.length - 1, 1), 1);
	assert.strictEqual(interpolationSearch(array3.length - 1, 2), -1);
	assert.strictEqual(interpolationSearch(array3.length - 1, 5), 3);
	assert.strictEqual(interpolationSearch(array3.length - 1, 10), -1);
	assert.strictEqual(interpolationSearch(array3.length - 1, -10), -1);

	assert.strictEqual(interpolationSearch(0, 9), -1);
});