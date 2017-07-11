'use strict';

describe('Interpreter - expression', () => {
  const common = require('./common');
  const interpret = common.interpret;
  const interpretAndPrint = common.interpretAndPrint;
  const interpretToError = common.interpretToError;

  beforeAll(() => common.beforeAll());
  afterAll(() => common.afterAll());

  describe('should not print expression if not in repl mode', () => {
    it('nil;', () => interpret('nil;', false));
  });

  describe('literal', () => {
    it('nil;', () => interpretAndPrint('nil;', 'nil'));
  });

  describe('unary', () => {
    it('-1;', () => interpretAndPrint('-1;', '-1'));
    it('-false;', () => interpretToError('-false;', 'Operand must be a number.'));

    it('!true;', () => interpretAndPrint('!true;', 'false'));
    it('!nil;', () => interpretAndPrint('!nil;', 'true'));
    it('!3.14;', () => interpretAndPrint('!3.14;', 'false'));
  });

  describe('logical', () => {
    it('false or false;', () => interpretAndPrint('false or false;', 'false'));
    it('false or true;', () => interpretAndPrint('false or true;', 'true'));
    it('true or false;', () => interpretAndPrint('true or false;', 'true'));
    it('true or true;', () => interpretAndPrint('true or true;', 'true'));

    it('false and false;', () => interpretAndPrint('false and false;', 'false'));
    it('false and true;', () => interpretAndPrint('false and true;', 'false'));
    it('true and false;', () => interpretAndPrint('true and false;', 'false'));
    it('true and true;', () => interpretAndPrint('true and true;', 'true'));

    it('"hi" or 2;', () => interpretAndPrint('"hi" or 2;', 'hi'));
    it('nil or "yes";', () => interpretAndPrint('nil or "yes";', 'yes'));
  });

  describe('binary', () => {
    it('1 - 2;', () => interpretAndPrint('1 - 2;', '-1'));
    it(`false - 2;`, () => interpretToError(`false - 2;`, 'Operands must be a number.'));
    it(`1 - true;`, () => interpretToError(`1 - true;`, 'Operands must be a number.'));

    it('3 + 4;', () => interpretAndPrint('3 + 4;', '7'));
    it(`'3' + 4;`, () => interpretAndPrint(`'3' + 4;`, '34'));
    it(`3 + '4';`, () => interpretAndPrint(`3 + '4';`, '34'));
    it(`false + 4;`, () => interpretToError(`false + 4;`, 'Operands must numbers or strings.'));
    it(`3 + true;`, () => interpretToError(`3 + true;`, 'Operands must numbers or strings.'));

    it('5 / 6;', () => interpretAndPrint('5 / 6;', '0.8333333333333334'));
    it(`false / 6;`, () => interpretToError(`false / 6;`, 'Operands must be a number.'));
    it(`5 / true;`, () => interpretToError(`5 / true;`, 'Operands must be a number.'));

    it('7 * 8;', () => interpretAndPrint('7 * 8;', '56'));
    it(`false * 8;`, () => interpretToError(`false * 8;`, 'Operands must be a number.'));
    it(`7 * true;`, () => interpretToError(`7 * true;`, 'Operands must be a number.'));

    it('9 > 10;', () => interpretAndPrint('9 > 10;', 'false'));
    it(`false > 10;`, () => interpretToError(`false > 10;`, 'Operands must be a number.'));
    it(`9 > true;`, () => interpretToError(`9 > true;`, 'Operands must be a number.'));

    it('11 >= 12;', () => interpretAndPrint('11 >= 12;', 'false'));
    it(`false * >= 12;`, () => interpretToError(`false * 8;`, 'Operands must be a number.'));
    it(`11 >= true;`, () => interpretToError(`11 >= true;`, 'Operands must be a number.'));

    it('13 < 14;', () => interpretAndPrint('13 < 14;', 'true'));
    it(`false < 14;`, () => interpretToError(`false < 14;`, 'Operands must be a number.'));
    it(`13 < true;`, () => interpretToError(`13 < true;`, 'Operands must be a number.'));

    it('15 <= 16;', () => interpretAndPrint('15 <= 16;', 'true'));
    it(`false <= 16;`, () => interpretToError(`false <= 16;`, 'Operands must be a number.'));
    it(`15 <= true;`, () => interpretToError(`15 <= true;`, 'Operands must be a number.'));

    it('17 != 18;', () => interpretAndPrint('17 != 18;', 'true'));
    it('nil != nil;', () => interpretAndPrint('nil != nil;', 'false'));
    it('nil != false;', () => interpretAndPrint('nil != false;', 'true'));

    it('19 == 20;', () => interpretAndPrint('19 == 20;', 'false'));
    it('nil == nil;', () => interpretAndPrint('nil == nil;', 'true'));
    it('!nil == true', () => interpretAndPrint('!nil == true;', 'true'));
  });

  describe('grouping', () => {
    it('(1 + 2) * (3 + 4);', () => interpretAndPrint('(1 + 2) * (3 + 4);', '21'));
  });
});
