'use strict';

describe('Interpreter - while', () => {
  const common = require('./common');
  const interpretAndPrint = common.interpretAndPrint;

  beforeAll(() => common.beforeAll());
  afterAll(() => common.afterAll());

  it('while (false) { print 1; } print 2; -> 2',
    () => interpretAndPrint('while (false) { print 1; } print 2;', '2')
  );

  it('var i = 0; while (i == 0) { i = i + 1; } -> 1',
    () => interpretAndPrint('var i = 0; while (i == 0) { i = i + 1; }', '1')
  );

  it('for( ; false; ) { print 1; } print 2; -> 2',
    () => interpretAndPrint('for( ; false; ) { print 1; } print 2;', '2')
  );
});
