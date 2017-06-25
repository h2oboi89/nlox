'use strict';

const commandLineArgs = require('command-line-args');
const commandLineUsage = require('command-line-usage');
const fs = require('fs-extra');
const path = require('path');
const readline = require('readline');

const LoxError = require('./src/LoxError');
const options = require('./src/options');
const Scanner = require('./src/Scanner');
const Parser = require('./src/Parser');
const Interpreter = require('./src/Interpreter');

const scanner = new Scanner();
const parser = new Parser();
const interpreter = new Interpreter();

function run(source, repl) {
  if(LoxError.hadError) {
    process.exit(65);
  }
  else if (LoxError.hadRuntimeError) {
    process.exit(70);
  }
  else {
    const tokens = scanner.scanTokens(source);

    const statements = parser.parse(tokens);

    if (LoxError.hadError) {
      return;
    }

    interpreter.interpret(statements, repl);
  }
}

function runPrompt() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.prompt();

  rl.on('line', (line) => {
    run(line, true);

    LoxError.reset();

    rl.prompt();
  }).on('close', () => {
    console.log();
    process.exit(0);
  });
}

function runFile(file) {
  fs.stat(file)
    .then((stats) => {
      // TODO: run all files in a directory?
      if(stats.isDirectory()) {
        throw new Error(`${file} is a directory, require a file`);
      }
    })
    .then(() => fs.readFile(file, 'utf8'))
    .then((contents) => run(contents))
    .catch((error) => {
      console.error(error.message);
      process.exit(1);
    });
}

function main() {
  const args = commandLineArgs(options.options);
  const usage = commandLineUsage(options.sections);

  if(args.help) {
    return console.log(usage);
  }

  if(args.input) {
    return runFile(path.join(process.cwd(), args.input));
  }

  return runPrompt();
}

module.exports = main;

if(require.main === module) {
  main();
}
