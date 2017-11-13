'use strict';

const LoxError = require('./LoxError');
const TokenType = require('./TokenType');

const BlockStatement = require('./parsing/Statement/Block');
const ExpressionStatement = require('./parsing/Statement/Expression');
const IfStatement = require('./parsing/Statement/If');
const PrintStatement = require('./parsing/Statement/Print');
const VariableStatement = require('./parsing/Statement/Variable');
const WhileStatement = require('./parsing/Statement/While');

const AssignmentExpression = require('./parsing/Expression/Assignment');
const BinaryExpression = require('./parsing/Expression/Binary');
const CallExpression = require('./parsing/Expression/Call');
const GroupingExpression = require('./parsing/Expression/Grouping');
const LogicalExpression = require('./parsing/Expression/Logical');
const LiteralExpression = require('./parsing/Expression/Literal');
const UnaryExpression = require('./parsing/Expression/Unary');
const VariableExpression = require('./parsing/Expression/Variable');

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

  _declaration() {
    try {
      if(this._match(TokenType.VAR)) {
        return this._variableDeclaration();
      }
      else {
        return this._statement();
      }
    }
    catch(error) {
      if(error instanceof ParseError) {
        this._synchronize();
      }
      else {
        throw error;
      }
    }
  }

  _variableDeclaration() {
    const name = this._consume(TokenType.IDENTIFIER, 'Expect variable name.');

    let initializer;

    if(this._match(TokenType.EQUAL)) {
      initializer = this._expression();
    }

    this._consume(TokenType.SEMICOLON, `Expect ';' after variable declaration.`);

    return new VariableStatement(name, initializer);
  }

  _statement() {
    if(this._match(TokenType.FOR)) {
      return this._forStatement();
    }
    if(this._match(TokenType.IF)) {
      return this._ifStatement();
    }
    if(this._match(TokenType.PRINT)) {
      return this._printStatement();
    }
    if(this._match(TokenType.WHILE)) {
      return this._whileStatement();
    }
    if(this._match(TokenType.LEFT_BRACE)) {
      return new BlockStatement(this._blockStatement());
    }
    else {
      return this._expressionStatement();
    }
  }

  _forStatement() {
    this._consume(TokenType.LEFT_PAREN, `Expect '(' after 'for'.`);

    let initializer;

    if(this._match(TokenType.SEMICOLON)) {
      initializer = null;
    }
    else if(this._match(TokenType.VAR)) {
      initializer = this._variableDeclaration();
    }
    else {
      initializer = this._expressionStatement();
    }

    let condition;

    if(this._match(TokenType.SEMICOLON)) {
      condition = null;
    }
    else {
      condition = this._expression();
      this._consume(TokenType.SEMICOLON, `Expect ';' after loop condition.`);
    }

    let increment;

    if(this._match(TokenType.RIGHT_PAREN)) {
      increment = null;
    }
    else {
      increment = this._expression();
      this._consume(TokenType.RIGHT_PAREN, `Expect ')' after for clauses.`);
    }

    let body = this._statement();

    if(increment !== null) {
      body = new BlockStatement([
        body,
        new ExpressionStatement(increment)
      ]);
    }

    if(condition === null) {
      condition = new LiteralExpression(true);
    }

    body = new WhileStatement(condition, body);

    if(initializer !== null) {
      body = new BlockStatement([
        initializer,
        body
      ]);
    }

    return body;
  }

  _ifStatement() {
    this._consume(TokenType.LEFT_PAREN, `Expect '(' after 'if'.`);
    const condition = this._expression();
    this._consume(TokenType.RIGHT_PAREN, `Expect ')' after if condition.`);

    const thenBranch = this._statement();
    let elseBranch;

    if(this._match(TokenType.ELSE)) {
      elseBranch = this._statement();
    }

    return new IfStatement(condition, thenBranch, elseBranch);
  }

  _printStatement() {
    const value = this._expression();

    this._consume(TokenType.SEMICOLON, `Expect ';' after value.`);

    return new PrintStatement(value);
  }

  _whileStatement() {
    this._consume(TokenType.LEFT_PAREN, `Expect '(' after 'while'.`);
    const condition = this._expression();
    this._consume(TokenType.RIGHT_PAREN, `Expect ')' after while condition.`);

    const body = this._statement();

    return new WhileStatement(condition, body);
  }

  _blockStatement() {
    const statements = [];

    while(!this._check(TokenType.RIGHT_BRACE) && !this._isAtEnd()) {
      statements.push(this._declaration());
    }

    this._consume(TokenType.RIGHT_BRACE, `Expect '}' at end of block.`);

    return statements;
  }

  _expressionStatement() {
    const expression = this._expression();

    this._consume(TokenType.SEMICOLON, `Expect ';' after expression.`);

    return new ExpressionStatement(expression);
  }

  _expression() {
    return this._assignment();
  }

  _assignment() {
    const expression = this._or();

    if(this._match(TokenType.EQUAL)) {
      const equals = this._previous();
      const value = this._assignment();

      if(expression instanceof VariableExpression) {
        const name = expression.name;

        return new AssignmentExpression(name, value);
      }

      this._error(equals, 'Invalid assignment target.');
    }

    return expression;
  }

  _or() {
    let expression = this._and();

    while(this._match(TokenType.OR)) {
      const operator = this._previous();

      const right = this._and();

      expression = new LogicalExpression(expression, operator, right);
    }

    return expression;
  }

  _and() {
    let expression = this._equality();

    while(this._match(TokenType.AND)) {
      const operator = this._previous();

      const right = this._equality();

      expression = new LogicalExpression(expression, operator, right);
    }

    return expression;
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

    return this._call();
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
    if(this._match(TokenType.IDENTIFIER)) {
      return new VariableExpression(this._previous());
    }
    if(this._match(TokenType.LEFT_PAREN)) {
      const expression = this._expression();
      this._consume(TokenType.RIGHT_PAREN, `Expect ')' after expression.`);
      return new GroupingExpression(expression);
    }

    throw this._error(this._peek(), 'Expect expression.');
  }

  _finishCall(callee) {
    let args = [];

    if(!this._check(TokenType.RIGHT_PAREN)) {
      do {
        if(args.length >= 8) {
          this._error(this._peek(), "Cannot have more than 8 arguments.");
        }
        args.push(this._expression());
      } while (this._match(TokenType.COMMA));
    }

    let paren = this._consume(TokenType.RIGHT_PAREN, `Expect ')' after arguments.`);

    return new CallExpression(callee, paren, args);
  }

  _call() {
    let expression = this._primary();

    while(true) {
      if(this._match(TokenType.LEFT_PAREN)) {
        expression = this._finishCall(expression);
      }
      else {
        break;
      }
    }

    return expression;
  }

  /**
   * Parses {@link Token}s into an collection of ASTs.
   * Will report errors using {@link LoxError}.
   *
   * @param  {Token[]} tokens Scanned tokens.
   * @return {Statement[]} Collection of ASTs representing parsed source.
   */
  parse(tokens) {
    this._tokens = tokens;
    this._current = 0;

    try {
      const statements = [];

      while(!this._isAtEnd()) {
        const statement = this._declaration();

        if(statement) {
          statements.push(statement);
        }
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
