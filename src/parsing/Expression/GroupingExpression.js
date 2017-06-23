'use strict';

/**
 * Represents a node in the AST.
 * @memberof parsing
 */
class GroupingExpression {
  /**
   * Creates a new GroupingExpression.
   * TODO: document parameters
   */
  constructor(expression) {
    this._expression = expression;
  }

  get expression() {
    return this._expression;
  }

  /**
   * Accepts a visitor.
   * @param  {object} visitor entity that is traversing the AST
   */
  accept(visitor) {
    return visitor.visitGroupingExpression(this);
  }
}

module.exports = GroupingExpression;
