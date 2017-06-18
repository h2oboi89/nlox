'use strict';

const TokenType = require('./TokenType');

class Interpreter {

  _evaluate(expression) {
    return expression.accept(this);
  }

  _isTruthy(expression) {
    if(expression === undefined) {
      return false;
    }
    if(typeof expression === 'boolean') {
      return expression;
    }
    return true;
  }

  _isEqual(a, b) {
    if(a === undefined) {
      return b === undefined;
    }

    return a === b;
  }

  visitBinaryExpression(expression) {
    const left = this._evaluate(expression.left);
    const right = this._evaluate(expression.right);

    switch(expression.operator.type) {
      // Arithmetic
      case TokenType.MINUS:
        return left - right;
      case TokenType.PLUS:
        return left + right;
      case TokenType.SLASH:
        return left / right;
      case TokenType.STAR:
        return left * right;
        // Comparison
      case TokenType.GREATER:
        return left > right;
      case TokenType.GREATER_EQUAL:
        return left >= right;
      case TokenType.LESS:
        return left < right;
      case TokenType.LESS_EQUAL:
        return left <= right;
        // Equality
      case TokenType.BANG_EQUAL:
        return !this._isEqual(left, right);
      case TokenType.EQUAL_EQUAL:
        return this._isEqual(left, right);
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
        return -1 * right;
      case TokenType.BANG:
        return !this._isTruthy(right);
    }
  }
}

module.exports = Interpreter;
