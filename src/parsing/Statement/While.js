'use strict';

/**
 * Represents a node in the AST.
 * @memberof parsing
 */
class WhileStatement {
  /**
   * Creates a new WhileStatement.
   */
  constructor(condition, body) {
    this._condition = condition;
    this._body = body;
  }

  get condition() {
    return this._condition;
  }

  get body() {
    return this._body;
  }

  /**
   * Accepts a visitor.
   * @param  {object} visitor entity that is traversing the AST
   */
  accept(visitor) {
    return visitor.visitWhileStatement(this);
  }
}

module.exports = WhileStatement;
