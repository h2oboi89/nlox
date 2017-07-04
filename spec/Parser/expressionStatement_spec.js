'use strict';

describe('Parser - expressionStatement', () => {
  const common = require('./common');
  const parseAndPrint = common.parseAndPrint;
  const parseAndError = common.parseAndError;

  it('1 + 2;', () => {
    parseAndPrint('1 + 2;', '( statement ( + 1 2 ) )');
  });

  it('1 + 2 (missing semicolon)', () => {
    parseAndError(
      '1 + 2',
      'EOF  undefined',
      `Expect ';' after expression.`,
      ''
    );
  });
});
