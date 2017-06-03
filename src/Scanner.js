'use strict';

const Token = require('./Token');
const TokenType = require('./TokenType');
const LoxError = require('./LoxError');

class Scanner {
  constructor(source) {
    // TODO: move to scannTokens?
    this._source = source;
    this._tokens = [];
    this._start = 0;
    this._current = 0;
    this._line = 1;
  }

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

  _peek() {
    if(this._current >= this._source.length()) {
      return '\0';
    }
    else {
      return this._source[this._current];
    }
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
        this._addToken(this._match('=') ? TokenType.EQUAL_EQUAL : TokenType.EQUAL_EQUAL);
        break;
      case '<':
        this._addToken(this._match('=') ? TokenType.LESS_EQUAL : TokenType.LESS);
        break;
      case '>':
        this._addToken(this._match('=') ? TokenType.GREATER_EQUAL : TokenType.GREATER);
        break;
      case '/':
        if(this._match('/')) {
          while(this._peek() !== '\n' && !this._isAtEnd()) {
            this._advance();
          }
        }
        else {
          this._addToken(TokenType.SLASH);
        }
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
      default:
        LoxError.error(this._line, `Unexpected character: '${c}'`);
    }
  }

  scanTokens() {
    while(!this._isAtEnd()) {
      this._start = this._current;
      this._scanToken();
    }

    this._tokens.push(new Token(TokenType.EOL, '', undefined, this._line));
    return this._tokens;
  }
}

module.exports = Scanner;
