'use strict';

class GroupingExpression {
  constructor(expression) {
    this._expression = expression;
  }

  get expression() {
    return this._expression;
  }

  accept(visitor) {
    return visitor.visitGroupingExpression(this);
  }
}

module.exports = GroupingExpression;
