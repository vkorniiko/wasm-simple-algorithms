function bubbleSort(array) {
	while(true) {
		let swapped = false;
		
		for(let idx1 = 0; idx1 < array.length - 1; ++idx1){
			let idx2 = idx1 + 1;
			let value1 = array[idx1];
			let value2 = array[idx2];

			if(value1 > value2){
				array[idx1] = value2;
				array[idx2] = value1;
				swapped = true;
			}
		}

		if(swapped === false) 
			break;
	}
}

module.exports.bubbleSort = bubbleSort;