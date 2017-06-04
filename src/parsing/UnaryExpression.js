'use strict';

class UnaryExpression {
  constructor(operator, right) {
    this._operator = operator;
    this._right = right;
  }

  get operator() {
    return this._operator;
  }

  get right() {
    return this._right;
  }

  accept(visitor) {
    return visitor.visitUnaryExpression(this);
  }
}

module.exports = UnaryExpression;
