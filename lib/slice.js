module.exports = function(arrLike, start, end) {
	var l = arrLike.length,
		arr = Array(l),
		j = 0,
		i = start || 0,
		_end = end || l;

	while(i < _end) {
		arr[j++] = arrLike[i++];
	}

	return arr;
};
