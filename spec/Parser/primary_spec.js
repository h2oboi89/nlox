'use strict';

describe('Parser - primary expression', () => {
  const common = require('./common');

  const astPrinter = common.astPrinter;
  const scanner = common.scanner;
  const parser = common.parser;

  describe('should handle primary expressions', () => {
    it('NUMBER', () => {
      const tokens = scanner.scanTokens('9;');

      expect(astPrinter.print(parser.parse(tokens)))
        .toEqual('( statement 9 )');
    });

    it('STRING', () => {
      const tokens = scanner.scanTokens('\'kthnxbai\';');

      expect(astPrinter.print(parser.parse(tokens)))
        .toEqual('( statement kthnxbai )');
    });

    it('false', () => {
      const tokens = scanner.scanTokens('false;');

      expect(astPrinter.print(parser.parse(tokens)))
        .toEqual('( statement false )');
    });

    it('true', () => {
      const tokens = scanner.scanTokens('true;');

      expect(astPrinter.print(parser.parse(tokens)))
        .toEqual('( statement true )');
    });

    it('nil', () => {
      const tokens = scanner.scanTokens('nil;');

      expect(astPrinter.print(parser.parse(tokens)))
        .toEqual('( statement null )');
    });

    // TODO: variable expression

    it('( EXPRESSION )', () => {
      const tokens = scanner.scanTokens('( true );');

      expect(astPrinter.print(parser.parse(tokens)))
        .toEqual('( statement ( group true ) )');
    });
  });
});
