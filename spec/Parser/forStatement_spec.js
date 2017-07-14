'use strict';

function expectedForLoop(initializer, condition, increment, body) {
  condition = condition || 'true';

  if(increment) {
    body = `( block ${body} ; ${increment} )`;
  }

  body = `( while ${condition} ${body} )`;

  if(initializer) {
    body = `( block ${initializer} ; ${body} )`;
  }

  return body;
}

describe('Parser - forStatement', () => {
  const common = require('./common');
  const parseAndPrint = common.parseAndPrint;
  const parseAndError = common.parseAndError;

  it('for( ; ; ) print i;', () => {
    parseAndPrint(
      'for( ; ; ) print i;',
      expectedForLoop(
        null,
        null,
        null,
        '( print ( var i ) )'
      )
    );
  });

  it('for( ; ; i = i + 1) print i;', () => {
    parseAndPrint(
      'for( ; ; i = i + 1) print i;',
      expectedForLoop(
        null,
        null,
        '( statement ( assign i ( + ( var i ) 1 ) ) )',
        '( print ( var i ) )'
      )
    );
  });

  it('for( ; i , 10; ) print i;', () => {
    parseAndPrint(
      'for( ; i < 10; ) print i;',
      expectedForLoop(
        null,
        '( < ( var i ) 10 )',
        null,
        '( print ( var i ) )'
      )
    );
  });

  it('for( ; i < 10; i = i + 1) print i;', () => {
    parseAndPrint(
      'for( ; i < 10; i = i + 1) print i;',
      expectedForLoop(
        null,
        '( < ( var i ) 10 )',
        '( statement ( assign i ( + ( var i ) 1 ) ) )',
        '( print ( var i ) )'
      )
    );
  });

  it('for(var i = 0; ; ) print i;', () => {
    parseAndPrint(
      'for(var i = 0; ; ) print i;',
      expectedForLoop(
        '( declare i 0 )',
        null,
        null,
        '( print ( var i ) )'
      )
    );
  });

  it('for(var i = 0; ; i = i + 1) print i;', () => {
    parseAndPrint(
      'for(var i = 0; ; i = i + 1) print i;',
      expectedForLoop(
        '( declare i 0 )',
        null,
        '( statement ( assign i ( + ( var i ) 1 ) ) )',
        '( print ( var i ) )'
      )
    );
  });

  it('for(var i = 0; i < 10; ) print i;', () => {
    parseAndPrint(
      'for(var i = 0; i < 10; ) print i;',
      expectedForLoop(
        '( declare i 0 )',
        '( < ( var i ) 10 )',
        null,
        '( print ( var i ) )'
      )
    );
  });

  it('for(var i = 0; i < 10; i = i + 1) print i;', () => {
    parseAndPrint(
      'for(var i = 0; i < 10; i = i + 1) print i;',
      expectedForLoop(
        '( declare i 0 )',
        '( < ( var i ) 10 )',
        '( statement ( assign i ( + ( var i ) 1 ) ) )',
        '( print ( var i ) )'
      )
    );
  });

  it('for(i = 0; i < 10; i = i + 1) print i;', () => {
    parseAndPrint(
      'for(i = 0; i < 10; i = i + 1) print i;',
      expectedForLoop(
        '( statement ( assign i 0 ) )',
        '( < ( var i ) 10 )',
        '( statement ( assign i ( + ( var i ) 1 ) ) )',
        '( print ( var i ) )'
      )
    );
  });

  it('for var i = 0; (missing parens)', () => {
    parseAndError(
      'for var i = 0;',
      'VAR var undefined',
      `Expect '(' after 'for'.`,
      ''
    );
  });

  it('for(var i = 0; i < 10 (missing semicolon)', () => {
    parseAndError(
      'for(var i = 0; i < 10',
      'EOF  undefined',
      `Expect ';' after loop condition.`,
      ''
    );
  });

  it('for(var i = 0; i < 10; i = i + 1 (missing parens)', () => {
    parseAndError(
      'for(var i = 0; i < 10; i = i + 1',
      'EOF  undefined',
      `Expect ')' after for clauses.`,
      ''
    );
  });
});
