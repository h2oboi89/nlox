'use strict';

class LiteralExpression {
  constructor(value) {
    this._value = value;
  }

  get value() {
    return this._value;
  }

  accept(visitor) {
    return visitor.visitLiteralExpression(this);
  }
}

module.exports = LiteralExpression;
