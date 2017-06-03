'use strict';

describe('Token', () => {
  const Token = require('../src/Token');
  const TokenType = require('../src/TokenType');

  it('should toString nicely', () => {
    expect(new Token(TokenType.BANG, '!', undefined, 1).toString())
      .toEqual('BANG ! undefined');
  });

  // TODO: test token
});
