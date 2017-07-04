'use strict';

const LoxError = require('./LoxError');
const TokenType = require('./TokenType');
const RuntimeError = require('./RuntimeError');
const Environment = require('./Environment');

/**
 * Executes a collection of ASTs in order to run Lox code.
 */
class Interpreter {
  constructor() {
    this._environment = new Environment();
  }

  _evaluate(expression) {
    return expression.accept(this);
  }

  _execute(statement) {
    statement.accept(this);
  }

  _executeBlock(statements, environment) {
    const enclosingEnvironment = this._environment;

    try {
      this._environment = environment;

      for(let statement of statements) {
        this._execute(statement);
      }
    }
    finally {
      this._environment = enclosingEnvironment;
    }
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
        throw new RuntimeError(operator, message);
      }
    }
  }

  static _stringify(value) {
    if(value === null) {
      return 'nil';
    }

    return `${value}`;
  }

  visitBlockStatement(statement) {
    this._executeBlock(statement.statements, new Environment(this._environment));
  }

  visitExpressionStatement(statement) {
    const value = this._evaluate(statement.expression);
    if(this._repl) {
      console.log(Interpreter._stringify(value));
    }
  }

  visitPrintStatement(statement) {
    const value = this._evaluate(statement.expression);
    console.log(Interpreter._stringify(value));
  }

  visitVariableStatement(statement) {
    let value = null;

    if(statement.initializer) {
      value = this._evaluate(statement.initializer);
    }

    this._environment.define(statement.name, value);
  }

  visitAssignmentExpression(expression) {
    const value = this._evaluate(expression.value);

    this._environment.assign(expression.name, value);

    return value;
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
        throw new RuntimeError(expression.operator, 'Operands must numbers or strings.');
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

  visitVariableExpression(expression) {
    return this._environment.get(expression.name);
  }

  /**
   * Interprets collection of ASTs in order to execute user input.
   *
   * @param  {Statement[]} statements Collection of statements representing parsed user input.
   * @param  {boolean} repl = false If true then {@link ExpressionStatement}s will print their value; otherwise nothing.
   */
  interpret(statements, repl = false) {
    this._repl = repl;
    try {
      for(let statement of statements) {
        this._execute(statement);
      }
    }
    catch(error) {
      if(error instanceof RuntimeError) {
        LoxError.runtimeError(error);
      }
      else {
        throw error;
      }
    }
    finally {
      this._repl = false;
    }
  }
}

module.exports = Interpreter;
