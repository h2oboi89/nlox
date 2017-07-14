'use strict';

describe('Parser - logical', () => {
  const parseAndPrint = require('./common').parseAndPrint;

  it('true or false;', () => {
    parseAndPrint('true or false;', '( statement ( or true false ) )');
  });

  it('true or false or false;', () => {
    parseAndPrint('true or false or false;', '( statement ( or ( or true false ) false ) )');
  });

  it('true and false;', () => {
    parseAndPrint('true and false;', '( statement ( and true false ) )');
  });

  it('true and false and false;', () => {
    parseAndPrint('true and false and false;', '( statement ( and ( and true false ) false ) )');
  });

  it('true or false and true or false;', () => {
    parseAndPrint('true or false and true or false;', '( statement ( or ( or true ( and false true ) ) false ) )');
  });
});
