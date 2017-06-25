'use strict';

describe('Parser - comparison', () => {
  const common = require('./common');

  const astPrinter = common.astPrinter;
  const scanner = common.scanner;
  const parser = common.parser;

  it('6 > 9;', () => {
    const tokens = scanner.scanTokens('6 > 9;');

    expect(astPrinter.print(parser.parse(tokens))).toEqual('( statement ( > 6 9 ) )');
  });

  it('6 >= 9;', () => {
    const tokens = scanner.scanTokens('6 >= 9;');

    expect(astPrinter.print(parser.parse(tokens))).toEqual('( statement ( >= 6 9 ) )');
  });

  it('6 < 9;', () => {
    const tokens = scanner.scanTokens('6 < 9;');

    expect(astPrinter.print(parser.parse(tokens))).toEqual('( statement ( < 6 9 ) )');
  });

  it('6 <= 9;', () => {
    const tokens = scanner.scanTokens('6 <= 9;');

    expect(astPrinter.print(parser.parse(tokens))).toEqual('( statement ( <= 6 9 ) )');
  });
});
