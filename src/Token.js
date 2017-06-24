'use strict';

/**
 * Represents a scanned lexeme of Lox source code.
 */
class Token {

  /**
   * Creates a new token.
   *
   * @param  {TokenType} type This tokens type. Used by the {@link Parser}.
   * @param  {string} lexeme  Section of source code this token was parsed from.
   * @param  {string|number} literal   If a token represents a literal, this will be the extracted value.
   * @param  {number} line      Identifies which line of the source code this token was parsed from.
   * @return {Token}
   */
  constructor(type, lexeme, literal, line) {
    this._type = type;
    this._lexeme = lexeme;
    this._literal = literal;
    this._line = line;
  }

  get type() {
    return this._type;
  }

  get lexeme() {
    return this._lexeme;
  }

  get literal() {
    return this._literal;
  }

  get line() {
    return this._line;
  }

  /**
   * Returns a string representing the token.
   *
   * @return {string}  A string representing the object.
   */
  toString() {
    return `${this.type} ${this.lexeme} ${this.literal}`;
  }
}

module.exports = Token;
