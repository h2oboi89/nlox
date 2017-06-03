'use strict';

/**
 * Command line options for the Lox interpreter
 */
const options = [{
    name: 'help',
    description: 'print this usage guide',
    alias: 'h',
    type: Boolean
  },
  {
    name: 'input',
    description: 'lox source file to execute',
    defaultOption: true,
    type: String
  }
];

const sections = [{
    header: 'nlox',
    content: 'Lox interpreter'
  },
  {
    header: 'Synopsis',
    content: [
      '$ nlox               <- opens lox REPL',
      '$ nlox <source file> <- executes lox source file (ie: main.lox)',
    ]
  },
  {
    header: 'Options',
    optionList: options
  }
];

module.exports = {
  options,
  sections
};
