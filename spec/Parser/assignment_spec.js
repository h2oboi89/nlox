'use strict';

describe('Parser - assignment', () => {
  const mach = require('mach.js');
  const common = require('./common');

  const astPrinter = common.astPrinter;
  const mockLoxError = common.mockLoxError;
  const scanner = common.scanner;
  const parser = common.parser;

  it('foo = 3;', () => {
    const tokens = scanner.scanTokens('foo = 3;');

    expect(astPrinter.print(parser.parse(tokens))).toEqual('( statement ( assign foo 3 ) )');
  });

  it('3 = 4;', () => {
    const tokens = scanner.scanTokens('3 = 4;');

    mockLoxError.parseError.shouldBeCalledWith(
        mach.same(null, (a) => a.toString() === 'EQUAL = undefined'),
        'Invalid assignment target.'
      )
      .when(() => parser.parse(tokens));
  });

  it('foo;', () => {
    const tokens = scanner.scanTokens('foo;');

    expect(astPrinter.print(parser.parse(tokens))).toEqual('( statement ( var foo ) )');
  });
});
