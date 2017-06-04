'use strict';

/*
 * Represents a node in the AST.
 *
 */
class GroupingExpression {
  /*
   * Creates a new GroupingExpression.
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
