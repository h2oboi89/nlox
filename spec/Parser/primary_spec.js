'use strict';

describe('Parser - primary', () => {
  const common = require('./common');
  const parseAndPrint = common.parseAndPrint;
  const parseAndError = common.parseAndError;

  it('NUMBER;', () => {
    parseAndPrint('9;', '( statement 9 )');
  });

  it('STRING;', () => {
    parseAndPrint('\'kthnxbai\';', '( statement kthnxbai )');
  });

  it('false;', () => {
    parseAndPrint('false;', '( statement false )');
  });

  it('true;', () => {
    parseAndPrint('true;', '( statement true )');
  });

  it('nil;', () => {
    parseAndPrint('nil;', '( statement null )');
  });

  it('IDENTIFIER;', () => {
    parseAndPrint('foo;', '( statement ( var foo ) )');
  });

  it('( EXPRESSION );', () => {
    parseAndPrint('( true );', '( statement ( group true ) )');
  });

  it('missing right paren', () => {
    parseAndError(
      '( oops',
      'EOF  undefined',
      `Expect ')' after expression.`,
      ''
    );
  });

  it('invalid input', () => {
    parseAndError(
      ';',
      'SEMICOLON ; undefined',
      `Expect expression.`,
      ''
    );
  });
});
