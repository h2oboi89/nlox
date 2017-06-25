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
  print(statements) {
    const output = [];

    for(let statement of statements) {
      output.push(statement.accept(this));
    }

    return output.filter((o) => o !== undefined).join('\n');
  }

  _parenthesize(name, ...expressions) {
    expressions = expressions.map((e) => e.accept(this)).join(' ');

    return `( ${name}${expressions.length > 0 ? ` ${expressions}` : ''} )`;
  }

  visitExpressionStatement(statement) {
    return this._parenthesize('statement', statement.expression);
  }

  visitPrintStatement(printStatement) {
    return this._paranthesize('print', printStatement.expression);
  }

  visitAssignmentExpression(expression) {
    return this._parenthesize(`assign ${expression.name.lexeme}`, expression.value);
  }

  /**
   * Converts BinaryExpression to a string.
   * @param  {parsing.BinaryExpression} expression Expression to convert to string.
   * @return {string} String representing the expression.
   */
  visitBinaryExpression(expression) {
    return this._parenthesize(expression.operator.lexeme, expression.left, expression.right);
  }

  /**
   * Converts GroupingExpression to a string.
   * @param  {parsing.GroupingExpression} expression Expression to convert to string.
   * @return {string} String representing the expression.
   */
  visitGroupingExpression(expression) {
    return this._parenthesize('group', expression.expression);
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
    return this._parenthesize(expression.operator.lexeme, expression.right);
  }

  visitVariableExpression(expression) {
    return this._parenthesize(`var ${expression.name.lexeme}`);
  }
}

module.exports = AstPrinter;
