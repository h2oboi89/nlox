'use strict';

/**
 * Represents a node in the AST.
 * @memberof parsing
 */
class VariableExpression {
  /**
   * Creates a new VariableExpression.
   * TODO: document parameters
   */
  constructor(name) {
    this._name = name;
  }

  get name() {
    return this._name;
  }

  /**
   * Accepts a visitor.
   * @param  {object} visitor entity that is traversing the AST
   */
  accept(visitor) {
    return visitor.visitVariableExpression(this);
  }
}

module.exports = VariableExpression;
