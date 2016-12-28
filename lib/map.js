module.exports = function map(arr, callback) {
	var i = 0,
		l = arr.length,
		result = [];

	for(; i < l; i++) {
    result.push(callback(arr[i], i));
	}
  return result;
};
