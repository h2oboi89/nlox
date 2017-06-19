'use strict';

/**
 * Represents a node in the AST.
 * @memberof parsing
 */
class LiteralExpression {
  /**
   * Creates a new LiteralExpression.
   *
   * @param {object} value Literal value (true, false, nil, number, string)
   */
  constructor(value) {
    this._value = value;
  }

  get value() {
    return this._value;
  }

  /**
   * Accepts a visitor.
   * @param  {object} visitor entity that is traversing the AST
   */
  accept(visitor) {
    return visitor.visitLiteralExpression(this);
  }
}

module.exports = LiteralExpression;
