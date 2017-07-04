'use strict';

describe('Environment', () => {
  const Token = require('../src/Token');

  const Environment = require('../src/Environment');

  let environment = new Environment();

  const fooToken = new Token(null, 'foo');
  const barToken = new Token(null, 'bar');
  const bazToken = new Token(null, 'baz');
  const FOOToken = new Token(null, 'FOO');

  beforeEach(() => {
    environment = new Environment();
  });

  it('getting undefined variables should throw an error', () => {
    expect(() => environment.get(fooToken))
      .toThrowError(`Undefined variable 'foo'.`);
  });

  it('assigning undefined variables should throw an error', () => {
    expect(() => environment.assign(fooToken))
      .toThrowError(`Undefined variable 'foo'.`);
  });

  it('redefining variables should throw an error', () => {
    environment.define(fooToken, 0);

    expect(() => environment.define(fooToken, 1))
    .toThrowError(`'foo' has already been defined.`);
  });

  it('should support variable operations (define, assign, get)', () => {
    environment.define(fooToken, 0);

    expect(environment.get(fooToken)).toEqual(0);

    environment.assign(fooToken, 10);

    expect(environment.get(fooToken)).toEqual(10);
  });

  it('should allow nil values', () => {
    environment.define(fooToken, null);

    expect(environment.get(fooToken)).toEqual(null);
  });

  it('capitalization matters', () => {
    environment.define(fooToken, 10);

    expect(environment.get(fooToken)).toEqual(10);

    expect(() => environment.get(FOOToken))
      .toThrowError(`Undefined variable 'FOO'.`);
  });

  it('should support block scopes', () => {
    environment.define(fooToken, 0);
    environment.define(barToken, 1);
    environment.define(bazToken, 2);

    const blockEnvironment = new Environment(environment);

    expect(blockEnvironment.get(fooToken)).toEqual(0);
    expect(blockEnvironment.get(barToken)).toEqual(1);

    blockEnvironment.define(fooToken, 10);
    blockEnvironment.define(barToken, 11);

    expect(blockEnvironment.get(fooToken)).toEqual(10);
    expect(blockEnvironment.get(barToken)).toEqual(11);

    expect(environment.get(fooToken)).toEqual(0);
    expect(environment.get(barToken)).toEqual(1);

    blockEnvironment.assign(bazToken, 100);

    expect(blockEnvironment.get(bazToken)).toEqual(100);
    expect(environment.get(bazToken)).toEqual(100);
  });
});
