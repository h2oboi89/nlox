'use strict';

/**
 * Represents a node in the AST.
 * @memberof parsing
 */
class UnaryExpression {
  /**
   * Creates a new UnaryExpression.
   */
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

  /**
   * Accepts a visitor.
   * @param  {object} visitor entity that is traversing the AST
   */
  accept(visitor) {
    return visitor.visitUnaryExpression(this);
  }
}

module.exports = UnaryExpression;
