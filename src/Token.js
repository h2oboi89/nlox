'use strict';

class Token {
  constructor(type, lexeme, literal, line) {
    // TODO: ensure type is a TokenType?
    this._type = type;
    this._lexeme = lexeme;
    this._literal = literal;
    this._line = line;
  }

  toString() {
    return `${this._type} ${this._lexeme} ${this._literal}`;
  }
}

module.exports = Token;
