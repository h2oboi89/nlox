'use strict';

let hadError = false;

function report(line, where, message) {
  console.log(`[line ${line}] Error${where}: ${message}`);
  hadError = true;
}

function error(line, message) {
  report(line, "", message);
}

function run(source) {
  const scanner = new Scanner(source);
  const tokens = scanner.scanTokens();

  for(let token of tokens) {
    console.log(token);
  }
}

function runPrompt() {
  // TODO: read line of input and execute
}

function runFile(path) {
  // TODO: read file as string and execute
}

function main(args) {
  // TODO: parse command line args using https://www.npmjs.com/package/command-line-args
  // if `help`  -> print usage
  // if 1 arg   -> run file
  // else       -> run repl
}

module.exports = main;
