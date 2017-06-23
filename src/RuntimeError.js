'use strict';

class RuntimeError extends Error {
  constructor(token, message) {
    super(message);
    this._token = token;
  }

  get token() {
    return this._token;
  }
}

module.exports = RuntimeError;
