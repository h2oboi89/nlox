'use strict';

describe('Parser - primary expression', () => {
  const mach = require('mach.js');
  const proxyquire = require('proxyquire');

  const AstPrinter = require('../../src/utility/AstPrinter');
  const Token = require('../../src/Token');
  const TokenType = require('../../src/TokenType');

  const mockLoxError = mach.mockObject({
    parseError: () => {}
  }, 'LoxError');

  const Parser = proxyquire('../../src/Parser', {
    './LoxError': mockLoxError
  });

  const astPrinter = new AstPrinter();
  const EOF_TOKEN = new Token(TokenType.EOF, '', undefined, 1);
  const SEMICOLON_TOKEN = new Token(TokenType.SEMICOLON, ';', undefined, 1);

  const parser = new Parser();

  describe('should handle primary expressions', () => {
    it('NUMBER', () => {
      const tokens = [
        new Token(TokenType.NUMBER, '9', 9, 1),
        SEMICOLON_TOKEN,
        EOF_TOKEN
      ];

      expect(astPrinter.print(parser.parse(tokens))).toEqual('( statement 9 )');
    });

    it('STRING', () => {
      const tokens = [
        new Token(TokenType.STRING, '\'kthnxbai\'', 'kthnxbai', 1),
        SEMICOLON_TOKEN,
        EOF_TOKEN
      ];

      expect(astPrinter.print(parser.parse(tokens))).toEqual('( statement kthnxbai )');
    });

    it('false', () => {
      const tokens = [
        new Token(TokenType.FALSE, 'false', undefined, 1),
        SEMICOLON_TOKEN,
        EOF_TOKEN
      ];

      expect(astPrinter.print(parser.parse(tokens))).toEqual('( statement false )');
    });

    it('true', () => {
      const tokens = [
        new Token(TokenType.TRUE, 'true', undefined, 1),
        SEMICOLON_TOKEN,
        EOF_TOKEN
      ];

      expect(astPrinter.print(parser.parse(tokens))).toEqual('( statement true )');
    });

    it('nil', () => {
      const tokens = [
        new Token(TokenType.NIL, 'nil', undefined, 1),
        SEMICOLON_TOKEN,
        EOF_TOKEN
      ];

      expect(astPrinter.print(parser.parse(tokens))).toEqual('( statement null )');
    });

    it('( EXPRESSION )', () => {
      const tokens = [
        new Token(TokenType.LEFT_PAREN, '(', undefined, 1),
        new Token(TokenType.TRUE, 'true', undefined, 1),
        new Token(TokenType.RIGHT_PAREN, ')', undefined, 1),
        SEMICOLON_TOKEN,
        EOF_TOKEN
      ];

      expect(astPrinter.print(parser.parse(tokens))).toEqual('( statement ( group true ) )');
    });
  });
});
