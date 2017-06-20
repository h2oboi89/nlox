'use strict';

describe('Interpreter', () => {
  const mach = require('mach.js');
  const proxyquire = require('proxyquire');

  const Token = require('../src/Token');
  const TokenType = require('../src/TokenType');
  const LiteralExpression = require('../src/parsing/LiteralExpression');
  const UnaryExpression = require('../src/parsing/UnaryExpression');
  const BinaryExpression = require('../src/parsing/BinaryExpression');

  const mockLoxError = mach.mockObject({
    runtimeError: () => {}
  }, 'LoxError');

  const Interpreter = proxyquire('../src/Interpreter', {
    './LoxError': mockLoxError
  });

  const interpreter = new Interpreter();

  const minusToken = new Token(TokenType.MINUS, '-', undefined, 1);
  const plusToken = new Token(TokenType.PLUS, '+', undefined, 1);
  const slashToken = new Token(TokenType.SLASH, '/', undefined, 1);
  const starToken = new Token(TokenType.STAR, '*', undefined, 1);

  const negateToken = minusToken;
  const bangToken = new Token(TokenType.BANG, '!', undefined, 1);

  function shouldInterpretAstToValue(ast, expected) {
    global.console.log.shouldBeCalledWith(expected)
      .when(() => {
        interpreter.interpret(ast);
      });
  }

  function shouldInterpretToError(ast, expected) {
    const error = new Error(expected);

    mockLoxError.runtimeError.shouldBeCalledWith(mach.same(error, (a, b) => a.message === b.message))
      .when(() => {
        interpreter.interpret(ast);
      });
  }

  function generateBinaryExpression(left, operator, right) {
    return new BinaryExpression(
      new LiteralExpression(left),
      operator,
      new LiteralExpression(right)
    );
  }

  let _consoleLog;

  beforeAll(() => {
    _consoleLog = global.console.log;
    global.console.log = mach.mockFunction('console.log');
  });

  afterAll(() => {
    global.console.log = _consoleLog;
  });

  describe('literal expressions', () => {
    it('should interpret null to nil', () => {
      shouldInterpretAstToValue(new LiteralExpression(null), 'nil');
    });

    it('should interpret integers to their value', () => {
      for(let i = -20; i < 21; i++) {
        shouldInterpretAstToValue(new LiteralExpression(i), `${i}`);
      }
    });

    it('should interpret floats to their value', () => {
      shouldInterpretAstToValue(new LiteralExpression(0.1), '0.1');
      shouldInterpretAstToValue(new LiteralExpression(3.14), '3.14');
      shouldInterpretAstToValue(new LiteralExpression(-5.5), '-5.5');
    });

    it('should interpret booleans', () => {
      shouldInterpretAstToValue(new LiteralExpression(true), 'true');
      shouldInterpretAstToValue(new LiteralExpression(false), 'false');
    });

    it('should interpret strings to their value', () => {
      shouldInterpretAstToValue(new LiteralExpression('foo'), 'foo');
      shouldInterpretAstToValue(new LiteralExpression('bar'), 'bar');
      shouldInterpretAstToValue(new LiteralExpression('baz'), 'baz');
    });
  });

  describe('unary expressions', () => {
    it('should negate a number', () => {
      shouldInterpretAstToValue(
        new UnaryExpression(negateToken, new LiteralExpression(1)),
        '-1'
      );
    });

    it('should print an exception if told to negate a non-number', () => {
      shouldInterpretToError(
        new UnaryExpression(negateToken, new LiteralExpression('a')),
        'Operand must be a number.'
      );
    });

    it('should flip a boolean', () => {
      shouldInterpretAstToValue(
        new UnaryExpression(bangToken, new LiteralExpression(false)),
        'true'
      );

      shouldInterpretAstToValue(
        new UnaryExpression(bangToken, new LiteralExpression(true)),
        'false'
      );
    });

    it('should interpret the truthiness of things', () => {
      shouldInterpretAstToValue(
        new UnaryExpression(bangToken, new LiteralExpression(null)),
        'true'
      );

      shouldInterpretAstToValue(
        new UnaryExpression(bangToken, new LiteralExpression(0)),
        'false'
      );

      shouldInterpretAstToValue(
        new UnaryExpression(bangToken, new LiteralExpression(1)),
        'false'
      );
    });
  });

  describe('binary expressions', () => {
    describe('arithmetic', () => {
      describe('minus', () => {
        it('should interpret subtraction', () => {
          shouldInterpretAstToValue(
            generateBinaryExpression(3, minusToken, 2),
            '1'
          );
          shouldInterpretAstToValue(
            generateBinaryExpression(5, minusToken, 3),
            '2'
          );
        });

        it('should print an exception if told to subtract a non-number', () => {
          shouldInterpretToError(
            generateBinaryExpression(1, minusToken, '1'),
            'Operands must be a number.'
          );
        });
      });

      describe('plus', () => {
        it('should interpret addition', () => {
          shouldInterpretAstToValue(
            generateBinaryExpression(3, plusToken, 2),
            '5'
          );
          shouldInterpretAstToValue(
            generateBinaryExpression(5, plusToken, 3),
            '8'
          );
        });

        it('should interpret string addition as string concatenation', () => {
          shouldInterpretAstToValue(
            generateBinaryExpression('3', plusToken, 2),
            '32'
          );
          shouldInterpretAstToValue(
            generateBinaryExpression(3, plusToken, '2'),
            '32'
          );
          shouldInterpretAstToValue(
            generateBinaryExpression('2', plusToken, true),
            '2true'
          );
        });

        it('should find other additions exceptional', () => {
          shouldInterpretToError(
            generateBinaryExpression(2, plusToken, true),
            'Operands must be two numbers or strings.'
          );
        });
      });

      describe('slash', () => {
        it('should interpret division', () => {
          shouldInterpretAstToValue(
            generateBinaryExpression(3, slashToken, 2),
            '1.5'
          );
          shouldInterpretAstToValue(
            generateBinaryExpression(9, slashToken, 3),
            '3'
          );
        });

        it('should print an exception if told to divide a non-number', () => {
          shouldInterpretToError(
            generateBinaryExpression(1, slashToken, '1'),
            'Operands must be a number.'
          );
        });
      });

      describe('star', () => {
        it('should interpret multiplication', () => {
          shouldInterpretAstToValue(
            generateBinaryExpression(3, starToken, 2),
            '6'
          );
          shouldInterpretAstToValue(
            generateBinaryExpression(9, starToken, 3),
            '27'
          );
        });

        it('should print an exception if told to multiply a non-number', () => {
          shouldInterpretToError(
            generateBinaryExpression(1, starToken, '1'),
            'Operands must be a number.'
          );
        });
      });
    });
  });
});
