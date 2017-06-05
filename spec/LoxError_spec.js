'use strict';

describe('LoxError', () => {
  const mach = require('mach.js');

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
});
