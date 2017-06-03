'use strict';

describe('Scanner', () => {
  const mach = require('mach.js');
  const proxyquire = require('proxyquire');

  const Token = require('../src/Token');
  const TokenType = require('../src/TokenType');
  const LoxError = require('../src/LoxError');

  const mockLoxError = mach.mockObject(LoxError);

  const Scanner = proxyquire('../src/Scanner', {
    './LoxError': mockLoxError
  });

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

  describe('should handle strings', () => {
    it('single quote (\') string', () => {
      expect(scanner.scanTokens('\'Hello, World!\'')).toEqual([
        new Token(TokenType.STRING, '\'Hello, World!\'', 'Hello, World!', 1),
        new Token(TokenType.EOF, '', undefined, 1)
      ]);
    });

    it('double quote (\") string', () => {
      expect(scanner.scanTokens('\"Hello, World!\"')).toEqual([
        new Token(TokenType.STRING, '\"Hello, World!\"', 'Hello, World!', 1),
        new Token(TokenType.EOF, '', undefined, 1)
      ]);
    });

    it('double quote inside single quote string', () => {
      expect(scanner.scanTokens('\'Fire the \"laser\"\'')).toEqual([
        new Token(TokenType.STRING, '\'Fire the \"laser\"\'', 'Fire the \"laser\"', 1),
        new Token(TokenType.EOF, '', undefined, 1)
      ]);
    });

    it('single quote inside double quote string', () => {
      expect(scanner.scanTokens('\"Fire the \'laser\'\"')).toEqual([
        new Token(TokenType.STRING, '\"Fire the \'laser\'\"', 'Fire the \'laser\'', 1),
        new Token(TokenType.EOF, '', undefined, 1)
      ]);
    });

    it('multline string', () => {
      const source = `
        "multiline
        strings
        are
        really
        fun"
      `.trim();

      expect(scanner.scanTokens(source)).toEqual([
        new Token(TokenType.STRING, source, source.slice(1, source.length - 1), 5),
        new Token(TokenType.EOF, '', undefined, 5)
      ]);
    });

    it('should reject unterminated strings', () => {
      mockLoxError.error.shouldBeCalledWith(1, 'Unterminated string: \"you\'re hired!')
        .when(() => scanner.scanTokens('\"you\'re hired!'));
    });
  });

  // TODO: reject invalid input
});
