'use strict';

const mach = require('mach.js');
const proxyquire = require('proxyquire');

const Scanner = require('../../src/Scanner');
const Parser = require('../../src/Parser');

const mockLoxError = mach.mockObject({
  runtimeError: () => {}
}, 'LoxError');

const Interpreter = proxyquire('../../src/Interpreter', {
  './LoxError': mockLoxError
});

const scanner = new Scanner();
const parser = new Parser();

const interpreter = new Interpreter();

function sameError(expected) {
  return mach.same(expected, (actual, expected) => actual.messasge === expected);
}

function interpret(input) {
  return interpreter.interpret(parser.parse(scanner.scanTokens(input)));
}

// TODO: interpret with error

module.exports = {
  mockLoxError: mockLoxError,
  sameError: sameError,
  interpret: interpret
};
