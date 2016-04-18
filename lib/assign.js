module.exports = function assign(target, source) {
	var keys = Object.keys(source),
		i = keys.length,
		key;

	while(--i >= 0) {
		key = keys[i];
		target[key] = source[key];
	}

	return target;
};
