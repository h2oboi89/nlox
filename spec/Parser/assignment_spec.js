'use strict';

describe('Parser - assignment', () => {
  const common = require('./common');
  const parseAndPrint = common.parseAndPrint;
  const parseAndError = common.parseAndError;

  it('foo;', () => {
    parseAndPrint('foo;', '( statement ( var foo ) )');
  });

  it('foo = 3;', () => {
    parseAndPrint('foo = 3;', '( statement ( assign foo 3 ) )');
  });

  it('3 = 4;', () => {
    parseAndError(
      '3 = 4;',
      'EQUAL = undefined',
      'Invalid assignment target.',
      '( statement 3 )'
    );
  });
});
