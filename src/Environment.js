'use strict';

const RuntimeError = require('./RuntimeError');

class Environment {
  constructor() {
    this._values = {};
  }

  define(name, value) {
    this._values[name] = value;
  }

  get(name) {
    if(this._values[name.lexeme] !== undefined) {
      return this._values[name.lexeme];
    } else {
      throw new RuntimeError(name, `Undefined variable '${name.lexeme}'.`);
    }
  }
}

module.exports = Environment;
