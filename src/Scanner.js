'use strict';

const Token = require('./Token');
const TokenType = require('./TokenType');
const LoxError = require('./LoxError');

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
    if (ahead === undefined) {
      ahead = 0;
    }

    if(this._current + ahead >= this._source.length) {
      return '\0';
    }
    else {
      return this._source[this._current + ahead];
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

  _isDigit(c) {
    return c >= '0' && c <= '9';
  }

  _consumeNumber() {
    while(this._isDigit(this._peek())) {
      this._advance();
    }
  }

  _number() {
    this._consumeNumber();

    if(this._peek() === '.' && this._isDigit(this._peek(1))) {
      this._advance();

      this._consumeNumber();
    }

    this._addToken(TokenType.NUMBER, parseFloat(this._source.slice(this._start, this._current)));
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
      case '\'':
        this._string('\'');
        break;
      case '"':
        this._string('"');
        break;
      default:
        if(this._isDigit(c)) {
          this._number();
        }
        else {
          LoxError.error(this._line, `Unexpected character: '${c}'`);
        }
        break;
    }
  }

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
