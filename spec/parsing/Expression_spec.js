'use strict';

describe('Expression', () => {
  const BinaryExpression = require('../../src/parsing/BinaryExpression');
  const GroupingExpression = require('../../src/parsing/GroupingExpression');
  const LiteralExpression = require('../../src/parsing/LiteralExpression');
  const UnaryExpression = require('../../src/parsing/UnaryExpression');

  const Token = require('../../src/Token');
  const TokenType = require('../../src/TokenType');

  class AstPrinter {
    print(expression) {
      return expression.accept(this);
    }

    _paranthesize(name, ...expressions) {
      return `( ${name} ${expressions.map((e) => e.accept(this)).join(' ')} )`;
    }

    visitBinaryExpression(expression) {
      return this._paranthesize(expression.operator.lexeme, expression.left, expression.right);
    }

    visitGroupingExpression(expression) {
      return this._paranthesize('group', expression.expression);
    }

    visitLiteralExpression(expression) {
      return expression.value.toString();
    }

    visitUnaryExpression(expression) {
      return this._paranthesize(expression.operator.lexeme, expression.right);
    }
  }

  const astPrinter = new AstPrinter();

  it('BinaryExpression ( 1 + 2 )', () => {
    const expression = new BinaryExpression(
      new LiteralExpression(1),
      new Token(TokenType.PLUS, '+'),
      new LiteralExpression(2)
    );

    expect(astPrinter.print(expression)).toEqual('( + 1 2 )');
  });

  it('GroupingExpression ( group a )', () => {
    const expression = new GroupingExpression(
      new LiteralExpression('a')
    );

    expect(astPrinter.print(expression)).toEqual('( group a )');
  });

  it('LiteralExpression ( 1 )', () => {
    const expression = new LiteralExpression(1);

    expect(astPrinter.print(expression)).toEqual('1');
  });

  it('UnaryExpression ( ! true )', () => {
    const expression = new UnaryExpression(
      new Token(TokenType.BANG, '!'),
      new LiteralExpression(true)
    );

    expect(astPrinter.print(expression)).toEqual('( ! true )');
  });

  it('BinaryExpression ( 1 * (2 + 3) )', () => {
    const expression = new BinaryExpression(
      new LiteralExpression(1),
      new Token(TokenType.STAR, '*'),
      new BinaryExpression(
        new LiteralExpression(2),
        new Token(TokenType.PLUS, '+'),
        new LiteralExpression(3)
      )
    );

    expect(astPrinter.print(expression)).toEqual('( * 1 ( + 2 3 ) )');
  });
});
