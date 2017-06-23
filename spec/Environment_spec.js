'use strict';

describe('Environment', () => {
  const Token = require('../src/Token');

  const Environment = require('../src/Environment');

  const environment = new Environment();

  const fooToken = new Token(null, 'foo');
  const barToken = new Token(null, 'bar');
  const bazToken = new Token(null, 'baz');

  it('getting undefined variables should throw an error', () => {
    expect(() => environment.get(fooToken))
      .toThrowError(`Undefined variable 'foo'.`);
  });

  it('assigning undefined variables should throw an error', () => {
    expect(() => environment.assign(fooToken))
      .toThrowError(`Undefined variable 'foo'.`);
  });

  it('should support variable operations (define, assign, get)', () => {
    environment.define(fooToken, 0);
    environment.define(barToken, 1);

    expect(environment.get(fooToken)).toEqual(0);
    expect(environment.get(barToken)).toEqual(1);

    environment.assign(fooToken, 10);

    expect(environment.get(fooToken)).toEqual(10);
  });

  it('redefining variables should throw an error', () => {
    environment.define(bazToken, 0);

    expect(() => environment.define(bazToken, 1))
      .toThrowError(`'baz' has already been defined.`);
  });
});
