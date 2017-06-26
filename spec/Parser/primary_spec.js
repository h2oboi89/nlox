'use strict';

describe('Parser - primary', () => {
  const common = require('./common');

  const astPrinter = common.astPrinter;
  const mockLoxError = common.mockLoxError;
  const sameToken = common.sameToken;
  const scanner = common.scanner;
  const parser = common.parser;

  it('NUMBER;', () => {
    const tokens = scanner.scanTokens('9;');

    expect(astPrinter.print(parser.parse(tokens)))
      .toEqual('( statement 9 )');
  });

  it('STRING;', () => {
    const tokens = scanner.scanTokens('\'kthnxbai\';');

    expect(astPrinter.print(parser.parse(tokens)))
      .toEqual('( statement kthnxbai )');
  });

  it('false;', () => {
    const tokens = scanner.scanTokens('false;');

    expect(astPrinter.print(parser.parse(tokens)))
      .toEqual('( statement false )');
  });

  it('true;', () => {
    const tokens = scanner.scanTokens('true;');

    expect(astPrinter.print(parser.parse(tokens)))
      .toEqual('( statement true )');
  });

  it('nil;', () => {
    const tokens = scanner.scanTokens('nil;');

    expect(astPrinter.print(parser.parse(tokens)))
      .toEqual('( statement null )');
  });

  it('IDENTIFIER;', () => {
    const tokens = scanner.scanTokens('foo;');

    expect(astPrinter.print(parser.parse(tokens)))
      .toEqual('( statement ( var foo ) )');
  });

  it('( EXPRESSION );', () => {
    const tokens = scanner.scanTokens('( true );');

    expect(astPrinter.print(parser.parse(tokens)))
      .toEqual('( statement ( group true ) )');
  });

  it('missing right paren', () => {
    const tokens = scanner.scanTokens('( oops');

    mockLoxError.parseError.shouldBeCalledWith(
        sameToken('EOF  undefined'),
        `Expect ')' after expression.`
      )
      .when(() => parser.parse(tokens));
  });

  it('invalid input', () => {
    const tokens = scanner.scanTokens(';');

    mockLoxError.parseError.shouldBeCalledWith(
        sameToken('SEMICOLON ; undefined'),
        `Expect expression.`
      )
      .when(() => parser.parse(tokens));
  });
});
