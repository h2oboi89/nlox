'use strict';

/**
 * Traverses AST and converts each node to a printable string.
 */
class AstPrinter {

  /**
   * Prints an AST
   * @param  {parsing.BinaryExpression|parsing.GroupingExpression|parsing.LiteralExpression|parsing.UnaryExpression} expression AST to print.
   * @return {string} String representing the AST.
   */
  print(expression) {
    return expression.accept(this);
  }

  _paranthesize(name, ...expressions) {
    return `( ${name} ${expressions.map((e) => e.accept(this)).join(' ')} )`;
  }


  /**
   * Converts BinaryExpression to a string.
   * @param  {parsing.BinaryExpression} expression Expression to convert to string.
   * @return {string} String representing the expression.
   */
  visitBinaryExpression(expression) {
    return this._paranthesize(expression.operator.lexeme, expression.left, expression.right);
  }

  /**
   * Converts GroupingExpression to a string.
   * @param  {parsing.GroupingExpression} expression Expression to convert to string.
   * @return {string} String representing the expression.
   */
  visitGroupingExpression(expression) {
    return this._paranthesize('group', expression.expression);
  }

  /**
   * Converts LiteralExpression to a string.
   * @param  {parsing.LiteralExpression} expression Expression to convert to string.
   * @return {string} String representing the expression.
   */
  visitLiteralExpression(expression) {
    return `${expression.value}`;
  }

  /**
   * Converts UnaryExpression to a string.
   * @param  {parsing.UnaryExpression} expression Expression to convert to string.
   * @return {string} String representing the expression.
   */
  visitUnaryExpression(expression) {
    return this._paranthesize(expression.operator.lexeme, expression.right);
  }
}

module.exports = AstPrinter;
