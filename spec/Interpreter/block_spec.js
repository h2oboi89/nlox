'use strict';

describe('Interpreter - block', () => {
  const common = require('./common');
  const interpretAndPrint = common.interpretAndPrint;

  beforeAll(() => common.beforeAll());
  afterAll(() => common.afterAll());

  const inputBlock = `
  {
    var a = 1;
    var b = 2;

    print a + b;
  }
  `;

  it('should execute a block of statements', () => interpretAndPrint(inputBlock, '3'));
});
