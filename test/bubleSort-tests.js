var requireHelper = require("./_require_helper");
var bubbleSort = requireHelper('../source/bubbleSort/bubbleSort').bubbleSort;
var readFileSync = require('fs').readFileSync;
var resolve = require('path').resolve;
var wasmSource = new WebAssembly.Module(readFileSync(resolve() + "/source/bubbleSort/bubbleSort.wasm"));
var expectedArray1 = [Number.MIN_SAFE_INTEGER,-9,-8,-1,-0.7,0, Number.MIN_VALUE,0.5,2,3,4,5,6,7,234.2546432315765, Number.MAX_SAFE_INTEGER, Number.MAX_VALUE];
var expectedArray2 = [10,10,10,10];
var expectedArray3 = [0,1,1,5];
var expectedArray4 = [];

QUnit.test("JS bubbleSort test", function (assert) {
	var actualArray1 = [234.2546432315765, -9,-1,4,6, Number.MIN_VALUE, Number.MAX_VALUE,Number.MIN_SAFE_INTEGER,Number.MAX_SAFE_INTEGER, 2,3,5,7,0,-8,-0.7,0.5];
	var actualArray2 = [10,10,10,10];
	var actualArray3 = [1,0,5,1];
	var actualArray4 = [];

	bubbleSort(actualArray1);
	bubbleSort(actualArray2);
	bubbleSort(actualArray3);
	bubbleSort(actualArray4);

	assert.deepEqual(actualArray1, expectedArray1);
	assert.deepEqual(actualArray2, expectedArray2);
	assert.deepEqual(actualArray3, expectedArray3);
	assert.deepEqual(actualArray4, expectedArray4);
});

QUnit.test("WASM bubbleSort test", function (assert) {
	var initialArray1 = [234.2546432315765, -9,-1,4,6, Number.MIN_VALUE, Number.MAX_VALUE,Number.MIN_SAFE_INTEGER,Number.MAX_SAFE_INTEGER, 2,3,5,7,0,-8,-0.7,0.5];
	var initialArray2 = [10,10,10,10];
	var initialArray3 = [1,0,5,1];
	var initialArray4 = [];

	var importObject = {
		env: {
			memory: new WebAssembly.Memory({ initial: 1 })
		}
	};
	
	var wasmModule = new WebAssembly.Instance(wasmSource, importObject);
	var wasmMemoryF64Array = new Float64Array(importObject.env.memory.buffer);

	function testArray(initialArray, expectedArray){
		initialArray.forEach((element, idx) =>
			wasmMemoryF64Array[idx] = element);

		wasmModule.exports.bubbleSort(0, initialArray.length - 1);
		
		let actualArray = [];

		for(let i = 0; i < initialArray.length; ++i)
			actualArray.push(wasmMemoryF64Array[i]);

		assert.deepEqual(actualArray, expectedArray);
	}

	testArray(initialArray1, expectedArray1);
	testArray(initialArray2, expectedArray2);
	testArray(initialArray3, expectedArray3);
	testArray(initialArray4, expectedArray4);
});