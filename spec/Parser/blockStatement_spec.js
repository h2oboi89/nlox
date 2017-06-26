'use strict';

describe('Parser - blockStatement', () => {
  const common = require('./common');

  const astPrinter = common.astPrinter;
  const mockLoxError = common.mockLoxError;
  const sameToken = common.sameToken;
  const scanner = common.scanner;
  const parser = common.parser;

  it('single statement block', () => {
    const tokens = scanner.scanTokens('{ 1 + 2; }');

    expect(astPrinter.print(parser.parse(tokens)))
      .toEqual('( block ( statement ( + 1 2 ) ) )');
  });

  it('multi statement block', () => {
    const tokens = scanner.scanTokens('{ 1 + 2; 3 + 4; }');

    expect(astPrinter.print(parser.parse(tokens)))
      .toEqual('( block ( statement ( + 1 2 ) ) ; ( statement ( + 3 4 ) ) )');
  });

  it('missing right brace', () => {
    const tokens = scanner.scanTokens('{ 1 + 2;');

    mockLoxError.parseError.shouldBeCalledWith(
        sameToken('EOF  undefined'),
        `Expect '}' at end of block.`
      )
      .when(() => parser.parse(tokens));
  });
});
