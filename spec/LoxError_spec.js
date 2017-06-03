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

  it('report should print to console.error', () => {
    expect(LoxError.hadError).toEqual(false);

    global.console.error.shouldBeCalledWith('[line 1234] Error here: oh noez!')
      .when(() => LoxError.report(1234, 'here', 'oh noez!'));

    expect(LoxError.hadError).toEqual(true);
  });

  it('error should serve as a utility wrapper for report', () => {
    expect(LoxError.hadError).toEqual(false);

    global.console.error.shouldBeCalledWith('[line 4321] Error : DOOM!')
      .when(() => LoxError.error(4321, 'DOOM!'));

    expect(LoxError.hadError).toEqual(true);
  });
});
