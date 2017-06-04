'use strict';

const LoxError = require('./LoxError');
const Token = require('./Token');
const TokenType = require('./TokenType');

const KEYWORDS = {
  'and': TokenType.AND,
  'class': TokenType.CLASS,
  'else': TokenType.ELSE,
  'false': TokenType.FALSE,
  'fun': TokenType.FUN,
  'if': TokenType.IF,
  'nil': TokenType.NIL,
  'or': TokenType.OR,
  'print': TokenType.PRINT,
  'return': TokenType.RETURN,
  'super': TokenType.SUPER,
  'this': TokenType.THIS,
  'true': TokenType.TRUE,
  'var': TokenType.VAR,
  'while': TokenType.WHILE
};


/**
 * Converts Lox source code into a series of {@link Token}s.
 */
class Scanner {
  _isAtEnd() {
    return this._current >= this._source.length;
  }

  _advance() {
    this._current++;
    return this._source[this._current - 1];
  }

  _addToken(type, literal) {
    const text = this._source.slice(this._start, this._current);
    this._tokens.push(new Token(type, text, literal, this._line));
  }

  _match(expected) {
    if(this._isAtEnd()) {
      return false;
    }
    if(this._source[this._current] != expected) {
      return false;
    }

    this._current++;
    return true;
  }

  _peek(ahead) {
    if(ahead === undefined) {
      ahead = 0;
    }

    if(this._current + ahead >= this._source.length) {
      return '\0';
    }
    else {
      return this._source[this._current + ahead];
    }
  }

  _slash() {
    if(this._match('/')) {
      while(this._peek() !== '\n' && !this._isAtEnd()) {
        this._advance();
      }
    }
    else {
      this._addToken(TokenType.SLASH);
    }
  }

  _string(closingQuote) {
    while(this._peek() != closingQuote && !this._isAtEnd()) {
      if(this._peek() === '\n') {
        this._line++;
      }
      this._advance();
    }

    if(this._isAtEnd()) {
      LoxError.error(this._line, `Unterminated string: ${this._source.slice(this._start, this._current)}`);
      return;
    }

    // capture closing quote
    this._advance();

    const stringLiteral = this._source.slice(this._start + 1, this._current - 1);

    this._addToken(TokenType.STRING, stringLiteral);
  }

  static _isDigit(c) {
    return c >= '0' && c <= '9';
  }

  static _isAlpha(c) {
    return c >= 'a' && c <= 'z' ||
      c >= 'A' && c <= 'Z' ||
      c === '_';
  }

  static isAlphaNumeric(c) {
    return Scanner._isDigit(c) || Scanner._isAlpha(c);
  }

  _consumeNumber() {
    while(Scanner._isDigit(this._peek())) {
      this._advance();
    }
  }

  _number() {
    this._consumeNumber();

    if(this._peek() === '.' && Scanner._isDigit(this._peek(1))) {
      this._advance();

      this._consumeNumber();
    }

    this._addToken(TokenType.NUMBER, parseFloat(this._source.slice(this._start, this._current)));
  }

  _identifier() {
    while(Scanner.isAlphaNumeric(this._peek())) {
      this._advance();
    }

    const text = this._source.slice(this._start, this._current);

    const type = KEYWORDS[text] || TokenType.IDENTIFIER;

    this._addToken(type);
  }

  _scanToken() {
    const c = this._advance();

    switch(c) {
      case '(':
        this._addToken(TokenType.LEFT_PAREN);
        break;
      case ')':
        this._addToken(TokenType.RIGHT_PAREN);
        break;
      case '{':
        this._addToken(TokenType.LEFT_BRACE);
        break;
      case '}':
        this._addToken(TokenType.RIGHT_BRACE);
        break;
      case ',':
        this._addToken(TokenType.COMMA);
        break;
      case '.':
        this._addToken(TokenType.DOT);
        break;
      case '-':
        this._addToken(TokenType.MINUS);
        break;
      case '+':
        this._addToken(TokenType.PLUS);
        break;
      case ';':
        this._addToken(TokenType.SEMICOLON);
        break;
      case '*':
        this._addToken(TokenType.STAR);
        break;
      case '!':
        this._addToken(this._match('=') ? TokenType.BANG_EQUAL : TokenType.BANG);
        break;
      case '=':
        this._addToken(this._match('=') ? TokenType.EQUAL_EQUAL : TokenType.EQUAL);
        break;
      case '<':
        this._addToken(this._match('=') ? TokenType.LESS_EQUAL : TokenType.LESS);
        break;
      case '>':
        this._addToken(this._match('=') ? TokenType.GREATER_EQUAL : TokenType.GREATER);
        break;
      case '/':
        this._slash();
        break;
      case ' ':
        break;
      case '\r':
        break;
      case '\t':
        break;
      case '\n':
        this._line++;
        break;
      case '\'':
        this._string('\'');
        break;
      case '\"':
        this._string('\"');
        break;
      default:
        if(Scanner._isDigit(c)) {
          this._number();
        }
        else if(Scanner._isAlpha(c)) {
          this._identifier();
        }
        else {
          LoxError.error(this._line, `Unexpected character: '${c}'`);
        }
        break;
    }
  }


  /**
   * Scans source and converts it into {@link Token}s.
   * Will report errors using {@link LoxError}.
   *
   * @param  {string} source Lox source code.
   * @return {Token[]} Scanned source code.
   */
  scanTokens(source) {
    this._source = source;
    this._tokens = [];
    this._start = 0;
    this._current = 0;
    this._line = 1;

    while(!this._isAtEnd()) {
      this._start = this._current;
      this._scanToken();
    }

    this._tokens.push(new Token(TokenType.EOF, '', undefined, this._line));

    return this._tokens;
  }
}

module.exports = Scanner;
