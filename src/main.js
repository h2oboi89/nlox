'use strict';

const commandLineArgs = require('command-line-args');
const commandLineUsage = require('command-line-usage');
const fs = require('fs-extra');
const path = require('path');
const readline = require('readline');

const LoxError = require('./LoxError');
const options = require('./options');
const Scanner = require('./Scanner');

const scanner = new Scanner();

function run(source) {
  if(LoxError.hadError) {
    process.exit(65);
  }
  else {
    const tokens = scanner.scanTokens(source);

    for(let token of tokens) {
      console.log(token.toString());
    }
  }
}

function runPrompt() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.prompt();

  rl.on('line', (line) => {
    run(line);

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
