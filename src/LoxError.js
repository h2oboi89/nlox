'use strict';

let _hadError = false;

class LoxError {
  static get hadError() {
    return _hadError;
  }

  static reset() {
    _hadError = false;
  }

  static report(line, where, message) {
    console.error(`[line ${line}] Error ${where}: ${message}`);
    _hadError = true;
  }

  static error(line, message) {
    this.report(line, '', message);
  }
}

module.exports = LoxError;
