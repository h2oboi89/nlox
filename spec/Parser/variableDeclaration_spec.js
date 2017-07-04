'use strict';

describe('Parser - variableDeclaration', () => {
  const common = require('./common');
  const parseAndPrint = common.parseAndPrint;
  const parseAndError = common.parseAndError;

  it('var foo;', () => {
    parseAndPrint('var foo;', '( declare foo )');
  });

  it('var foo = 3;', () => {
    parseAndPrint('var foo = 3;', '( declare foo 3 )');
  });

  it('var (missing variable name)', () => {
    parseAndError(
      'var',
      'EOF  undefined',
      'Expect variable name.',
      ''
    );
  });

  it('var foo (missing semicolon)', () => {
    parseAndError(
      'var foo',
      'EOF  undefined',
      `Expect ';' after variable declaration.`,
      ''
    );
  });
});
