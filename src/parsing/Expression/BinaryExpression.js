'use strict';

/**
 * Represents a node in the AST.
 * @memberof parsing
 */
class BinaryExpression {
  /**
   * Creates a new BinaryExpression.
   */
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

  /**
   * Accepts a visitor.
   * @param  {object} visitor entity that is traversing the AST
   */
  accept(visitor) {
    return visitor.visitBinaryExpression(this);
  }
}

module.exports = BinaryExpression;
