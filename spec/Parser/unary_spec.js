'use strict';

describe('Parser - primary expression', () => {
  const common = require('./common');

  const astPrinter = common.astPrinter;
  const scanner = common.scanner;
  const parser = common.parser;

  describe('should handle unary expressions', () => {
    it('!true', () => {
      const tokens = scanner.scanTokens('!true;');

      expect(astPrinter.print(parser.parse(tokens)))
        .toEqual('( statement ( ! true ) )');
    });

    it('-3', () => {
      const tokens = scanner.scanTokens('-3;');

      expect(astPrinter.print(parser.parse(tokens)))
        .toEqual('( statement ( - 3 ) )');
    });
  });
});
