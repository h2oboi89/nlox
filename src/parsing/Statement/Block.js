'use strict';

/**
 * Represents a node in the AST.
 * @memberof parsing
 */
class BlockStatement {
  /**
   * Creates a new BlockStatement.
   */
  constructor(statements) {
    this._statements = statements;
  }

  get statements() {
    return this._statements;
  }

  /**
   * Accepts a visitor.
   * @param  {object} visitor entity that is traversing the AST
   */
  accept(visitor) {
    return visitor.visitBlockStatement(this);
  }
}

module.exports = BlockStatement;
