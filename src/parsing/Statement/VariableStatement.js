'use strict';

/**
 * Represents a node in the AST.
 * @memberof parsing
 */
class VariableStatement {
  /**
   * Creates a new VariableStatement.
   * TODO: document parameters
   */
  constructor(name, initializer) {
    this._name = name;
    this._initializer = initializer;
  }

  get name() {
    return this._name;
  }

  get initializer() {
    return this._initializer;
  }

  /**
   * Accepts a visitor.
   * @param  {object} visitor entity that is traversing the AST
   */
  accept(visitor) {
    return visitor.visitVariableStatement(this);
  }
}

module.exports = VariableStatement;
