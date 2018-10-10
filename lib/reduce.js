module.exports = function reduce(arr, callback, initialize) {
	var i = 1,
		l = arr.length,
		val = initialize,
		result = [];
	if (initialize) {
		val = callback(initialize, arr[0], 0);
	}
	for(; i < l; i++) {
		val = callback(val, arr[i], i);
	}
  return result;
};
