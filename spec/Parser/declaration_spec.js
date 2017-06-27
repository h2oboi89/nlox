'use strict';

describe('Parser - declaration', () => {
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

  describe('synchronize', () => {
    it('previous === SEMICOLON', () => {
      const tokens = scanner.scanTokens('var; var bar;');

      mockLoxError.parseError.shouldBeCalledWith(
          sameToken('SEMICOLON ; undefined'),
          'Expect variable name.'
        )
        .when(() => {
          expect(astPrinter.print(parser.parse(tokens)))
            .toEqual('( declare bar )');
        });
    });

    it('peek === VAR', () => {
      const tokens = scanner.scanTokens('var 3 var bar;');

      mockLoxError.parseError.shouldBeCalledWith(
          sameToken('NUMBER 3 3'),
          'Expect variable name.'
        )
        .when(() => {
          expect(astPrinter.print(parser.parse(tokens)))
            .toEqual('( declare bar )');
        });
    });

    it('peek === PRINT', () => {
      const tokens = scanner.scanTokens('var 3 print bar;');

      mockLoxError.parseError.shouldBeCalledWith(
          sameToken('NUMBER 3 3'),
          'Expect variable name.'
        )
        .when(() => {
          expect(astPrinter.print(parser.parse(tokens)))
            .toEqual('( print ( var bar ) )');
        });
    });

    it('multiple invalid characters', () => {
      const tokens = scanner.scanTokens('var 3 ! - ++ var bar;');

      mockLoxError.parseError.shouldBeCalledWith(
          sameToken('NUMBER 3 3'),
          'Expect variable name.'
        )
        .when(() => {
          expect(astPrinter.print(parser.parse(tokens)))
            .toEqual('( declare bar )');
        });
    });
  });
});
