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

    it('peek === FOR', () => {
      parseAndError(
        'var 3 for(var i = 0; i < 10; i = i + 1) { print i; }',
        'NUMBER 3 3',
        'Expect variable name.',
        '( block ( declare i 0 ) ; ( while ( < ( var i ) 10 ) ( block ( block ( print ( var i ) ) ) ; ( statement ( assign i ( + ( var i ) 1 ) ) ) ) ) )'
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

    it('peek === WHILE', () => {
      parseAndError(
        'var 3 while (true) 1;',
        'NUMBER 3 3',
        'Expect variable name.',
        '( while true ( statement 1 ) )'
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
