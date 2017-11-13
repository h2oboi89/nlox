'use strict';

describe('Parser - assignment', () => {
  const common = require('./common');
  const parseAndPrint = common.parseAndPrint;
  const parseAndError = common.parseAndError;

  it('foo;', () => {
    parseAndPrint('foo;', '( statement ( var foo ) )');
  });

  it('foo();', () => {
    parseAndPrint('foo();', '( statement ( func::foo ) )');
  });

  it('foo(0);', () => {
    parseAndPrint('foo(0);', '( statement ( func::foo 0 ) )');
  });

  it('foo(0, 1);', () => {
    parseAndPrint('foo(0, 1);', '( statement ( func::foo 0 1 ) )');
  });

  it('foo(0, 1, 2, 3, 4, 5, 6, 7, 8);', () => {
    parseAndError(
      'foo(0, 1, 2, 3, 4, 5, 6, 7, 8);',
      'NUMBER 8 8',
      'Cannot have more than 8 arguments.',
      '( statement ( func::foo 0 1 2 3 4 5 6 7 8 ) )'
    );
  });
});
