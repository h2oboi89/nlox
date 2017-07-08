'use strict';

/**
 * Represents a node in the AST.
 * @memberof parsing
 */
class IfStatement {
  /**
   * Creates a new IfStatement.
   */
  constructor(condition, thenBranch, elseBranch) {
    this._condition = condition;
    this._thenBranch = thenBranch;
    this._elseBranch = elseBranch;
  }

  get condition() {
    return this._condition;
  }

  get thenBranch() {
    return this._thenBranch;
  }

  get elseBranch() {
    return this._elseBranch;
  }

  /**
   * Accepts a visitor.
   * @param  {object} visitor entity that is traversing the AST
   */
  accept(visitor) {
    return visitor.visitIfStatement(this);
  }
}

module.exports = IfStatement;
