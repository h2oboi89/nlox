'use strict';

describe('Interpreter - print', () => {
  const common = require('./common');
  const interpretAndPrint = common.interpretAndPrint;

  beforeAll(() => common.beforeAll());
  afterAll(() => common.afterAll());

  it('should print value', () => interpretAndPrint('print 1;', '1'));
});
