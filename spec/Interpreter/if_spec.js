'use strict';

describe('Interpreter - if', () => {
  const common = require('./common');
  const interpretAndPrint = common.interpretAndPrint;

  beforeAll(() => common.beforeAll());
  afterAll(() => common.afterAll());

  it('if (true) print 1; else print 2; -> 1',
    () => interpretAndPrint('if (true) print 1; else print 2;', '1')
  );

  it('if (false) print 1; else print 2; -> 2',
    () => interpretAndPrint('if (false) print 1; else print 2;', '2')
  );

  it('if (false) print 1; print 3; -> 3',
    () => interpretAndPrint('if (false) print 1; print 3;', '3')
  );
});
