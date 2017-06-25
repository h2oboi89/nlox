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

module.exports = {
  astPrinter: new AstPrinter(),
  mockLoxError: mockLoxError,
  scanner: new Scanner(),
  parser: new Parser()
};
