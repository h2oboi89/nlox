'use strict';

describe('Parser - printStatement', () => {
  const common = require('./common');
  const parseAndPrint = common.parseAndPrint;
  const parseAndError = common.parseAndError;

  it('print 3;', () => {
    parseAndPrint('print 3;', '( print 3 )');
  });

  it('print 3 (missing semicolon)', () => {
    parseAndError(
      'print 3',
      'EOF  undefined',
      `Expect ';' after value.`,
      ''
    );
  });
});
