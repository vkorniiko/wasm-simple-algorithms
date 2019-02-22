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


module.exports.linearSearch = linearSearch;