'use strict';

describe('Parser - variableDeclaration', () => {
  const common = require('./common');

  const astPrinter = common.astPrinter;
  const mockLoxError = common.mockLoxError;
  const sameToken = common.sameToken;
  const scanner = common.scanner;
  const parser = common.parser;

  it('var foo;', () => {
    const tokens = scanner.scanTokens('var foo;');

    expect(astPrinter.print(parser.parse(tokens)))
      .toEqual('( declare foo )');
  });

  it('var foo = 3;', () => {
    const tokens = scanner.scanTokens('var foo = 3;');

    expect(astPrinter.print(parser.parse(tokens)))
      .toEqual('( declare foo 3 )');
  });

  it('var (missing variable name)', () => {
    const tokens = scanner.scanTokens('var');

    mockLoxError.parseError.shouldBeCalledWith(
        sameToken('EOF  undefined'),
        'Expect variable name.'
      )
      .when(() => parser.parse(tokens));
  });

  it('var foo (missing semicolon)', () => {
    const tokens = scanner.scanTokens('var foo');

    mockLoxError.parseError.shouldBeCalledWith(
        sameToken('EOF  undefined'),
        `Expect ';' after variable declaration.`
      )
      .when(() => parser.parse(tokens));
  });
});
