'use strict';

/**
 * Represents a node in the AST.
 * @memberof parsing
 */
class PrintStatement {
  /**
   * Creates a new PrintStatement.
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
    return visitor.visitPrintStatement(this);
  }
}

module.exports = PrintStatement;
