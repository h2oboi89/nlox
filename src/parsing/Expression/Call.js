'use strict';

/**
 * Represents a node in the AST.
 * @memberof parsing
 */
class CallExpression {
  /**
   * Creates a new CallExpression.
   */
  constructor(callee, paren, args) {
    this._callee = callee;
    this._paren = paren;
    this._args = args;
  }

  get callee() {
    return this._callee;
  }

  get paren() {
    return this._paren;
  }

  get args() {
    return this._args;
  }

  /**
   * Accepts a visitor.
   * @param  {object} visitor entity that is traversing the AST
   */
  accept(visitor) {
    return visitor.visitCallExpression(this);
  }
}

module.exports = CallExpression;
