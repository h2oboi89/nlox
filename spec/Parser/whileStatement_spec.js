'use strict';

describe('Parser - whileStatement', () => {
  const common = require('./common');
  const parseAndPrint = common.parseAndPrint;
  const parseAndError = common.parseAndError;

  it('while (true) print 1;', () => {
    parseAndPrint('while (true) print 1;', '( while true ( print 1 ) )');
  });

  it('while true (missing parens)', () => {
    parseAndError(
      'while true',
      'TRUE true undefined',
      `Expect '(' after 'while'.`,
      ''
    );
  });

  it('while (true (missing parens)', () => {
    parseAndError(
      'while (true',
      'EOF  undefined',
      `Expect ')' after while condition.`,
      ''
    );
  });
});
