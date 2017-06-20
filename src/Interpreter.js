'use strict';

const LoxError = require('./LoxError');
const TokenType = require('./TokenType');

class RunTimeError extends Error {
  constructor(token, message) {
    super(message);
    this._token = token;
  }

  get token() {
    return this._token;
  }
}

class Interpreter {

  _evaluate(expression) {
    return expression.accept(this);
  }

  static _isTruthy(expression) {
    if(expression === null) {
      return false;
    }
    if(typeof expression === 'boolean') {
      return expression;
    }
    return true;
  }

  static _isEqual(a, b) {
    if(a === null) {
      return b === null;
    }

    return a === b;
  }

  static _CheckNumberOperands(operator, ...args) {
    const message = `${args.length > 1 ? 'Operands' : 'Operand'} must be a number.`;

    for(let arg of args) {
      if(typeof arg !== 'number') {
        throw new RunTimeError(operator, message);
      }
    }
  }

  visitBinaryExpression(expression) {
    const left = this._evaluate(expression.left);
    const right = this._evaluate(expression.right);

    switch(expression.operator.type) {
      // Arithmetic
      case TokenType.MINUS:
        Interpreter._CheckNumberOperands(expression.operator, left, right);
        return left - right;
      case TokenType.PLUS:
        if(typeof left === 'string' || typeof right === 'string') {
          return left + right;
        }
        if(typeof left === 'number' && typeof right === 'number') {
          return left + right;
        }
        throw new RunTimeError(expression.operator, 'Operands must be two numbers or strings.');
      case TokenType.SLASH:
        Interpreter._CheckNumberOperands(expression.operator, left, right);
        return left / right;
      case TokenType.STAR:
        Interpreter._CheckNumberOperands(expression.operator, left, right);
        return left * right;
        // Comparison
      case TokenType.GREATER:
        Interpreter._CheckNumberOperands(expression.operator, left, right);
        return left > right;
      case TokenType.GREATER_EQUAL:
        Interpreter._CheckNumberOperands(expression.operator, left, right);
        return left >= right;
      case TokenType.LESS:
        Interpreter._CheckNumberOperands(expression.operator, left, right);
        return left < right;
      case TokenType.LESS_EQUAL:
        Interpreter._CheckNumberOperands(expression.operator, left, right);
        return left <= right;
        // Equality
      case TokenType.BANG_EQUAL:
        return !Interpreter._isEqual(left, right);
      case TokenType.EQUAL_EQUAL:
        return Interpreter._isEqual(left, right);
    }
  }

  visitGroupingExpression(expression) {
    return this._evaluate(expression.expression);
  }

  visitLiteralExpression(expression) {
    return expression.value;
  }

  visitUnaryExpression(expression) {
    const right = this._evaluate(expression.right);

    switch(expression.operator.type) {
      case TokenType.MINUS:
        Interpreter._CheckNumberOperands(expression.operator, right);
        return -1 * right;
      case TokenType.BANG:
        return !Interpreter._isTruthy(right);
    }
  }

  static _stringify(value) {
    if(value === null) {
      return 'nil';
    }

    return `${value}`;
  }

  interpret(expression) {
    try {
      const value = this._evaluate(expression);

      console.log(`${Interpreter._stringify(value)}`);
    }
    catch(error) {
      if(error instanceof RunTimeError) {
        LoxError.runtimeError(error);
      }
      else {
        throw error;
      }
    }
  }
}

module.exports = Interpreter;