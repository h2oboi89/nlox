'use strict';

/**
 * Represents an error thrown by the {@link Interpreter} during runtime as a result of invalid user input.
 */
class RuntimeError extends Error {

  /**
   * Creates a new runtime error instance.
   *
   * @param  {Token} token Token that caused the error.
   * @param  {string} message Message describing the error.
   */
  constructor(token, message) {
    super(message);
    this._token = token;
  }

  /**
   * @type {Token}
   */
  get token() {
    return this._token;
  }
}

module.exports = RuntimeError;
