'use strict';

describe('Environment', () => {
  const Token = require('../src/Token');

  const Environment = require('../src/Environment');

  const environment = new Environment();

  const fooToken = new Token(null, 'foo');
  const barToken = new Token(null, 'bar');

  it('undefined variables should throw an error', () => {
    expect(() => environment.get(fooToken))
      .toThrowError(`Undefined variable 'foo'.`);
  });

  it('should support defining and getting variables', () => {
    environment.define('foo', 0);
    environment.define('bar', 1);

    expect(environment.get(fooToken)).toEqual(0);
    expect(environment.get(barToken)).toEqual(1);

    environment.define('foo', 10);

    expect(environment.get(fooToken)).toEqual(10);
  });

  it('should support redefining variables', () => {
    environment.define('foo', 0);

    expect(environment.get(fooToken)).toEqual(0);

    environment.define('foo', 'bar');

    expect(environment.get(fooToken)).toEqual('bar');
  });
});
