'use strict';

class BinaryExpression {
  constructor(left, operator, right) {
    this._left = left;
    this._operator = operator;
    this._right = right;
  }

  get left() {
    return this._left;
  }

  get operator() {
    return this._operator;
  }

  get right() {
    return this._right;
  }
}

module.exports = BinaryExpression;
