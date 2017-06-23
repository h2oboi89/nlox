'use strict';

const LoxError = require('./LoxError');
const TokenType = require('./TokenType');

const ExpressionStatement = require('./parsing/ExpressionStatement');
const PrintStatement = require('./parsing/PrintStatement');

const BinaryExpression = require('./parsing/BinaryExpression');
const GroupingExpression = require('./parsing/GroupingExpression');
const LiteralExpression = require('./parsing/LiteralExpression');
const UnaryExpression = require('./parsing/UnaryExpression');

class ParseError extends Error {
  constructor() {
    super();
  }
}

/**
 * Converts scanned {@link Token}s into an executable AST.
 */
class Parser {
  _previous() {
    return this._tokens[this._current - 1];
  }

  _peek() {
    return this._tokens[this._current];
  }

  _isAtEnd() {
    return this._peek().type === TokenType.EOF;
  }

  _advance() {
    if(!this._isAtEnd()) {
      this._current++;
    }
    return this._previous();
  }

  _check(tokenType) {
    if(this._isAtEnd()) {
      return false;
    }
    return this._peek().type == tokenType;
  }

  _match(...tokenTypes) {
    for(let tokenType of tokenTypes) {
      if(this._check(tokenType)) {
        this._advance();
        return true;
      }
    }

    return false;
  }

  _error(token, message) {
    LoxError.parseError(token, message);
    return new ParseError(message);
  }

  _synchronize() {
    this._advance();

    while(!this._isAtEnd()) {
      if(this._previous().type === TokenType.SEMICOLON) {
        return;
      }

      switch(this._peek().type) {
        case TokenType.CLASS:
          return;
        case TokenType.FUN:
          return;
        case TokenType.VAR:
          return;
        case TokenType.FOR:
          return;
        case TokenType.IF:
          return;
        case TokenType.WHILE:
          return;
        case TokenType.PRINT:
          return;
        case TokenType.RETURN:
          return;
      }

      this._advance();
    }
  }

  _consume(tokenType, message) {
    if(this._check(tokenType)) {
      return this._advance();
    }

    throw this._error(this._peek(), message);
  }

  _statement() {
    if(this._match(TokenType.PRINT)) {
      return this._printStatement();
    }
    else {
      return this._expressionStatement();
    }
  }

  _printStatement() {
    const value = this._expression();

    this._consume(TokenType.SEMICOLON, "Expect ';' after value.");

    return new PrintStatement(value);
  }

  _expressionStatement() {
    const expression = this._expression();

    this._consume(TokenType.SEMICOLON, "Expect ';' after expression.");

    return new ExpressionStatement(expression);
  }

  _expression() {
    return this._equality();
  }

  _equality() {
    let expression = this._comparison();

    while(this._match(TokenType.BANG_EQUAL, TokenType.EQUAL_EQUAL)) {
      const operator = this._previous();
      const right = this._comparison();
      expression = new BinaryExpression(expression, operator, right);
    }

    return expression;
  }

  _comparison() {
    let expression = this._term();

    while(this._match(TokenType.GREATER, TokenType.GREATER_EQUAL, TokenType.LESS, TokenType.LESS_EQUAL)) {
      const operator = this._previous();
      const right = this._term();
      expression = new BinaryExpression(expression, operator, right);
    }

    return expression;
  }

  _term() {
    let expression = this._factor();

    while(this._match(TokenType.MINUS, TokenType.PLUS)) {
      const operator = this._previous();
      const right = this._factor();
      expression = new BinaryExpression(expression, operator, right);
    }

    return expression;
  }

  _factor() {
    let expression = this._unary();

    while(this._match(TokenType.SLASH, TokenType.STAR)) {
      const operator = this._previous();
      const right = this._unary();
      expression = new BinaryExpression(expression, operator, right);
    }

    return expression;
  }

  _unary() {
    if(this._match(TokenType.BANG, TokenType.MINUS)) {
      const operator = this._previous();
      const right = this._unary();
      return new UnaryExpression(operator, right);
    }

    return this._primary();
  }

  _primary() {
    if(this._match(TokenType.FALSE)) {
      return new LiteralExpression(false);
    }
    if(this._match(TokenType.TRUE)) {
      return new LiteralExpression(true);
    }
    if(this._match(TokenType.NIL)) {
      return new LiteralExpression(null);
    }

    if(this._match(TokenType.NUMBER, TokenType.STRING)) {
      return new LiteralExpression(this._previous().literal);
    }

    if(this._match(TokenType.LEFT_PAREN)) {
      const expression = this._expression();
      this._consume(TokenType.RIGHT_PAREN, `Expect ')' after expression.`);
      return new GroupingExpression(expression);
    }

    throw this._error(this._peek(), 'Expect expression');
  }

  /**
   * Parses {@link Token}s into an AST.
   * Will report errors using {@link LoxError}.
   *
   * @param  {Token[]} tokens Scanned tokens.
   * @return {Expression} AST representing parsed source.
   */
  parse(tokens) {
    this._tokens = tokens;
    this._current = 0;

    try {
      const statements = [];

      while(!this._isAtEnd()) {
        statements.push(this._statement());
      }

      return statements;
    }
    catch(error) {
      if(error instanceof ParseError) {
        return undefined;
      }
      else {
        throw error;
      }
    }
  }
}

module.exports = Parser;
