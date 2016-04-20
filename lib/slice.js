module.exports = function(arrLike, start, end) {
	var l = arrLike.length,
		i = start || 0,
		_end = end || l,
		arr = Array(_end - i),
		j = 0;

	while(i < _end) {
		arr[j++] = arrLike[i++];
	}

	return arr;
};
