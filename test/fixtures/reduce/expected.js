"use strict";

for (var _target2 = object, key = 1, _func2 = function _func2(value, key) {
  return doSomething(value, key);
}, _initialize2 = void 0, value = _target2[key], _l2 = _target2.length, _result2 = _initialize2 === void 0 ? _target2[0] : _func2(_initialize2, _target2[0]); value = _target2[key], key < _l2; key++) {
  _result2 = _func2(_result2, value, key);
}

target = _result2;
