'use strict';

describe('Parser', () => {
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

  describe('should accept empty input', () => {
    it('', () => {
      expect(astPrinter.print(parser.parse([EOF_TOKEN]))).toEqual('');
    });
  });

  describe('complicated input', () => {
    it('(1 + 2) * (3 + 4)', () => {
      const tokens = [
        new Token(TokenType.LEFT_PAREN, '(', undefined, 1),
        new Token(TokenType.NUMBER, '1', 1, 1),
        new Token(TokenType.PLUS, '+', undefined, 1),
        new Token(TokenType.NUMBER, '2', 2, 1),
        new Token(TokenType.RIGHT_PAREN, ')', undefined, 1),
        new Token(TokenType.STAR, '*', undefined, 1),
        new Token(TokenType.LEFT_PAREN, '(', undefined, 1),
        new Token(TokenType.NUMBER, '3', 3, 1),
        new Token(TokenType.PLUS, '+', undefined, 1),
        new Token(TokenType.NUMBER, '4', 4, 1),
        new Token(TokenType.RIGHT_PAREN, ')', undefined, 1),
        SEMICOLON_TOKEN,
        EOF_TOKEN
      ];

      expect(astPrinter.print(parser.parse(tokens)))
        .toEqual('( statement ( * ( group ( + 1 2 ) ) ( group ( + 3 4 ) ) ) )');
    });
  });

  // TODO: multiline input
  // TODO: invalid input (Expect expression)
  // TODO: exception (rethrow in parse) <- how?
  // TODO: verify synchronize
});
