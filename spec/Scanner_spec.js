'use strict';

describe('Scanner', () => {
  const mach = require('mach.js');
  const proxyquire = require('proxyquire');

  const Token = require('../src/Token');
  const TokenType = require('../src/TokenType');

  const mockLoxError = mach.mockObject({
    scanError: () => {}
  });

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

  describe('should scan complicated input', () => {
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

  describe('should scan strings', () => {
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
      mockLoxError.scanError.shouldBeCalledWith(1, 'Unterminated string: \"you\'re hired!')
        .when(() => scanner.scanTokens('\"you\'re hired!'));
    });
  });

  describe('should scan numbers', () => {
    it('integers', () => {
      expect(scanner.scanTokens('0 1 2 3 4 5 6 7 8 9')).toEqual([
        new Token(TokenType.NUMBER, '0', 0, 1),
        new Token(TokenType.NUMBER, '1', 1, 1),
        new Token(TokenType.NUMBER, '2', 2, 1),
        new Token(TokenType.NUMBER, '3', 3, 1),
        new Token(TokenType.NUMBER, '4', 4, 1),
        new Token(TokenType.NUMBER, '5', 5, 1),
        new Token(TokenType.NUMBER, '6', 6, 1),
        new Token(TokenType.NUMBER, '7', 7, 1),
        new Token(TokenType.NUMBER, '8', 8, 1),
        new Token(TokenType.NUMBER, '9', 9, 1),
        new Token(TokenType.EOF, '', undefined, 1)
      ]);

      expect(scanner.scanTokens('00 10 0100 123456789')).toEqual([
        new Token(TokenType.NUMBER, '00', 0, 1),
        new Token(TokenType.NUMBER, '10', 10, 1),
        new Token(TokenType.NUMBER, '0100', 100, 1),
        new Token(TokenType.NUMBER, '123456789', 123456789, 1),
        new Token(TokenType.EOF, '', undefined, 1)
      ]);
    });

    it('floats', () => {
      expect(scanner.scanTokens('0.0 1.0 2.0 3.0 4.0 5.0 6.0 7.0 8.0 9.0')).toEqual([
        new Token(TokenType.NUMBER, '0.0', 0, 1),
        new Token(TokenType.NUMBER, '1.0', 1, 1),
        new Token(TokenType.NUMBER, '2.0', 2, 1),
        new Token(TokenType.NUMBER, '3.0', 3, 1),
        new Token(TokenType.NUMBER, '4.0', 4, 1),
        new Token(TokenType.NUMBER, '5.0', 5, 1),
        new Token(TokenType.NUMBER, '6.0', 6, 1),
        new Token(TokenType.NUMBER, '7.0', 7, 1),
        new Token(TokenType.NUMBER, '8.0', 8, 1),
        new Token(TokenType.NUMBER, '9.0', 9, 1),
        new Token(TokenType.EOF, '', undefined, 1)
      ]);

      expect(scanner.scanTokens('00.0 10.0 01.00 1234.56789')).toEqual([
        new Token(TokenType.NUMBER, '00.0', 0, 1),
        new Token(TokenType.NUMBER, '10.0', 10, 1),
        new Token(TokenType.NUMBER, '01.00', 1, 1),
        new Token(TokenType.NUMBER, '1234.56789', 1234.56789, 1),
        new Token(TokenType.EOF, '', undefined, 1)
      ]);
    });

    it('but not invalid ones', () => {
      expect(scanner.scanTokens(".0")).toEqual([
        new Token(TokenType.DOT, '.', undefined, 1),
        new Token(TokenType.NUMBER, '0', 0, 1),
        new Token(TokenType.EOF, '', undefined, 1)
      ]);

      expect(scanner.scanTokens("0.")).toEqual([
        new Token(TokenType.NUMBER, '0', 0, 1),
        new Token(TokenType.DOT, '.', undefined, 1),
        new Token(TokenType.EOF, '', undefined, 1)
      ]);
    });
  });

  describe('should scan keywords and identifiers', () => {
    it('keywords', () => {
      expect(scanner.scanTokens('and class else false fun if nil or')).toEqual([
        new Token(TokenType.AND, 'and', undefined, 1),
        new Token(TokenType.CLASS, 'class', undefined, 1),
        new Token(TokenType.ELSE, 'else', undefined, 1),
        new Token(TokenType.FALSE, 'false', undefined, 1),
        new Token(TokenType.FUN, 'fun', undefined, 1),
        new Token(TokenType.IF, 'if', undefined, 1),
        new Token(TokenType.NIL, 'nil', undefined, 1),
        new Token(TokenType.OR, 'or', undefined, 1),
        new Token(TokenType.EOF, '', undefined, 1)
      ]);

      expect(scanner.scanTokens('print return super this true var while')).toEqual([
        new Token(TokenType.PRINT, 'print', undefined, 1),
        new Token(TokenType.RETURN, 'return', undefined, 1),
        new Token(TokenType.SUPER, 'super', undefined, 1),
        new Token(TokenType.THIS, 'this', undefined, 1),
        new Token(TokenType.TRUE, 'true', undefined, 1),
        new Token(TokenType.VAR, 'var', undefined, 1),
        new Token(TokenType.WHILE, 'while', undefined, 1),
        new Token(TokenType.EOF, '', undefined, 1)
      ]);

      expect(scanner.scanTokens('AND CLASS ELSE FALSE FUN IF NIL OR')).toEqual([
        new Token(TokenType.IDENTIFIER, 'AND', undefined, 1),
        new Token(TokenType.IDENTIFIER, 'CLASS', undefined, 1),
        new Token(TokenType.IDENTIFIER, 'ELSE', undefined, 1),
        new Token(TokenType.IDENTIFIER, 'FALSE', undefined, 1),
        new Token(TokenType.IDENTIFIER, 'FUN', undefined, 1),
        new Token(TokenType.IDENTIFIER, 'IF', undefined, 1),
        new Token(TokenType.IDENTIFIER, 'NIL', undefined, 1),
        new Token(TokenType.IDENTIFIER, 'OR', undefined, 1),
        new Token(TokenType.EOF, '', undefined, 1)
      ]);

      expect(scanner.scanTokens('PRINT RETURN SUPER THIS TRUE VAR WHILE')).toEqual([
        new Token(TokenType.IDENTIFIER, 'PRINT', undefined, 1),
        new Token(TokenType.IDENTIFIER, 'RETURN', undefined, 1),
        new Token(TokenType.IDENTIFIER, 'SUPER', undefined, 1),
        new Token(TokenType.IDENTIFIER, 'THIS', undefined, 1),
        new Token(TokenType.IDENTIFIER, 'TRUE', undefined, 1),
        new Token(TokenType.IDENTIFIER, 'VAR', undefined, 1),
        new Token(TokenType.IDENTIFIER, 'WHILE', undefined, 1),
        new Token(TokenType.EOF, '', undefined, 1)
      ]);
    });

    it('identifiers', () => {
      expect(scanner.scanTokens('abcdefghijklmnopqrstuvwxyz')).toEqual([
        new Token(TokenType.IDENTIFIER, 'abcdefghijklmnopqrstuvwxyz', undefined, 1),
        new Token(TokenType.EOF, '', undefined, 1)
      ]);

      expect(scanner.scanTokens('ABCDEFGHIJKLMNOPQRSTUVWXYZ')).toEqual([
        new Token(TokenType.IDENTIFIER, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', undefined, 1),
        new Token(TokenType.EOF, '', undefined, 1)
      ]);

      expect(scanner.scanTokens('snake_case')).toEqual([
        new Token(TokenType.IDENTIFIER, 'snake_case', undefined, 1),
        new Token(TokenType.EOF, '', undefined, 1)
      ]);

      expect(scanner.scanTokens('CamelCase')).toEqual([
        new Token(TokenType.IDENTIFIER, 'CamelCase', undefined, 1),
        new Token(TokenType.EOF, '', undefined, 1)
      ]);

      expect(scanner.scanTokens('a1 _1 _a _abc _123 a1b')).toEqual([
        new Token(TokenType.IDENTIFIER, 'a1', undefined, 1),
        new Token(TokenType.IDENTIFIER, '_1', undefined, 1),
        new Token(TokenType.IDENTIFIER, '_a', undefined, 1),
        new Token(TokenType.IDENTIFIER, '_abc', undefined, 1),
        new Token(TokenType.IDENTIFIER, '_123', undefined, 1),
        new Token(TokenType.IDENTIFIER, 'a1b', undefined, 1),
        new Token(TokenType.EOF, '', undefined, 1)
      ]);
    });
  });

  describe('should reject invalid characters', () => {
    it('simple', () => {
      mockLoxError.scanError.shouldBeCalledWith(1, 'Unexpected character: \'%\'')
        .when(() => scanner.scanTokens('%'));
    });
  });
});
