'use strict';

describe('Scanner', () => {
  const Scanner = require('../src/Scanner');
  const Token = require('../src/Token');
  const TokenType = require('../src/TokenType');

  describe('should scan single character lexemes', () => {
    it('left paren', () => {
      const scanner = new Scanner('(');

      expect(scanner.scanTokens()).toEqual([
        new Token(TokenType.LEFT_PAREN, '(', undefined, 1),
        new Token(TokenType.EOL, '', undefined, 1)
      ]);
    });

    it('right paren', () => {
      const scanner = new Scanner(')');

      expect(scanner.scanTokens()).toEqual([
        new Token(TokenType.RIGHT_PAREN, ')', undefined, 1),
        new Token(TokenType.EOL, '', undefined, 1)
      ]);
    });

    it('left brace', () => {
      const scanner = new Scanner('{');

      expect(scanner.scanTokens()).toEqual([
        new Token(TokenType.LEFT_BRACE, '{', undefined, 1),
        new Token(TokenType.EOL, '', undefined, 1)
      ]);
    });

    it('right brace', () => {
      const scanner = new Scanner('}');

      expect(scanner.scanTokens()).toEqual([
        new Token(TokenType.RIGHT_BRACE, '}', undefined, 1),
        new Token(TokenType.EOL, '', undefined, 1)
      ]);
    });

    it('comma', () => {
      const scanner = new Scanner(',');

      expect(scanner.scanTokens()).toEqual([
        new Token(TokenType.COMMA, ',', undefined, 1),
        new Token(TokenType.EOL, '', undefined, 1)
      ]);
    });

    it('dot', () => {
      const scanner = new Scanner('.');

      expect(scanner.scanTokens()).toEqual([
        new Token(TokenType.DOT, '.', undefined, 1),
        new Token(TokenType.EOL, '', undefined, 1)
      ]);
    });

    it('minus', () => {
      const scanner = new Scanner('-');

      expect(scanner.scanTokens()).toEqual([
        new Token(TokenType.MINUS, '-', undefined, 1),
        new Token(TokenType.EOL, '', undefined, 1)
      ]);
    });

    it('plus', () => {
      const scanner = new Scanner('+');

      expect(scanner.scanTokens()).toEqual([
        new Token(TokenType.PLUS, '+', undefined, 1),
        new Token(TokenType.EOL, '', undefined, 1)
      ]);
    });
  });
});
