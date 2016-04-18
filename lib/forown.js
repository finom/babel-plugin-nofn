module.exports = function forOwn(obj, callback) {
	var keys = Object.keys(obj),
		l = keys.length,
		i = 0,
		key;

	while(i < l) {
		key = keys[i++];
		callback(obj[key], key);
	}
};
