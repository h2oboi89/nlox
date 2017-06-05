'use strict';

describe('LoxError', () => {
  const mach = require('mach.js');

  const Token = require('../src/Token');
  const TokenType = require('../src/TokenType');

  const LoxError = require('../src/LoxError');

  let globalConsoleError;

  beforeAll(() => {
    globalConsoleError = global.console.error;
    global.console.error = mach.mockFunction('console.error');

    LoxError.reset();
  });

  afterEach(() => {
    LoxError.reset();
  });

  afterAll(() => {
    global.console.error = globalConsoleError;
  });

  it('scanError should report Scanner errors', () => {
    expect(LoxError.hadError).toEqual(false);

    global.console.error.shouldBeCalledWith('[line 4321] Error : DOOM!')
      .when(() => LoxError.scanError(4321, 'DOOM!'));

    expect(LoxError.hadError).toEqual(true);
  });

  describe('parseError', () => {
    it('should report Parser errors at EOF', () => {
      expect(LoxError.hadError).toEqual(false);

      global.console.error.shouldBeCalledWith('[line 5678] Error at end: GLOOM!')
        .when(() => LoxError.parseError(new Token(TokenType.EOF, '', undefined, 5678), 'GLOOM!'));

      expect(LoxError.hadError).toEqual(true);
    });

    it('should report Parser errors at other tokens', () => {
      expect(LoxError.hadError).toEqual(false);

      global.console.error.shouldBeCalledWith('[line 9012] Error at \'true\': Oh noez!')
        .when(() => LoxError.parseError(new Token(TokenType.TRUE, 'true', undefined, 9012), 'Oh noez!'));

      expect(LoxError.hadError).toEqual(true);
    });
  });
});
