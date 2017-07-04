'use strict';

describe('Parser - blockStatement', () => {
  const common = require('./common');
  const parseAndPrint = common.parseAndPrint;
  const parseAndError = common.parseAndError;

  it('empty block', () => {
    parseAndPrint('{ }', '( block )');
  });

  it('single statement block', () => {
    parseAndPrint('{ 1 + 2; }', '( block ( statement ( + 1 2 ) ) )');
  });

  it('multi statement block', () => {
    parseAndPrint(
      '{ 1 + 2; 3 + 4; }',
      '( block ( statement ( + 1 2 ) ) ; ( statement ( + 3 4 ) ) )'
    );
  });

  it('missing right brace', () => {
    parseAndError(
      '{ 1 + 2;',
      'EOF  undefined',
      `Expect '}' at end of block.`,
      ''
    );
  });
});
