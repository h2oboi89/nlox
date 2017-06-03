'use strict';

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
      '$ nlox',
      '$ nlox main.lox',
      '$ nlox -h'
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
