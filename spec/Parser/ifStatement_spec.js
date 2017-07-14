'use strict';

describe('Parser - ifStatement', () => {
  const common = require('./common');
  const parseAndPrint = common.parseAndPrint;
  const parseAndError = common.parseAndError;

  it('if (true;) 1; else 2;', () => {
    parseAndPrint('if (true) 1; else 2;', '( if true then ( statement 1 ) else ( statement 2 ) )');
  });

  it('if (true;) 3;', () => {
    parseAndPrint('if (true) 3;', '( if true then ( statement 3 ) )');
  });

  it('if true (missing parens)', () => {
    parseAndError(
      'if true',
      'TRUE true undefined',
      `Expect '(' after 'if'.`,
      ''
    );
  });

  it('if (true (missing parens)', () => {
    parseAndError(
      'if (true',
      'EOF  undefined',
      `Expect ')' after if condition.`,
      ''
    );
  });
});
