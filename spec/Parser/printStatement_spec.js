'use strict';

describe('Parser - printStatement', () => {
  const common = require('./common');

  const astPrinter = common.astPrinter;
  const mockLoxError = common.mockLoxError;
  const sameToken = common.sameToken;
  const scanner = common.scanner;
  const parser = common.parser;

  it('print 3;', () => {
    const tokens = scanner.scanTokens('print 3;');

    expect(astPrinter.print(parser.parse(tokens)))
      .toEqual('( print 3 )');
  });

  it('print 3 (missing semicolon)', () => {
    const tokens = scanner.scanTokens('print 3');

    mockLoxError.parseError.shouldBeCalledWith(
        sameToken('EOF  undefined'),
        `Expect ';' after value.`
      )
      .when(() => parser.parse(tokens));
  });
});
