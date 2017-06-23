'use strict';

/**
 * Represents a node in the AST.
 * @memberof parsing
 */
class AssignmentExpression {
  /**
   * Creates a new AssignmentExpression.
   */
  constructor(name, value) {
    this._name = name;
    this._value = value;
  }

  get name() {
    return this._name;
  }

  get value() {
    return this._value;
  }

  /**
   * Accepts a visitor.
   * @param  {object} visitor entity that is traversing the AST
   */
  accept(visitor) {
    return visitor.visitAssignmentExpression(this);
  }
}

module.exports = AssignmentExpression;
