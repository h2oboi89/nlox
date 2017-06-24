'use strict';

const RuntimeError = require('./RuntimeError');

/**
 * Stores variable values during execution.
 */
class Environment {
  constructor(enclosing) {
    this._values = {};

    this._enclosing = enclosing;
  }

  static _throwUndefinedError(name) {
    throw new RuntimeError(name, `Undefined variable '${name.lexeme}'.`);
  }

  static _throwDefinedError(name) {
    throw new RuntimeError(name, `'${name.lexeme}' has already been defined.`);
  }

  _variableExists(name) {
    return this._values[name.lexeme] !== undefined;
  }

  /**
   * Defines a variable (var <var> = <value>;)
   * @param {Token} name Variable name
   * @param {object} value Variable value
   */
  define(name, value) {
    if(!this._variableExists(name)) {
      this._values[name.lexeme] = value;
    }
    else {
      Environment._throwDefinedError(name);
    }
  }


  /**
   * Assigns a new value to an existing variable (<var> = <value>;)
   * @param {Token} name Variable name
   * @param {object} value Variable value
   */
  assign(name, value) {
    if(this._variableExists(name)) {
      this._values[name.lexeme] = value;
    }
    else {
      if(this._enclosing !== undefined) {
        this._enclosing.assign(name, value);
      }
      else {
        Environment._throwUndefinedError(name);
      }
    }
  }

  /**
   * Gets current variable value.
   * @param {Token} name Variable name
   */
  get(name) {
    if(this._variableExists(name)) {
      return this._values[name.lexeme];
    }
    else {
      if(this._enclosing !== undefined) {
        return this._enclosing.get(name);
      }
      else {
        Environment._throwUndefinedError(name);
      }
    }
  }
}

module.exports = Environment;
