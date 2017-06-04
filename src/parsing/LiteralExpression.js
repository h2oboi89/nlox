'use strict';

class LiteralExpression {
  constructor(value) {
    this._value = value;
  }

  get value() {
    return this._value;
  }
}

module.exports = LiteralExpression;
