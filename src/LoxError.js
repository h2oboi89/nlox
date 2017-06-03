'use strict';

let _hadError = false;

/**
 * Error reporting mechanism for the interpreter.
 */
class LoxError {

  /**
   * Whether or not an error occurred.
   *
   * @static
   * @return {boolean}  True if an error occurred; otherwise false.
   */
  static get hadError() {
    return _hadError;
  }

  /**
   * Resets the error state.
   * @static
   */
  static reset() {
    _hadError = false;
  }

  /**
   * Reports an issue using stderr.
   *
   * @static
   * @param  {number} line    Line the issue occurred on.
   * @param  {string} where   ???
   * @param  {string} message Issue message.
   */
  static report(line, where, message) {
    console.error(`[line ${line}] Error ${where}: ${message}`);
    _hadError = true;
  }

  /**
   * Reports an error.
   *
   * @static
   * @param  {number} line    Line the error occurred on.
   * @param  {string} message Error message.
   */
  static error(line, message) {
    this.report(line, '', message);
  }
}

module.exports = LoxError;
