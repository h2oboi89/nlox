'use strict';

describe('RuntimeError', () => {
  const RuntimeError = require('../src/RuntimeError');

  it('should have a token field', () => {
    expect(new RuntimeError('token', 'message').token)
      .toEqual('token');
  });

  it('should toString nicely', () => {
    expect(new RuntimeError('token', 'message').toString())
      .toEqual('Error: message');
  });
});
