'use strict';

describe('Interpreter - variables', () => {
  const common = require('./common');
  const interpret = common.interpret;
  const interpretAndPrint = common.interpretAndPrint;

  beforeAll(() => common.beforeAll());
  afterAll(() => common.afterAll());

  describe('variables', () => {
    it('var a; a; a = 1; a;', () => {
      interpret('var a;');
      interpretAndPrint('a;', 'nil');
      interpretAndPrint('a = 1;', '1');
      interpretAndPrint('a;', '1');
    });

    it('var b = 2; b; b = 3; b;', () => {
      interpret('var b = 2;');
      interpretAndPrint('b;', '2');
      interpretAndPrint('b = 3;', '3');
      interpretAndPrint('b;', '3');
    });
  });
});
