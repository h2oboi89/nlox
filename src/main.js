'use strict';

const commandLineArgs = require('command-line-args');
const commandLineUsage = require('command-line-usage');
const fs = require('fs-extra');
const path = require('path');
const readline = require('readline');
const util = require('util');

const options = require('./options');
const LoxError = require('./LoxError');
const Scanner = require('./Scanner');

function run(source) {
  if(LoxError.hadError) {
    process.exit(65);
  }
  else {
    const scanner = new Scanner(source);
    const tokens = scanner.scanTokens();

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

    LoxError.hadError = false;

    rl.prompt();
  }).on('close', () => {
    console.log();
    process.exit(0);
  });
}

function runFile(file) {
  const fsStat = util.promisify(fs.stat);
  const fsReadFile = util.promisify(fs.readFile);

  fsStat(file)
    .then((stats) => {
      // TODO: run all files in a directory?
      if(stats.isDirectory()) {
        throw new Error(`${file} is a directory, require a file`);
      }
    })
    .then(() => fsReadFile(file, 'utf8'))
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
