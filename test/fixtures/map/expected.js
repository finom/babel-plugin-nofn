"use strict";

for (var _target2 = object, key = 0, value, _l2 = _target2.length, _result2 = [], _func2 = function _func2(value, key) {
  return doSomething(value, key);
}; value = _target2[key], key < _l2; key++) {
  _result2.push(_func2(value, key));
}

target = _result2;