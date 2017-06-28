'use strict';

describe('Parser - unary', () => {
  const parseAndPrint = require('./common').parseAndPrint;

  it('!true;', () => {
    parseAndPrint('!true;', '( statement ( ! true ) )');
  });

  it('-3;', () => {
    parseAndPrint('-3;', '( statement ( - 3 ) )');
  });
});
