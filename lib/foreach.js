module.exports = function forEach(arr, callback) {
	var i = 0,
		l = arr.length;

	for(; i < l; i++) {
		callback(arr[i], i);
	}
};
