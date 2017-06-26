'use strict';

describe('Parser - expressionStatement', () => {
  const common = require('./common');

  const astPrinter = common.astPrinter;
  const mockLoxError = common.mockLoxError;
  const sameToken = common.sameToken;
  const scanner = common.scanner;
  const parser = common.parser;

  it('1 + 2;', () => {
    const tokens = scanner.scanTokens('1 + 2;');

    expect(astPrinter.print(parser.parse(tokens)))
      .toEqual('( statement ( + 1 2 ) )');
  });

  it('1 + 2 (missing semicolon)', () => {
    const tokens = scanner.scanTokens('1 + 2');

    mockLoxError.parseError.shouldBeCalledWith(
        sameToken('EOF  undefined'),
        `Expect ';' after expression.`
      )
      .when(() => parser.parse(tokens));
  });
});
