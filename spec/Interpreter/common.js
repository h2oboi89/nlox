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
const globalConsoleLog = global.console.log;
const mockConsoleLog = mach.mockFunction('console.log');

function sameError(expected) {
  return mach.same(expected, (actual, expected) => actual.message === expected);
}

function interpret(input, repl = true) {
  return interpreter.interpret(parser.parse(scanner.scanTokens(input)), repl);
}

function beforeAll() {
  global.console.log = mockConsoleLog;
}

function afterAll() {
  global.console.log = globalConsoleLog;
}

function interpretAndPrint(input, expected) {
  mockConsoleLog.shouldBeCalledWith(expected)
    .when(() => interpret(input));
}

function interpretToError(input, expected) {
  mockLoxError.runtimeError.shouldBeCalledWith(sameError(expected))
    .when(() => interpret(input));
}

module.exports = {
  beforeAll: beforeAll,
  afterAll: afterAll,
  interpret: interpret,
  interpretAndPrint: interpretAndPrint,
  interpretToError: interpretToError
};
