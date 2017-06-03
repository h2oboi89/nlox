'use strict';

describe('Scanner', () => {
  const Scanner = require('../src/Scanner');
  const Token = require('../src/Token');
  const TokenType = require('../src/TokenType');

  const scanner = new Scanner();

  describe('should handle empty input', () => {
    it('', () => {
      expect(scanner.scanTokens('')).toEqual([
        new Token(TokenType.EOF, '', undefined, 1)
      ]);
    });
  });

  describe('should scan single character lexemes', () => {
    it('(', () => {
      expect(scanner.scanTokens('(')).toEqual([
        new Token(TokenType.LEFT_PAREN, '(', undefined, 1),
        new Token(TokenType.EOF, '', undefined, 1)
      ]);
    });

    it(')', () => {
      expect(scanner.scanTokens(')')).toEqual([
        new Token(TokenType.RIGHT_PAREN, ')', undefined, 1),
        new Token(TokenType.EOF, '', undefined, 1)
      ]);
    });

    it('{', () => {
      expect(scanner.scanTokens('{')).toEqual([
        new Token(TokenType.LEFT_BRACE, '{', undefined, 1),
        new Token(TokenType.EOF, '', undefined, 1)
      ]);
    });

    it('}', () => {
      expect(scanner.scanTokens('}')).toEqual([
        new Token(TokenType.RIGHT_BRACE, '}', undefined, 1),
        new Token(TokenType.EOF, '', undefined, 1)
      ]);
    });

    it(',', () => {
      expect(scanner.scanTokens(',')).toEqual([
        new Token(TokenType.COMMA, ',', undefined, 1),
        new Token(TokenType.EOF, '', undefined, 1)
      ]);
    });

    it('.', () => {
      expect(scanner.scanTokens('.')).toEqual([
        new Token(TokenType.DOT, '.', undefined, 1),
        new Token(TokenType.EOF, '', undefined, 1)
      ]);
    });

    it('-', () => {
      expect(scanner.scanTokens('-')).toEqual([
        new Token(TokenType.MINUS, '-', undefined, 1),
        new Token(TokenType.EOF, '', undefined, 1)
      ]);
    });

    it('+', () => {
      expect(scanner.scanTokens('+')).toEqual([
        new Token(TokenType.PLUS, '+', undefined, 1),
        new Token(TokenType.EOF, '', undefined, 1)
      ]);
    });

    it(';', () => {
      expect(scanner.scanTokens(';')).toEqual([
        new Token(TokenType.SEMICOLON, ';', undefined, 1),
        new Token(TokenType.EOF, '', undefined, 1)
      ]);
    });

    it('*', () => {
      expect(scanner.scanTokens('*')).toEqual([
        new Token(TokenType.STAR, '*', undefined, 1),
        new Token(TokenType.EOF, '', undefined, 1)
      ]);
    });

    it('!', () => {
      expect(scanner.scanTokens('!')).toEqual([
        new Token(TokenType.BANG, '!', undefined, 1),
        new Token(TokenType.EOF, '', undefined, 1)
      ]);
    });

    it('=', () => {
      expect(scanner.scanTokens('=')).toEqual([
        new Token(TokenType.EQUAL, '=', undefined, 1),
        new Token(TokenType.EOF, '', undefined, 1)
      ]);
    });

    it('<', () => {
      expect(scanner.scanTokens('<')).toEqual([
        new Token(TokenType.LESS, '<', undefined, 1),
        new Token(TokenType.EOF, '', undefined, 1)
      ]);
    });

    it('>', () => {
      expect(scanner.scanTokens('>')).toEqual([
        new Token(TokenType.GREATER, '>', undefined, 1),
        new Token(TokenType.EOF, '', undefined, 1)
      ]);
    });

    it('/', () => {
      expect(scanner.scanTokens('/')).toEqual([
        new Token(TokenType.SLASH, '/', undefined, 1),
        new Token(TokenType.EOF, '', undefined, 1)
      ]);
    });
  });

  describe('should scan two character lexemes', () => {
    it('!=', () => {
      expect(scanner.scanTokens('!=')).toEqual([
        new Token(TokenType.BANG_EQUAL, '!=', undefined, 1),
        new Token(TokenType.EOF, '', undefined, 1)
      ]);
    });

    it('==', () => {
      expect(scanner.scanTokens('==')).toEqual([
        new Token(TokenType.EQUAL_EQUAL, '==', undefined, 1),
        new Token(TokenType.EOF, '', undefined, 1)
      ]);
    });

    it('<=', () => {
      expect(scanner.scanTokens('<=')).toEqual([
        new Token(TokenType.LESS_EQUAL, '<=', undefined, 1),
        new Token(TokenType.EOF, '', undefined, 1)
      ]);
    });

    it('>=', () => {
      expect(scanner.scanTokens('>=')).toEqual([
        new Token(TokenType.GREATER_EQUAL, '>=', undefined, 1),
        new Token(TokenType.EOF, '', undefined, 1)
      ]);
    });

    describe('but not incorrectly group two individual lexemes', () => {
      it('=!', () => {
        expect(scanner.scanTokens('=!')).toEqual([
          new Token(TokenType.EQUAL, '=', undefined, 1),
          new Token(TokenType.BANG, '!', undefined, 1),
          new Token(TokenType.EOF, '', undefined, 1)
        ]);
      });

      it('=<', () => {
        expect(scanner.scanTokens('=<')).toEqual([
          new Token(TokenType.EQUAL, '=', undefined, 1),
          new Token(TokenType.LESS, '<', undefined, 1),
          new Token(TokenType.EOF, '', undefined, 1)
        ]);
      });

      it('=>', () => {
        expect(scanner.scanTokens('=>')).toEqual([
          new Token(TokenType.EQUAL, '=', undefined, 1),
          new Token(TokenType.GREATER, '>', undefined, 1),
          new Token(TokenType.EOF, '', undefined, 1)
        ]);
      });

      it('! =', () => {
        expect(scanner.scanTokens('! =')).toEqual([
          new Token(TokenType.BANG, '!', undefined, 1),
          new Token(TokenType.EQUAL, '=', undefined, 1),
          new Token(TokenType.EOF, '', undefined, 1)
        ]);
      });

      it('= =', () => {
        expect(scanner.scanTokens('= =')).toEqual([
          new Token(TokenType.EQUAL, '=', undefined, 1),
          new Token(TokenType.EQUAL, '=', undefined, 1),
          new Token(TokenType.EOF, '', undefined, 1)
        ]);
      });

      it('< =', () => {
        expect(scanner.scanTokens('< =')).toEqual([
          new Token(TokenType.LESS, '<', undefined, 1),
          new Token(TokenType.EQUAL, '=', undefined, 1),
          new Token(TokenType.EOF, '', undefined, 1)
        ]);
      });

      it('> =', () => {
        expect(scanner.scanTokens('> =')).toEqual([
          new Token(TokenType.GREATER, '>', undefined, 1),
          new Token(TokenType.EQUAL, '=', undefined, 1),
          new Token(TokenType.EOF, '', undefined, 1)
        ]);
      });
    });
  });

  describe('should ignore comments', () => {
    it('// .*', () => {
      expect(scanner.scanTokens('// this is a comment and is ignored')).toEqual([
        new Token(TokenType.EOF, '', undefined, 1)
      ]);
    });

    it('// .*\\n', () => {
      expect(scanner.scanTokens('// this is a comment and is ignored\n')).toEqual([
        new Token(TokenType.EOF, '', undefined, 2)
      ]);
    });
  });

  describe('should strip out whitespace', () => {
    it(`' '`, () => {
      expect(scanner.scanTokens(' ')).toEqual([
        new Token(TokenType.EOF, '', undefined, 1)
      ]);
    });

    it(`\\r`, () => {
      expect(scanner.scanTokens('\r')).toEqual([
        new Token(TokenType.EOF, '', undefined, 1)
      ]);
    });

    it(`\\t`, () => {
      expect(scanner.scanTokens('\t')).toEqual([
        new Token(TokenType.EOF, '', undefined, 1)
      ]);
    });

    it(`\\n`, () => {
      expect(scanner.scanTokens('\n')).toEqual([
        new Token(TokenType.EOF, '', undefined, 2)
      ]);
    });
  });

  describe('should handle complicated input', () => {
    it('Section 4.6', () => {
      const source = [
        '// this is a comment',
        '(( )){} // grouping stuff',
        '!*+-/=<> <= == // operators'
      ];

      expect(scanner.scanTokens(source.join('\n'))).toEqual([
        new Token(TokenType.LEFT_PAREN, '(', undefined, 2),
        new Token(TokenType.LEFT_PAREN, '(', undefined, 2),
        new Token(TokenType.RIGHT_PAREN, ')', undefined, 2),
        new Token(TokenType.RIGHT_PAREN, ')', undefined, 2),
        new Token(TokenType.LEFT_BRACE, '{', undefined, 2),
        new Token(TokenType.RIGHT_BRACE, '}', undefined, 2),
        new Token(TokenType.BANG, '!', undefined, 3),
        new Token(TokenType.STAR, '*', undefined, 3),
        new Token(TokenType.PLUS, '+', undefined, 3),
        new Token(TokenType.MINUS, '-', undefined, 3),
        new Token(TokenType.SLASH, '/', undefined, 3),
        new Token(TokenType.EQUAL, '=', undefined, 3),
        new Token(TokenType.LESS, '<', undefined, 3),
        new Token(TokenType.GREATER, '>', undefined, 3),
        new Token(TokenType.LESS_EQUAL, '<=', undefined, 3),
        new Token(TokenType.EQUAL_EQUAL, '==', undefined, 3),
        new Token(TokenType.EOF, '', undefined, 3)
      ]);
    });
  });

  // TODO: reject invalid input
});
