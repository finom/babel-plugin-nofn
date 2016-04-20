"use strict";

var _source = arr,
    _l = _source.length,
    _i = start || 0,
    _end = end || _l,
    _j = 0,
    _result = Array(_end - _i);

while (_i < _end) {
  _result[_j++] = _source[_i++];
}

doSomething(_result);
