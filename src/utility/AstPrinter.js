'use strict';

/**
 * Traverses a collection of ASTs and converts each node to a printable string.
 * Used mainly for testing purposes.
 */
class AstPrinter {

  /**
   * Converts a collection of ASTs into strings and prints them to the console.
   * @param  {Statement[]} statements Collection of ASTs to print.
   * @return {string} String representing the collection of ASTs.
   */
  print(statements) {
    const output = [];

    for(let statement of statements) {
      output.push(statement.accept(this));
    }

    return output.filter((o) => o !== undefined).join('\n');
  }

  _parenthesize(name, ...expressions) {
    expressions = expressions.filter((e) => e !== undefined)
      .map((e) => e.accept(this)).join(' ');

    return `( ${name}${expressions.length > 0 ? ` ${expressions}` : ''} )`;
  }

  // Statements
  visitBlockStatement(statement) {
    const statements = statement.statements.map((s) => s.accept(this)).join(' ; ');

    return `( block${statements.length > 0 ? ` ${statements}` : ''} )`;
  }

  visitExpressionStatement(statement) {
    return this._parenthesize('statement', statement.expression);
  }

  visitIfStatement(statement) {
    const elseBranch = statement.elseBranch ? ` else ${statement.elseBranch.accept(this)}` : '';

    return `( if ${statement.condition.accept(this)} then ${statement.thenBranch.accept(this)}${elseBranch} )`;
  }

  visitPrintStatement(statement) {
    return this._parenthesize('print', statement.expression);
  }

  visitVariableStatement(statement) {
    return this._parenthesize(`declare ${statement.name.lexeme}`, statement.initializer);
  }

  // Expressions
  visitAssignmentExpression(expression) {
    return this._parenthesize(`assign ${expression.name.lexeme}`, expression.value);
  }

  visitBinaryExpression(expression) {
    return this._parenthesize(expression.operator.lexeme, expression.left, expression.right);
  }

  visitGroupingExpression(expression) {
    return this._parenthesize('group', expression.expression);
  }

  visitLiteralExpression(expression) {
    return `${expression.value}`;
  }

  visitUnaryExpression(expression) {
    return this._parenthesize(expression.operator.lexeme, expression.right);
  }

  visitVariableExpression(expression) {
    return this._parenthesize(`var ${expression.name.lexeme}`);
  }
}

module.exports = AstPrinter;
