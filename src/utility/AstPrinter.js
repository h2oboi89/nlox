'use strict';

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

module.exports = AstPrinter;
