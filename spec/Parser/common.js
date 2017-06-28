'use strict';

const mach = require('mach.js');
const proxyquire = require('proxyquire');

const AstPrinter = require('../../src/utility/AstPrinter');
const Scanner = require('../../src/Scanner');

const mockLoxError = mach.mockObject({
  parseError: () => {}
}, 'LoxError');

const scanner = new Scanner();

const Parser = proxyquire('../../src/Parser', {
  './LoxError': mockLoxError
});

const astPrinter = new AstPrinter();
const parser = new Parser();

function sameToken(expected) {
  return mach.same(expected, (actual, expected) => actual.toString() === expected);
}

function parseAndPrint(input, expected) {
  return expect(astPrinter.print(parser.parse(scanner.scanTokens(input))))
    .toEqual(expected);
}

function parseAndError(input, token, message, expected) {
  mockLoxError.parseError.shouldBeCalledWith(sameToken(token), message)
    .when(() => {
      expect(astPrinter.print(parser.parse(scanner.scanTokens(input))))
        .toEqual(expected);
    });
}

module.exports = {
  parseAndPrint: parseAndPrint,
  parseAndError: parseAndError
};
