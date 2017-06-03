'use strict';

let hadError = false;

function report(line, where, message) {
  console.error(`[line ${line}] Error ${where}: ${message}`);
  hadError = true;
}

function error(line, message) {
  report(line, '', message);
}

module.exports = {
  error,
  hadError,
  report
};
