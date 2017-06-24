'use strict';

const RuntimeError = require('./RuntimeError');

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

  define(name, value) {
    if(!this._variableExists(name)) {
      this._values[name.lexeme] = value;
    }
    else {
      Environment._throwDefinedError(name);
    }
  }

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
