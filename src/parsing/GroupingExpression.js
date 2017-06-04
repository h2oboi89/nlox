'use strict';

class GroupingExpression {
  constructor(expression) {
    this._expression = expression;
  }

  get expression() {
    return this._expression;
  }
}

module.exports = GroupingExpression;
