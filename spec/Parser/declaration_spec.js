'use strict';

describe('Parser - declaration', () => {
  const common = require('./common');
  const parseAndPrint = common.parseAndPrint;
  const parseAndError = common.parseAndError;

  it('var foo;', () => {
    parseAndPrint('var foo;', '( declare foo )');
  });

  describe('synchronize', () => {
    it('previous === SEMICOLON', () => {
      parseAndError(
        'var; var bar;',
        'SEMICOLON ; undefined',
        'Expect variable name.',
        '( declare bar )'
      );
    });

    it('peek === VAR', () => {
      parseAndError(
        'var 3 var bar;',
        'NUMBER 3 3',
        'Expect variable name.',
        '( declare bar )'
      );
    });

    it('peek === PRINT', () => {
      parseAndError(
        'var 3 print bar;',
        'NUMBER 3 3',
        'Expect variable name.',
        '( print ( var bar ) )'
      );
    });

    it('peek === IF', () => {
      parseAndError(
        'var 3 if (true) 1;',
        'NUMBER 3 3',
        'Expect variable name.',
        '( if true then ( statement 1 ) )'
      );
    });

    it('multiple invalid characters', () => {
      parseAndError(
        'var 3 ! - ++ var bar;',
        'NUMBER 3 3',
        'Expect variable name.',
        '( declare bar )'
      );
    });
  });
});
