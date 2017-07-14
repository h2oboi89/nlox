'use strict';

const fs = require('fs-extra');
const os = require('os');
const path = require('path');

const rootDirectory = path.join(__dirname, '..');
const outputDirectory = path.join(rootDirectory, 'src', 'parsing');
const templateFile = path.join(__dirname, 'template.txt');

function generateType(type, fields, suffix) {
  const className = `${type}${suffix}`;
  const classFile = path.join(outputDirectory, suffix, `${type}.js`);

  console.log(` - ${className} : ${fields.join(', ')}`);

  return fs.ensureFile(classFile)
    .then(() => {
      return fs.readFile(templateFile, 'utf8')
        .then((contents) => fs.writeFile(
          classFile,
          contents.replace(/<CLASSNAME>/g, className)
          .replace(/<ARGUMENTS>/, fields.join(', '))
          .replace(/<ASSIGNMENTS>/, fields.map((f) => `    this._${f} = ${f};`).join(`${os.EOL}`))
          .replace(/<FIELDS>/, fields.map((f) => {
            return [
              `  get ${f}() {`,
              `    return this._${f};`,
              `  }`
            ].join(`${os.EOL}`);
          }).join(`${os.EOL}${os.EOL}`))
        ));
    });
}

function generateAst(definitions, suffix) {
  return Promise.all(definitions.map((definition) => {
    const parts = definition.split(':').map((p) => p.trim());

    return generateType(parts[0], parts[1].split(',').map((f) => f.trim()), suffix);
  }));
}

function main() {
  console.log(`Cleaning out ${outputDirectory.replace(rootDirectory, '')}...`);

  fs.emptyDir(outputDirectory)
    .then(() => {
      console.log('Generating AST Expressions...');

      return generateAst([
        'Assignment : name, value',
        'Binary     : left, operator, right',
        'Grouping   : expression',
        'Literal    : value',
        'Logical   : left, operator, right',
        'Unary      : operator, right',
        'Variable   : name'
      ], 'Expression');
    })
    .then(() => {
      console.log('Generating AST Statements...');

      return generateAst([
        'Block      : statements',
        'Expression : expression',
        'If         : condition, thenBranch, elseBranch',
        'Print      : expression',
        'Variable   : name, initializer',
        'While      : condition, body'
      ], 'Statement');
    })
    .catch((error) => {
      console.log(error);
    });
}

if(require.main === module) {
  main();
}
