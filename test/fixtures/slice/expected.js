"use strict";

var _source = arr;

var _result = Array(_source.length);

for (var _l2 = _source.length, _j2 = 0, _i2 = start || 0, _end2 = end || _l2; _i2 < _end2;) {
  _result[_j2++] = _source[_i2++];
}

doSomething(_result);
