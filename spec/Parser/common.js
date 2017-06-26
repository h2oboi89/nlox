'use strict';

const mach = require('mach.js');
const proxyquire = require('proxyquire');

const AstPrinter = require('../../src/utility/AstPrinter');

const mockLoxError = mach.mockObject({
  parseError: () => {}
}, 'LoxError');

const Scanner = require('../../src/Scanner');

const Parser = proxyquire('../../src/Parser', {
  './LoxError': mockLoxError
});

function sameToken(expected) {
  return mach.same(expected, (actual, expected) => actual.toString() === expected);
}

module.exports = {
  astPrinter: new AstPrinter(),
  mockLoxError: mockLoxError,
  sameToken: sameToken,
  scanner: new Scanner(),
  parser: new Parser()
};
